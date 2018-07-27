import React, { Component } from 'react'
import { firestore } from 'firebase'
import { Link } from 'react-router-dom'
import dateformat from 'dateformat'
import $ from 'jquery';
import swal from 'sweetalert'
import { confirmRequest } from '../../../swaIInputs'
import Cryptr from 'cryptr'
import userPermits from "../../../auth";
var cryptr = new Cryptr('satesSeguro8102')

export default class Owners extends Component {
  constructor() {
    super()

    this.state = {
      owners: [],
      statusAuthorization: false,
      auth: {},
      refresh: '',
      idasset:'',
      isGeneral:false
    }
    this.handleDeleteOwner = this.handleDeleteOwner.bind(this)
    this.handleCard = this.handleCard.bind(this);
    this.handleCardBack = this.handleCardBack.bind(this);
    this.backToPrincipal = this.backToPrincipal.bind(this)
  }

  componentDidMount() {
    this.userPermit()

    firestore().collection('usersOwner').onSnapshot(snap => {
      let ownersTMP = []
      snap.forEach(owner => {
        ownersTMP.push({ ...owner.data(), id: owner.id })
      })
      this.setState({ owners: ownersTMP })
    })

  }

  userPermit() {
    let userLocal = JSON.parse(localStorage.getItem('atadresu'))
    let userMail = cryptr.decrypt(userLocal.one)

    firestore().collection('users').where('email', '==', userMail).get().then(data => {

      data.forEach(user => {
        userPermits(user.data(), 'Propietarios', auth => {
          console.log(auth)
          this.state.auth.edit = auth.childrens[0].value
          this.state.auth.new = auth.childrens[2].value
          this.state.auth.delete = auth.childrens[1].value
          this.setState({
            refresh: ''
          })
        })
      })

    })
  }

  handleCard(indexCard) {
    $('.card-sates').removeClass('flipped');
    $('.card-satess' + indexCard).addClass('flipped');
  }

  handleCardBack(indexCard) {
    $('.card-satess' + indexCard).removeClass('flipped');
  }

  handleDeleteOwner(id) {
    confirmRequest('Eliminar propietario', 'El propietario se eliminara permanentemente y no se podrá recuperar su información', (ok) => {
      if (ok) {
        firestore().collection('usersOwner').doc(id).delete().then(() => {
          swal("Propietario", "Propietario eliminado correctamete", "success")
        }).catch(err => swal("Propietario no encontrado", "No se pudo eliminar propietario", "error"))
      }
    })
  }

  backToPrincipal(){
    this.setState({ isGeneral: false })
    this.state.idasset = ''
  }

  render() {
    console.log(this.state);

    let { owners, auth, idasset } = this.state
    return (
      <div>
        {/* <div className="card">
          <div className="card-header">
            <i className="fas fa-align-justify"></i> CONSULTA DE PROPIETARIOS
                        <Link to="/owner">
              <button type="button" className="btn btn-success float-right" ><i className="fas fa-user-plus"></i></button>
            </Link>
          </div>
          <table className="table table-bordered table-responsive ">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>LOGO</th>
                <th>NOMBRE COMERCIAL</th>
                <th>RAZÓN SOCIAL</th>
                <th>RFC</th>
                <th>TIPO DE ACTIVOS</th>
                <th>#ACTIVOS</th>
                <th>FECHA DE REGISTRO</th>
                <th>EDITAR</th>
                <th>ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {
                owners.map((owner, index) => (
                  <tr key={index}>
                    <td>{owner.idOwner}</td>
                    <td>
                      <img src={owner.logo} width="25" alt="" />
                    </td>
                    <td>{owner.tradeName}</td>
                    <td>{owner.socialReason}</td>
                    <td>{owner.RFC}</td>
                    <td>tipo activos</td>
                    <td>número activos</td>
                    <td>{dateformat(owner.creationDate, 'dd/mm/yy - hh:mm:ss TT')}</td>
                    <td>
                      <Link to={`/owner/${owner.id}`}>
                        <button type="button" className="btn btn-success"><i className="far fa-edit"></i></button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => this.handleDeleteOwner(owner.id)} type="button" className="btn btn-danger"><i className="fas fa-trash-alt"></i> </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div> */}

        <section className="owners-sates">
          {/* <h2>
          { idasset &&
            <span onClick={()=> { this.backToPrincipal()}}><i className="fas fa-arrow-left accountantArrow"></i></span>
          }Consulta de Propietarios</h2> */}
          
          <div className="headerSections flex-sates">
            <h2> { idasset &&
            <span onClick={()=> { this.backToPrincipal()}}><i className="fas fa-arrow-left accountantArrow"></i></span>
          }Consulta de Propietarios</h2>
				</div>

          <div className="wrapper">
            <div className="flex-sates">
              {
                owners.map((owner, index) => (
                  <div className="container-sates" key={index}>
                    <div className={`card-sates card-satess${index}`}>
                      <div className="front">
                        <div className="flex-sates">
                          <img src={owner.logo} alt="" />
                          <div className="owner-title">
                            <h3>{owner.tradeName}</h3>
                            <p>{owner.socialReason}</p>
                          </div>
                        </div>
                        <div className="card-sates-foo">
                          <span className="owner-info" onClick={() => this.handleCard(index)}>Detalles <i className="fas fa-long-arrow-alt-right"></i></span>
                        </div>
                      </div>
                      <div className="back">
                        <h3>{owner.tradeName}</h3>
                        <ul>
                          <li>
                            <span>ID:</span>
                            <p>{owner.idOwner}</p>
                          </li>
                          <li>
                            <span>RFC:</span>
                            <p>{owner.RFC}</p>
                          </li>
                          <li>
                            <span>Tipo de Activos</span>
                            <p>Inmuebles</p>
                          </li>
                          <li>
                            <span># Activos</span>
                            <p>2 000</p>
                          </li>
                          <li>
                            <span>Fecha de Registro</span>
                            <p>{dateformat(owner.creationDate, 'dd/mm/yy - hh:mm:ss TT')}</p>
                          </li>
                        </ul>
                        <div className="owners-back-foo flex-sates">
                          <div>
                            {auth.edit &&
                              <Link to={`/owner/${owner.id}`}>
                                <button type="button" className="btn btn-success"><i className="far fa-edit"></i></button>
                              </Link>
                            }

                            <button disabled={!auth.delete} onClick={() => this.handleDeleteOwner(owner.id)} type="button" className="btn btn-danger"><i className="fas fa-trash-alt"></i> </button>
                          </div>

                          <span onClick={() => this.handleCardBack(index)}><i className="fas fa-long-arrow-alt-left"></i>Regresar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            {auth.new &&
              <Link to="/owner">
                <button type="button" className="btnOwnerAdd" ><i className="fas fa-user-plus"></i></button>
              </Link>
            }

          </div>
        </section>
      </div>
    )
  }
}
