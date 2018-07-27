import React, { Component } from 'react';
import { InputText, confirmRequest } from '../../../../../../../../../swaIInputs'
import DateBasicReports from './containers/dateBasicReports'
import OwnerDate from './containers/ownerDate'
import DateVehicle from './containers/dateVehicle'
import DamageVehicle from './containers/damageVehicle'
import GeneralConditions from './containers/generalConditions'
import Model from  './containers/modelo'
import dateFormat from 'dateformat'
import axios from 'axios'

export default class ConditionsReports extends Component {
    constructor(props){
        super(props)
        this.state = {
            modelo: {},
            ready:false,
            Catalogue:[
                'LEVE',
                'MEDIO',
                'FUERTE',
                'SUSTITUCIÓN',
                'SUJETO A REVISIÓN'
            ],
            refresh:'',
            totalCost:0
        }
        this.backToRevision = this.backToRevision.bind(this)
        this.assignValuesVehicle = this.assignValuesVehicle.bind(this)
        this.assignValues = this.assignValues.bind(this)
        this.refresh = this.refresh.bind(this)
        this.totalDamage = this.totalDamage.bind(this)
        this.handleSaveReport = this.handleSaveReport.bind(this)
        this.getModelData = this.getModelData.bind(this)
    }
    componentDidMount() {
        this.loading(true) 
        Model(data => {
            this.setState({
                modelo: data,
            })      
        })    
       
        if (this.props.data.data.editConditions === true && this.props.data.data.revision.conditionsReports.length > 0) {
            console.log('ENTRO porqiue existe la opción de editar y en una revision existe');
            
            this.setState({
                modelo: this.props.data.data.revision.conditionsReports[0].modelo
            })
            this.state.ready = true;
            this.loading(false)
            this.state.totalCost = 'Calculando...' 
            setTimeout(() => {
                function formatNumber(num) {
                    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                }
                let total = parseFloat(this.state.modelo.totalCost)
                let numero 
                if(total){
                    numero = formatNumber(total)
                }else{
                    numero = 0
                }
                this.setState({
                    totalCost: numero,
                })     
            }, 2000);
        } else {
            console.log('entro porque es nuevo ');
            
        this.assignValues(() => {
            let infoBasic = this.props.data.data.revision
            let ownerDate = this.props.data.data.asset
            let dateVehicle = this.props.data.data.asset
            let dateChecklist = this.props.data.data.revision.checklist            
            //DATOS DE INGRESO
            this.state.modelo.reviewDate = dateFormat(new Date, 'dd/mm/yyyy')
            this.state.modelo.hour = dateFormat(new Date(), 'h:MM:ss')   
            this.state.modelo.location = infoBasic.location.country
            //DATOS OWNER
            this.state.modelo.idOwner = ownerDate.idOwner
            this.state.modelo.Owner = ownerDate.socialReason            
            //DATOS VEHICLE
            this.state.modelo.vehicle.typeVehicle = dateVehicle.typeOfAsset
            this.state.modelo.vehicle.year = dateVehicle.furniture.vehicle.year

            this.state.modelo.vehicle.brand = 'Cargando...'
            this.state.modelo.vehicle.model = 'Cargando...'
            this.state.modelo.vehicle.version = 'Cargando...'
            setTimeout(() => {
                this.getModelData(() => {
                    // data[0].childrens[11].value = this.state.brand
                    // data[0].childrens[13].value = this.state.model
                    // data[0].childrens[15].value = this.state.version
                    this.state.modelo.vehicle.brand = this.state.modelo.vehicle.brand
                    this.state.modelo.vehicle.model = this.state.modelo.vehicle.model
                    this.state.modelo.vehicle.version = this.state.modelo.vehicle.version
                    this.refresh()
                 });     
             }, 2000);


            this.state.modelo.mainPhoto = dateVehicle.mainPhoto
            this.state.modelo.vehicle.serialNumber = dateVehicle.furniture.vehicle.serialNumber
            this.state.modelo.vehicle.engineNumber = dateVehicle.furniture.vehicle.engineNumber
            this.state.modelo.vehicle.idActive = dateVehicle.idSates

            dateChecklist.forEach((check,indexCheck) => {
                this.state.modelo.vehicle.color = check.modelo[0].childrens[8].value
                this.state.modelo.vehicle.odometer = check.modelo[0].childrens[10].value       

                this.state.modelo.location = check.modelo[0].childrens[2].value
                this.state.modelo.OneArea = check.modelo[0].childrens[5].value
                this.state.modelo.TwoArea = check.modelo[0].childrens[6].value

                check.modelo.forEach((childrens,indexModelo) => {
                    childrens.childrens.forEach((element,indexChildrens) => {
                        if (element.damage === true){
                            this.assignValuesVehicle(indexCheck, indexModelo,indexChildrens)
                            this.refresh()
                        }
                    });
                    
                });
            });                     

            this.state.ready = true;
            this.loading(false)
            this.refresh()
        });
        }         
    }
    getModelData(callback){
        let vehicle = this.state.modelo.vehicle
        axios.get('https://catalogo-ebc.herokuapp.com/brand/' + vehicle.year).then((response) => {
            response.data.brand.forEach(brand => {
                if (brand.Clave === vehicle.brand) {
                    this.state.modelo.vehicle.brand = brand.Nombre
                }
            });
            let dataModels = {
                year: vehicle.year,
                brand: vehicle.brand
            }
            axios.post('https://catalogo-ebc.herokuapp.com/model/', dataModels).then(response => {
                response.data.model.forEach(model => {
                    if (model.Clave === vehicle.model) {
                        this.state.modelo.vehicle.model = model.Nombre

                    }
                });
                let dataVersion = {
                    year: vehicle.year,
                    brand: vehicle.brand,
                    model: vehicle.model
                }
                axios.post('https://catalogo-ebc.herokuapp.com/version', dataVersion).then(response => {
                    response.data.version.forEach(version => {
                        if (version.Clave === vehicle.version) {
                            this.state.modelo.vehicle.version = version.Nombre
                            callback(true)
                        }
                    });
                })
            })
        })
    }

