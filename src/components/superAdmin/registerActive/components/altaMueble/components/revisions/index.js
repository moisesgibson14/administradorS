import React, { Component } from 'react';
import firebase, { firestore } from 'firebase'
import ResponsibleData from './components/responsibleData'
import LocationRevision from './components/locationUserRevision'
import UserData from './components/userData'
import Revision from './components/modelRevision'
import ModeloMueble from '../../../../modelAsset'
import QueryRevisions from './components/queryRevisions'
import DocumentationRevision from './components/documentationRevision'
import MultipleImages from './components/multipleImages'
import Reports from './components/subcomponents/'
import './components/subcomponents/checklist.css'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'
import { uploadFiles } from '../../../../../../../uploadFiles'
import swal from 'sweetalert'
import { confirmRequest } from '../../../../../../../swaIInputs'
import modelChecklist from './components/subcomponents/modelChecklist'
import modelReportConditions from './components/subcomponents/containers/modelo'
import { hashHistory, Redirect } from 'react-router'
import $ from 'jquery'
import Cryptr from 'cryptr'
import uuid from 'uuid'
import { log } from 'async';

var cryptr = new Cryptr('satesSeguro8102')

class RevisionsAssetForniture extends Component {
    constructor() {
        super()
        this.state = {
            revision: {},
            modelo: '', 
            nextRevisions: {},
            active: '',
            edit: false,
            editRevision:false,
            editChecklistRevision:false,
            editConditions:false,
            refresh: '',
            upload: true,
            percentage: 0,
            generalData:{},
            asset: {},
            statusRevision: true,
            firstDate: '',
            secondDate: '',
            editCheckList: false,
            editConditionsReports: false,
            previosInfo: 0,
            previosRevisionData: {},
            existPreviosRevision: false,
            perfilUsuer: '',
            saveRevision: false,
            existLocation : false
        }
        this.refresh = this.refresh.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeTypeRevision = this.changeTypeRevision.bind(this)
        this.changeModelRevision = this.changeModelRevision.bind(this)
        this.editRevision = this.editRevision.bind(this)
        this.editRevisionSave = this.editRevisionSave.bind(this)
        this.sumDate = this.sumDate.bind(this)
        this.deleteRevision = this.deleteRevision.bind(this)
        this.verifyDate = this.verifyDate.bind(this)
        this.changedToCheckList = this.changedToCheckList.bind(this)
        this.previosRevision = this.previosRevision.bind(this)
        this.backToAssets = this.backToAssets.bind(this)
        this.getLocationAsset = this.getLocationAsset.bind(this)
    }
    componentDidMount(){ 
        console.log(this.state);
        
        let numRevisions = 0
        let nextRevision = 0
        let idOwner = ''
        this.refresh()
        $('#enviarRevision').attr("disabled", true);
        // console.log(this.props.match.params.id);
        if (this.props.match.params.id) {
            console.log(this.state);
            
            firestore().collection('assets').doc(this.props.match.params.id).get().then(asset => {
            let revisions = asset.data()
                this.state.generalData = revisions.furniture.vehicle.administration.revisions
                this.state.asset = asset.data() 
                if(this.state.generalData.length !== 0 ){
                    this.state.previosInfo = this.state.generalData.length - 1
                    this.state.previosRevisionData = this.state.generalData[this.state.previosInfo]
                    this.state.existPreviosRevision = true
                }else{
                    this.state.previosInfo = 0
                    this.state.existPreviosRevision = false
                }                              
            })
            firestore().collection('assets').doc(this.props.match.params.id).onSnapshot(snap =>{
                if (snap.data()) {
                let numRevision = snap.data()                          
                    idOwner = numRevision.idOwner                                                                          
                    nextRevision = parseInt(numRevision.reviewDays)
                        if (nextRevision){
                            this.state.nextRevision = nextRevision                                
                        }else{
                            this.state.nextRevisions = ''
                        }                                                
                        numRevisions = Object.keys(numRevision.furniture.vehicle.administration.revisions).length         
                        Revision(data => {
                            if (numRevisions >= 0) {                                    
                                data.revisionNumber = numRevisions+1;
                                this.state.numRevisions = numRevisions+1
                            }else{                                                                     
                            }
                            let fechaActual = dateFormat(new Date, 'dd/mm/yyyy')
                            let userLocal = JSON.parse(localStorage.getItem('atadresu'))
                            let email = cryptr.decrypt(userLocal.one)                                                            
                            data.reviewDate = fechaActual
                            data.inspector = email
                            data.idCrumb = uuid.v4()
                            data.hour = dateFormat(new Date(), 'h:MM:ss')                   
                            firestore().collection('users').where('email', '==', email).onSnapshot(data => {
                                data.forEach(user => {
                                    if (user.exists) {
                                        this.setState({
                                            perfilUsuer: user.data()
                                        })
                                    }
                                })

                            })
                            firestore().collection('assets').doc(this.props.match.params.id).get().then(asset => {
                                let revisions = asset.data()
                                this.state.generalData = revisions.furniture.vehicle.administration.revisions                                                                        
                            }) 
                            setTimeout(() => {
                                    if (this.state.generalData.length > 0) {                                    
                                        this.verifyDate()
                                    } 
                                    this.setState({
                                        revision: data
                                    })                             
                                }) 
                            }, 1000);                   
                            this.previosRevision(() => {
                                this.state.revision.location = this.state.previosRevisionData.location                                
                                this.refresh()
                            }) 
                            this.getLocationAsset(() =>{
                                this.state.revision.location = this.state.asset.furniture.location
                                this.state.existLocation = true
                                this.refresh()
                                
                            }) 
                    }         
            })  
        } else {
        }
    }
    previosRevision(callback){
        setTimeout(() => {
            if (this.state.previosRevisionData.typeRevision) {
                callback(true)
            } 
        }, 100);                   
    }
    getLocationAsset(callback){
        setTimeout(() => {
            if(this.state.asset.furniture.location.CP){
                callback(true)
            }
        }, 1000);        
    }
    refresh() {
        this.setState({
            refresh: ''
        })
        console.log(this.state)
        this.validateRevision()
    }

