import React, { Component } from 'react'
import DataBasic from '../components/dataBasic'
import ListSettings from '../components/listSetting'
import $ from 'jquery'
import { firestore } from 'firebase'
import dateformat from 'dateformat'
import Cryptr from 'cryptr'
import swal from 'sweetalert'
var cryptr = new Cryptr('satesSeguro8102')
export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listArticleBook: '',
      listArticleReal: '',
      listGeneralAsset: '',
      listGeneralReportSelected: '',
      ready: false,
      value: [],
      reportsAccountant: [
        {
          noCount: '',
          cct: '',
          asset: '',
          countB: '',
          countR: '',
          discrepancy: '',
          price: '',
          charge: '',
          payment: '',
        }
      ],
      reportsTotal: '',
      reportsTot: '',
      existTotal: false,
      perfilUser: ''
    }
    this.countAssets = this.countAssets.bind(this)
    this.joinAssets = this.joinAssets.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleNewDocument = this.handleNewDocument.bind(this)
    this.saveActiveSelected = this.saveActiveSelected.bind(this)
    this.sumTotalValue = this.sumTotalValue.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.handleAddNewReport = this.handleAddNewReport.bind(this)
  }

  componentWillMount() {
    this.countAssets()

    let userLocal = JSON.parse(localStorage.getItem('atadresu'))
    let email = cryptr.decrypt(userLocal.one)
    firestore().collection('users').where('email', '==', email).onSnapshot(data => {
      data.forEach(user => {
        if (user.exists) {
          this.setState({
            perfilUser: user.data()
          })
        }
      })

    })
  }
  countAssets() {
    if (this.props.assetsFurniture.length > 0) {
      let dataAsset = this.props.assetsFurniture[0].checkList
      let numTemp = 0
      let assetsFurnitureTMP = []
      dataAsset.buildings.forEach((build, indexBuildings) => {
        build.levels.forEach((levels, indexLevels) => {
          levels.areas.forEach((areas, indexAreas) => {
            areas.assets.forEach((assets, indexAsset) => {
              assetsFurnitureTMP.push({ name: assets.name, numberAsset: assets.numberAsset })
              let numberAsset = parseInt(assets.numberAsset)
              numTemp = numTemp + numberAsset
            });
          });
        });
      });
      var matriz = {};
      assetsFurnitureTMP.forEach(function (registro) {
        var assett = registro["name"];
        matriz[assett] = matriz[assett] ? (matriz[assett] + 1) : 1;
      });
      matriz = Object.keys(matriz).map(function (data) {
        return { name: data, cant: matriz[data], type: 'real' };
      });
      this.state.listArticleBook = matriz
      this.joinAssets()
    }
  }
  joinAssets() {
    let articleBook = this.props.countAsset
    let articleReal = this.state.listArticleBook
    let generalListAsset = articleBook.concat(articleReal);
    var objectAsset = {};
    generalListAsset.forEach((registro) => {
      var assett = registro["name"];
      objectAsset[assett] = objectAsset[assett] ? (objectAsset[assett] + 1) : 1;
    });
    objectAsset = Object.keys(objectAsset).map(function (data) {
      return { label: data, value: data };
    });
    this.setState({ ready: true })
    this.state.listGeneralAsset = objectAsset
  }
  handleSelectChange(value, indexG) {
    let existValue= false
    this.state.reportsAccountant.forEach(data => {
      if (data.asset === value) {
        existValue = true
        swal("Atención!", "No se puede agregar otro asset igual", "warning");
      }
    });

    if(!existValue){
        this.state.reportsAccountant[indexG].asset = value
        this.props.refresh()
        this.handleChangeValuesReports(value, indexG)
    }
  }
  handleNewDocument() {
    let addNewReports = {
      noCount: '',
      cct: '',
      asset: '',
      countB: '',
      countR: '',
      discrepancy: '',
      price: '',
      charge: '',
      payment: '',
    }
    this.state.reportsAccountant = this.state.reportsAccountant.concat(addNewReports)
    this.props.refresh()
  }
  handleChangeValuesReports(value, indexSelected) {
    let articleBook = this.props.countAsset
    let articleReal = this.state.listArticleBook
    let generalListAsset = articleBook.concat(articleReal);
    var objectAsset = {};
    generalListAsset.forEach((registro) => {
      var assett = registro["name"];
      objectAsset[assett] = objectAsset[assett] ? (objectAsset[assett] + 1) : 1;
    });
    objectAsset = Object.keys(objectAsset).map(function (data) {
      return { name: data, promedioG: '', existBook: '', ExistReal: '', Discrepancia: '', cargo: '', abono: '' };
    });
    articleBook.forEach(book => {
      objectAsset.forEach((objectAss, index) => {
        if (book.name === objectAss.name) {
          objectAsset[index].existBook = book.cant
        }
      });
    })
    articleReal.forEach(real => {
      objectAsset.forEach((objectAs, index) => {
        if (real.name === objectAs.name) {
          objectAsset[index].ExistReal = real.cant
        }
      });
    })
    objectAsset.forEach((assetOb, index) => {
      objectAsset[index].Discrepancia = assetOb.ExistReal - assetOb.existBook
    });
    objectAsset.forEach((asset, index) => {
      let sum = 0
      let i = 0
      let total = 0.0
      this.props.assetsFurnitureConciliation.forEach((assetObj, index2) => {
        if (asset.name == assetObj.typeAsset) {
          i = i + 1
          sum = sum + assetObj.price
        }
      });
      total = sum / i
      objectAsset[index].promedioG = parseFloat(total)
    })
    objectAsset.forEach((count, indexCount) => {
      if (count.Discrepancia < 0) {
        objectAsset[indexCount].abono = count.Discrepancia * count.promedioG
      } else if (count.Discrepancia > 0) {
        objectAsset[indexCount].cargo = count.Discrepancia * count.promedioG
      } else if (count.Discrepancia == 0) {
      }
    });
    objectAsset.forEach((selected, indexCount) => {
      if (selected.name == value) {
        this.saveActiveSelected(selected, indexSelected)
      }
    });
    this.state.listGeneralReportSelected = objectAsset

  }

  saveActiveSelected(data, index) {
    if (data.existBook == 0 || data.existBook == null) {
      this.state.reportsAccountant[index].countB = '0'
    } else {
      this.state.reportsAccountant[index].countB = data.existBook
    }
    if (data.ExistReal == 0 || data.ExistReal == null) {
      this.state.reportsAccountant[index].countR = '0'
    } else {
      this.state.reportsAccountant[index].countR = data.ExistReal
    }
    if (data.Discrepancia == 0 || data.Discrepancia == null) {
      this.state.reportsAccountant[index].discrepancy = '0'
    } else {
      this.state.reportsAccountant[index].discrepancy = data.Discrepancia
    }
    if (data.promedioG == 0 || data.promedioG == null) {
      this.state.reportsAccountant[index].price = '0'
    } else {
      this.state.reportsAccountant[index].price = data.promedioG
    }
    if (data.cargo == 0 || data.cargo == null) {
      this.state.reportsAccountant[index].charge = '0'
    } else {
      this.state.reportsAccountant[index].charge = data.cargo
    }
    if (data.abono == 0 || data.abono == null) {
      this.state.reportsAccountant[index].payment = 0
    } else {
      this.state.reportsAccountant[index].payment = data.abono
      this.sumTotalValue(this.state.reportsAccountant)
    }
    this.props.refresh()
  }
  sumTotalValue(value) {
    let sum = 0
    let sum2 = 0
    value.forEach(element => {
      sum = sum + element.payment
      sum2 = sum2 + parseInt(element.charge)
    });
    this.setState({
      reportsTotal: sum,
      reportsTot: sum2,
      existTotal: true
    })
    this.props.refresh()
  }
  deleteItem(indexDelete) {
    this.state.reportsAccountant.splice(indexDelete, 1)
    if (!this.state.reportsAccountant.length > 0) {
      this.setState({
        reportsTotal: 0,
        reportsTot: 0,
        existTotal: false
      })
    } else {
      this.sumTotalValue(this.state.reportsAccountant)
    }
    this.props.refresh()
  }
  handleAddNewReport() {
    let report = {
      idAsset: this.props.assetsFurniture[0].idAsset,
      list: this.state.reportsAccountant,
      reportsPaymentTotal: this.state.reportsTotal,
      reportChargeTotal: this.state.reportsTot,
      user: this.state.perfilUser.user,
      date: new Date,
      hour: new Date(),
      avatar: this.state.perfilUser.avatar,
      email: this.state.perfilUser.email,
      profile: this.state.perfilUser.profile,
      name: this.state.perfilUser.name
    }
    firestore().collection("reportCountable").add(report).then((data) => {
      swal("Muy bien!", "Reporte guardado correctamente", "success");
      this.state.reportsAccountant = []
      let addNewReports = {
        noCount: '',
        cct: '',
        asset: '',
        countB: '',
        countR: '',
        discrepancy: '',
        price: '',
        charge: '',
        payment: '',
      }
      this.state.reportsTotal = '',
        this.state.reportsTot = '',
        this.state.existTotal = false,
        this.state.reportsAccountant = this.state.reportsAccountant.concat(addNewReports)
      this.props.refresh()
    }).catch(error => console.log(error))
  }
  render() {
    let { listGeneralAsset, ready, value, reportsAccountant, reportsTotal, reportsTot, existTotal } = this.state
    console.log(reportsAccountant);

    return (
      <div>
        {ready &&
          <div>
            <div className="alert alert-success text-center mt-3" role="alert">
              <strong>REGÍSTROS	CONTABLES PROPUESTOS</strong>
            </div>
            <ListSettings
              assetsFurniture={this.props.assetsFurniture}
              dataB={this.props.dataB}
              listGeneralAsset={listGeneralAsset}
              value={value}
              handleSelectChange={this.handleSelectChange}
              report={reportsAccountant}
              handleNewDocument={this.handleNewDocument}
              reportsTotal={reportsTotal}
              reportsTot={reportsTot}
              existTotal={existTotal}
              deleteItem={this.deleteItem}
              handleAddNewReport={this.handleAddNewReport}
            />
          </div>
        }
        {!ready &&
          <div className="alert alert-warning text-center mt-3" role="alert">
            <strong><i className="fas fa-exclamation-triangle"></i>  NO SE PUEDE REALIZAR UN AJUSTE POR FALTA DE UNA REVISIÓN O INVENTARIO EN LIBRO</strong>
          </div>
        }
      </div>
    )
  }
}
