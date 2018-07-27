import React, { Component } from 'react'
import ModelVenta from './modeloVentaDirecta'
import DirectSale from './components/directSale'
import Lotificacion from './components/lotification'

export default class directSale extends Component {
    constructor(props){
        super(props)
        this.state = {
            modelo:{},
            ready:false
        }
        this.refresh = this.refresh.bind(this)
        this.loading = this.loading.bind(this)
    }
    componentDidMount() {
        this.loading(true) 
        ModelVenta(data => {
            this.setState({
                modelo: data
            })   
            this.refresh()
            this.state.ready = true
        }); 

        this.loading(false) 
    }
    refresh(){
        this.setState({
            refresh: '',
        })  
        this.props.refresh()
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

  render() {
    let modelo = this.props.active.furniture.vehicle.directSale  
    let active = this.props.active
    if (this.state.ready === false) return<div className="col-md-12 text-center"><h5>Cargando....</h5></div>
    return (
      <div className="col-md-12">
        <div className="alert alert-dark text-center mt-3" role="alert">
            <strong>VENTA DIRECTA</strong>
        </div>
        <DirectSale data={modelo} refresh={this.refresh} />
        <div className="alert alert-dark text-center mt-3" role="alert">
            <strong>LOTIFICACIÓN</strong>
        </div>
        <div>
            <Lotificacion data={modelo} refresh={this.refresh} furniture={active} />
        </div>
      </div>
    )
  }
}
