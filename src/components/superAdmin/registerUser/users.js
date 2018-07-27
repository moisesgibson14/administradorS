import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './index.scss'
import { hashHistory } from 'react-router'
import { Button, Col, Card, CardHeader, CardBody, Table } from "reactstrap";
import swal from 'sweetalert'
import { firestore } from 'firebase'
import { assignProfiles } from './profiles'
import Cryptr from 'cryptr'
import userPermits from "../../../auth";
var cryptr = new Cryptr('satesSeguro8102')

export default class UsersTessa extends Component {
  constructor(props) {
    super(props)

    this.state = {
      warning: false,
      users: [],
      profiles: [],
      statusAuthorization: false,
      userAccess: [],
      accessTrue: false,
      auth: {},
      refresh: ''
    }
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleEnableDisableUser = this.handleEnableDisableUser.bind(this)
    this.handleAccess = this.handleAccess.bind(this)
    this.handleChangeAccess = this.handleChangeAccess.bind(this)
    this.saveUser = this.saveUser.bind(this)
    this.userPermit = this.userPermit.bind(this)
    this.togglePermission = this.togglePermission.bind(this)
  }

  componentDidMount() {
    this.userPermit()

    firestore().collection('users').orderBy('creationDate').onSnapshot(snap => {
      let usersTMP = []
      snap.forEach(user => {
        usersTMP.push({ ...user.data(), id: user.id })
      })
      this.setState({ users: usersTMP })
    })
    assignProfiles((profiles) => {
      this.setState({
        profiles: profiles
      })
    })
  }

