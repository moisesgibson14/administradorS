import React, { Component } from 'react'
import RevisionModel from './modelRevision'
import Validation from './validations/validation'
import DatePicker from 'react-datepicker';
import { Button } from 'reactstrap'
import { hashHistory } from 'react-router'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import SignaturePad from '../altaMueble/components/revisions/components/subcomponents/appPaint/index'
import uploadImgCheck from '../altaMueble/components/revisions/components/subcomponents/upluadImgCheck'
import ContactInformation from './ContactInformation'
import dateFormat from 'dateformat'
import { firestore } from 'firebase'
import './styles.css'
import $ from 'jquery'

class Revisions extends Component {

    constructor() {
        super()

        this.state = {
            revision: {},
            refresh: '',
            active: '',
            edit: false,
            idRevision: '',
            revisions: [],
            responsable: '',
            programada: false,
            editsketch: false,
            plus: true
        }

        this.refresh = this.refresh.bind(this)
        this.loading = this.loading.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.updateData = this.updateData.bind(this)
        this.editRevision = this.editRevision.bind(this)
        this.newInmueble = this.newInmueble.bind(this)
        this.deleteRevision = this.deleteRevision.bind(this)
        this.nextRevision = this.nextRevision.bind(this)
        this.newResponsable = this.newResponsable.bind(this)
        this.deleteResponsable = this.deleteResponsable.bind(this)
        this.newRevision = this.newRevision.bind(this)
        this.consult = this.consult.bind(this)
        this.validationResponsable = this.validationResponsable.bind(this)
    }
    componentDidMount() {
        this.loading(true)

        firestore().collection('assets').doc(this.props.id).get().then((response) => {
            this.state.active = response.data()
            console.log(this.state.active);

            if (!this.state.active) {
                firestore().collection('revisionsStates').doc(this.props.id).get().then((data) => {
                    console.log('editando la data', data.data());
                    this.loading(false)

                    this.setState({
                        edit: true,
                        editsketch: true,
                        refresh: '',
                        programada: true,
                        revision: data.data(),
                        plus: false
                    })
                })

            } else {
                this.loading(false)
            }

            this.setState({
                refresh: ''
            })

        })
    }

    modelRevision() {
        RevisionModel.Revisions((data) => {
            firestore().collection('revisionsStates').where('idAsset', '==', this.props.id).get().then(numRevision => {
                data.revisionNumber = numRevision.docs.length + 1
                console.log('numero de revisiones', numRevision.docs.length);
            })
            data.dateRevision = dateFormat(new Date, 'dd/mm/yyyy')
            data.hour = dateFormat(new Date(), 'h:MM TT')
            RevisionModel.responsableCheck(res => {
                this.state.responsable = res
                console.log('model responsable', this.state.responsable)
            })
            this.setState({
                revision: data
            })
        })
    }

    nextRevision() {
        let fecha = new Date()
        let dias = this.state.active.reviewDays
        console.log(dias);
        let nextDate = fecha.getTime() + ((dias) * 24 * 60 * 60 * 1000);
        this.state.revision.nextRevision = new Date(nextDate)
        this.setState({
            refresh: ''
        })

        console.log('proxima revision', this.state.revision.nextRevision)
    }

    handleOnSubmit() {
        this.loading(true)
        let i = this.state.revision.dataResponsable.length - 1
        let revision = this.state.revision.dataResponsable[i]
        if (revision.fiscalRegimen === 'Moral' || revision.fiscalRegimen === 'Gobierno') {
            if (revision.federalEntity) {
                if (!this.state.revision.sketch) {
                    this.handleSaveSignature()
                }
                this.guardado()
            } else {
                swal("Llenar campos obligarorios", "estan marcados con un *", "warning", { timer: 2000 });
                console.log('1')
                this.loading(false)
            }
        } else if (revision.fiscalRegimen === 'Fisica') {
            if (revision.name && revision.surnames && revision.job && revision.email && revision.cellPhone) {
                if (!this.state.revision.sketch) {
                    this.handleSaveSignature()
                }
                this.guardado()
            } else {
                swal("Llenar campos obligarorios", "estan marcados con un *", "warning", { timer: 2000 });
                console.log('2')
                this.loading(false)
            }
        } else {
            swal("Llenar campos obligarorios", "estan marcados con un *", "warning", { timer: 2000 });
            console.log('3')
            this.loading(false)
        }
        console.log(revision);

    }

