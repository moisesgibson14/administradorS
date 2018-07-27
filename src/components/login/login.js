import React, { Component } from 'react';
import { CardHeader, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Alert } from "reactstrap";
import axios from 'axios'
import { hashHistory } from 'react-router'
import firebase, { firestore } from 'firebase'
import swal from 'sweetalert'
import './styles.css'
import Cryptr from 'cryptr'
var cryptr = new Cryptr('satesSeguro8102')

class Login extends Component {

  constructor() {
    super()
    this.state = {
      errorLogin: '',
      email: '',
      password: '',
      emailValid: true,
      emptyFields: false,
      remenber: false,
      authorization:{}
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleRecoverPassword = this.handleRecoverPassword.bind(this)
    this.handleDataLocal = this.handleDataLocal.bind(this)
  }

  handleDataLocal(callback) {
    // Mantener la sesión iniciada
    let atadresu = {
      one: cryptr.encrypt(this.state.email),
      two: cryptr.encrypt(this.state.password)
    }
    localStorage.setItem('atadresu', JSON.stringify(atadresu))
    callback()
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.state.email !== '' && this.state.password !== '') {
      var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (reg.test(this.state.email) && regOficial.test(this.state.email)) {
                  firebase.auth().setPersistence((this.state.remenber) ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION).then(() => {
                    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                      firestore().collection('users').where('email', '==', this.state.email).onSnapshot(data => {
                        data.forEach(user => {
                            if (user.exists) {
                              this.state.authorization = user.data().authorization
                              localStorage.setItem('userAthorization', JSON.stringify(user.data().authorization))
                            }
                        })
                      })
                      this.handleDataLocal(() => {
                        return hashHistory.push('/')
                      })
                    }).catch(err => {
                      if (err.code === 'auth/user-not-found') {
                        swal("Error", 'La cuenta no existe', "error")
                        this.setState({
                          emailValid: true,
                          emptyFields: false
                        })
                      } else if (err.code === 'auth/wrong-password') {
                        swal("Error", 'Credenciales incorrectas', "error")
                        this.setState({
                          emailValid: true, emptyFields: false
                        })
                      }
                    })
                  }).catch(err => console.log('Error: ', err))
      } else {
        this.setState({emailValid: false,emptyFields: false})
      }
    } else {
      this.setState({
        emptyFields: true
      })
    }
  }

  handleRecoverPassword() {
    swal("Ingrese su correo electrónico:", {
      content: "input",
      buttons: ['Cancelar', 'Restablecer contraseña']
    }).then((value) => {
      if (value) {
        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (reg.test(value) && regOficial.test(value)) {
          firebase.auth().sendPasswordResetEmail(value).then(() => {
            swal("Listo!", "Pronto recibirás un correo electrónico para restablecer tu contraseña. Revisa la carpeta de spam y la papelera si no encuentras el correo electrónico.", "success");
          }).catch(function (error) {
            swal("Error", "No hay registro del usuario correspondiente a este email. El usuario puedo ser eliminado.", "error")
          })
        } else {
          swal("Error", "Correo electrónico no valido", "error")
        }
      }
    })
  }

  render() {
    const { errorLogin, emailValid, emptyFields } = this.state
    return (
      <div style={{ "backgroundImage": 'url(https://image.ibb.co/bR0MMm/circuito_3mb_iloveimg_compressed.gif)' }} className="app flex-row align-items-center">
        <div className="container mt-3" >
          <div className="row">
          </div>
          <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4" >
              <Card style={{ opacity: '0.9', borderRadius: '20px' }} >
                <CardHeader className="text-center" style={{ background: '#fff', borderRadius: '19px 19px 0px 0px' }} >
                  <img src='https://image.ibb.co/bycQCR/logo.gif' style={{ width: '100%', opacity: '1' }} alt="" />
                </CardHeader>
                <CardBody className="card-body">
                  <form
                    onSubmit={this.onSubmit}
                    ref={(login) => this.formLogin = login}
                    noValidate
                  >
                    <label>Correo electrónico:</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="icon-envelope"></i></InputGroupAddon>
                      <input type="email" onChange={(e) => this.setState({ email: e.target.value })} className={`form-control col-md-12`} name='email' />
                    </InputGroup>
                    <br />
                    {emailValid === false &&
                      <Alert color="warning text-center">
                        Correo electrónico incorrecto
                     </Alert>
                    }
                    <br />
                    <label>Contraseña:</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="icon-lock"></i></InputGroupAddon>
                      <input type="password" onChange={(e) => this.setState({ password: e.target.value })} className={`form-control col-md-12`} name='password' />
                    </InputGroup>
                    <br />
                    {errorLogin === true &&
                      <Alert color="warning text-center">
                        Credenciales incorrectas
                     </Alert>
                    }
                    {emptyFields === true &&
                      <Alert color="warning text-center">
                        Llenar campos vacios
                     </Alert>
                    }
                    <button style={{ "marginTop": "5px" }} className="btn-block btn btn-success" type="submit"> <i className="icon-lock-open" ></i> Ingresar</button>
                    <div className="text-center">
                      <div className="checkbox mt-2">
                        <input type="checkbox" name="checkbox" id="remenber" onChange={(e) => this.setState({ remenber: e.target.checked })} />
                        <label htmlFor="remenber">Mantener la sesión activa</label>
                      </div>
                    </div>
                  </form>
                  <div className="text-center mt-2">
                    <a style={{ cursor: 'pointer' }} className="text-center" onClick={() => this.handleRecoverPassword()} >¿Has olvidado la contraseña?</a>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
