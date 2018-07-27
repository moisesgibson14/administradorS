import React, { Component } from 'react'
import DataBasic from '../components/dataBasic'
import ListArticles from '../components/listArticles'

export default class BookInventory extends Component {
  constructor(props){
    super(props)
  }
  render() {    
    return (
      <div>
        {
          this.props.assetsFurniture.length > 0 &&
          <ListArticles articles={this.props.assetsFurniture} />
        }         
        {!this.props.assetsFurniture.length > 0 &&
          <span className="btn btn-danger">NO HAY NADA EN INVENTARIO DE LIBRO</span>
        }  
      </div>
    )
  }
}