    guardado() {
        this.state.revision.idAsset = this.props.id
        this.state.revision.idOwner = this.state.active.idOwner
        this.state.revision.idSates = this.state.active.idSates
        this.state.revision.nameOwner = this.state.active.socialReason
        this.state.revision.statusRevision = 'process'
        console.log(this.state.revision);
        let revision = this.state.revision
        firestore().collection('revisionsStates').add(revision).then((data) => {
            revision.crumb = data.id
            revision.revisionNumber = revision.revisionNumber
            firestore().collection('revisionsStates').doc(data.id).update(revision).then(() => {
                this.setState({
                    idRevision: data.id,
                    edit: true,
                    programada: true
                })
                console.log('El elemento guardado con el id', data.id);
                swal("Datos Guardados", "éxito", "success");
                this.loading(false)
                return hashHistory.push('/revisionEdit/' + data.id)
            }).catch(error => console.log(error));
        }).catch(error => console.log(error));
    }

    validationResponsable(i) {
        let revision = this.state.revision.dataResponsable[i]
        if (revision.fiscalRegimen === 'Moral' || revision.fiscalRegimen === 'Gobierno') {
            if (revision.federalEntity) {
                this.setState({ plus: false })
            } else {

            }
        } else if (revision.fiscalRegimen === 'Fisica') {
            if (revision.name && revision.surnames && revision.job && revision.email && revision.cellPhone) {
                this.setState({ plus: false })
            } else {

            }
        } else {

        }
        this.setState({
            refresh: ''
        })
    }

    updateData() {
        this.props.refreshId(id => {
            firestore().collection('revisionsStates').doc(id).update(this.state.revision).then(response => {
                swal("Datos Actualizados", '', "success");
                this.setState({
                    programada: true
                })
            }).catch(error => {
                console.log('error al actualizar', error)
            })
        })
    }

