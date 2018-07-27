import React, { Component } from 'react'
import forBuildings from './functionsSearchs'
import algoliasearch from 'algoliasearch'
const client = algoliasearch('MIUXU5PG2H', '536306ed1e8d981d2f02e70c444f35a0');
const index = client.initIndex("revisionsStates")
import DataGeneral from '../components/dataGeneral'
import Levels from '../components/levels'
import Areas from '../components/areas'
import Assets from '../components/assets'
import Buildings from '../components/buildings'
import AssetsViewPhotos from '../components/AssetsViewPhotos'

export class ViewAsset extends Component {

  constructor(props) {
    super(props)

    this.state = {
      asset: {},
      id: '',
      ready:false
    }

    this.tableAsset = this.tableAsset.bind(this)
    this.typeAssets = this.typeAssets.bind(this)
  }

  componentDidMount() {

    index.search({ query: this.props.match.params.id, hitsPerPage: 1 }).then(responses => {
      let assetT = {}
      responses.hits.map(hit => {
        assetT = hit;
      })

      if (assetT) {
        this.setState({
          id: this.props.match.params.id
        })

        forBuildings(assetT, this.state.id).then(active =>{
          console.log(active)
          this.setState({
            asset: active,
            ready:true
          })
        })
      }
    })

  }

  typeAssets() {
    let typeAsset = '';

    if(this.state.asset.RealEstateAssets) {
      typeAsset = 'Nivel'
    } else if (this.state.asset.assets) {
      typeAsset = 'Área'
    } else if (this.state.asset.numberAsset) {
      typeAsset = 'Activo'
    } else if (this.state.asset.surfaceOfBuilding) {
      typeAsset = 'Construcción'
    }

    return typeAsset
  }

  tableAsset() {
      $('.downTable').toggleClass('activeShow')
      $('.tableWrap').slideToggle()
  }

render() {
   let { asset,ready } = this.state
   if(!ready) return(
      <div><h3>No se encontró el activo</h3></div>
   )    
   return (
      <div className="viewAsset">
         <div className="headerSections flex-sates">
            <h2>{asset.name}</h2>
         </div>

         <figure className="viewAssetImage">
            <img src={(asset.conditions.photosUrl.length === 0) 
              ? 'https://images.autouncle.com/it/car_images/5af34a90-a533-4f63-b242-3b2c0bf8aa25_jaguar-mk-ii-2-4-d-epoca-del-1962-a-viadana.jpg' 
              : asset.conditions.photosUrl[0] } alt=""/>

              <figcaption>Tipo: {this.typeAssets()}</figcaption>
          </figure>

         <div className="wrapper">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
               <li className="nav-item">
                  <a className="nav-link active" 
                     id="infoAsset-tab" 
                     data-toggle="tab" 
                     href="#infoAsset" 
                     role="tab" 
                     aria-controls="infoAsset" 
                     aria-selected="true">Detalles</a>
               </li>
               <li className="nav-item">
                  <a className="nav-link" 
                     id="photosAsset-tab" 
                     data-toggle="tab" 
                     href="#photosAsset" 
                     role="tab" 
                     aria-controls="photosAsset" 
                     aria-selected="false">Fotos</a>
               </li>
            </ul>

            <div className="tab-content" id="myTabContent">
               <div className="tab-pane fade show active" id="infoAsset" role="tabpanel" aria-labelledby="infoAsset-tab">
                  <DataGeneral asset = {this.state.asset} />

                  { asset.RealEstateAssets && <Levels asset = {this.state.asset} tableAsset = {this.tableAsset}/> }
                  { asset.assets && <Areas asset = {this.state.asset} tableAsset = {this.tableAsset} /> }
                  { asset.numberAsset && <Assets asset = {this.state.asset} /> }
                  { asset.surfaceOfBuilding && <Buildings  asset = {this.state.asset} /> }
               </div>

               <div className="tab-pane fade" id="photosAsset" role="tabpanel" aria-labelledby="photosAsset-tab">
                  <AssetsViewPhotos asset = {this.state.asset} />
               </div>
         </div>
      </div>
   </div>
   )
  }
}

export default ViewAsset
