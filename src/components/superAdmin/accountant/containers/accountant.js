import React, { Component } from 'react'
import { firestore } from 'firebase'
import { UncontrolledTooltip } from 'reactstrap';
import '../../registerActive/stylesSearch.css'
import algoliasearch from 'algoliasearch'
const client = algoliasearch('MIUXU5PG2H', '536306ed1e8d981d2f02e70c444f35a0');
const index = client.initIndex("assets")
import Assets from '../components/assets'
import Search from '../components/search'
import BookInventory from './bookInventory'
import RealInventory from './realInventory'
import Conciliation from './conciliation'
import Settings from './settings'
import GeneralData from './generalData'
import $ from 'jquery'
import Cryptr from 'cryptr'
import userPermits from "../../../../auth";
var cryptr = new Cryptr('satesSeguro8102')

export default class accountant extends Component {
  constructor() {
    super()
    this.state = {
      assets: [],
      search: false,
      viewTrueDetails: false,
      selectAsset: {},
      procedures: [
        {
          label: 'Inventario en libros',
          active: false
        },
        {
          label: 'Inventario real',
          active: false
        },
        {
          label: 'Consciliacion fiscal-contable',
          active: false
        },
        {
          label: 'Ajustes',
          active: false
        },
      ],
      refresh: '',
      ready: false,
      assetsFurniture: {},
      countAsset: {},
      assetsFurnitureConciliation: {},
      idasset: '',
      isGeneral: false
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.refresh = this.refresh.bind(this)
    this.assignSelected = this.assignSelected.bind(this)
    // this.handleUpdateAsset = this.handleUpdateAsset.bind(this)
    this.userPermit = this.userPermit.bind(this)
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

    $('.btnSearch').click(() => {
      $('.SearchBar').slideDown(100)
    })
    $('.closeSearch').click(() => {
      $('.SearchBar').slideUp('fast')
    })
  }

  userPermit() {
    let userLocal = JSON.parse(localStorage.getItem('atadresu'))
    let userMail = cryptr.decrypt(userLocal.one)

    firestore().collection('users').where('email', '==', userMail).get().then(data => {

      data.forEach(user => {
        userPermits(user.data(), 'Contable', auth => {
          console.log(auth)
        })
      })

    })
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
  loading(loading) {
    if (loading) {
      $(document).ready(function () {
        $('.loading').css({ 'display': 'block' })
      })
    } else {
      $(document).ready(function () {
        $('.loading').css({ 'display': 'none' })
      })
    }
  }
  assignSelected(asset, option) {
    this.loading(true)
    if (option == '1') {
      this.setState({ selectAsset: asset })
      let idasset = asset.states.basicInformation[0].valueId
      this.state.idasset = idasset
      firestore().collection('assetsFurniture').where("cct", "==", idasset).orderBy("typeAsset", "asc").onSnapshot(snap => {
        let assetsFurnitureTMP = []
        snap.forEach(asset => {
          assetsFurnitureTMP.push({ ...asset.data(), id: asset.id })
        })
        var matriz = {};
        assetsFurnitureTMP.forEach(function (registro) {
          var assett = registro["typeAsset"];
          matriz[assett] = matriz[assett] ? (matriz[assett] + 1) : 1;
        });
        matriz = Object.keys(matriz).map(function (data) {
          return { name: data, cant: matriz[data] };
        });
        this.setState({ assetsFurniture: assetsFurnitureTMP, search: false, ready: true, countAsset: matriz, isGeneral: true })
        this.loading(false)
      })
    }
  }
  refresh() {
    this.setState({ refresh: '' })
  }
  backToPrincipal() {
    this.setState({ isGeneral: false })
    this.state.idasset = ''
  }
  render() {
    if (this.state.assets.length < 1 && !this.state.search) {
      $('.loading').css({ 'display': 'block' })
    } else {
      $('.loading').css({ 'display': 'none' })
    }
    let { selectAsset, procedures, isGeneral, ready, assetsFurniture, countAsset, assetsFurnitureConciliation, viewTrueDetails, idasset } = this.state
    return (
      <div className="accountantSec">
        <div className="headerSections flex-sates">
          <h2>{
            idasset &&
            <span onClick={() => { this.backToPrincipal() }}> <i className="fas fa-arrow-left accountantArrow"></i></span>
          }
            Contable</h2>
          {!isGeneral &&
            <Search handleSearch={this.handleSearch} />
          }
        </div>
        {
          !isGeneral &&
          <div className="wrapper">
            <Assets
              refresh={this.refresh}
              assets={this.state.assets}
              procedures={this.state.procedures}
              assignSelected={this.assignSelected}
              viewTrueDetail={this.state.viewTrueDetail}
            />
          </div>
        }
        {
          isGeneral && ready &&
          <GeneralData asset={selectAsset} refresh={this.refresh} />
        }
        {
          this.state.search &&
          this.state.assets.length < 1 &&
          <div className="alert alert-warning text-center" role="alert">
            <strong>No se encontraron coincidencias</strong>
          </div>
        }
      </div>
    )
  }
}