    consulta() {

        if (this.state.revision.typeRevision) {
            swal({
                title: "¿Quires cambiar de pestaña?",
                text: "Se perderan los datos que no guardaste",
                icon: "warning",
                buttons: ['NO', 'SI'],
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this.consult()
                    } else {

                    }
                })
        } else {
            this.consult()
        }
    }

    consult() {
        let url = window.location.hash.split('/')
        console.log(url)
        if (url[1] === 'revisionEdit') {
            this.state.revision.typeRevision = 'Consulta'
            firestore().collection('revisionsStates').where('idAsset', '==', this.state.revision.idAsset).onSnapshot(data => {
                let revisionsTem = []
                data.forEach(revision => {
                    let reevision = revision.data()
                    reevision.crumb = revision.id
                    revisionsTem = revisionsTem.concat(reevision)
                })
                this.setState({
                    revisions: revisionsTem,
                    programada: false
                })
            })
            return hashHistory.push('/revisionAssetState/' + this.state.revision.idAsset)
        } else {
            this.state.revision.typeRevision = 'Consulta'
            firestore().collection('revisionsStates').where('idAsset', '==', this.props.id).onSnapshot(data => {
                let revisionsTem = []
                data.forEach(revision => {
                    let reevision = revision.data()
                    reevision.crumb = revision.id
                    revisionsTem = revisionsTem.concat(reevision)
                })
                this.setState({
                    revisions: revisionsTem,
                    programada: false
                })
            })
        }
    }

    editRevision(id, i) {
        if (this.state.revisions[i].statusRevision === 'process') {
            let revisioN = this.state.revisions[i]
            this.setState({
                revision: revisioN,
                edit: true,
                editsketch: true,
                programada: true
            })
            return hashHistory.push('/revisionEdit/' + id)
        } else {
            swal("Revisión finalizada", "", "error", { timer: 2000 });
        }
    }

    deleteRevision(id, i) {
        swal({
            title: "Seguro",
            text: "¿Quieres eliminar la revisión?",
            icon: "warning",
            buttons: ['NO', 'SI'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firestore().collection('revisionsStates').doc(id).delete().then(() => {
                        swal("Construccion eliminada", "", "success", { timer: 2000 });
                    }).catch(error => console.log('Error al borra', error))
                } else {

                }
            })

    }

    newInmueble() {
        this.props.refreshId(id => {
            return hashHistory.push('/altaBuildings/' + id)
        })
    }

    newResponsable(i) {
        if (i === 1) {
            this.state.revision.dataResponsable = this.state.revision.dataResponsable.concat(this.state.responsable)
            this.setState({ plus: true })
        } else if (i === 2) {
            this.state.revision.dataUser = this.state.revision.dataUser.concat(this.state.responsable)
        }

        this.setState({
            refresh: ''
        })
    }

    deleteResponsable(i, index) {
        if (i === 1) {
            this.state.revision.dataResponsable.splice(index, 1)
            this.setState({ plus: false })
        } else if (i === 2) {
            this.state.revision.dataUser.splice(index, 1)
        }

        this.setState({
            refresh: ''
        })
    }

    newRevision(i) {
        firestore().collection('revisionsStates').where('idAsset', '==', this.props.id).where('statusRevision', '==', 'process').get().then(data => {
            if (data.docs.length != 0) {
                swal("Ya existe una revisión en proceso", "", "error", { timer: 2000 });
                this.state.revision.typeRevision = ''
                this.setState({ programada: false })
            } else {
                this.modelRevision()
                if (i === 1) {
                    firestore().collection('revisionsStates').where('idAsset', '==', this.props.id).get().then(revisions => {
                        if (revisions.docs.length === 0) {
                            this.state.revision.typeRevision = 'Revisión programada'
                            this.nextRevision()
                            this.setState({
                                programada: true
                            })
                        } else {
                            revisions.forEach(revision => {
                                if (revision.data().revisionNumber === revisions.docs.length) {
                                    let fechaActual = new Date()
                                    let fechaMas = new Date(revision.data().nextRevision)
                                    fechaMas = fechaMas.setDate(fechaMas.getDate() + 5)
                                    fechaMas = new Date(fechaMas)
                                    let fechaMenos = new Date(revision.data().nextRevision)
                                    fechaMenos = fechaMenos.setDate(fechaMenos.getDate() - 5)
                                    fechaMenos = new Date(fechaMenos)

                                    console.log(fechaMas, fechaActual, fechaMenos);

                                    if (fechaMenos <= fechaActual && fechaMas >= fechaActual) {
                                        this.state.revision.typeRevision = 'Revisión programada'
                                        this.setState({
                                            programada: true
                                        })
                                    } else {
                                        swal("Aviso!", "No puedes crear una revisión programada porque la fecha debe estar entre este rango de ( " + dateFormat(fechaMenos, 'dd/mm/yyyy') + " - " + dateFormat(fechaMas, 'dd/mm/yyyy') + " )", "warning");
                                    }
                                } else {

                                }
                            })
                        }
                    })
                } else {
                    this.state.revision.typeRevision = 'Revisión aleatoria'
                    this.setState({ programada: true })
                }
            }
        })
    }

    handleCleanSignature() {
        let signature = this.refs.mySignature
        console.log(signature)
        signature.clear()
    }

    handleSaveSignature() {
        let signature = this.refs.mySignature
        let img = signature.toDataURL()
        var file = this.dataURLtoFile(img, 'firm.png');
        this.hanldeUploadDocument(file)
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    hanldeUploadDocument(e) {
        uploadImgCheck(e, (link) => {
            this.state.revision.sketch = link[0]

            this.setState({ upload: true, editsketch: true })
        }, (percentage) => {
            this.setState({ percentage: Math.round(percentage) })
        }, 'documentsState/'
        )
    }

    refresh() {
        this.setState({
            refresh: ''
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

    render() {
        if (this.state.revision === '') return <div>Cargando....</div>
        return (
            <div className="app flex-row align-items-center justify-content-center ">
                <div className="container">
                    <div className="card">
                        <div className="card-header text-center ">
                            <h4>REVISIÓN DEL INMUEBLE</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div id="contenidor-botons" className="col-12  mb-3" >
                                    <form action="" className="formulario">
                                        <div className="radio row">
                                            <input type="radio" name="typeRevision" id="programada" checked={this.state.revision.typeRevision === 'Revisión programada'} onChange={() => { this.newRevision(1) }} />
                                            <label className=" col-12 col-md-3" htmlFor="programada">Revisión programada</label>

                                            <input type="radio" name="typeRevision" id="aleatoria" checked={this.state.revision.typeRevision === 'Revisión aleatoria'} onChange={() => { this.newRevision(2) }} />
                                            <label className=" col-12 col-md-3" htmlFor="aleatoria">Revisión aleatoria</label>

                                            <input type="radio" name="typeRevision" id="consulta" readOnly checked={this.state.revision.typeRevision === 'Consulta'} onChange={() => { this.consulta() }} />
                                            <label className=" col-12 col-md-3" htmlFor="consulta">Consulta</label>
                                        </div>
                                    </form>
                                </div>
                                {this.state.programada &&
                                    <div className="col-12">
                                        <div className="row" >
                                            <div className="col-md-6 col-lg-3 mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-addon" id="basic-addon1">Revisión #</span>
                                                    <input type="text" className="form-control" aria-label="numRevision" value={this.state.revision.revisionNumber} onChange={(e) => { this.state.revision.revisionNumber = e.target.value, this.refresh() }} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-3 mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-addon" id="basic-addon1">Fecha</span>
                                                    <input type="text" className="form-control" value={this.state.revision.dateRevision} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-2 mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-addon" id="basic-addon1">Hora</span>
                                                    <input type="text" className="form-control" aria-label="Hora" value={this.state.revision.hour} readOnly />
                                                </div>
                                            </div>
                                            {this.state.revision.typeRevision === 'Revisión programada' &&
                                                <div className="col-md-6 col-lg-4 mb-3">
                                                    <div className="input-group">
                                                        <span className="input-group-addon" id="basic-addon1">Próxima revisión</span>
                                                        <input type="text" className="form-control" aria-label="proximaRevision" value={dateFormat(this.state.revision.nextRevision, 'dd/mm/yyyy')} readOnly />
                                                    </div>
                                                </div>
                                            }
                                            <div className="col-12 col-md-6 col-lg-5 mt-3 ">
                                                <div className="input-group">
                                                    <span className="input-group-addon" id="basic-addon1">ID QR</span>
                                                    <input type="text" className="form-control" aria-label="proximaRevision" value={this.state.revision.idQR} onChange={(e) => { this.state.revision.idQR = e.target.value, this.refresh() }} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="alert alert-primary textCenter mt-3 ">
                                                    DATOS DEL RESPONSABLE
                                                </div>
                                            </div>
                                            {this.state.revision.dataResponsable.map((responsable, index) => {
                                                return (
                                                    <div key={index} className="col-12">
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-12 col-lg-4 ">
                                                                <div className="input-group">
                                                                    <span className="input-group-addon" id="basic-addon1">Régimen Fiscal*</span>
                                                                    <select name="" className="form-control" id="" value={responsable.fiscalRegimen} onChange={(e) => { responsable.fiscalRegimen = e.target.value, this.validationResponsable(index) }} >
                                                                        <option value="null" name="owner" >Selecionar</option>
                                                                        <option value="Fisica">Física</option>
                                                                        <option value="Moral">Moral</option>
                                                                        <option value="Gobierno">Gobierno</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            {
                                                                responsable.fiscalRegimen === 'Fisica' &&
                                                                <ContactInformation
                                                                    data={responsable}
                                                                    id={index + 'fisica'}
                                                                    refresh={this.validationResponsable}
                                                                    i={index}
                                                                />
                                                            }
                                                            {
                                                                responsable.fiscalRegimen === 'Moral' &&
                                                                <div className="col-12 mt-3 ">
                                                                    <div className="input-group">
                                                                        <span className="input-group-addon" id="basic-addon1">Nombre de la entidad*</span>
                                                                        <input type="text" className="form-control" aria-label="proximaRevision" value={responsable.federalEntity} onChange={(e) => { responsable.federalEntity = e.target.value.toUpperCase(), this.validationResponsable(index) }} />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                responsable.fiscalRegimen === 'Gobierno' &&
                                                                <div className="col-12 mt-3 ">
                                                                    <div className="input-group">
                                                                        <span className="input-group-addon" id="basic-addon1">Nombre de la entidad*</span>
                                                                        <input type="text" className="form-control" aria-label="proximaRevision" value={responsable.federalEntity} onChange={(e) => { responsable.federalEntity = e.target.value.toUpperCase(), this.validationResponsable(index) }} />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        {index > 0 &&
                                                            <div className="col-md-1 mt-3">
                                                                <button className="btn btn-outline-dark btn-block" onClick={() => { this.deleteResponsable(1, index) }} ><i className="fas fa-minus" ></i></button>
                                                            </div>
                                                        }
                                                        <hr />
                                                    </div>
                                                )
                                            })}
                                            <div className="col-12 d-flex justify-content-end ">
                                                <div className=" col-3 col-md-2 col-lg-1 ">
                                                    <button className="btn btn-outline-dark btn-block" disabled={this.state.plus} onClick={() => { this.newResponsable(1) }} ><i className="fas fa-plus" ></i></button>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mt-3">
                                                <span className="mr-2" >Activo en uso</span>
                                                <label className="switch switch-text switch-pill switch-primary-outline">
                                                    <input type="checkbox" className="switch-input" checked={this.state.revision.activeUse} onChange={(e) => { this.state.revision.activeUse = e.target.checked, this.refresh() }} />
                                                    <span className="switch-label" data-on="On" data-off="Off"></span>
                                                    <span className="switch-handle"></span>
                                                </label>
                                            </div>
                                            {this.state.revision.activeUse &&
                                                <div>
                                                    <div className="col-12">
                                                        <div className="alert alert-primary textCenter mt-3 ">
                                                            DATOS DEL USUARIO
                                                        </div>
                                                    </div>
                                                    {this.state.revision.dataUser.map((user, index) => {
                                                        return (
                                                            <div key={index} >
                                                                <ContactInformation
                                                                    data={user}
                                                                    id={index + 'user'}
                                                                    refresh={this.validationResponsable}
                                                                    i={index}
                                                                />
                                                                {index > 0 &&
                                                                    <div className="col-md-1 mt-3">
                                                                        <button className="btn btn-outline-dark btn-block" onClick={() => { this.deleteResponsable(2, index) }} ><i className="fas fa-minus" ></i></button>
                                                                    </div>
                                                                }
                                                                <hr />
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="col-12 d-flex justify-content-end ">
                                                        <div className="col-3 col-md-2 col-lg-1">
                                                            <button className="btn btn-outline-dark btn-block" onClick={() => { this.newResponsable(2) }} ><i className="fas fa-plus" ></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            <div className="col-12">
                                                <div className="alert alert-primary textCenter mt-3 ">
                                                    VALIDACIONES
                                                </div>
                                                <hr />
                                                <Validation 
                                                    id = {this.props.id}
                                                    revision = {this.state.revision}
                                                    active = {this.state.active}
                                                    refresh = {this.refresh}
                                                />
                                            </div>

                                            <hr />
                                            {!this.state.editsketch &&
                                                <div className="col-12">
                                                    <div className="alert alert-primary textCenter mt-3 ">
                                                        CROQUIS
                                                    </div>
                                                    <hr />
                                                    <div className={'margen'} >
                                                        <div ref='canvas' id="canvas" className='canvas-state'>
                                                            <SignaturePad clearButton="true" ref="mySignature" id="mySignature" />
                                                        </div>
                                                    </div>
                                                    <div className="row text-center">
                                                        <div className="col col-lg-6">
                                                            <Button title="Nuevo" outline color="danger" className="mr-3" style={{ "marginTop": "5px" }} onClick={() => this.handleCleanSignature()}>Borrar  <i className='fa fa-eraser'></i></Button>
                                                            <Button title="Nuevo" outline color="success" style={{ "marginTop": "5px" }} onClick={() => this.handleSaveSignature()}>Guardar <i className='far fa-save'></i></Button>
                                                            {this.state.revision.sketch && <button className="btn btn-outline-warning ml-3 " style={{ "marginTop": "5px" }} onClick={() => { this.setState({ editsketch: true }) }} >Cancelar</button>}
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {this.state.editsketch &&

                                                <div className="col-12">
                                                    <div className="alert alert-primary textCenter mt-3 ">
                                                        CROQUIS
                                                    </div>
                                                    <hr />
                                                    <img src={this.state.revision.sketch} style={{ width: '100%' }} alt="croquis" />
                                                    <div className="row text-center">
                                                        <div className="col col-lg-6">
                                                            <Button title="Nuevo" outline color="success" style={{ "marginTop": "5px" }} onClick={() => { this.setState({ editsketch: false }) }} >Editar <i className='far fa-save'></i></Button>
                                                        </div>
                                                    </div>
                                                </div>

                                            }

                                            {!this.state.edit &&
                                                <div className="col-12 mt-3 ">
                                                    <div className="row">
                                                        <div className=" col-12 col-md-6 mb-3 ">
                                                            <Link to="/assets" className="btn btn-danger btn-block" >Cancelar</Link>
                                                        </div>
                                                        <div className=" col-12 col-md-6" >
                                                            <button className="btn btn-success btn-block" onClick={() => this.handleOnSubmit()} >Guardar datos</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {this.state.edit &&
                                                <div className="col-12 mt-3">
                                                    <div className="row">
                                                        <div className=" col-12 col-md-6 mb-3 ">
                                                            <button className="btn btn-success btn-block" onClick={() => this.updateData()} >Actualizar datos</button>
                                                        </div>
                                                        <div className=" col-12  col-md-6">
                                                            <button className="btn btn-primary btn-block" onClick={() => this.newInmueble()} >Empezar alta de inmuebles</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }
                                {this.state.revision.typeRevision === 'Consulta' &&
                                    <div className="col-12" >
                                        {this.state.revisions.length === 0 &&
                                            <h3 className="text-center" >NO HAY REVISIONES</h3>
                                        }
                                        {this.state.revisions.length > 0 &&
                                            <table className="table table-bordered table-responsive">
                                                <thead className="table-dark latterDark " >
                                                    <tr>
                                                        <th>#</th>
                                                        <th>TIPO DE REVISIÓN</th>
                                                        <th>FECHA</th>
                                                        <th>ESTATUS</th>
                                                        <th>EDITAR</th>
                                                        <th>BORRAR</th>
                                                        <th>VER REVISIÓN</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.revisions.map((revision, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td> {revision.typeRevision} </td>
                                                                <td> {revision.dateRevision} </td>
                                                                {revision.statusRevision === 'finished' &&
                                                                    <td>Finalizado</td>
                                                                }
                                                                {revision.statusRevision === 'process' &&
                                                                    <td>En proceso</td>
                                                                }
                                                                <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.editRevision(revision.crumb, index)} ><i className="fas fa-edit"></i>  </button></td>
                                                                <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.deleteRevision(revision.crumb, index)}><i className="far fa-trash-alt"></i>  </button></td>
                                                                <td><Link className="btn btn-outline-dark btn-block " to={'/viewBuildings/' + revision.crumb} ><i className="fas fa-eye"></i></Link></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Revisions
