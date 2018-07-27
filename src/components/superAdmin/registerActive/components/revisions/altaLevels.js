import React, { Component } from 'react'
import Cryptr from 'cryptr'
import { Link } from 'react-router-dom'
import { firestore } from 'firebase'
import RevisionModel from './modelRevision'
import DataCheck from './dataCheck'
import uuid from 'uuid'
import swal from 'sweetalert';
import axios from 'axios'
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import './styles.css'
var cryptr = new Cryptr('satesSeguro8102')

class AltaLevels extends Component {
    constructor(props) {
        super(props)

        this.state = {
            revision: '',
            position: '',
            level: '',
            user: '',
            refresh: '',
            edit: false,
            uploading: false,
            admin: false,
            building: ''
        }

        this.selectBuilding = this.selectBuilding.bind(this)
        this.refresh = this.refresh.bind(this)
        this.editLevel = this.editLevel.bind(this)
        this.saveLevelEdit = this.saveLevelEdit.bind(this)
        this.deleteLevel = this.deleteLevel.bind(this)
    }

    componentDidMount() {
        firestore().collection('revisionsStates').doc(this.props.match.params.id).onSnapshot(data => {
            if (data.data().statusRevision === 'finished') {
                swal("Inspeccion finalizada", "", "warning", { timer: 2000 });
                return hashHistory.push('/assets')
            }
            this.setState({
                revision: data.data()
            })
            this.selectBuilding()
        })

        //Desencriptamos el usuario
        let userLocal = JSON.parse(localStorage.getItem('atadresu'))

        RevisionModel.levelsCheck(level => {
            this.setState({
                level: level,
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

    selectBuilding() {
        this.state.revision.checkList.buildings.map((building, index) => {
            if (building.crumb === this.props.match.params.crumb) {
                console.log('encontramos la pocision', index)
                this.setState({
                    position: index,
                    building: building
                })
            }
        })
    }

    saveBuilding() {

        if (this.state.level.name && this.state.level.conditions.label) {
            this.state.level.crumb = uuid.v4()
            this.state.level.userCreate = this.state.user

            let body = {
                crumbBuilding: this.state.position,
                level: this.state.level
            }

            this.setState({
                uploading: true
            })

            axios.put(`https://us-central1-satespruebas-ab39e.cloudfunctions.net/concurrence/revisionsStates/levels/${this.props.match.params.id}`, body).then(() => {
                swal("Datos Guardados", "", "success", { timer: 2000 });
                RevisionModel.levelsCheck(level => {
                    this.setState({
                        level: level,
                        uploading: false
                    })
                })
            }).catch(error => {
                swal("Eorror al guardar", "intente de nuevo", "error", { timer: 2000 });
                this.setState({ uploading: false })
                console.log('error al actualizar', error)
            })
        } else {
            swal("Llenar campos obligarorios", "", "warning", { timer: 2000 });
        }

    }

    editLevel(id) {
        this.state.revision.checkList.buildings[this.state.position].levels.map(level => {
            if (level.crumb === id) {
                this.setState({
                    level: level,
                    edit: true
                })
                $('html,body').animate({
                    scrollTop: $("#topLevels").offset().top
                }, 1000);
            }
        })
    }

    saveLevelEdit() {
        this.state.revision.checkList.buildings[this.state.position].levels.map(level => {
            if (level.crumb === this.state.level.crumb) {
                level = this.state.level
            }
        })

        firestore().collection('revisionsStates').doc(this.props.match.params.id).update(this.state.revision).then(data => {
            swal("Datos Actualizados", "", "success", { timer: 2000 });
            RevisionModel.levelsCheck(level => {
                console.log(level)
                this.setState({
                    level: level,
                    edit: false
                })
            })

        }).catch(error => console.log('Error al actualizar', error))
    }

    deleteLevel(id) {
        swal({
            title: "Seguro",
            text: "¿Quieres eliminar el nivel?",
            icon: "warning",
            buttons: ['NO', 'SI'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    this.state.revision.checkList.buildings[this.state.position].levels.map((level, index) => {
                        if (level.crumb === id) {
                            console.log('listro para borrar', level)
                            this.state.revision.checkList.buildings[this.state.position].levels.splice(index, 1)
                        }
                    })

                    firestore().collection('revisionsStates').doc(this.props.match.params.id).set(this.state.revision).then(() => {
                        swal("Construccion eliminada", "", "success", { timer: 2000 });
                    }).catch(error => console.log('error al eliminar', error))

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
        if (this.state.position === '') return <div>Cargando...</div>
        return (
            <div id='topLevels' >
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb letra">
                        <li className="breadcrumb-item"><Link to={'/revisionEdit/' + this.props.match.params.id}>DATOS DEL REPONSABLE</Link></li>
                        <li className="breadcrumb-item"><Link to={'/altaBuildings/' + this.props.match.params.id}>{this.state.building.type + ' ' + this.state.building.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">NIVELES</li>
                    </ol>
                </nav>
                {this.state.admin &&
                    <div className="col-12  d-flex justify-content-end">
                        <Link to={'/revisionAssetState/' + this.state.revision.idAsset} className="btn btn-primary buttonCircle position-fixed"><i className="fas fa-exchange-alt marginTop"></i></Link>
                    </div>
                }
                <div className="" id="ConstruccionId" >
                    <div className="container">
                        <div className="card">
                            <div className="card-header text-center bg-primary ">
                                <h4>ALTA DE NIVELES</h4>
                            </div>
                            <div className="card-body">
                                <DataCheck
                                    className="col-12"
                                    dataBasic={this.state.level}
                                    refresh={this.refresh}
                                    label='nivel'
                                    type='nivel'
                                    index={1}
                                />
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <Link to={'/altaBuildings/' + this.props.match.params.id} className="btn btn-danger btn-block">Volver a construcciones</Link>
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
                                                Guardar nivel
                                            </LaddaButton>
                                        </div>
                                    }
                                    {this.state.edit &&
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-success btn-block" onClick={() => this.saveLevelEdit()}>Actualizar nivel</button>
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
                                <h4>TABLA DE NIVELES</h4>
                            </div>
                            <div className="card-body">
                                {this.state.revision.checkList.buildings[this.state.position].levels.length > 0 &&
                                    <table className="table table-bordered table-responsive ">
                                        <thead>
                                            <tr className="bg-primary" >
                                                <th>#</th>
                                                <th>NOMBRE</th>
                                                <th>ÁREAS</th>
                                                <th>CONDICIONES GENERALES</th>
                                                <th>ACTIVOS INMUEBLES</th>
                                                <th>EDITAR</th>
                                                <th>ELIMINAR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.revision.checkList.buildings[this.state.position].levels.map((level, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{level.name}</td>
                                                        <td>{level.areas.length}</td>
                                                        <td>{level.conditions.label}</td>
                                                        <td><Link to={'/altaRealAssets/' + this.props.match.params.id + '/' + this.props.match.params.crumb + '/' + level.crumb} className="btn btn-outline-dark btn-block " ><i className="fas fa-level-up-alt"></i>  </Link></td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.editLevel(level.crumb)} ><i className="fas fa-edit"></i>  </button></td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.deleteLevel(level.crumb)}><i className="far fa-trash-alt"></i>  </button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }
                                {this.state.revision.checkList.buildings[this.state.position].levels.length === 0 &&
                                    <h3 className="textCenter" >No hay niveles</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AltaLevels