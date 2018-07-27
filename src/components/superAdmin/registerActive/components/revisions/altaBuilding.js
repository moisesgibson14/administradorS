import React, { Component } from 'react'
import Cryptr from 'cryptr'
import { Link } from 'react-router-dom'
import { firestore } from 'firebase'
import RevisionModel from './modelRevision'
import DataCheck from './dataCheck'
import { hashHistory } from 'react-router'
import uuid from 'uuid'
import swal from 'sweetalert';
import axios from 'axios'
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import './styles.css'
var cryptr = new Cryptr('satesSeguro8102')

class AltaBuilding extends Component {
    constructor() {
        super()

        this.state = {
            revision: '',
            buildings: '',
            refresh: '',
            user: '',
            edit: false,
            uploading: false,
            admin: false
        }

        this.refresh = this.refresh.bind(this)
        this.saveBuilding = this.saveBuilding.bind(this)
        this.editBuilding = this.editBuilding.bind(this)
        this.saveBuildingEdit = this.saveBuildingEdit.bind(this)
        this.deleteBuilding = this.deleteBuilding.bind(this)
        this.redirectTo = this.redirectTo.bind(this)
    }

    componentDidMount() {
        firestore().collection('revisionsStates').doc(this.props.match.params.id).onSnapshot(data => {
            if (data.data().statusRevision === 'finished') {
                swal("Inspeccion finalizada", "", "warning", { timer: 2000 });
                return hashHistory.push('/assets')
            }
            console.log(data.data())
            this.setState({
                revision: data.data()
            })
        })

        // firestore().collection('assetssssssTPM').onSnapshot(data => {
        //     let i = 0
        //     data.forEach((prueba) => {
        //         console.log(i)
        //         i = i + 1;
        //     })
        // })

        //Desencriptamos el usuario
        let userLocal = JSON.parse(localStorage.getItem('atadresu'))

        RevisionModel.revisionCheck(building => {
            this.setState({
                buildings: building,
                user: cryptr.decrypt(userLocal.one)
            })
        })

        firestore().collection('users').where('email', '==', cryptr.decrypt(userLocal.one)).onSnapshot(data => {
            data.forEach(user => {
                if (user.exists) {
                    if (user.data().profile === 'administrator') {
                        this.setState({ admin: true })
                    }
                }
            })

        })
    }

    saveBuilding() {

        if (this.state.buildings.type && this.state.buildings.conditions.label) {
            this.state.revision.crumb = this.props.match.params.id
            this.state.buildings.crumb = uuid.v4()
            this.state.buildings.userCreate = this.state.user

            let body = {
                building: this.state.buildings
            }

            console.log(body, this.props.match.params.id);

            this.setState({
                uploading: true
            })

            this.state.revision.checkList.buildings = this.state.revision.checkList.buildings.concat(this.state.buildings)

            firestore().collection('revisionsStates').doc(this.props.match.params.id).update(this.state.revision).then(() => {
                swal("Datos Guardados", "", "success", { timer: 2000 });
                RevisionModel.revisionCheck(building => {
                    this.setState({
                        buildings: building,
                        uploading: false
                    })
                })
            }).catch(error => {
                swal("Eorror al guardar", "intente de nuevo", "error", { timer: 2000 });
                this.setState({ uploading: false })
                console.log('error al actualizar', error)
            })

            // axios.put(`https://us-central1-satespruebas-ab39e.cloudfunctions.net/concurrence/revisionsStates/buildings/${this.props.match.params.id}`, body).then(() => {
            //     swal("Datos Guardados", "", "success", { timer: 2000 });
            //     RevisionModel.revisionCheck(building => {
            //         this.setState({
            //             buildings: building,
            //             uploading: false
            //         })
            //     })
            // }).catch(error => {
            //     swal("Eorror al guardar", "intente de nuevo", "error", { timer: 2000 });
            //     this.setState({ uploading: false })
            //     console.log('error al actualizar', error)
            // })

        } else {
            swal("Llena los campos obligatorios", "", "warning", { timer: 2000 });
        }
    }

    editBuilding(id) {
        this.state.revision.checkList.buildings.map(building => {
            if (building.crumb === id) {
                this.setState({
                    buildings: building,
                    edit: true
                })

                $('html,body').animate({
                    scrollTop: $("#topBuilding").offset().top
                }, 1000);
            }
        })

    }

