import React, { Component } from 'react'
import DataBasic from '../components/dataBasic'
import ListArticlesReal from '../components/listArticlesReal'

export default class RealInventory extends Component {
  constructor(props) {
    super(props)
    this.countAssets = this.countAssets.bind(this)
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
        return { name: data, cant: matriz[data] };
      });
    }
  }
  render() {
    return (
      <div>
        {
          this.props.assetsFurniture.length > 0 &&
          <div>
            <div className="alert alert-success text-center mt-3" role="alert">
              <strong>LISTADO DE ARTICULOS</strong>
            </div>
            <ListArticlesReal articles={this.props.assetsFurniture[0].checkList} />
          </div>
        }
        {
          !this.props.assetsFurniture.length > 0 &&
          
          <div className="alert alert-warning text-center mt-3" role="alert">
            <strong><i className="fas fa-exclamation-triangle"></i>  NO EXISTE REVISIÓN</strong>
          </div>
        }
      </div>
    )
  }
}