    loading() {
        $(document).ready(function () {
            $('.loading').css({ 'display': 'block' })
        })
    }

    verifyDate(){
        this.state.statusRevision = false
        let endValue
        let s
        if(this.state.generalData.length != 0){            
            this.state.generalData.map((index) => {
                endValue = index
            })
            s = endValue.nextRevision     
            this.refresh()
        }  
        if(s.length > 0){
            let dateParts = s.split("/")
            let dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
            let nowDate = new Date()
            let now = dateFormat(new Date(nowDate), 'dd/mm/yyyy')
            let numDate = nowDate.getTime()
            let fechaA = dateObject.getTime() + (5 * 24 * 60 * 60 * 1000); let DateValid = dateFormat(new Date(fechaA), 'dd/mm/yyyy')
            let fechaB = dateObject.getTime() + (-5 * 24 * 60 * 60 * 1000); let RestDate = dateFormat(new Date(fechaB), 'dd/mm/yyyy')
            this.state.firstDate = RestDate;
            this.state.secondDate = DateValid
            // console.log('now:', now , 'dateValid:', DateValid , 's:' , s, 'rest date:', RestDate);
            
            if (now <= DateValid && now >= s || now >= RestDate && now <= s) {
                this.state.statusRevision = true;
                this.refresh()
            } else {
                this.state.statusRevision =false ;
                this.refresh()
            }
        }else{
            // console.log('es revision extra la ultima');
            this.refresh()
            
        }       
    }

    sumDate(dias){
        let a = new Date()
        let sumar = (dias) * 24 * 60 * 60 * 1000;
        let fechacontresdiasmas = a.getTime() + ((dias) * 24 * 60 * 60 * 1000);
        let newDate = dateFormat(new Date(fechacontresdiasmas), 'dd/mm/yyyy')
        this.state.revision.nextRevision = newDate
        this.refresh()        
    }