  userPermit() {
    let userLocal = JSON.parse(localStorage.getItem('atadresu'))
    let userMail = cryptr.decrypt(userLocal.one)

    firestore().collection('users').where('email', '==', userMail).get().then(data => {

      data.forEach(user => {
        userPermits(user.data(), 'Usuarios', auth => {
          console.log(auth)
          this.state.auth.access = auth.childrens[3].value
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

  handleDeleteUser(idUser) {
    swal({
      title: "Estas seguro?",
      text: "Una vez que se elimine, ¡no podrá recuperar este usuario!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firestore().collection('users').doc(idUser).delete().then(() => {
          swal('Usuario eliminado', { icon: "success" })
        }).catch(err => swal('UPS, Usuario no eliminado', { icon: "warning" }))
      }
    });
  }

  handleEnableDisableUser(id) {
    let userTMP = {}
    this.state.users.map(user => {
      if (user.id === id) {
        userTMP = user
        user.active = !user.active
        delete userTMP.id
      }
    })
    firestore().collection('users').doc(id).update(userTMP).then(() => {
    }).catch(err => console.log('Error: ', err))
  }

  handleAccess(id) {
    this.state.users.forEach(user => {
      if (user.id == id) {
        console.log(user);

        this.setState({
          userAccess: user,
          accessTrue: true
        })
      }
    });
  }
  refresh() {
    this.setState({ refresh: '' })
  }

  handleChangeAccess(checked, index) {
    this.state.userAccess.authorization[index].value = checked
    this.refresh()
  }

  handleChangeAccessChil(checked, i, index) {
    this.state.userAccess.authorization[i].childrens[index].value = checked
    this.refresh()
  }

  togglePermission(i) {
    $('.switch-child').hide()
    $('.switch'+i).fadeIn()
  }

  saveUser() {
    firestore().collection('users').doc(this.state.userAccess.id).update(this.state.userAccess).then(() => {
      console.log('se actualizo al usuario')
    }).catch(error => console.log('error', error))
  }

  render() {
    let { users, profiles, userAccess, accessTrue, auth } = this.state
    if (!profiles && auth === '') return <h3>Obteniendo perfiles...</h3>
    console.log(auth, 'es la autenticacion')
    return (
      <div>
        <section className="users-sates">
        <div className="headerSections flex-sates">
            <h2>Consulta de Usuarios</h2>

            <span className="btnSearch"><i className="fas fa-search"></i></span>
            <div className="SearchBar">
              <span className="closeSearch"><i className="fas fa-times-circle"></i></span>
              <input autoComplete="off" type="search" name="nombre" placeholder="Buscar" />
            </div>
				</div>
          {auth.new &&
            <Link to="/user">
              <button type="button" className="btn-new-user" ><i className="fas fa-user-plus"></i></button>
            </Link>
          }
          <div className="wrapper">
            <article className="users-profiles">
              <h3 className="divider-profile">Usuarios <strong>SATES</strong> </h3>
              {
                users.map((user, key) => (
                  <div className="users-container" key={user.id} >

                    <div className="users-item users-item-flex">
                      <figure>
                        {!user.avatar &&
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8xzdv564ewROcTBYDdv51oTD5SgNOCDDwMw4XXIdvxFGyQzn" alt="" />
                        }
                        {user.avatar &&
                          <img src={user.avatar} alt="" />
                        }
                      </figure>

                      <div className="users-info">
                        <h3>{user.name}</h3>
                        <ul className="users-item-flex">
                          <li>
                            <i className="fas fa-briefcase"></i>
                            <p>{user.tradename}</p>
                          </li>
                          <li>
                            <i className="fas fa-envelope"></i>
                            <p>{user.email}</p>
                          </li>
                          <li>
                            <i className="fas fa-phone user-phone"></i>
                            <p>{user.cellPhone}</p>
                          </li>
                          <li>
                            <label className="switch switch-text switch-primary-outline-alt switch-user">
                              <input type="checkbox" className="switch-input"
                                checked={user.active}
                                onClick={() => this.handleEnableDisableUser(user.id)}
                              />
                              <span className="switch-label" data-on="On" data-off="Off"></span>
                              <span className="switch-handle"></span>
                            </label>
                            <p>{(user.active) ? 'ACTIVO' : 'INACTIVO'}</p>
                          </li>
                        </ul>
                      </div>

                      <div className="users-actions">
                        {auth.edit &&
                          <Link to={`/user/${user.id}`}>
                            <button className="users-edit" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className="fas fa-pencil-alt"></i></button>
                          </Link>
                        }
                        <button className="users-role" disabled={!auth.access} data-toggle="modal" data-target="#myModal" onClick={() => this.handleAccess(user.id)}><i className="fas fa-key"></i></button>
                        <button className="users-delete" disabled={!auth.delete} onClick={() => this.handleDeleteUser(user.id)}><i className="fas fa-trash-alt"></i></button>
                      </div>
                    </div>
                  </div>
                )).reverse()
              }
            </article>
          </div>
          <div className="modal fade modal-roles" id="myModal">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Permisos para: <strong>{userAccess.user}</strong></h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                {accessTrue &&
                  <div className="modal-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Permiso</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      {userAccess.authorization.map((users, index) => {
                        let i = index
                        return (
                          <tbody key={index}>
                            <tr>
                              <td onClick={() => this.togglePermission(index)}>
                                {users.label}
                                {
                                  users.childrens &&
                                  <span className="fas fa-angle-down userdown"></span>
                                }
                              </td>
                              <td>
                                <label className="switch switch-text switch-primary-outline-alt switch-user">
                                  <input type="checkbox" className="switch-input"
                                    checked={users.value}
                                    // this.props.active.furniture['vehicle'].administration['extActive'] = e.target.checked, this.props.refresh()
                                    onChange={(e) => { this.handleChangeAccess(e.target.checked, i) }}
                                  />
                                  <span className="switch-label" data-on="On" data-off="Off"></span>
                                  <span className="switch-handle"></span>
                                </label>
                              </td>
                            </tr>
                            {users.value &&
                              users.childrens &&
                              <tr className="childItem">
                                <td colSpan={2}>
                                  <div className={`switch-child switch${index}`}>
                                    <div className="flex-sates">
                                      {users.childrens.map((auth, index) => {
                                        return (
                                          <div className="switchItem">
                                            <span>{auth.label}: </span>
                                            <label className="switch switch-text switch-primary-outline-alt switch-user">
                                              <input type="checkbox" className="switch-input"
                                                checked={auth.value}
                                                // this.props.active.furniture['vehicle'].administration['extActive'] = e.target.checked, this.props.refresh()
                                                onChange={(e) => { this.handleChangeAccessChil(e.target.checked, i, index) }}
                                              />
                                              <span className="switch-label" data-on="On" data-off="Off"></span>
                                              <span className="switch-handle"></span>
                                            </label>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            }
                          </tbody>
                        )

                      })}

                    </table>
                  </div>
                }
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.saveUser()} >Guardar</button>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