    saveBuildingEdit() {
        this.state.revision.checkList.buildings.map(building => {
            if (building.crumb === this.state.buildings.crumb) {
                building = this.state.buildings
            }
        })

        firestore().collection('revisionsStates').doc(this.props.match.params.id).update(this.state.revision).then(data => {
            swal("Datos actualizados", "", "success", { timer: 2000 });
            RevisionModel.revisionCheck(building => {
                console.log(building)
                this.setState({
                    buildings: building,
                    edit: false
                })
            })

        }).catch(error => console.log('Error al actualizar', error))
    }

    deleteBuilding(id) {

        swal({
            title: "Seguro",
            text: "¿Quieres eliminar la construcción?",
            icon: "warning",
            buttons: ['NO', 'SI'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    this.state.revision.checkList.buildings.map((building, index) => {
                        if (building.crumb === id) {
                            console.log('listro para borrar', building)
                            this.state.revision.checkList.buildings.splice(index, 1)
                        }
                    })

                    firestore().collection('revisionsStates').doc(this.props.match.params.id).set(this.state.revision).then(() => {
                        swal("Construccion eliminada", "", "success", { timer: 2000 });
                    }).catch(error => console.log('error al eliminar', error))

                } else {

                }
            })
    }

    redirectTo() {
        swal({
            title: "¿Quieres salir de esta interfaz?",
            text: "Al salir de esta interfaz se borraran todos tus datos",
            icon: "warning",
            buttons: ['NO', 'SI'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    return hashHistory.push('/revisionAssetState/' + this.state.revision.idAsset)

                } else {

                }
            })
    }

    refresh() {
        this.setState({
            refresh: ''
        })
    }

    render() {
        if (this.state.revision === '') return <div>Cargando...</div>
        return (
            <div id='topBuilding' >
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb letra">
                        <li className="breadcrumb-item"><Link to={'/revisionEdit/' + this.props.match.params.id}>DATOS DEL RESPONSABLE</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">CONSTRUCCIONES</li>
                    </ol>
                </nav>
                {this.state.admin &&
                    <div className="col-12  d-flex justify-content-end">
                        <button onClick={() => this.redirectTo()} className="btn btn-primary buttonCircle position-fixed"><i className="fas fa-exchange-alt"></i></button>
                    </div>
                }
                <div className="" id="ConstruccionId" >
                    <div className="container">
                        <div className="card">
                            <div className="card-header text-center colorConstruccion ">
                                <h4>ALTA DE CONSTRUCCIONES</h4>
                            </div>
                            <div className="card-body">
                                <DataCheck
                                    className="col-12"
                                    dataBasic={this.state.buildings}
                                    refresh={this.refresh}
                                    label='construcción'
                                    type='construccion'
                                    index={1}
                                />
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <Link to={'/revisionEdit/' + this.props.match.params.id} className="btn btn-danger btn-block">Ir a datos del responsable</Link>
                                    </div>
                                    {!this.state.edit &&
                                        <div className="col-md-6">
                                            <LaddaButton
                                                className="btn btn-success btn-block "
                                                loading={this.state.uploading}
                                                onClick={() => this.saveBuilding()}
                                                data-color="green"
                                                data-style={EXPAND_LEFT}
                                            >
                                                Guardar construcción
                                            </LaddaButton>
                                        </div>
                                    }
                                    {this.state.edit &&
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-success btn-block" onClick={() => this.saveBuildingEdit()}>Actualizar construccion</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="container">
                        <div className="card">
                            <div className="card-header text-center ">
                                <h4>TABLA DE CONSTRUCCIONES</h4>
                            </div>
                            <div className="card-body">
                                {this.state.revision.checkList.buildings.length > 0 &&
                                    <table className="table table-bordered table-responsive ">
                                        <thead>
                                            <tr className="colorConstruccion" >
                                                <th>#</th>
                                                <th>TIPO</th>
                                                <th>NOMBRE</th>
                                                <th>NIVELES</th>
                                                <th>CONDICIONES GENERALES</th>
                                                <th>DAR DE ALTA NIVELES</th>
                                                <th>EDITAR</th>
                                                <th>ELIMINAR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.revision.checkList.buildings.map((building, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{building.type}</td>
                                                        <td>{building.name}</td>
                                                        <td>{building.levels.length}</td>
                                                        <td>{building.conditions.label}</td>
                                                        <td><Link to={'/altaLevels/' + building.crumb + '/' + this.props.match.params.id} className="btn btn-outline-dark btn-block " ><i className="fas fa-level-up-alt"></i>  </Link></td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.editBuilding(building.crumb)} ><i className="fas fa-edit"></i>  </button></td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.deleteBuilding(building.crumb)}><i className="far fa-trash-alt"></i>  </button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }
                                {this.state.revision.checkList.buildings - length === 0 &&
                                    <h3 className="textCenter" >No hay contrucciones</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default AltaBuilding