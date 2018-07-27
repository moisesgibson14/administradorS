import React, { Component } from 'react'
import DataBasic from '../components/dataBasic'
import ListArticesConciliation from '../components/listArticlesConcialition'

export default class Conciliattion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listArticleBook: '',
      listArticleReal: '',
      listGeneralAsset: ''
    }
    this.countAssets = this.countAssets.bind(this)
    this.joinAssets = this.joinAssets.bind(this)
  }
  componentWillMount() {
    this.countAssets()
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

    this.state.listGeneralAsset = objectAsset
  }
  render() {
    let { listGeneralAsset } = this.state
    return (
      <div>
        
        {listGeneralAsset.length > 0 &&
          <ListArticesConciliation listGeneralAsset={listGeneralAsset} />
        }
        {listGeneralAsset.length == 0 &&
          <div className="alert alert-warning text-center mt-3" role="alert">
            <strong><i className="fas fa-exclamation-triangle"></i>  ES PROBABLE QUE NO EXISTA UNA REVISIÓN FISICA O INVENTARIO EN LIBROS</strong>
          </div>
        }
      </div>
    )
  }
}
