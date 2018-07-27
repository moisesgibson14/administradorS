import React, { Component } from 'react'
import { Container, CardHeader, Row, Col, CardGroup, Card, Label, CardBody, Button, Input, InputGroup, InputGroupAddon, Alert } from "reactstrap";
import { uploadFiles } from '../../uploadFiles'
// import '../registerUser/index.scss'
import firebase from 'firebase'
import { hashHistory } from 'react-router'
import { Link } from 'react-router-dom'
import CutImage from '../../cutImage'

import $ from 'jquery'
import { assignProfiles } from '../superAdmin/registerUser/profiles'

export default class ProfileUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            refresh: '',
            user: '',
            upload: true,
            edit: false,
            percentage: 0,
            ok: '',
            emailValid: true,
            user: {},
            password: '',
            email: '',
            iduser: '',
            passwordTMP: '',
            passwordError: false,
            visible: false,
            percentege: 0,
            file: '',
            archivo: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        //this.handleDrop = this.handleDrop.bind(this)
        this.refresh = this.refresh.bind(this)
        this.fileSave = this.fileSave.bind(this)
        this.saveImage = this.saveImage.bind(this)
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        if (user) {
            // Obtener el usuario de la BD de Firestore
            firebase.firestore().collection('users').where('email', '==', user.email).get().then((snap) => {
                snap.forEach(user => {
                    this.setState({
                        user: user.data(),
                        iduser: user.id
                    })
                })
            }).catch(err => alert('Error: ', err))
        }
        assignProfiles((profiles) => {
            this.setState({
                profiles: profiles
            })
        })


        // ++++++
        $('.btn-account-edit').click( () => {
            $('.btn-account-edit').hide();
            $('.form-btns-sates').fadeIn();

            $('.my-account-form').find('input').prop('disabled', false).css({
                borderBottom: '1px solid #3498db'
            })

        })
        $('.btn-avatar').click( () => {
            $('.btn-account-edit').hide();
            $('.form-btns-sates').fadeIn();

            $('.my-account-form').find('input').prop('disabled', false).css({
                borderBottom: '1px solid #3498db'
            })

        })

    }

    onSubmit(e) {
        e.preventDefault()
        var user = this.state.user
        var userAuth = firebase.auth().currentUser;
        if (this.state.email !== '') {
            var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (reg.test(this.state.email) && regOficial.test(this.state.email)) {
                userAuth.updateEmail(this.state.email).then(function () {
                    firebase.firestore().collection('users').doc(this.state.iduser).update(this.state.user).then(() => {
                        this.setState({ ok: true })
                        swal("Correcto", 'Datos actualizados correctamente', "success")
                    }).catch(err => swal("Error", 'No se pudo actualizar el usuario', "error"))
                }).catch(err => swal("Error", 'No se pudo actualizar el correo electrónico', "error"))
            } else {
                this.setState({ emailValid: false })
            }
        } else if (this.state.password !== '') {
            if (this.state.password === this.state.passwordTMP) {
                this.setState({ passwordError: false })
                userAuth.updatePassword(this.state.password).then(function () {
                    firebase.firestore().collection('users').doc(this.state.iduser).update(this.state.user).then(() => {
                        this.setState({ ok: true })
                    }).catch(err => swal("Error", 'No se pudo actualizar el usuario', "error"))
                }).catch(err => swal("Correcto", 'Datos actualizados correctamente', "success"))
            } else {
                this.setState({ passwordError: true })
            }
        }
        if (this.state.email === '' && this.state.password === '') {
            firebase.firestore().collection('users').doc(this.state.iduser).update(this.state.user).then(() => {
                this.setState({ ok: true })
                swal("Correcto", 'Datos actualizados correctamente', "success")
            }).catch(err => swal("Error", 'No se pudo actualizar el usuario', "error"))
        }
    }

    // handleDrop(e) {
    //     this.setState({ upload: false })
    //     uploadFiles(e, (links) => {
    //         this.state.user['avatar'] = ''
    //         this.setState({ upload: true })
    //         this.state.user['avatar'] = links[0]
    //         this.setState({ upload: true })
    //     }, (percentage) => {
    //         this.setState({ percentage: Math.round(percentage) })
    //     }, 'photosProfiles/')
    // }

    fileSave(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                archivo: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    saveImage(image) {
        this.state.user['avatar'] = image
        this.setState({
            archivo: ''
        })
    }

    refresh() {
        this.setState({ refresh: '' })
    }

    render() {
        const { user, profiles, upload, ok, emailValid, passwordError } = this.state;
        if (user.email === '' || !profiles) {
            $('.loadingUser').css({ 'display': 'block' })
        } else {
            $('.loadingUser').css({ 'display': 'none' })
        }
        if (!profiles) return <h3>Obteniendo perfiles...</h3>
        return <div>
            <section className="mysaccount-sates">
                <h2>Mi Cuenta</h2>

                <div className="wrapper">
                    <form className="my-account-form" onSubmit={this.onSubmit} noValidate >
                        <div className="form-flex">
                            {/* Photo */}
                            <div className="my-account-img">
                                <input id="uploadImages" style={{ display: 'none' }} type="file" accept="image/*" onChange={(e) => this.fileSave(e)} />
                                <label className="btn-avatar" htmlFor="uploadImages"><i className="fas fa-camera"></i></label>

                                {this.state.archivo &&
                                    <CutImage
                                        saveFile={this.saveImage}
                                        state={this.state}
                                        refresh={this.refresh}
                                    />
                                }
                                {
                                    user.avatar === '' &&
                                    upload === true &&
                                    <div>
                                        <label style={{ cursor: 'pointer' }} htmlFor="uploadImages">
                                            <figure>
                                                <img style={{ maxWidth: '180px', maxHeight: '1800px' }} src="https://firebasestorage.googleapis.com/v0/b/satespruebas-ab39e.appspot.com/o/gifs%2Fcamara_2.gif?alt=media&token=1578d097-26e8-4bd4-b768-ed930a239887" />
                                            </figure>
                                        </label>
                                    </div>
                                }
                                <label style={{ cursor: 'pointer' }}>
                                    <figure>
                                        <img src={this.state.user['avatar']} style={{ maxWidth: '180px', maxHeight: '180px' }} />
                                    </figure>
                                </label>
                                <br />
                                {
                                    upload === false &&
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                                    </div>
                                }
                                {
                                    ok === false &&
                                    upload === true &&
                                    <div className="alert alert-warning text-center" role="alert">
                                        <strong>LLenar campos obligatorios*</strong>
                                    </div>
                                }

                                <div className="my-account-profile">
                                    <span>
                                        {
                                            profiles.map((profile, index) => (
                                                (profile.id === user.profile) ? profile.label : ''
                                            ))
                                        }
                                    </span>
                                </div>
                            </div>
                            
                            <div className="container-sates">
                                {/* Data user */}
                                <div className="my-account-header">
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                </div>
                                
                                <div className="form-flex">
                                    {/* Column Left */}
                                    <div className="form-column-sates">
                                        <div className="input-sates">
                                            <label htmlFor="name">Nombre completo<strong>*</strong> </label>
                                            <input
                                                onChange={(e) => { this.state.user['name'] = e.target.value, this.refresh() }} value={user.name}
                                                type="text" id="name" disabled
                                            />
                                            </div>

                                            {/* Email */}
                                            <div className="input-sates">
                                                <label htmlFor="email">Email<strong>*</strong> </label>
                                                <input
                                                    value={user.email}
                                                    onChange={(e) => { this.setState({ email: e.target.value }), this.refresh() }}
                                                    type="email" id="email"
                                                    disabled
                                                />
                                                {
                                                    emailValid === false &&
                                                    <span className="text-danger" >Email incorrecto</span>
                                                }
                                            </div>

                                            {/* Cell */}
                                            <div className="input-sates">
                                                <label htmlFor="cellPhone">Teléfono celular</label>
                                                <input
                                                    value={user.cellPhone}
                                                    onChange={(e) => { this.state.user['cellPhone'] = e.target.value, this.refresh() }}
                                                    type="number" id="cellPhone" disabled
                                                />
                                            </div>

                                        {/* job */}
                                        <div className="input-sates">
                                            <label htmlFor="jobPost">Puesto</label>
                                            <input
                                                value={user.job}
                                                onChange={(e) => { this.state.user['job'] = e.target.value, this.refresh() }}
                                                type="text" id="jobPost" disabled
                                            />
                                        </div>
                                    </div>

                                    {/* Column Right */}
                                    <div className="form-column-sates">
                                        {/* Company */}
                                        <div className="input-sates">
                                            <label htmlFor="business">Nombre Comercial/Empresa</label>
                                            <input
                                                value={user.tradename}
                                                onChange={(e) => { this.state.user['tradename'] = e.target.value, this.refresh() }}
                                                type="text" id="business" disabled
                                            />
                                        </div>

                                        {/* Tel office */}
                                        <div className="input-sates">
                                            <label htmlFor="officePhone">Teléfono oficina</label>
                                            <input
                                                value={user.officePhone}
                                                onChange={(e) => { this.state.user['officePhone'] = e.target.value, this.refresh() }}
                                                type="number" id="officePhone" disabled
                                            />
                                        </div>

                                        {/* User */}
                                        <div className="input-sates">
                                            <label htmlFor="user">Usuario</label>
                                            <input
                                                value={user.user}
                                                onChange={(e) => { this.state.user['user'] = e.target.value, this.refresh() }}
                                                type="text" id="user" disabled
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="input-sates">
                                            <label htmlFor="password">Contraseña<strong>*</strong> </label>
                                            <input
                                                placeholder="**********"
                                                onChange={(e) => { this.setState({ password: e.target.value }), this.refresh() }}
                                                type={(this.state.visible) ? 'text' : "password"} id="password" disabled
                                            />
                                        </div>

                                        {/* Password Repeat */}
                                        <div className="input-sates">
                                            <label htmlFor="passwordRepeat">Repetir contraseña<strong>*</strong> </label>
                                            <input
                                                placeholder="**********"
                                                onChange={(e) => this.setState({ passwordTMP: e.target.value })}
                                                type={(this.state.visible) ? 'text' : "password"} id="passwordRepeat"
                                                disabled={(this.state.edit) ? true : false} disabled
                                            />
                                        </div>
                                        
                                        {
                                            passwordError === true &&
                                            upload === true &&
                                            <div className="alert alert-warning text-center" role="alert">
                                                <strong>Las contraseñas no coinciden</strong>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        {/* Buttons */}
                        <div className="my-account-edit">
                            <div className="form-btns-sates" style={{ display: 'none' }}>
                                <div>
                                    <Link to='/'>
                                        <button className="btn-cancel" id="account-cancel"> <strong><i className="fas fa-ban"></i> Cancelar</strong></button>
                                    </Link>
                                </div>
                                <div>
                                    <button type="submit">
                                        <strong><i className="far fa-save"></i> Guardar</strong>
                                    </button>
                                </div>
                            </div>

                            <button type="button" className="btn-account-edit">
                                <i className="fas fa-edit"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* <div className="container" >
                <div className="row justify-content-center">
                    <div className="col col-xs-12 col-md-10 col-lg-8" >
                        <div className="card" >
                            <div className="card-header text-center">
                                <h4>Mi cuenta</h4>
                            </div>
                            <div className="card-body" >
                                <form onSubmit={this.onSubmit} noValidate >
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-4 col-form-label">Nombre completo<strong>*</strong> </label>
                                        <div className="col-sm-8">
                                            <input
                                                onChange={(e) => { this.state.user['name'] = e.target.value, this.refresh() }} value={user.name}
                                                type="text" className="form-control" id="name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="user" className="col-sm-4 col-form-label">Usuario</label>
                                        <div className="col-sm-8">
                                            <input
                                                value={user.user}
                                                onChange={(e) => { this.state.user['user'] = e.target.value, this.refresh() }}
                                                type="text" className="form-control" id="user"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="business" className="col-sm-4 col-form-label">Nombre Comercial/Empresa</label>
                                        <div className="col-sm-8">
                                            <input
                                                value={user.tradename}
                                                onChange={(e) => { this.state.user['tradename'] = e.target.value, this.refresh() }}
                                                type="text" className="form-control" id="business"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="jobPost" className="col-sm-4 col-form-label">Puesto</label>
                                        <div className="col-sm-8">
                                            <input
                                                value={user.job}
                                                onChange={(e) => { this.state.user['job'] = e.target.value, this.refresh() }}
                                                type="text" className="form-control" id="jobPost"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-4 col-form-label">Email<strong>*</strong> </label>
                                        <div className="col-sm-8">
                                            <input
                                                value={user.email}
                                                onChange={(e) => { this.setState({ email: e.target.value }), this.refresh() }}
                                                type="email" className="form-control" id="email"
                                            />
                                            {
                                                emailValid === false &&
                                                <span className="text-danger" >Email incorrecto</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="officePhone" className="col-sm-4 col-form-label">Teléfono oficina</label>
                                        <div className="col-sm-8">
                                            <input
                                                value={user.officePhone}
                                                onChange={(e) => { this.state.user['officePhone'] = e.target.value, this.refresh() }}
                                                type="number" className="form-control" id="officePhone"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="cellPhone" className="col-sm-4 col-form-label">Teléfono celular</label>
                                        <div className="col-sm-8">
                                            <input
                                                value={user.cellPhone}
                                                onChange={(e) => { this.state.user['cellPhone'] = e.target.value, this.refresh() }}
                                                type="number" className="form-control" id="cellPhone"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-sm-4 col-form-label">Contraseña<strong>*</strong> </label>
                                        <div className="col-sm-7">
                                            <input
                                                placeholder="**********"
                                                onChange={(e) => { this.setState({ password: e.target.value }), this.refresh() }}
                                                type={(this.state.visible) ? 'text' : "password"} className="form-control" id="password"
                                            />
                                        </div>
                                        <div className="col-sm-1">
                                            <button type="button" onClick={() => this.setState({ visible: !this.state.visible })}
                                                className="btn btn-outline-success"><i className={(!this.state.visible) ? "fa fa-eye" : 'fa fa-eye-slash'} ></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="passwordRepeat" className="col-sm-4 col-form-label">Repetir contraseña<strong>*</strong> </label>
                                        <div className="col-sm-7">
                                            <input
                                                placeholder="**********"
                                                onChange={(e) => this.setState({ passwordTMP: e.target.value })}
                                                type={(this.state.visible) ? 'text' : "password"} className="form-control" id="passwordRepeat"
                                                disabled={(this.state.edit) ? true : false}
                                            />
                                        </div>
                                        <div className="col-sm-1">
                                            <button type="button" onClick={() => this.setState({ visible: !this.state.visible })}
                                                className="btn btn-outline-success"><i className={(!this.state.visible) ? "fa fa-eye" : 'fa fa-eye-slash'} ></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="role" className="col-sm-4 col-form-label">Tipo de perfil<strong>*</strong></label>
                                        <div className="col-sm-8">
                                            <div className="alert alert-success" role="alert">
                                                <strong>
                                                    {
                                                        profiles.map((profile, index) => (
                                                            (profile.id === user.profile) ? profile.label : ''
                                                        ))
                                                    }
                                                </strong>
                                            </div>
                                        </div>
                                    </div>

                                    <input id="uploadImages" style={{ display: 'none' }} type="file" accept="image/*" onChange={(e) => this.fileSave(e)} />
                                    <label>Foto de perfil</label> <br />
                                    {this.state.archivo &&
                                        <CutImage
                                            saveFile={this.saveImage}
                                            state={this.state}
                                            refresh={this.refresh}
                                        />
                                    }
                                    {
                                        user.avatar === '' &&
                                        upload === true &&
                                        <div>
                                            <label style={{ cursor: 'pointer' }} htmlFor="uploadImages">
                                                <img style={{ maxWidth: '200px', maxHeight: '200px' }} src="https://firebasestorage.googleapis.com/v0/b/satespruebas-ab39e.appspot.com/o/gifs%2Fcamara_2.gif?alt=media&token=1578d097-26e8-4bd4-b768-ed930a239887" />
                                            </label>
                                        </div>
                                    }
                                    <label style={{ cursor: 'pointer' }} htmlFor="uploadImages">
                                        <img src={this.state.user['avatar']} className="rounded" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    </label>
                                    <br />
                                    {
                                        upload === false &&
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                                        </div>
                                    }
                                    {
                                        ok === false &&
                                        upload === true &&
                                        <div className="alert alert-warning text-center" role="alert">
                                            <strong>LLenar campos obligatorios*</strong>
                                        </div>
                                    }
                                    {
                                        passwordError === true &&
                                        upload === true &&
                                        <div className="alert alert-warning text-center" role="alert">
                                            <strong>Las contraseñas no coinciden</strong>
                                        </div>
                                    }
                                    <div className="row mt-3">
                                        <div className="col col-md-6">
                                            <Link to='/'>
                                                <button className="btn btn-danger btn-block"> <strong><i className="fas fa-ban"></i> Cancelar</strong></button>
                                            </Link>
                                        </div>
                                        <div className="col col-md-6">
                                            <button className="btn btn-success btn-block" type="submit">
                                                <strong><i className="far fa-save"></i> Guardar</strong>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>;
    }
}