    handleChange(e) {
        if (e.target.files.length > 0) {
            this.setState({ upload: false })
            uploadFiles(e, (data) => {
                this.setState({ upload: false })
                if(this.state.revision.typePerson === 'Moral'){
                    this.state.revision.moralPersonPhoto = data[0]
                }else{
                    this.state.revision.governmentPhoto = data[0]
                }
                this.setState({ upload: true })
                this.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })
            }, 'imagesRevisionsFurniture')
        }
    }

    changeTypeRevision(option) {
        let daysRevision= 0
        daysRevision = parseInt(this.state.nextRevision) 
        if(this.state.revision.typeRevision == null){
            if (option == 1 && this.state.statusRevision == true){
                this.state.revision.typeRevision = 'Revisión programada'
                this.sumDate(daysRevision)
            } else if (option == 1 && this.state.statusRevision == false){
                swal("Aviso!", "No puedes crear una revisión programada porque la fecha debe estar entre este rango de ( "+ this.state.firstDate+" - "+ this.state.secondDate +" ), porque la fecha actual no esta en el rango de revisión", "warning");              
            }      
            if (option == 2) {
                 this.state.revision.typeRevision = 'Revisión'
                 this.sumDate(daysRevision)
            }       
            if (option == 3) { this.state.revision.typeRevision = 'Consulta' }       
        }else{
            confirmRequest('¿Estas seguro de cambiar de pestaña?', 'Se perderan todos los cambios', (ok) => {
                if (ok) {                    
                    if (option == 1 && this.state.statusRevision == true) {                                              
                        this.changeModelRevision()
                        this.state.revision.typeRevision = 'Revisión programada' 
                        this.sumDate(daysRevision)
                        this.state.editRevision = false
                        this.refresh()
                    } else if (option == 1 && this.state.statusRevision == false){
                        swal("Aviso!", "No puedes crear una revisión programada porque la fecha debe estar entre este rango de ( " + this.state.firstDate + " - " + this.state.secondDate + " ), porque la fecha actual no esta en el rango de revisión", "warning");                                     
                    }
                    if (option == 2) {                         
                        this.changeModelRevision()
                        this.state.revision.typeRevision = 'Revisión'
                        this.state.editRevision = false
                        this.refresh() }
                    if (option == 3) {                         
                        this.state.revision.typeRevision = 'Consulta'
                        this.state.editRevision = false
                        this.refresh()
                    }  
                }                
            })
        }
    }
    changeModelRevision(){
        let daysRevision = 0
        daysRevision = parseInt(this.state.nextRevision)
        Revision(data => {
                data.revisionNumber = this.state.numRevisions;
                let fechaActual = dateFormat(new Date, 'dd/mm/yyyy')
                let userLocal = JSON.parse(localStorage.getItem('atadresu'))
                let email = cryptr.decrypt(userLocal.one)
                data.reviewDate = fechaActual
                data.inspector = email
                data.idCrumb = uuid.v4()
                data.hour = dateFormat(new Date(), 'h:MM:ss')
                this.sumDate(daysRevision)
                firestore().collection('assets').doc(this.props.match.params.id).get().then(asset => {
                    let revisions = asset.data()
                    this.state.generalData = revisions.furniture.vehicle.administration.revisions
                })
                this.setState({
                    revision: data
                })
            })
    }

    handleSubmit(e) {
        e.preventDefault()
        $("button[name='submit']").attr("disabled", true);
        this.state.revision.endReviewDate = dateFormat(new Date, 'dd/mm/yyyy')
        this.state.revision.endReviewHour = dateFormat(new Date(), 'h:MM:ss')
        this.refresh()
        var hora2 = this.state.revision.hour.split(":"),
            hora1 = this.state.revision.endReviewHour.split(":"),
            t1 = new Date(),
            t2 = new Date();
        t1.setHours(hora1[0], hora1[1], hora1[2]);
        t2.setHours(hora2[0], hora2[1], hora2[2]);
        t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
        let resultHour = "" + (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? " " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : "");
        this.state.revision.reviewTime = resultHour
        if (this.state.revision.checklist.length === 0){
            modelChecklist(data => {
                let check = {
                    modelo: data
                } 
                this.state.revision.checklist = this.state.revision.checklist.concat(check)
            })
        }
        // if(this.state.revision.conditionsReports.length === 0){
        //     modelReportConditions(data =>{
        //         let report = {
        //             modelo:data
        //         }
        //         this.state.revision.conditionsReports = this.state.revision.conditionsReports.concat(report)
        //     })
        // }
        if (this.state.edit) {
            firestore().collection('assets').doc(this.props.match.params.id).get().then(asset => {
                if (asset.data()) {
                    let revisions = asset.data()
                    revisions.furniture.vehicle.administration.revisions = revisions.furniture.vehicle.administration.revisions.concat(this.state.revision)
                    firestore().collection('assets').doc(this.props.match.params.id).update(revisions).then(() => {
                        this.refresh()
                        let daysRevision = 0
                        daysRevision = parseInt(this.state.nextRevision)
                        this.sumDate(daysRevision)                                         
                        swal("Muy bien!", "La información se guardó correctamente", "success", {
                            timer: 2000,
                        });
                        return hashHistory.push('/assets')   
                    }).catch(err => swal("revisión", "No se guardo correctamente", "error"))

                }
            })
        }
    }

    editRevision(idCrumb){     
        this.state.generalData.map((revision,index) =>{
            if(revision.idCrumb === idCrumb){
                this.setState({
                    revision: revision,
                    editRevision:true,
                    editChecklistRevision:true,
                    editConditions:true
                })
                this.refresh()
            }
        })
    }
    handleDeleteImg() {
        confirmRequest('¿Estas seguro?', 'Se eliminara la foto', (value) => {
            if (value) {
                this.state.revision.moralPersonPhoto = ''
                this.refresh()
            }
        })
    } 

    deleteRevision(keyRevisions){
         confirmRequest('¿Estas seguro de eliminar?', 'Se borrará definitivamente', (ok) => {              
            if (ok) {
                this.state.generalData.splice(keyRevisions,1)
                this.state.asset.furniture.vehicle.administration.revisions = this.state.generalData
                this.refresh()
                
                firestore().collection('assets').doc(this.props.match.params.id).set(this.state.asset).then(()=>{  
                    this.state.revision.typeRevision = 'Consulta'
                }).catch(error => console.log('Error al actualizar', error))
            }
        })        
    }

    editRevisionSave(id){
        $("button[name='submit']").attr("disabled", true);
        this.state.revision.endReviewDate = dateFormat(new Date, 'dd/mm/yyyy')
        this.state.revision.endReviewHour = dateFormat(new Date(), 'h:MM TT')
        firestore().collection('assets').doc(this.props.match.params.id).get().then(asset => {
            if (asset.data()) {                            
                let revisions = asset.data()
                revisions.furniture.vehicle.administration.revisions.map( (revision, index) =>{
                    if(revision.idCrumb === id){
                        revisions.furniture.vehicle.administration.revisions[index]= this.state.revision
                    }
                })                
                firestore().collection('assets').doc(this.props.match.params.id).update(revisions).then(() => {
                    this.changeModelRevision(); 
                    swal("Muy bien!", "La información se actualizó correctamente", "success", {
                        timer: 2000,
                    }); 
                    this.state.revision.typeRevision = 'Consulta'                  
                    this.refresh()
                }).catch(err => swal("revisión", "No se guardo correctamente", "error"))
            }
        })
    }

    changedToCheckList(option){        
        if(option == 1){
            this.state.editCheckList = true
            this.refresh()            
        }else if(option == 2){
            this.editCheckList = false
        }else if(option == 3){ 
            this.state.revision.typeRevision = 'Revisión' 
            this.state.editCheckList = false
            this.state.editConditionsReports = false
            this.refresh()
        }else if(option == 4){
            this.state.editConditions = true
            this.state.editConditionsReports = true
            this.refresh()  
        } else if(option == 5){
            console.log('select');
            this.state.editConditionsReports = true
            this.refresh()  
        }               
    }

    validateRevision(){
        setTimeout(() => {
            let revision = this.state
            if (revision.revision.checklist) {
                if (revision.revision.location.CP && revision.revision.location.colony && revision.revision.location.street && revision.revision.location.municipality) {
                    this.setState({
                        saveRevision: true
                    })
                } else {
                    this.setState({
                        saveRevision: false
                    })
                }
            }
        }, 800);        
    }
    backToAssets() {
        confirmRequest('¿Estas seguro de regresar?', 'Se perderan los cambios ', (ok) => {
            if (ok) {
                this.props.history.push('/assets');
            }
        })
    }

    render() {
        let active = this.state
        let revisionData = this.state.revision.furniture;
        if (active === '') return <h5>Cargando...</h5>
        if (active.revision === '') return <h5>Cargando...</h5>
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header text-center">
                        <strong> REVISIÓN </strong>
                    </div>                   
                    <div className="card-body">
                    {this.state.editCheckList == false && this.state.editConditionsReports == false &&
                        <div className="row text-center">
                            <div className="col-md-12 text-center">
                                <label><strong> SELECCIONA EL TIPO DE REVISIÓN </strong></label>
                            </div>
                            <div className="col-12 text-center">
                                <form action="" className="formulario row">                                       
                                    <div className="col-sm-6 col-md-4">
                                        <div className="radio">
                                            <input type="radio" name="typeRevision" id="aleatoria" checked={this.state.revision.typeRevision === 'Revisión'} onChange={() => { this.changeTypeRevision(2), this.refresh(), this.state.edit = true, this.state.revision.extraRevision = true }} />
                                            <label htmlFor="aleatoria"><i className="fas fa-bolt"></i> Revisión </label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4">
                                        <div className="radio">
                                            <input type="radio" name="typeRevision" id="programada" checked={this.state.revision.typeRevision === 'Revisión programada'} onChange={() => { this.changeTypeRevision(1), this.state.edit = true, this.state.revision.extraRevision = false }} />
                                            <label htmlFor="programada"><i className="fas fa-clock"></i> Revisión programada </label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4">
                                        <div className="radio">
                                            <input type="radio" name="typeRevision" id="consulta" checked={this.state.revision.typeRevision === 'Consulta'} onChange={() => { this.changeTypeRevision(3), this.refresh(), this.state.edit = true }} />
                                            <label htmlFor="consulta"><i className="fas fa-clipboard"></i> Consulta </label>
                                        </div>
                                    </div>
                                </form>  
                            </div>                          
                        </div>
                    }
                        {this.state.edit === true && this.state.revision.typeRevision !== 'Consulta' && this.state.editCheckList == false && this.state.editConditionsReports == false &&
                            <div className="row" >
                                <div className="col-lg-2 col-md-6 col-sm-6">
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon1">Revisión #</span>
                                        <input type="text" className="form-control" aria-label="numRevision" value={this.state.revision.revisionNumber} readOnly />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon1">Fecha</span>
                                        <input type="text" className="form-control" value={this.state.revision.reviewDate} readOnly />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon1">Hora</span>
                                        <input type="text" className="form-control" aria-label="Hora" value={this.state.revision.hour} readOnly />
                                    </div>
                                </div>
                                {this.state.revision.typeRevision !== 'Revisión' &&
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
                                        <div className="input-group">
                                            <span className="input-group-addon" id="basic-addon1">Proxima revisión</span>
                                    <input type="text" className="form-control" aria-label="proximaRevision" value={this.state.revision.nextRevision} readOnly />
                                        </div>
                                    </div>
                                }
                                {this.state.revision.typeRevision !== 'Revisión' &&
                                    <div className="col-md-4 mt-3 ">
                                        <div className="input-group">
                                            <span className="input-group-addon" id="basic-addon1">Id QR</span>
                                            <input type="text" maxLength="6" className="form-control" aria-label="proximaRevision"
                                                value={this.state.revision.idQR} onChange={(e) => {
                                                    this.state.revision.idQR = e.target.value, this.refresh()
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                                <div className="col-12">
                                    <div className="alert alert-dark textCenter mt-3 ">
                                        <strong> UBICACIÓN</strong> <span className="fas fa-location-arrow"></span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <br />
                                <LocationRevision data={this.state.revision} refresh={this.refresh} edit={this.state.editRevision} location={this.state.existLocation} />
                                </div>
                                <div className="col-md-3 mt-3">
                                    <span className="mr-2" > <strong> Activo en uso </strong></span>
                                    <label className="switch switch-text switch-pill switch-primary-outline">
                                        <input type="checkbox" className="switch-input"
                                            value={this.state.revision.activeInUse}
                                            onChange={(e) => {
                                                this.state.revision.activeInUse = e.target.checked, this.refresh()
                                            }}
                                        />
                                        <span className="switch-label" data-on="On" data-off="Off"></span>
                                        <span className="switch-handle"></span>
                                    </label>
                                    {/* <span><small>Al activar este botón, se podrá cargar datos del esponsable y del Usuario</small></span> */}
                                </div>
                                    <div className="col-12">
                                            <div className="alert alert-dark textCenter mt-3 ">
                                                <strong> DATOS DEL RESPONSABLE</strong>
                                            </div>
                                            <div className="col-12 pl-0">
                                                <div className="col-md-6 mt-3 ">
                                                    <div className="input-group">
                                                        <span className="input-group-addon" id="basic-addon1">Regimen Fiscal</span>
                                                        <select name="" className="form-control" id="" value={this.state.revision.typePerson} onChange={(e) => { this.state.revision.typePerson = e.target.value, this.refresh() }} >
                                                            <option value="null" name="owner" >Seleccionar</option>
                                                            <option value="Fisica">Física</option>
                                                            <option value="Moral">Moral</option>
                                                            <option value="Gobierno">Gobierno</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                        {this.state.revision.typePerson === 'Fisica' &&
                                            <div className="col-12">
                                                <br />
                                                <ResponsibleData data={this.state.revision} refresh={this.refresh} />
                                            </div>
                                        }                                       
                                            <div>
                                             {
                                                this.state.revision.typePerson === 'Moral' &&
                                                    <div className="col-md-12">
                                                        <br />
                                                        <div className="input-group mb-2 mb-sm-0">
                                                            <div className="input-group-addon">Nombre de la Entidad</div>
                                                            <input
                                                                value={this.state.revision.moralPersonValue} onChange={(e) => { this.state.revision.moralPersonValue = e.target.value.toUpperCase(), this.refresh(), this.state.revision.moralPerson = true }}
                                                                type="text"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                             }
                                            {
                                                this.state.revision.typePerson === 'Gobierno' &&
                                                <div className="col-md-12">
                                                    <br />
                                                    <div className="input-group mb-2 mb-sm-0">
                                                        <div className="input-group-addon">Nombre de la Entidad</div>
                                                        <input
                                                            value={this.state.revision.governmentValue} onChange={(e) => { this.state.revision.governmentValue = e.target.value.toUpperCase(), this.refresh(), this.state.revision.moralPerson = true }}
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>   
                                            }
                                                <br />
                                                {this.state.revision.typePerson === 'Moral'  &&
                                                <div className="col-md-12" > 
                                                <br />                                           
                                                    <div className="input-group mb-2 mb-sm-0">
                                                            <div className="input-group-addon" style={{ cursor: 'pointer', height: '35px' }} >Logo</div>
                                                            <label
                                                                style={{ cursor: 'pointer', height: '33px' }} htmlFor="moralPerson" className="mt-1 ml-1 mr-1 btn btn-primary">
                                                            <i className="fas fa-upload" aria-hidden="true"></i>
                                                            </label>
                                                            <input id="moralPerson" style={{ display: 'none' }} capture="camera" accept="image/*" type="file" className="form-control" onChange={this.handleChange} name="taxBill" />

                                                            {
                                                                this.state.revision.moralPersonPhoto !== "" &&
                                                                <div>
                                                                <a style={{ height: '33px' }} className="btn btn-secondary mr-1 mt-1" data-fancybox={'fancyMoralPerson'}  data-src={this.state.revision['moralPersonPhoto']} href="javascript:;">
                                                                        <i className="fas fa-eye fa-1x" />
                                                                    </a>
                                                                <button style={{ height: '33px' }} onClick={() => this.handleDeleteImg()} type="button" className="mt-1 btn btn-danger" >
                                                                        <i className="icon-close fa-1x" />
                                                                </button>
                                                                </div>
                                                            }                                                    
                                                    </div>
                                                    {                                                        
                                                        this.state.upload === false &&
                                                        <div className="progress">                                                       
                                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                            {this.state.revision.typePerson === 'Gobierno' &&
                                                <div className="col-md-12" >
                                                    <br />
                                                    <div className="input-group mb-2 mb-sm-0">
                                                        <div className="input-group-addon" style={{ cursor: 'pointer', height: '35px' }} >Logo</div>
                                                        <label
                                                            style={{ cursor: 'pointer', height: '33px' }} htmlFor="gobierno" className="mt-1 ml-1 mr-1 btn btn-primary">
                                                            <i className="fas fa-upload" aria-hidden="true"></i>
                                                        </label>
                                                        <input id="gobierno" style={{ display: 'none' }} capture="camera" accept="image/*" type="file" className="form-control" onChange={this.handleChange} name="taxBill" />

                                                        {
                                                            this.state.revision.governmentPhoto !== "" &&
                                                            <div>
                                                            <a style={{ height: '33px' }} className="btn btn-secondary mr-1 mt-1" data-fancybox={'fancyGobierno'} data-src={this.state.revision['governmentPhoto']} href="javascript:;">
                                                                    <i className="fas fa-eye fa-1x" />
                                                                </a>
                                                                <button style={{ height: '33px' }} onClick={() => this.handleDeleteImg()} type="button" className="mt-1 btn btn-danger" >
                                                                    <i className="icon-close fa-1x" />
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                    {
                                                        this.state.upload === false &&
                                                        <div className="progress">
                                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                            </div>
                                        
                                    {this.state.revision.activeInUse &&
                                    <div>
                                        <div className="col-12">
                                            <div className="alert alert-dark textCenter mt-3 ">
                                                <strong> DATOS DE USUARIO</strong>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <br />
                                            <UserData data={this.state.revision} refresh={this.refresh} />
                                        </div>
                                    </div>
                                    }
                                    </div>
                                <hr/>
                                <div className="col-12 text-center">
                                    <div className="row">
                                        {/* <div className="alert alert-dark textCenter col-12 ">
                                            <strong>IMÁGENES</strong>
                                        </div> */}
                                        <div className="col-md-12 col-12">
                                            <MultipleImages data={this.state.revision} refresh={this.refresh} />
                                        </div> 
                                        {/* <div className="alert alert-dark textCenter col-12 ">
                                            <strong> DOCUMENTACIÓN</strong>
                                        </div>                                 */}
                                        <div className="col-md-12 col-12">
                                            <DocumentationRevision data={this.state.revision} refresh={this.refresh} />
                                        </div>                                                                                                                 
                                    </div>
                                    <br/>
                                </div>                                
                            </div>
                        }
                        {this.state.edit === true && this.state.revision.typeRevision !== 'Consulta'  &&
                        <div className="container-fluid">
                            <Reports
                                data={this.state}                            
                                editCheckList = {this.state.editCheckList}
                                refresh={this.refresh}
                                changedToCheckList={this.changedToCheckList}
                            />
                        </div>
                        }
                        <br/>
                        
                        {this.state.edit === true && this.state.revision.typeRevision !== 'Consulta' && this.state.editCheckList == false && this.state.editConditionsReports == false &&                            
                            <div className="row text-center mb-3">
                                <div className="col-12 text-center">
                                    <small>Nota: Las etiquetas marcadas con " * " son obligatorias para completar el alta de revisión</small>
                                </div>
                                <br />
                                <br /> <br/>
                                <div className="col col-md-6 mb-3">
                                    {/* <Link to="/assets"> */}
                                    <button type="button" className="btn btn-danger btn-block" onClick={(e) => this.backToAssets()}><i className="fas fa-chevron-circle-left"></i>  Cancelar revisión</button>
                                    {/* </Link> */}
                                </div>
                                {!this.state.editRevision &&
                                    <div className="col col-md-6">
                                        <button type="submit" name="submit" disabled={!this.state.saveRevision} className="btn btn-success  btn-block" onClick={(e) => this.handleSubmit(e)}>
                                        <i className="fas fa-save"></i> Guardar revisión
                                        </button>
                                    </div>
                                }
                                {this.state.editRevision &&
                                    <div className="col col-md-6">
                                        <button type="submit" name="submit" disabled={!this.state.saveRevision} className="btn btn-success  btn-block" onClick={(e) => this.editRevisionSave(this.state.revision.idCrumb)}>
                                        <i className="fas fa-save"></i> Actualizar
                                        </button>
                                    </div>
                                }
                            </div>
                        }

                        <div>
                            {this.state.revision.typeRevision == "Consulta" &&
                                <QueryRevisions 
                                data={this.state.generalData} 
                                refresh={this.refresh} 
                                editRevision = {this.editRevision}
                                deleteRevision = {this.deleteRevision}
                                changeTypeRevision={this.changeTypeRevision}
                                />   
                            }                    
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default RevisionsAssetForniture;