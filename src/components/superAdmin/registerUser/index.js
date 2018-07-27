import React, { Component } from 'react'
import { Container, CardHeader, Row, Col, CardGroup, Card, Label, CardBody, Button, Input, InputGroup, InputGroupAddon, Alert } from "reactstrap";
import './index.scss'
import firebase from 'firebase'
import { hashHistory } from 'react-router'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Cryptr from 'cryptr'
var cryptr = new Cryptr('satesSeguro8102')
import { assignProfiles } from './profiles'
import dateFormat from 'dateformat'
import NewUser from './modelUser'

export default class RegisterUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profiles: [],
      refresh: '',
      user: '',
      edit: false,
      percentage: 0,
      ok: '',
      emailValid: true,
      visible: false,
      passwordTMP: '',
      passwordError: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    let authorization = JSON.parse(localStorage.getItem('userAthorization'))
    // if(authorization.length > 0){
    //   authorization.forEach((element,index) => {
    //       if(element[index].label === "Usuarios" && element[index].value == true){
    //         console.log('si esta dentro');

    //       }else{
    //         console.log('no esta drentro');

    //       }
    //   });
    // }
    if (this.props.match.params.id) {
      $('.loading').css({ 'display': 'block' })
      firebase.firestore().collection('users').doc(this.props.match.params.id).onSnapshot(user => {
        if (user.exists) {
          this.setState({ user: user.data(), edit: true })
          $('.loading').css({ 'display': 'none' })
        }
      })
    } else {

      NewUser(user=>{
        this.setState({ user: user })
      })

    }
    assignProfiles((profiles) => {
      this.setState({
        profiles: profiles
      })
    })
  }

  onSubmit(e) {
    e.preventDefault()
    let user = this.state.user
    if (this.state.edit) {
      firebase.firestore().collection('users').doc(this.props.match.params.id).update(this.state.user).then(() => {
        return hashHistory.push('/users')
      }).catch(err => swal("Error", 'No se pudo actualizar el usuario', "error"))
      return hashHistory.push('/users')
    } else {
      if (user.name !== '' && user.email !== '' !== '' && user.profile !== '') {
        if (user.password === this.state.passwordTMP) {
          this.setState({ passwordError: false })
          var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          if (reg.test(user.email) && regOficial.test(user.email)) {
            // Guardo los datos del usuario actual 
            let userLocal = JSON.parse(localStorage.getItem('atadresu'))
            let dataUserLogged = {
              email: cryptr.decrypt(userLocal.one),
              password: cryptr.decrypt(userLocal.two)
            }
            // Termina de obtener los datos
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(() => {
              delete user.password
              firebase.firestore().collection('users').add(user).then((doc) => {
                firebase.auth().signInWithEmailAndPassword(dataUserLogged.email, dataUserLogged.password).then(() => {
                  return hashHistory.push('/users')
                })
              }).catch(err => {
                swal("Error", 'No se pudo crear el usuario.', "error")
              })
            }).catch(err => {
              if (err.code === 'auth/email-already-in-use') {
                swal("Error", 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.', "error")
              }
              if (err.code === 'auth/invalid-email') {
                swal("Error", 'La dirección de correo electrónico no es valido.', "error")
              }
              if (err.code === 'auth/weak-password') {
                swal("Error", 'La contraseña es debil.', "error")
              }
            })
          } else {
            this.setState({ emailValid: false })
          }
        } else {
          this.setState({ passwordError: true })
        }
      } else {
        this.setState({ ok: false })
      }
    }
  }

  refresh() {
    this.setState({ refresh: '' })
  }

  render() {
    const { user, profiles, upload, ok, emailValid, passwordError, visible } = this.state;
    if (user === '') return <h5>Cargando...</h5>
    if (!profiles) return <h3>Obteniendo perfiles...</h3>
    return <div>
      <section className="user-data-sates">
  
        <div className="headerSections flex-sates">
          <h2><Link to={'/users'} className=""><span><i className="fas fa-arrow-left accountantArrow"></i></span></Link>Datos de Usuario</h2>
				</div>
        <div className="wrapper">

          <form className="userCreate" onSubmit={this.onSubmit} noValidate>

            <h3 className="info-title">Datos Personales</h3>

            {/* Nombre */}
            <div className="input-sates createUserName">
              <label htmlFor="name">Nombre completo: <strong>*</strong></label>
              <input
                onChange={(e) => { this.state.user['name'] = e.target.value, this.refresh() }} value={user.name}
                type="text" id="name"
              />
            </div>

            <div className="form-flex">
              {/* Celular */}
              <div className="input-sates">
                <label htmlFor="cellPhone">Teléfono celular: <strong>*</strong></label>
                <input
                  value={user.cellPhone}
                  onChange={(e) => { this.state.user['cellPhone'] = e.target.value, this.refresh() }}
                  type="number" id="cellPhone"
                />
              </div>

              {/* Email */}
              <div className="input-sates">
                <label htmlFor="email">Email:<strong>*</strong> </label>
                <input
                  value={user.email}
                  onChange={(e) => { this.state.user['email'] = e.target.value, this.refresh() }}
                  type="email" id="email"
                  disabled={(this.state.edit) ? true : false}
                />
                {
                  emailValid === false &&
                  <span className="text-danger" >Email incorrecto</span>
                }
              </div>

              <div className="input-sates">
                <label htmlFor="user">Usuario:</label>
                <input
                  value={user.user}
                  onChange={(e) => { this.state.user['user'] = e.target.value, this.refresh() }}
                  type="text" id="user"
                />
              </div>
            </div>

            {/* Empresa */}
            <h3 className="info-title">Datos de compañía</h3>

            <div className="form-flex">
              <div className="input-sates">
                <label htmlFor="business">Nombre Comercial/Empresa:</label>
                <input
                  value={user.tradename}
                  onChange={(e) => { this.state.user['tradename'] = e.target.value, this.refresh() }}
                  type="text" id="business"
                />
              </div>

              {/* tel oficina */}
              <div className="input-sates">
                <label htmlFor="officePhone">Teléfono oficina:</label>
                <input
                  value={user.officePhone}
                  onChange={(e) => { this.state.user['officePhone'] = e.target.value, this.refresh() }}
                  type="number" id="officePhone"
                />
              </div>

              {/* Puesto */}
              <div className="input-sates">
                <label htmlFor="jobPost">Puesto:</label>
                <input
                  value={user.job}
                  onChange={(e) => { this.state.user['job'] = e.target.value, this.refresh() }}
                  type="text" id="jobPost"
                />
              </div>
            </div>

            {/* Datos de cuenta */}
            <h3 className="info-title">Datos de cuenta</h3>

            <div className="form-flex">
              {/* Contraseña */}
              <div className="input-sates">
                <label htmlFor="password">Contraseña:<strong>*</strong> </label>
                <input
                  placeholder={(this.state.edit) ? "**********" : ''}
                  onChange={(e) => { this.state.user['password'] = e.target.value, this.refresh() }}
                  type={(this.state.visible) ? 'text' : "password"} id="password"
                  disabled={(this.state.edit) ? true : false}
                />
                {
                  !this.state.edit &&
                  <div>
                    <button type="button" onClick={() => this.setState({ visible: !this.state.visible })}
                      className="btn-eye"><i className={(visible) ? "fas fa-eye-slash" : "fas fa-eye"} ></i>
                    </button>
                  </div>
                }
              </div>

              {/* Repetir Contraseña */}
              <div className="input-sates">
                <label htmlFor="passwordRepeat">Repetir contraseña:<strong>*</strong> </label>
                <input
                  placeholder={(this.state.edit) ? "**********" : ''}
                  onChange={(e) => this.setState({ passwordTMP: e.target.value })}
                  type={(this.state.visible) ? 'text' : "password"} id="passwordRepeat"
                  disabled={(this.state.edit) ? true : false}
                />
                {
                  !this.state.edit &&
                  <div>
                    <button type="button" onClick={() => this.setState({ visible: !this.state.visible })}
                      className="btn-eye"><i className={(visible) ? "fas fa-eye-slash" : "fas fa-eye"} ></i>
                    </button>
                  </div>
                }
              </div>

              {/* Perfil */}
              <div className="input-sates">
                <label htmlFor="role">Tipo de perfil:<strong>*</strong></label>
                <select
                  value={user.profile}
                  onChange={(e) => { this.state.user['profile'] = e.target.value, this.refresh() }}
                  name="role">
                  <option>Selecione un perfil</option>
                  {
                    profiles.map((profile, index) => (
                      <option key={index} value={profile.id}>
                        {profile.label}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>


            {/* Alertas */}
            <div className="form-flex form-alerts">
              {
                this.state.edit &&
                <div className="dataCreate form-flex">
                  <div className="input-sates">
                    <label>Usuario quien realizó alta:</label>
                    <div>
                      <strong>{this.state.user['registerUser']}</strong>
                    </div>
                  </div>


                  <div className="input-sates">
                    <label>Fecha de creación:</label>
                    <div>
                      <strong>{dateFormat(this.state.user['creationDate'], "dd/mm/yy - h:MM:ss TT")}</strong>
                    </div>
                  </div>
                </div>
              }

              {/* Botones / Acciòn */}
              <div className="form-btns-sates">
                <div>
                  <Link to='/users'>
                    <button className="btn-cancel"><i className="fas fa-ban"></i>Cancelar</button>
                  </Link>
                </div>
                <div>
                  <button type="submit">
                    <i className="far fa-save"></i><strong>{(this.state.edit) ? ' Actualizar' : ' Guardar'} </strong>
                  </button>
                </div>
              </div>
            </div>

            <input id="uploadImages" style={{ display: 'none' }} type="file" accept="image/*" capture="camera" multiple onChange={(e) => this.handleDrop(e)} />
            {
              ok === false &&
              <div className="alert alert-warning text-center" role="alert">
                <strong>LLenar campos obligatorios*</strong>
              </div>
            }
            {
              passwordError === true &&
              <div className="alert alert-warning text-center" role="alert">
                <strong>Las contraseñas no coinciden</strong>
              </div>
            }

          </form>
        </div>
      </section>
    </div>;
  }
}


