import React, { Component } from 'react'
import Cryptr from 'cryptr'
import { hashHistory } from 'react-router'
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

class AltaAreas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            revision: '',
            positionBuilding: '',
            building: '',
            positionLevel: '',
            level: '',
            admin: false,
            area: '',
            user: '',
            refresh: '',
            edit: false,
            uploading: false
        }

        this.selectBuilding = this.selectBuilding.bind(this)
        this.refresh = this.refresh.bind(this)
        this.selectLevel = this.selectLevel.bind(this)
        this.editArea = this.editArea.bind(this)
        this.deleteArea = this.deleteArea.bind(this)
        this.redirectToAsset = this.redirectToAsset.bind(this)
    }

    componentDidMount() {
        firestore().collection('revisionsStates').doc(this.props.match.params.id).onSnapshot(data => {
            if (data.data().statusRevision === 'finished') {
                swal("Inspeccion finalizada", "", "warning", { timer: 2000 });
                return hashHistory.push('/assets')
            }
            this.setState({
                revision: data.data(),
            })
            this.selectBuilding()
        })

        //Desencriptamos el usuario
        let userLocal = JSON.parse(localStorage.getItem('atadresu'))

        RevisionModel.areasCheck(area => {

            this.setState({
                area: area,
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
        ///altaAreas/:id/:crumbBuilding/crumbLevel
        this.state.revision.checkList.buildings.map((building, index) => {
            if (building.crumb === this.props.match.params.crumbBuilding) {
                console.log('encontramos la pocision', index)
                this.setState({
                    positionBuilding: index,
                    building: building
                })
                this.selectLevel()
            }
        })
    }

    selectLevel() {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels.map((level, index) => {
            if (level.crumb === this.props.match.params.crumbLevel) {
                console.log('encontramos la pocision', index)
                this.setState({
                    positionLevel: index,
                    level: level.name
                })
            }
        })
    }

    saveBuilding() {
        if (this.state.area.name && this.state.area.conditions.label) {

            // this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].numberAssets = this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].numberAssets + 1
            this.state.area.crumb = uuid.v4()
            this.state.area.userCreate = this.state.user

            let body = {
                crumbBuilding: this.state.positionBuilding,
                crumbLevel: this.state.positionLevel,
                area: this.state.area
            }

            this.setState({
                uploading: true
            })

            axios.put(`https://us-central1-satespruebas-ab39e.cloudfunctions.net/concurrence/revisionsStates/areas/${this.props.match.params.id}`, body).then(() => {
                swal("Datos Guardados", "", "success", { timer: 2000 });
                RevisionModel.areasCheck(area => {
                    this.setState({
                        area: area,
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

    editArea(id) {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.map(area => {
            if (area.crumb === id) {
                this.setState({
                    area: area,
                    edit: true
                })

                $('html,body').animate({
                    scrollTop: $("#topArea").offset().top
                }, 1000);
            }
        })
    }

    saveLevelEdit() {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.map(area => {
            if (area.crumb === this.state.area.crumb) {
                area = this.state.area
            }
        })

        firestore().collection('revisionsStates').doc(this.props.match.params.id).update(this.state.revision).then(data => {
            swal("Dastos Actualizados", "", "success", { timer: 2000 });
            RevisionModel.areasCheck(area => {
                console.log(level)
                this.setState({
                    area: area,
                    edit: false
                })
            })

        }).catch(error => console.log('Error al actualizar', error))
    }

    deleteArea(id) {
        swal({
            title: "Seguro",
            text: "¿Quieres eliminar el area?",
            icon: "warning",
            buttons: ['NO', 'SI'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.map((area, index) => {
                        if (area.crumb === id) {
                            console.log('listro para borrar', area)
                            this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.splice(index, 1)
                        }
                    })

                    firestore().collection('revisionsStates').doc(this.props.match.params.id).set(this.state.revision).then(() => {
                        swal("Area eliminada", "", "success", { timer: 2000 });
                    }).catch(error => console.log('error al eliminar', error))

                } else {

                }
            })
    }

    redirectToAsset(i) {
        let crumbArea = this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[i].crumb

        // /altaAssets/:id/:crumbBuilding/:crumbLevel/:crumbArea
        return hashHistory.push('/altaAssets/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding + '/' + this.props.match.params.crumbLevel + '/' + crumbArea)
    }

    refresh() {
        this.setState({
            refresh: ''
        })
    }

    render() {
        if (this.state.positionLevel === '') return <div>Cargando...</div>
        return (
            <div id='topArea' >
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb letra">
                        <li className="breadcrumb-item"><Link to={'/revisionAssetState/' + this.state.revision.idAsset}>NIVELES ASIGNADOS</Link></li>
                        <li className="breadcrumb-item" aria-current="page" >{this.state.building.type + ' ' + this.state.building.name}</li>
                        <li className="breadcrumb-item" aria-current="page" >NIVEL {this.state.level}</li>
                        <li className="breadcrumb-item active" aria-current="page">ÁREAS</li>
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
                            <div className="card-header text-center coloArea ">
                                <h4>ALTA DE ÁREAS</h4>
                            </div>
                            <div className="card-body">
                                <DataCheck
                                    className="col-12"
                                    dataBasic={this.state.area}
                                    refresh={this.refresh}
                                    label='area'
                                    type='area'
                                    index={1}
                                />
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <Link to={'/revisionAssetState/' + this.state.revision.idAsset} className="btn btn-danger btn-block">Ir a niveles asignados</Link>
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
                                                Guardar área
                                            </LaddaButton>
                                        </div>
                                    }
                                    {this.state.edit &&
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-success btn-block" onClick={() => this.saveLevelEdit()}>Actualizar área</button>
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
                            <div className="card-header text-center">
                                <h4>TABLA DE ÁREAS</h4>
                            </div>
                            <div className="card-body">
                                {this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.length > 0 &&
                                    <table className="table table-bordered table-responsive ">
                                        <thead>
                                            <tr className="coloArea" >
                                                <th>#</th>
                                                <th>NOMBRE</th>
                                                <th>ACTIVOS</th>
                                                <th>Condiciones generales</th>
                                                <th>DAR DE ALTA ACTIVOS</th>
                                                <th>EDITAR</th>
                                                <th>ELIMINAR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.map((area, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{area.name}</td>
                                                        <td>{area.assets.length}</td>
                                                        <td>{area.conditions.label}</td>
                                                        <td><button className="btn btn-outline-dark btn-block" onClick={() => this.redirectToAsset(index)} ><i className="fas fa-level-up-alt"></i>  </button></td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.editArea(area.crumb)} ><i className="fas fa-edit"></i>  </button></td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.deleteArea(area.crumb)}><i className="far fa-trash-alt"></i>  </button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }
                                {this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.length === 0 &&
                                    <h3 className="textCenter" >No hay áreas</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AltaAreas