    assignValuesVehicle(index1,index2,index3){
        let dateVehicleChecklist = this.props.data.data.revision.checklist
        dateVehicleChecklist.forEach((check) =>{
            let newDamage = {
                zone: check.modelo[index2].groupName,
                part: check.modelo[index2].childrens[index3].label,
                hurt: '',
                observations: '',
                cost: '',
                firstPhoto: check.modelo[index2].childrens[index3].imageArr
            }
            this.state.modelo.vehicleDamage.push(newDamage)
            this.refresh()
        })
    }
    assignValues(callback){
        setTimeout(() => {
            if (this.state.modelo !== null){
                callback(true)   
            }
        }, 1000);
    }
    refresh() {
        this.setState({
            refresh: ''
        })
        this.totalDamage()
    }

    totalDamage(){
        let damage = this.state.modelo
        if (damage.vehicleDamage.length >= 1){
            let sum = 0
            let total = 0
            let costo = 0

            damage.vehicleDamage.forEach(daños => {
                if(daños.cost){
                    costo = parseFloat(daños.cost)
                    total = total+costo
                      
                }
            });
            this.state.modelo.totalCost = total
            function formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            }
            let numero = formatNumber(total)
            this.state.totalCost = numero
        }else{
        }
    }

    backToRevision(){
        confirmRequest('¿Estas seguro de regresar?', 'Se perderan los cambios ', (ok) => {
            if (ok) {
                this.props.data.changedToCheckList(3)
            }
        })
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

    handleSaveReport(e){
        let check = {
            modelo: this.state.modelo
        }
        console.log('va a guardar');
        
        $("button[name='submit']").attr("disabled", true);
        this.props.data.data.revision.conditionsReports = this.props.data.data.revision.conditionsReports.concat(check)
        console.log('se hizo el concat');
        
        swal("Muy bien!", "Reporte de Condiciones se ha guardado correctamente ", "success", {
            timer: 2000,
        });
        this.props.data.data.editConditions = true
        this.props.data.changedToCheckList(3)
        this.refresh()
    }
    render() {
        let modelConditions = this.state.modelo
        let Catalogue = this.state.Catalogue
        if (this.state.ready === false) return<div className="text-center"><h5>Cargando....</h5></div>
        return (
            <div className="row">
                <div className="col-12 col-md-12">
                    <div className="alert alert-dark text-center mt-6" role="alert">
                        <strong>REPORTES DE CONDICIONES</strong>
                    </div>
                    <div className="container">
                        <DateBasicReports data={modelConditions} />
                    </div>
                    <div className="container">
                        <OwnerDate data={modelConditions} />                                             
                    </div>
                    <div className="container">
                        <DateVehicle data={modelConditions} />  
                    </div>
                    <div className="container">
                        <DamageVehicle data={modelConditions} Catalogue={Catalogue} refresh={this.refresh} />
                    </div>
                    <div className="container">
                        <GeneralConditions data={modelConditions} refresh={this.refresh} />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="input-group mb-2 mb-sm-0">
                                    <div className="input-group-addon">COSTO TOTAL:</div>
                                    <input
                                        type="text"
                                        placeholder="$"
                                        disabled
                                        className="form-control"
                                        value={this.state.totalCost}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 col-sm-3 col-xs-2 mb-3">
                            <button type="button" className="btn btn-danger btn-block" onClick={() => this.backToRevision()} ><i className="fas fa-chevron-circle-left"></i> Regresar a revisión</button>
                        </div>
                        <div className="col-md-6">
                            <button type="submit" name="submit" className="btn btn-success  btn-block" onClick={(e) => this.handleSaveReport(e)}>
                                <i className="fas fa-save"></i> Guardar Reporte
                        </button>
                        </div>
                    </div>                    
                </div>                
            </div>
        );
    }
}
