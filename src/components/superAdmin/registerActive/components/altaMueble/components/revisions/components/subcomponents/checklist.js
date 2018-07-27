import React, { Component } from 'react';
import modelCheck from './modelChecklist'
import { Row, Col, Container, Label, Input, FormGroup, CardHeader, Button, Collapse, CardBody, Card, ListGroup } from 'reactstrap'
import dateFormat from 'dateformat'
import './checklist.css'
import swal from 'sweetalert'
import { InputText, confirmRequest } from '../../../../../../../../../swaIInputs'
import { uploadFiles } from '../../../../../../../../../uploadFiles'
import uploadImgCheck from './upluadImgCheck'
import SignaturePad from './appPaint/index'
import Modal from './modal/index'
import firebase from 'firebase'
import $ from 'jquery'
import { select, log } from 'async';
import axios from 'axios'

export default class CheckList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modelo: '',
            select: '',
            upload: true,
            percentage: 0,
            tempInfoChecklist: {},
            tempReportModel: {},
            url_1: '',
            url_2: '',
            bandPaint: false,
            urlCheck: '',
            tipeCheck: 0,
            collapse: 0,
            brand: '',
            model: '',
            version: '',
            saveCheckList: false,
            missingDamages: true,
            damagesCheck: []
        }
        this.toggle = this.toggle.bind(this);
        this.refresh = this.refresh.bind(this)
        this.handleSaveInputs = this.handleSaveInputs.bind(this)
        this.handleActiveCamera = this.handleActiveCamera.bind(this)
        this.handleSaveTextChildren = this.handleSaveTextChildren.bind(this)
        this.hanldeUploadImg = this.hanldeUploadImg.bind(this)
        this.handleUpdateChecklist = this.handleUpdateChecklist.bind(this)
        this.handleSaveSignature = this.handleSaveSignature.bind(this)
        this.handleSaveSignatureInspector = this.handleSaveSignatureInspector.bind(this)
        this.handleUpdateSignature = this.handleUpdateSignature.bind(this)
        this.handleUpdateSignatureInspector = this.handleUpdateSignatureInspector.bind(this)
        this.validateChecklist = this.validateChecklist.bind(this)
        this.getModelData = this.getModelData.bind(this)
        this.backToRevision = this.backToRevision.bind(this)
    }
    componentDidMount() {
        this.setState({
            bandPaint: true
        })
        if (this.props.data.data.editChecklistRevision === true) {
            console.log('entro a 1 ');
            
            this.setState({
                modelo: this.props.data.data.revision.checklist[0].modelo
            })
            if(this.props.data.data.previosRevisionData){
                if (!this.props.data.data.previosRevisionData.checklist[0].modelo[0].childrens[0].value) {
                console.log('entro a 2');
                let date = dateFormat(new Date(), "dd/mm/yyyy")
                let hour = dateFormat(new Date(), "h:MM:ss TT")
                this.state.tempReportModel = this.props.data.data.previosRevisionData.checklist[0].modelo
                this.state.tempReportModel[0].childrens[0].value = date
                this.state.tempReportModel[0].childrens[1].value = hour
                var inspectorData = this.props.data.data.perfilUsuer
                this.state.tempReportModel[16].childrens[0].value = inspectorData.name
                this.state.tempReportModel[16].childrens[1].value = inspectorData.cellPhone
                this.state.tempReportModel[16].childrens[3].value = inspectorData.email
                var location = this.props.data.data.revision.location
                if (location.street && location.colony && location.municipality && location.state) {
                    this.state.tempReportModel[0].childrens[2].value = location.street + ', ' + location.colony + ', ' + location.municipality + ', ' + location.state
                } else {
                    this.state.tempReportModel[0].childrens[2].value = ''
                }
                var owner = this.props.data.data.asset
                this.state.tempReportModel[0].childrens[3].value = owner.idOwner
                this.state.tempReportModel[0].childrens[4].value = owner.socialReason
                // Areas
                this.state.tempReportModel[0].childrens[5].value = owner['areas'][0]['value']
                this.state.tempReportModel[0].childrens[6].value = owner['areas'][1]['value']
                this.state.tempReportModel[0].childrens[16].value = owner.idSates
                //     // DATES VEHICLE
                var dateVehicle = this.props.data.data.asset.furniture
                var dateVehicleData = this.props.data.data.asset
                this.state.tempReportModel[0].childrens[7].value = dateVehicleData['typeOfAsset']
                this.state.tempReportModel[0].childrens[9].value = dateVehicle.vehicle['year']
                this.state.tempReportModel[0].childrens[11].value = 'Cargando...'
                this.state.tempReportModel[0].childrens[13].value = 'Cargando...'
                this.state.tempReportModel[0].childrens[15].value = 'Cargando...'
                this.getModelData(() => {
                    this.state.tempReportModel[0].childrens[11].value = this.state.brand
                    this.state.tempReportModel[0].childrens[13].value = this.state.model
                    this.state.tempReportModel[0].childrens[15].value = this.state.version
                    this.refresh()
                });
                this.state.tempReportModel[0].childrens[14].value = dateVehicle.vehicle['engineNumber']
                this.state.tempReportModel[0].childrens[12].value = dateVehicle.vehicle['serialNumber']
                this.state.tempReportModel[1].childrens[1].value = dateVehicle.vehicle['carPlates']
                this.setState({
                    modelo: this.state.tempReportModel
                })
            }
            }
            
        } else if (this.props.data.data.existPreviosRevision === true) {
            console.log('entro a 3');
            this.setState({
                modelo: this.props.data.data.previosRevisionData.checklist[0].modelo
            })
            let date = dateFormat(new Date(), "dd/mm/yyyy")
            let hour = dateFormat(new Date(), "h:MM:ss TT")
            this.state.tempInfoChecklist = this.props.data.data.previosRevisionData.checklist[0].modelo
            this.state.tipeCheck = 2
            this.state.tempInfoChecklist[0].childrens[0].value = date
            this.state.tempInfoChecklist[0].childrens[1].value = hour
            this.state.tempInfoChecklist[14].childrens[0].value = ''
            this.state.tempInfoChecklist[15].childrens[0].value = ''
            this.state.tempInfoChecklist[15].childrens[1].value = ''
            this.state.tempInfoChecklist[15].childrens[2].value = ''
            this.state.tempInfoChecklist[15].childrens[3].value = ''
            this.state.tempInfoChecklist[16].childrens[0].value = ''
            this.state.tempInfoChecklist[16].childrens[1].value = ''
            this.state.tempInfoChecklist[16].childrens[2].value = ''
            var inspectorData = this.props.data.data.perfilUsuer
            this.state.tempInfoChecklist[16].childrens[0].value = inspectorData.name
            this.state.tempInfoChecklist[16].childrens[1].value = inspectorData.cellPhone
            this.state.tempInfoChecklist[16].childrens[3].value = inspectorData.email
            this.setState({
                refresh: ''
            })
        } else {
            console.log('entrop a 4');
            modelCheck(data => {
                this.state.tipeCheck = 3
                //DATE & HOURS
                let date = dateFormat(new Date(), "dd/mm/yyyy")
                let hour = dateFormat(new Date(), "h:MM:ss TT")
                //LOCATION
                var location = this.props.data.data.revision.location
                data[0].childrens[0].value = date
                data[0].childrens[1].value = hour
                if (location.street && location.colony && location.municipality && location.state) {
                    data[0].childrens[2].value = location.street + ', ' + location.colony + ', ' + location.municipality + ', ' + location.state
                } else {
                    data[0].childrens[2].value = ''
                }
                //DATE OWNER
                var owner = this.props.data.data.asset
                data[0].childrens[3].value = owner.idOwner
                data[0].childrens[4].value = owner.socialReason
                //Areas
                data[0].childrens[5].value = owner['areas'][0]['value']
                data[0].childrens[6].value = owner['areas'][1]['value']
                data[0].childrens[16].value = owner.idSates
                // DATES VEHICLE
                var dateVehicle = this.props.data.data.asset.furniture
                var dateVehicleData = this.props.data.data.asset
                data[0].childrens[7].value = dateVehicleData['typeOfAsset']
                data[0].childrens[9].value = dateVehicle.vehicle['year']
                data[0].childrens[11].value = 'Cargando...'
                data[0].childrens[13].value = 'Cargando...'
                data[0].childrens[15].value = 'Cargando...'
                this.getModelData(() => {
                    data[0].childrens[11].value = this.state.brand
                    data[0].childrens[13].value = this.state.model
                    data[0].childrens[15].value = this.state.version
                    this.refresh()
                });
                data[0].childrens[14].value = dateVehicle.vehicle['engineNumber']
                data[0].childrens[12].value = dateVehicle.vehicle['serialNumber']
                data[1].childrens[1].value = dateVehicle.vehicle['carPlates']
                var inspectorData = this.props.data.data.perfilUsuer
                data[16].childrens[0].value = inspectorData.name
                data[16].childrens[1].value = inspectorData.cellPhone
                data[16].childrens[3].value = inspectorData.email
                this.setState({
                    modelo: data
                })
            })
        }
    }
    getModelData(callback) {
        let vehicle = this.props.data.data.asset.furniture.vehicle
        axios.get('https://catalogo-ebc.herokuapp.com/brand/' + vehicle.year).then((response) => {
            response.data.brand.forEach(brand => {
                if (brand.Clave === vehicle.brand) {
                    this.state.brand = brand.Nombre

                }
            });
            let dataModels = {
                year: vehicle.year,
                brand: vehicle.brand
            }
            axios.post('https://catalogo-ebc.herokuapp.com/model/', dataModels).then(response => {
                response.data.model.forEach(model => {
                    if (model.Clave === vehicle.model) {
                        this.state.model = model.Nombre

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
                            this.state.version = version.Nombre
                            callback(true)
                        }
                    });
                })
            })
        })
    }

    toggle(e, index) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
        $('html,body').animate({
            scrollTop: $("#" + index).offset().top
        }, 1);
    }
    refresh() {
        this.setState({
            refresh: ''
        })
        this.validateChecklist()
    }
    handleSaveText(e, index, indexChildren) {
        this.state.modelo[index].childrens[indexChildren].value = e.target.value.toUpperCase()
        this.refresh()
    }
    handleSaveTextChildren(e, index, indexChildren, indexValue) {
        this.state.modelo[index].childrens[indexChildren].valueText = e.target.value.toUpperCase()
        this.refresh()
    }
    handleActiveCamera(e, index, indexChildren, indexValue) {
        this.state.select = e.target.value
        if (this.props.data.data.existPreviosRevision === true) {
            if (this.state.modelo[index].childrens[indexChildren].value && this.state.modelo[index].childrens[indexChildren].imageArr.length > 0 && this.state.modelo[index].groupName === 'DOCUMENTACIÓN') {
                if (e.target.value === 'No') {
                    e.persist()
                    confirmRequest('¿Estas seguro de cambiar?', 'Se eliminará la foto ', (ok) => {
                        if (ok) {
                            this.state.modelo[index].childrens[indexChildren].camera = false
                            this.state.modelo[index].childrens[indexChildren].imageArr = ''
                            this.state.modelo[index].childrens[indexChildren].value = e.target.value

                            this.refresh()
                        }
                    })
                } else {
                    this.state.modelo[index].childrens[indexChildren].value = e.target.value
                    this.state.modelo[index].childrens[indexChildren].camera = true
                    this.refresh()
                }
            } else if (this.state.modelo[index].childrens[indexChildren].value && this.state.modelo[index].childrens[indexChildren].imageArr.length > 0 && this.state.modelo[index].groupName !== 'DOCUMENTACIÓN') {
                if (e.target.value === 'Sin daño' || e.target.value === 'No Aplica') {
                    e.persist()
                    confirmRequest('¿Estas seguro de cambiar?', 'Se eliminará la foto ', (ok) => {
                        if (ok) {
                            this.state.modelo[index].childrens[indexChildren].value = e.target.value
                            this.state.modelo[index].childrens[indexChildren].camera = false
                            this.state.modelo[index].childrens[indexChildren].imageArr = ''
                            this.state.modelo[index].childrens[indexChildren].damage = false
                            this.refresh()
                        }
                    })
                } else {
                    this.state.modelo[index].childrens[indexChildren].value = e.target.value
                    this.state.modelo[index].childrens[indexChildren].camera = true
                    this.state.modelo[index].childrens[indexChildren].damage = true
                    this.refresh()
                }
            } else {
                if (this.state.modelo[index].groupName === 'DOCUMENTACIÓN') {
                    if (e.target.value === 'No') {
                        this.state.modelo[index].childrens[indexChildren].camera = false
                        this.state.modelo[index].childrens[indexChildren].imageArr = ''
                        this.state.modelo[index].childrens[indexChildren].value = e.target.value
                    } else {
                        this.state.modelo[index].childrens[indexChildren].camera = true
                        this.state.modelo[index].childrens[indexChildren].value = e.target.value
                    }
                    this.refresh()
                } else {
                    if (e.target.value === 'Con Daño o Faltante' && this.props.data.data.previosRevisionData.checklist[0].modelo[index].childrens[indexChildren].value === 'Sin daño') {
                        this.state.modelo[index].childrens[indexChildren].camera = true
                        this.state.modelo[index].childrens[indexChildren].value = e.target.value
                        this.state.modelo[index].childrens[indexChildren].damage = true
                    } else if (e.target.value === 'Sin daño' && this.props.data.data.previosRevisionData.checklist[0].modelo[index].childrens[indexChildren].value === 'Con Daño o Faltante') {
                        this.state.modelo[index].childrens[indexChildren].camera = true
                        this.state.modelo[index].childrens[indexChildren].imageArr = ''
                        this.state.modelo[index].childrens[indexChildren].value = e.target.value
                        // this.state.modelo[index].childrens[indexChildren].damage = false
                    } else if (e.target.value === 'Con Daño o Faltante') {
                        this.state.modelo[index].childrens[indexChildren].camera = true
                        this.state.modelo[index].childrens[indexChildren].value = e.target.value
                        this.state.modelo[index].childrens[indexChildren].damage = true
                    } else {
                        this.state.modelo[index].childrens[indexChildren].camera = false
                        this.state.modelo[index].childrens[indexChildren].imageArr = ''
                        this.state.modelo[index].childrens[indexChildren].value = e.target.value
                        this.state.modelo[index].childrens[indexChildren].damage = false
                    }
                    this.refresh()
                }
            }
        } else {
            if (this.state.modelo[index].childrens[indexChildren].value && this.state.modelo[index].childrens[indexChildren].imageArr.length > 0 && this.state.modelo[index].groupName === 'DOCUMENTACIÓN') {
                if (e.target.value === 'No') {
                    e.persist()
                    confirmRequest('¿Estas seguro de cambiar?', 'Se eliminará  la foto ', (ok) => {
                        if (ok) {
                            this.state.modelo[index].childrens[indexChildren].camera = false
                            this.state.modelo[index].childrens[indexChildren].imageArr = ''
                            this.state.modelo[index].childrens[indexChildren].value = e.target.value
                            this.refresh()
                        }
                    })
                } else {
                    this.state.modelo[index].childrens[indexChildren].value = e.target.value
                    this.state.modelo[index].childrens[indexChildren].camera = true
                    this.refresh()
                }
            } else if (this.state.modelo[index].childrens[indexChildren].value && this.state.modelo[index].childrens[indexChildren].imageArr.length > 0 && this.state.modelo[index].groupName !== 'DOCUMENTACIÓN') {
                if (e.target.value === 'Sin daño' || e.target.value === 'No Aplica') {
                    e.persist()
                    confirmRequest('¿Estas seguro de cambiar?', 'Se eliminará  la foto ', (ok) => {
                        if (ok) {
                            this.state.modelo[index].childrens[indexChildren].value = e.target.value
                            this.state.modelo[index].childrens[indexChildren].camera = false
                            this.state.modelo[index].childrens[indexChildren].imageArr = ''
                            this.state.modelo[index].childrens[indexChildren].damage = false
                            this.refresh()
                        }
                    })
                } else {
                    this.state.modelo[index].childrens[indexChildren].value = e.target.value
                    this.state.modelo[index].childrens[indexChildren].camera = true
                    this.refresh()
                }
            } else {
                if (this.state.modelo[index].groupName === 'DOCUMENTACIÓN') {
                    if (e.target.value === 'No') {
                        this.state.modelo[index].childrens[indexChildren].camera = false
                        this.state.modelo[index].childrens[indexChildren].imageArr = ''
                        this.state.modelo[index].childrens[indexChildren].value = e.target.value
                        this.refresh()
                    } else {
                        this.state.modelo[index].childrens[indexChildren].camera = true
                        this.state.modelo[index].childrens[indexChildren].value = e.target.value
                        this.refresh()
                    }
                } else if (this.state.modelo[index].groupName === 'NIVELES') {
                    this.state.modelo[index].childrens[indexChildren].camera = true
                    this.state.modelo[index].childrens[indexChildren].value = e.target.value
                    this.refresh()
                } else {
                    if (e.target.value === 'Con Daño o Faltante') {
                        this.state.modelo[index].childrens[indexChildren].camera = true
                        this.state.modelo[index].childrens[indexChildren].damage = true
                    } else {
                        this.state.modelo[index].childrens[indexChildren].camera = false
                        this.state.modelo[index].childrens[indexChildren].imageArr = ''
                        this.state.modelo[index].childrens[indexChildren].damage = false
                    }
                    this.state.modelo[index].childrens[indexChildren].value = e.target.value
                    this.refresh()
                }
            }
        }
    }
    hanldeUploadImg(e, index, indexChildren) {
        if (e.target.files.length > 0) {
            this.state.modelo[index].childrens[indexChildren].status = true
            uploadFiles(e, (link) => {
                this.state.modelo[index].childrens[indexChildren].imageArr === 'upload'
                this.state.modelo[index].childrens[indexChildren].status = false
                this.state.modelo[index].childrens[indexChildren].imageArr = link[0]
                this.state.modelo[index].childrens[indexChildren].status = false
                this.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })
            }, 'imagesChecklistVehicles/'
            )
        }
    }
    handleDeleteImgCheck(e, index, indexChildren) {
        confirmRequest('¿Estas seguro de eliminar?', 'Se borrara definitivamente', (ok) => {
            if (ok) {
                this.state.modelo[index].childrens[indexChildren].imageArr = ''
                this.refresh()
            }
        })
    }
    handleSaveInputs(e, father, children, indexValue) {
        this.state.modelo[father].childrens[children].values[indexValue].value = e.target.value
        this.refresh()
    }
    handleSubmit(e) {
        if (this.state.missingDamages === true) {
            let check = {
                modelo: this.state.modelo
            }
            $("button[name='submit']").attr("disabled", true);
            this.props.data.data.revision.checklist = this.props.data.data.revision.checklist.concat(check)
            swal("Muy bien!", "Checklist guardado correctamente ", "success", {
                timer: 2000,
            });
            this.props.data.data.editChecklistRevision = true
            this.props.data.changedToCheckList(3)
            this.refresh()
        } else {
            let total = []
            this.state.modelo.forEach((check, indexCheck) => {
                check.childrens.forEach((element, indexChildrens) => {
                    if (element.damage === true) {
                        if (element.imageArr.length > 0) {
                        } else {
                            total.push(element.label)
                        }
                    }
                });
            });
            let texto = 'Faltan fotos en los siguientes daños:' + total
            confirmRequest('No se pueden guardar', texto, (ok) => {
                if (ok) {
                }
            })
        }
    }

    handleUpdateChecklist(e) {
        if (this.state.missingDamages === true) {
            let check = {
                modelo: this.state.modelo
            }
            $("button[name='submit']").attr("disabled", true);
            this.props.data.data.revision.checklist = this.props.data.data.revision.checklist.splice(0, 1)

            this.props.data.data.revision.checklist = this.props.data.data.revision.checklist.concat(check)
            swal("Muy bien!", "Checklist guardado correctamente ", "success", {
                timer: 2000,
            });
            this.props.data.changedToCheckList(3)
            this.refresh()
        } else {
            let total = []
            this.state.modelo.forEach((check, indexCheck) => {
                check.childrens.forEach((element, indexChildrens) => {
                    if (element.damage === true) {
                        if (element.imageArr.length > 0) {
                        } else {
                            total.push(element.label)
                        }
                    }
                });
            });
            let texto = 'Faltan fotos en los siguientes daños:' + total
            confirmRequest('No se pueden guardar', texto, (ok) => {
                if (ok) {
                }
            })
        }
    }

    handleCleanSignature() {
        let signature = this.refs.mySignature1
        signature.clear()
    }
    handleCleanSignatureInspector() {
        let signature = this.refs.mySignature2
        signature.clear()
    }
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    hanldeUploadDocument(e, opcion) {
        uploadImgCheck(e, (link) => {
            if (opcion == 1) {
                this.state.modelo[15].childrens[2].value = link[0]
            } else if (opcion == 2) {
                this.state.modelo[16].childrens[2].value = link[0]
            }
            this.setState({ upload: true })
            this.refresh()
        }, (percentage) => {
            this.setState({ percentage: Math.round(percentage) })
        }, 'ImgChecklist/'
        )
    }
    handleSaveSignature() {
        let signature = this.refs.mySignature1
        let img = signature.toDataURL()
        var file = this.dataURLtoFile(img, 'firm.png');
        this.hanldeUploadDocument(file, 1)
    }
    handleSaveSignatureInspector(e) {
        let signature = this.refs.mySignature2
        let img = signature.toDataURL()
        var file = this.dataURLtoFile(img, 'firmInspector.png');
        this.hanldeUploadDocument(file, 2)
    }

    handleUpdateSignature() {
        this.state.modelo[15].childrens[2].value = ''
        this.refresh()
    }
    handleUpdateSignatureInspector() {
        this.state.modelo[16].childrens[2].value = ''
        this.refresh()
    }
    handleScrollAuto(e) {
        if (e) {
            document.getElementById('oculto').style.display = 'none'
        } else {
            document.getElementById('oculto').style.display = 'inline'
        }
    }
    handleSaveImg(img) {
    }
    validateChecklist() {
        setTimeout(() => {
            let checklist = this.state
            if (checklist.modelo) {
                if (checklist.modelo[15].childrens[2].value && checklist.modelo[16].childrens[2].value && checklist.modelo[13].childrens[0].value) {
                    this.setState({
                        saveCheckList: true
                    })
                } else {
                    this.setState({
                        saveCheckList: false
                    })
                }
            }
        }, 800);
        let damagesTotal
        this.state.modelo.forEach((check, indexCheck) => {
            check.childrens.forEach((element, indexChildrens) => {
                if (element.damage === true) {
                    if (element.imageArr.length === 0) {
                        damagesTotal = element.label
                    }
                }
            });
        });
        if (damagesTotal) {
            this.setState({
                missingDamages: false
            })
        } else {
            this.setState({
                missingDamages: true
            })
        }
    }
    backToRevision() {
        confirmRequest('¿Estas seguro de regresar?', 'Se perderan los cambios ', (ok) => {
            if (ok) {
                this.props.data.changedToCheckList(3)
            }
        })
    }
    render() {
        let { modelo, select, bandPaint, urlCheck, collapse, saveCheckList } = this.state
        if (modelo === '') return <div><h5>Cargando....</h5></div>
        let contenido = <div className="row">
            {
                modelo.map((checkDate, index) => {
                    if (index < 12) {
                        return (
                            <div className="col-sm-12 col-md-12 col-12" key={index}>
                                <Card style={{ marginBottom: '1rem' }}>
                                    <CardHeader className="text-center bg-info" id={index} style={{ cursor: 'pointer' }} onClick={(e) => this.toggle(e, index)} data-event={index}>{checkDate.groupName}</CardHeader>
                                    <Collapse isOpen={collapse === index} >
                                        <CardBody className="row">
                                            {checkDate.childrens.map((child, indexChildren) => {
                                                if (child.values.length === 0) {
                                                    return (
                                                        <div key={indexChildren} className="col-md-6">
                                                            <div className="col-md-12 col-sm-12 col-12">
                                                                <label htmlFor=""> <strong> {child.label} </strong></label>
                                                            </div>
                                                            <div className="row col-md-12">
                                                                {
                                                                    child.camera && child.showCamera &&
                                                                    <div className="col col-2 col-md-2 mr-1">
                                                                        <label style={{ cursor: 'pointer' }} className="btn btn-secondary" htmlFor={child.label}>
                                                                            <i className="fa fa-camera" ></i>
                                                                        </label>
                                                                        <input id={child.label} accept="image/*" capture="camera" name={child.label} style={{ display: 'none' }} type="file" onChange={(e) => this.hanldeUploadImg(e, index, indexChildren)} />
                                                                    </div>
                                                                }
                                                                {
                                                                    this.state.modelo[index].childrens[indexChildren].imageArr.length > 0 &&
                                                                    <div className="col col-2 col-md-2 mr-1">
                                                                        <a style={{ height: '33px' }} className="btn btn-success " data-fancybox={'fancybox' + indexChildren} data-src={this.state.modelo[index].childrens[indexChildren].imageArr} href="javascript:;">
                                                                            <i className="fa fa-eye fa-1x" />
                                                                        </a>
                                                                    </div>
                                                                }
                                                                {
                                                                    this.state.modelo[index].childrens[indexChildren].imageArr.length > 0 &&
                                                                    <div className="col col-2 col-md-2 mr-2">
                                                                        <a style={{ height: '33px' }} onClick={(e) => this.handleDeleteImgCheck(e, index, indexChildren)} className="btn btn-danger" href="javascript:;" >
                                                                            <i className="fa fa-minus-circle"></i>
                                                                        </a>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="col-md-12 col-sm-12 col-12 mb-2">
                                                                {child.type === 'date' &&
                                                                    <input className="form-control" disabled type="text" name="" id="" value={child.value} />
                                                                }
                                                                {child.type === 'time' &&
                                                                    <input className="form-control" disabled type="text" name="" id="" value={child.value} />
                                                                }
                                                                {child.type !== 'date' && child.type !== 'time' && child.type == 'text' &&
                                                                    <input className="form-control" disabled={child.label !== 'Kilometraje' && child.label !== 'Color' && child.label !== 'Odómetro' && child.label !== 'Medidas'} type={child.type} value={child.value} onChange={(e) => this.handleSaveText(e, index, indexChildren)} />
                                                                }
                                                            </div>
                                                            <div className="col col-xs-12 col-md-12 offset-12">
                                                                {
                                                                    this.state.modelo[index].childrens[indexChildren].status === true &&
                                                                    <div className="progress">
                                                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <br />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={indexChildren} className="col-md-12" >
                                                            <div className="">
                                                                <label htmlFor=""><strong> {child.label} </strong></label>
                                                                <div className="row col-md-12">
                                                                    {
                                                                        child.camera && child.showCamera && child.label !== '"Medidas"' &&
                                                                        <div className="col col-2 col-md-2 mr-2">
                                                                            <label style={{ cursor: 'pointer' }} className="btn btn-secondary" htmlFor={child.label + indexChildren}>
                                                                                <i className="fa fa-camera" ></i>
                                                                            </label>
                                                                            <input id={child.label + indexChildren} accept="image/*" capture="camera" name={child.label} style={{ display: 'none' }} type="file" onChange={(e) => this.hanldeUploadImg(e, index, indexChildren)} />
                                                                        </div>
                                                                    }
                                                                    {
                                                                        this.state.modelo[index].childrens[indexChildren].imageArr.length > 0 &&
                                                                        <div className="col col-2 col-md-2 mr-2">
                                                                            <a style={{ height: '33px' }} className="btn btn-success " data-fancybox={'imgFancy' + indexChildren} data-src={this.state.modelo[index].childrens[indexChildren].imageArr} href="javascript:;">
                                                                                <i className="fa fa-eye fa-1x" />
                                                                            </a>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        this.state.modelo[index].childrens[indexChildren].imageArr.length > 0 &&
                                                                        <div className="col col-2 col-md-2 mr-2">
                                                                            <a style={{ height: '33px' }} onClick={(e) => this.handleDeleteImgCheck(e, index, indexChildren)} className="btn btn-danger" href="javascript:;" >
                                                                                <i className="fa fa-minus-circle"></i>
                                                                            </a>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="col col-xs-12 col-md-12 offset-12 mb-2">
                                                                    {
                                                                        this.state.modelo[index].childrens[indexChildren].status === true &&
                                                                        <div className="progress">
                                                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="row  justify-content-md-around">
                                                                    {
                                                                        child.values.map((valueChild, indexValue) => {
                                                                            return (
                                                                                <div key={indexValue} className="options">
                                                                                    {
                                                                                        child.type !== 'text' &&
                                                                                        <form action="" className="formulario">
                                                                                            <div className="radio">
                                                                                                <input type={child.type} name={child.label} id={indexChildren + child.label + index + 'a' + indexValue} value={valueChild.label} checked={child.value === valueChild.label} onChange={(e) => this.handleActiveCamera(e, index, indexChildren, indexValue)} />
                                                                                                <label htmlFor={indexChildren + child.label + index + 'a' + indexValue}> {valueChild.label} </label>
                                                                                            </div>
                                                                                        </form>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            {this.state.modelo[index].groupName === 'LLANTAS' && this.state.modelo[index].childrens[indexChildren].label !== 'Medidas' &&
                                                                <div>
                                                                    <input type="text" className="form-control" placeholder="Marca" value={this.state.modelo[index].childrens[indexChildren].valueBrand} /> <br />
                                                                </div>
                                                            }
                                                            {this.state.modelo[index].groupName === 'LLANTAS' && this.state.modelo[index].childrens[indexChildren].label === 'Medidas' &&
                                                                <div>
                                                                    <input type="text" className="form-control" placeholder="Medidas" value={this.state.modelo[index].childrens[indexChildren].valueBrand} /> <br />
                                                                </div>
                                                            }
                                                            {this.state.modelo[index].groupName !== 'CONDICIONES GENERALES' &&
                                                                <div>
                                                                    <input type="text" className="form-control" placeholder="Observaciones" value={this.state.modelo[index].childrens[indexChildren].valueText} onChange={(e) => this.handleSaveTextChildren(e, index, indexChildren)} />
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </CardBody>
                                    </Collapse>
                                </Card>
                            </div>
                        )
                    }
                }
                )
            }
        </div>
        let paint = <div className="tarjeta">
            <div className="card-header"> DAÑOS RELEVANTES*</div>

            <div className="d-flex justify-content-center row">

                <Col sm="12" xs="12">
                    <div className="row">
                        <Col sm="12">
                            <Modal id='myModal' data={this.state} onSave={this.handleSaveImg} />
                        </Col>
                    </div>
                </Col>
            </div>
        </div>

        let observations = <div className="row">
            <div className="col-md-12">
                <CardHeader>OBSERVACIONES</CardHeader>
            </div>
            <div className="col-md-12">
                <textarea type="textarea" className="form-control" rows="4" id="Observaciones" name="Observaciones" value={this.state.modelo[14].childrens[0].value} onChange={(e) => this.handleSaveText(e, 14, 0)} >
                </textarea>
            </div>
        </div>

        let inspector = <div className="colum">
            <div className="tarjeta">
                <CardHeader>PRESENTA LA UNIDAD*</CardHeader>
                {
                    this.state.modelo[15].childrens[2].value &&
                    <div >
                        <div className="signatureFirm mb-3 mr-3">
                            <img className="img-signature" src={this.state.modelo[15].childrens[2].value} alt="" />
                        </div>
                        <div className="col-md-12">
                            <input type="text" className="form-control mb-3" name="nombre" placeholder="NOMBRE" id="nombre" value={this.state.modelo[15].childrens[0].value} onChange={(e) => this.handleSaveText(e, 15, 0)} />
                            <input type="number" className="form-control mb-3" name="teléfono" placeholder="TELÉFONO" value={this.state.modelo[15].childrens[1].value} onChange={(e) => this.handleSaveText(e, 15, 1)} />
                            <input type="email" className="form-control mb-3" name="email" placeholder="EMAIL" value={this.state.modelo[15].childrens[3].value} onChange={(e) => { this.state.modelo[15].childrens[3].value = e.target.value, this.refresh() }} />
                        </div>
                        <div className="col-12 col-md-12">
                            <Button title="Nuevo" outline color="primary" style={{ "marginTop": "5px" }} onClick={() => this.handleUpdateSignature()}>Firmar <i className='fas fa-pencil-alt'></i></Button>
                        </div>
                    </div>
                }{
                    !this.state.modelo[15].childrens[2].value &&
                    <div>
                        <div className="signatureFirm mb-3 mr-3">
                            <SignaturePad clearButton="true" ref="mySignature1" id="mySignature" />
                        </div>
                        <div className="col-md-12">
                            <input type="text" className="form-control mb-3" name="nombre" placeholder="NOMBRE" id="nombre" value={this.state.modelo[15].childrens[0].value} onChange={(e) => this.handleSaveText(e, 15, 0)} />
                            <input type="number" className="form-control mb-3" name="teléfono" placeholder="TELÉFONO" value={this.state.modelo[15].childrens[1].value} onChange={(e) => this.handleSaveText(e, 15, 1)} />
                            <input type="email" className="form-control mb-3" name="email" placeholder="EMAIL" value={this.state.modelo[15].childrens[3].value} onChange={(e) => { this.state.modelo[15].childrens[3].value = e.target.value, this.refresh() }} />
                        </div>
                        <div className="row text-center">
                            <div className="col col-lg-6">
                                <Button title="Nuevo" outline color="danger" className="mr-3" style={{ "marginTop": "5px" }} onClick={() => this.handleCleanSignature()}>Borrar  <i className='fa fa-eraser'></i></Button>

                                <Button title="Nuevo" outline color="success" style={{ "marginTop": "5px" }} onClick={() => this.handleSaveSignature()}>Guardar <i className='far fa-save'></i></Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="tarjeta">
                <CardHeader>INSPECTOR*</CardHeader>
                {
                    this.state.modelo[16].childrens[2].value &&
                    <div>

                        <div className="signatureFirm mb-3 mr-3">
                            <img className="img-signature" src={this.state.modelo[16].childrens[2].value} alt="" />
                        </div>
                        <div className="col-md-12">
                            <input type="text" disabled className="form-control mb-3" name="nombre" placeholder="NOMBRE" value={this.state.modelo[16].childrens[0].value} />
                            <input type="number" disabled className="form-control mb-3" name="teléfono" placeholder="TELÉFONO" value={this.state.modelo[16].childrens[1].value} />
                            <input type="text" disabled className="form-control mb-3" name="email" placeholder="EMAIL" value={this.state.modelo[16].childrens[3].value} />
                        </div>
                        <div className="col-12 col-md-12">
                            <Button title="Nuevo" outline color="primary" style={{ "marginTop": "5px" }} onClick={() => this.handleUpdateSignatureInspector()}>Firmar <i className='fas fa-pencil-alt'></i></Button>
                        </div>
                    </div>
                }
                {
                    !this.state.modelo[16].childrens[2].value &&
                    <div>
                        <div className="signatureFirm mb-3 mr-3">
                            <SignaturePad clearButton="true" ref="mySignature2" id="mySignature" />
                        </div>

                        <div className="col-md-12">
                            <input type="text" disabled className="form-control mb-3" name="nombre" placeholder="NOMBRE" value={this.state.modelo[16].childrens[0].value} />
                            <input type="number" disabled className="form-control mb-3" name="teléfono" placeholder="TELÉFONO" value={this.state.modelo[16].childrens[1].value} />
                            <input type="text" disabled className="form-control mb-3" name="email" placeholder="EMAIL" value={this.state.modelo[16].childrens[3].value} />
                        </div>
                        <div className="row text-center">
                            <div className="col col-lg-6">
                                <Button title="Nuevo" outline color="danger" className="mr-3" style={{ "marginTop": "5px" }} onClick={() => this.handleCleanSignatureInspector()}>Borrar <i className='fa fa-eraser'></i></Button>

                                <Button title="Nuevo" outline color="success" style={{ "marginTop": "5px" }} onClick={() => this.handleSaveSignatureInspector()}>Guardar <i className='far fa-save'></i></Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>

        return (
            <div className="container-fluid" id="oculto">
                {contenido}
                <hr />
                {paint}
                <hr />
                {observations}
                <hr />
                {inspector}
                <hr />

                <div className="row text-center">
                    <div className="col-12 text-center">
                        <small>Nota: Las etiquetas marcadas con " * " son obligatorias para completar el alta de checklist</small>
                    </div>
                    <br />
                    <br />
                    <div className="col-12 col-md-6 col-sm-3 col-xs-2 mb-3">
                        <button type="button" className="btn btn-danger btn-block" onClick={() => this.backToRevision()} ><i className="fas fa-chevron-circle-left"></i> Regresar a revisión</button>
                    </div>
                    {!this.props.data.data.editChecklistRevision &&
                        <div className="col-12 col-md-6 col-sm-3 col-xs-2 mb-3">
                            <button type="submit" name="submit" disabled={!saveCheckList} className="btn btn-success  btn-block" onClick={(e) => this.handleSubmit(e)} >
                                <i className="fas fa-save"></i> Agregar checklist
                            </button>
                        </div>
                    }
                    {this.props.data.data.editChecklistRevision &&
                        <div className="col-12 col-md-6 mb-3">
                            <button type="submit" name="submit" disabled={!saveCheckList} className="btn btn-success  btn-block" onClick={(e) => this.handleUpdateChecklist(e)}>
                                <i className="fas fa-save"></i> Actualizar
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}