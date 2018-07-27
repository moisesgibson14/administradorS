import React, { Component } from 'react'
import DataBasic from './components/dataBasic'
import FiscalAddress from './components/fiscalAddress'
import Contacts from './components/contacts'
import Furniture from './components/furniture'
import user from './modelUser'
import Estate from './components/estate'
import BankAccounts from './components/bankAccounts'
import Documentation from './components/documentation'
import LogoOwner from './subComponents/logoOwner'
import swal from 'sweetalert'
import { interiorPatios, outdoorPatios, largerThan, lessThan, aesthetic } from './gesturesTypes'
import { firestore } from 'firebase'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { hashHistory } from 'react-router'

export default class RegisterOwner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            edit: false,
            ok: false,
            statusAuthorization:false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAssingData = this.handleAssingData.bind(this)
    }

    componentDidMount() {
        let authorization = JSON.parse(localStorage.getItem('userAthorization'))
        authorization.forEach((element,index) => { 
          console.log(element);
          
            if(element.label === "Propietarios" && element.value == true){
              this.setState({
                statusAuthorization:true
              })
            }
        });

        if (this.props.match.params.id) {
            this.setState({ ok: false })
            $('.loading').css({ 'display': 'block' })
            firestore().collection('usersOwner').doc(this.props.match.params.id).onSnapshot(owner => {
                if (owner.exists) {
                    this.setState({ user: owner.data(), edit: true, ok: true })
                    $('.loading').css({ 'display': 'none' })
                } else {
                    $('.loading').css({ 'display': 'none' })
                    this.setState({ ok: false })
                    swal("Propietario", "No existe el registro", "error")
                }
            })
        } else {
            user.user((userModel) => {
                this.setState({ user: userModel, ok: true })
            })
        }
        this.refresh = this.refresh.bind(this)
    }

    refresh() {
        this.setState({ refresh: '' })
    }
    handleAssingData() {
        interiorPatios((interior) => {
            this.state.user.furnitures['vehicles'].gestures['interiorPatios'] = interior
            this.refresh()
        })
        outdoorPatios((outdoor) => {
            this.state.user.furnitures['vehicles'].gestures['outdoorPatios'] = outdoor
            this.refresh()
        })
        largerThan((larger) => {
            this.state.user.furnitures['vehicles'].transfers['largerThan'] = larger
            this.refresh()
        })
        lessThan((less) => {
            this.state.user.furnitures['vehicles'].transfers['lessThan'] = less
            this.refresh()
        })
        aesthetic((aesthetic) => {
            this.state.user.furnitures['vehicles'].aesthetic['typeAesthetic'] = aesthetic
            this.refresh()
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let taxRegime = this.state.user.taxRegime
        let idOwner = this.state.user.idOwner
        let postalCode = this.state.user['taxDomicile'].postalCode
        let municipality = this.state.user['taxDomicile'].municipality
        let state = this.state.user['taxDomicile'].state
        let RFC = this.state.user.RFC
        let socialReason = this.state.user.socialReason
        let tradeName = this.state.user.tradeName
        let legalRepresentative = this.state.user.legalRepresentative
        if (taxRegime === '' || idOwner === '' || postalCode === '' || municipality === '' || state === '') {
            swal("Incompleto", "Favor de llenar los campos obligatorios *", "info")
        } else {
            if (taxRegime === 'moral' || taxRegime === 'gobierno') {
                if (RFC === '' || socialReason === '' || tradeName === '' || legalRepresentative === '') {
                    swal("Incompleto", "Favor de llenar los campos obligatorios *", "info")
                } else {
                    if (this.state.edit) {
                        firestore().collection('usersOwner').doc(this.props.match.params.id).update(this.state.user).then(() => {
                            return hashHistory.push('/owners')
                        }).catch(err => swal("Propietario", "No se actualizó correctamente", "error"))
                    } else {
                        firestore().collection('usersOwner').add(this.state.user).then((owner) => {
                            return hashHistory.push('/owners')
                        }).catch(err => console.log(err))
                    }
                }
            } else {
                if (RFC === '' || legalRepresentative === '') {
                    swal("Incompleto", "Favor de llenar los campos obligatorios *", "info")
                } else {
                    if (this.state.edit) {
                        firestore().collection('usersOwner').doc(this.props.match.params.id).update(this.state.user).then(() => {
                            return hashHistory.push('/owners')
                        }).catch(err => swal("Propietario", "No se actualizó correctamente", "error"))
                    } else {
                        firestore().collection('usersOwner').add(this.state.user).then((owner) => {
                            return hashHistory.push('/owners')
                        }).catch(err => console.log(err))
                    }
                }
            }
        }
    }

    render() {
        if (!this.state.ok) return <h5>Cargando...</h5>
        if (!this.state.statusAuthorization) return <h5>NO TIENES PERMISOS</h5>
        if (this.state.user !== '') {
            if (this.state.user.furnitures['vehicles'].gestures['interiorPatios'].length === 0) {
                this.handleAssingData()
            }
        }
        return (
            <div>
                <div className="card">
                    <div className="card-header text-center">
                        <h5>ALTA DE PROPIETARIO</h5>
                    </div>
                    <div className="card-body">
                        <h5>DATOS BÁSICOS</h5>
                        <div className="card">
                            <div className="card-header">
                                <DataBasic user={this.state.user} refresh={this.refresh} />
                            </div>
                        </div>
                        <h5>DIRECCIÓN FISCAL</h5>
                        <div className="card">
                            <div className="card-header">
                                <FiscalAddress user={this.state.user} refresh={this.refresh} />
                            </div>
                        </div>
                        <h5>CONTACTOS</h5>
                        <div className="card">
                            <div className="card-header">
                                <Contacts user={this.state.user} refresh={this.refresh} />
                            </div>
                        </div>
                        <div className="alert alert-dark text-center" role="alert">
                            <strong>SERVICIOS POR TIPO DE ACTIVO</strong>
                        </div>
                        <Furniture user={this.state.user} refresh={this.refresh} />
                        <Estate user={this.state.user} refresh={this.refresh} />
                        <div className="alert alert-dark text-center" role="alert">
                            <strong>CUENTAS BANCARIAS</strong>
                        </div>
                        <BankAccounts user={this.state.user} refresh={this.refresh} />
                        <div className="alert alert-dark text-center" role="alert">
                            <strong>DOCUMENTACIÓN</strong>
                        </div>
                        <Documentation user={this.state.user} refresh={this.refresh} />
                        <div className="alert alert-dark text-center mt-5" role="alert">
                            <strong>LOGO</strong>
                        </div>
                        <LogoOwner user={this.state.user} refresh={this.refresh} />

                        <div className="row mt-5">
                            <div className="col col-md-6">
                                <Link to="/owners">
                                    <button type="button" className="btn btn-danger btn-block"><strong> <i className="fas fa-ban"></i> Cancelar</strong></button>
                                </Link>
                            </div>
                            <div className="col col-md-6">
                                <button type="submit" onClick={(e) => this.handleSubmit(e)} className="btn btn-success btn-block">
                                    <strong> <i className="far fa-save"></i> {(this.state.edit) ? 'Actualizar' : 'Guardar'}</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
