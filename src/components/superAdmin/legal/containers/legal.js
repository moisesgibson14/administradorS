import React, { Component } from 'react'
import { firestore } from 'firebase'
import { UncontrolledTooltip } from 'reactstrap';
import '../../registerActive/stylesSearch.css'
import algoliasearch from 'algoliasearch'
const client = algoliasearch('MIUXU5PG2H', '536306ed1e8d981d2f02e70c444f35a0');
const index = client.initIndex("assets")
import Documents from "./documents"
import LegalProcedures from './legalProcedures'
import Assets from '../components/assets'
import Search from '../components/search'
import SearchNotFound from '../components/search'
import LegalStatus from './legalStatus'
import Cryptr from 'cryptr'
import userPermits from "../../../../auth";
var cryptr = new Cryptr('satesSeguro8102')

export default class Legal extends Component {
  constructor() {
    super()
    this.state = {
      assets: [],
      search: false,
      selectAsset: '',
      procedures: [
        {
          label: 'documental',
          active: false
        },
        {
          label: 'tramites',
          active: false
        },
        {
          label: 'situacionJuridica',
          active: false
        },
      ],
      refresh: '',
      auth: {},
      idasset: '',
      isGeneral: false
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.refresh = this.refresh.bind(this)
    this.assignSelected = this.assignSelected.bind(this)
    this.handleUpdateAsset = this.handleUpdateAsset.bind(this)
    this.openButtons = this.openButtons.bind(this)
    this.backToPrincipal = this.backToPrincipal.bind(this)
  }

  componentDidMount() {
    this.userPermit()

    firestore().collection('assets').where("kindOfGood", "==", "INMUEBLES").orderBy("creationDate", "desc").limit(4).onSnapshot(snap => {
      let assetsTMP = []
      snap.forEach(asset => {
        assetsTMP.push({ ...asset.data(), id: asset.id })
      })
      this.setState({ assets: assetsTMP })
    })
  }

  userPermit() {
    let userLocal = JSON.parse(localStorage.getItem('atadresu'))
    let userMail = cryptr.decrypt(userLocal.one)

    firestore().collection('users').where('email', '==', userMail).get().then(data => {

      data.forEach(user => {
        userPermits(user.data(), 'Legal', auth => {
          console.log(auth)
          this.state.auth.document = auth.childrens[0].value
          this.state.auth.tramites = auth.childrens[2].value
          this.state.auth.delete = auth.childrens[1].value
          this.setState({
            refresh: ''
          })
        })
      })

    })
  }

  openButtons(index) {
    $('#legal-btns' + index).slideToggle('fast');
  }

  handleSearch(e) {
    if (e.target.value === '') {
      firestore().collection('assets').where("kindOfGood", "==", "INMUEBLES").orderBy("creationDate", "desc").limit(4).onSnapshot(snap => {
        let assetsTMP = []
        snap.forEach(asset => {
          assetsTMP.push({ ...asset.data(), id: asset.id })
        })
        this.setState({ assets: assetsTMP, search: false })
      })
    } else {
      index.search({ query: e.target.value }).then(responses => {
        let histsTMP = []
        responses.hits.map(hit => {
          if (hit.kindOfGood === 'INMUEBLES') {
            histsTMP.push(hit)
          }
        })
        this.setState({ assets: histsTMP, search: true })
      })
    }
  }

  refresh() {
    this.setState({ refresh: '' })
  }

  assignSelected(asset) {
    this.setState({ selectAsset: asset })
  }

  handleUpdateAsset(index) {
    firestore().collection('assets').doc(this.state.selectAsset.id).update(this.state.selectAsset).then(() => {
      swal("Guardado correctamente", "", "success", {
        timer: 3000
      })
      this.state.procedures[index].active = false
      this.refresh()
    })
  }

  backToPrincipal() {
    this.state.procedures[0].active = false
    this.state.procedures[1].active = false
    this.state.procedures[2].active = false

    this.setState({
      selectAsset : ''
    })
  }

  render() {

    if (this.state.assets.length < 1 && !this.state.search) {
      $('.loading').css({ 'display': 'block' })
    } else {
      $('.loading').css({ 'display': 'none' })
    }
    let { procedures, selectAsset, idasset, isGeneral } = this.state
    console.log('active: ', selectAsset)

    return (
      <div className="legal-sec">
        {/* <h2>
        {selectAsset.id  &&
            <span onClick={()=> { this.backToPrincipal()}}> <i className="fas fa-arrow-left accountantArrow"></i></span>
          }Legal</h2> */}
        <div className="headerSections flex-sates">
          <h2> {selectAsset && <span onClick={() => { this.backToPrincipal() }}> <i className="fas fa-arrow-left accountantArrow"></i></span>}Legal</h2>

          <span className="btnSearch"><i className="fas fa-search"></i></span>
          <div className="SearchBar">
            <span className="closeSearch"><i className="fas fa-times-circle"></i></span>
            {
              !procedures[0].active &&
              !procedures[1].active &&
              !procedures[2].active &&
              <input autoComplete="off" type="search" name="nombre" placeholder="Buscar" onChange={(e) => this.handleSearch(e)} />
            }
          </div>
        </div>
        <div className="wrapper">
          {
            !procedures[0].active &&
            !procedures[1].active &&
            !procedures[2].active &&
            <div>
              {/* <Search handleSearch={this.handleSearch} /> */}

              <Assets
                refresh={this.refresh}
                assets={this.state.assets}
                procedures={this.state.procedures}
                assignSelected={this.assignSelected}
                openButtons={this.openButtons}
                auth={this.state.auth}
              />
            </div>
          }
          {
            this.state.search &&
            this.state.assets.length < 1 &&
            <div className="alert alert-warning text-center" role="alert">
              <strong>No se encontraron coincidencias</strong>
            </div>
          }
          {
            procedures[0].active &&
            <Documents
              refresh={this.refresh}
              asset={this.state.selectAsset}
              procedures={this.state.procedures}
              handleUpdateAsset={this.handleUpdateAsset}
            />
          }
          {
            procedures[1].active &&
            <LegalProcedures
              refresh={this.refresh}
              asset={this.state.selectAsset}
              procedures={this.state.procedures}
              handleUpdateAsset={this.handleUpdateAsset}
            />
          }
          {
            procedures[2].active &&
            <LegalStatus
              refresh={this.refresh}
              asset={this.state.selectAsset}
              procedures={this.state.procedures}
              handleUpdateAsset={this.handleUpdateAsset}
            />
          }
        </div>
      </div>
    )
  }
}

