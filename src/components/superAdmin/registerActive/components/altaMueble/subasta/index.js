import React, { Component } from 'react'
import modelSubasta from './modeloSubasta'
import AltaSubasta from './components/subasta'
import EventDate from './components/eventDate'
import Lotificacion from './components/lotification'
import firebase, { firestore } from 'firebase'
import { lastDayOfMonth } from 'date-fns';
import dbDos from '../../../../../../secondDB';

export default class Subasta extends Component {
    constructor(props){
        super(props)
        this.state={
            modelo:{},
            ready:false,
            events:[],
            warranty:[],
            eventSelected:[],
            lotAvailable: false
        }
        this.refresh = this.refresh.bind(this)
        this.loading = this.loading.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.selectWarrantyColor = this.selectWarrantyColor.bind(this)

    }
    componentDidMount() {
        this.loading(true) 
        var db = firestore()
        var doc = dbDos.firestore().collection("events").onSnapshot((modelEvents) => {
            this.state.events = []
            modelEvents.forEach((doc) => {
                    console.log(doc.data())
                    this.state.events.push({...doc.data(),id:doc.id} )
            });
            console.log(this.state.events);
            
            this.loading(false) 
            this.state.ready = true
            this.refresh()
        });

        modelSubasta(data => {
            this.setState({
                modelo: data
            })   
            this.refresh()
        }); 
    }
    refresh(){
        this.setState({
            refresh: '',
        })       
        this.props.refresh()   
        // console.log(this.state);
        // console.log(this.props);
        
    }
    selectWarrantyColor(data){
        console.log(data);
        if(data){
            this.props.warranty.forEach((warranty)=>{
                if(warranty.title == data){
                    this.props.active.furniture.vehicle.Subasta.warrantyColor.value = warranty.title
                    this.props.active.furniture.vehicle.Subasta.warrantyColor.code = warranty.color
                    this.props.active.furniture.vehicle.Subasta.warrantyColor.points = warranty.points
                    this.refresh()
                    this.props.refresh()
                }
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
    openModal() {
        var modal = document.querySelector('#modal2'),
          cerrar = document.querySelector('#close'),
          bg = document.querySelector('.mask');
    
        modal.classList.toggle('tes-modal-active');
        bg.classList.toggle('modal-bg')
      }
    closeModal(index) {
        var modal = document.querySelector('#modal2'),
          bg = document.querySelector('.mask');
        modal.classList.remove('tes-modal-active');
        bg.classList.toggle('modal-bg')
      }
    
  render() {
    let modelo = this.props.active.furniture.vehicle.Subasta
    let active = this.props.active
    let event = this.state.events    
    let statusMessage = this.props.lotAvailable
    if (this.state.ready === false) return<div className="col-md-12 text-center"><h5>Cargando....</h5></div>
    return (
      <div className="subastaSec">
        <h3 className="subtitle-ind">SUBASTA</h3>
        <div>
            <AltaSubasta data={modelo} refresh={this.refresh}  />
        </div>
            <h3 className="subtitle-ind">DATOS DEL EVENTO</h3>
        <div>
            <EventDate data={modelo}  event={event} refresh={this.refresh} openModal={this.openModal} closeModal={this.closeModal} numberEvent={this.props.numberEvent} />
        </div>
        <h3 className="subtitle-ind">LOTIFICACIÓN</h3>
        <div>
            <Lotificacion lotAvailable={statusMessage} numberLot={this.props.numberLot} data={modelo} warranty={this.props.warranty} furniture={active} refresh={this.refresh} selectWarrantyColor={this.selectWarrantyColor} />
        </div>
      </div>
    )
  }
}
