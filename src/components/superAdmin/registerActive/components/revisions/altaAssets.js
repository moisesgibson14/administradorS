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
import './styles.css'
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
var cryptr = new Cryptr('satesSeguro8102')

class AltaAssets extends Component {
    constructor(props) {
        super(props)

        this.state = {
            revision: '',
            positionBuilding: '',
            building:'',
            positionLevel: '',
            level:'',
            positionArea: '',
            area:'',
            asset: '',
            user: '',
            refresh: '',
            edit: false,
            uploading: false,
            admin:false
        }

        this.selectBuilding = this.selectBuilding.bind(this)
        this.refresh = this.refresh.bind(this)
        this.selectLevel = this.selectLevel.bind(this)
        this.editAsset = this.editAsset.bind(this)
        this.saveAssetEdit = this.saveAssetEdit.bind(this)
        // this.deleteArea = this.deleteArea.bind(this)
        // this.redirectToAsset = this.redirectToAsset.bind(this)
    }

    componentDidMount() {
        firestore().collection('revisionsStates').doc(this.props.match.params.id).onSnapshot(data => {
            if(data.data().statusRevision === 'finished'){
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

        RevisionModel.assetsCheck(asset => {
            this.setState({
                asset: asset,
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
        // /altaAssets/:id/:crumbBuilding/:crumbLevel/:crumbArea
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
                this.selectArea()
            }
        })
    }

    selectArea() {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.map((area, index) => {
            if (area.crumb === this.props.match.params.crumbArea) {
                console.log('encontramos la pocision', index)
                this.setState({
                    positionArea: index,
                    area: area.name
                })
            }
        })
    }

    saveBuilding() {
        if (this.state.asset.name && this.state.asset.conditions.label ) {
            this.setState({
                uploading: true
            })

            // this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].numberAssets = this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].numberAssets + 1
            this.state.asset.crumb = uuid.v4()
            this.state.asset.userCreate = this.state.user

            let body = {
                crumbBuilding: this.state.positionBuilding,
                crumbLevel: this.state.positionLevel,
                crumbArea: this.state.positionArea,
                asset: this.state.asset
            }

            axios.put(`https://us-central1-satespruebas-ab39e.cloudfunctions.net/concurrence/revisionsStates/${this.props.match.params.id}`, body).then(() => {
                swal("Datos Guardados", "", "success", { timer: 2000 });
                RevisionModel.assetsCheck(asset => {
                    this.setState({
                        asset: asset,
                        uploading: false
                    })
                })
            }).catch(error => {
                swal("Eorror al guardar", "intente de nuevo", "error", { timer: 2000 });
                this.setState({uploading: false})
                console.log('error al actualizar', error)
            })
        } else {
            swal("Llenar campos obligarorios", "", "warning", { timer: 2000 });
        }
    }

    editAsset(id) {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].assets.map(asset => {
            if (asset.crumb === id) {
                this.setState({
                    asset: asset,
                    edit: true
                })

                $('html,body').animate({
                    scrollTop: $("#topAssets").offset().top
                }, 1000);
            }
        })
    }

    saveAssetEdit() {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].assets.map(asset => {
            if (asset.crumb === this.state.asset.crumb) {
                asset = this.state.asset
            }
        })

        firestore().collection('revisionsStates').doc(this.props.match.params.id).update(this.state.revision).then(data => {
            swal("Dastos Actualizados", "", "success", { timer: 2000 });
            RevisionModel.assetsCheck(asset => {
                this.setState({
                    asset: asset,
                    edit: false
                })
            })

        }).catch(error => console.log('Error al actualizar', error))
    }

    deleteAsset(id) {
        swal({
            title: "Seguro",
            text: "¿Quieres eliminar el activo?",
            icon: "warning",
            buttons: ['NO', 'SI'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].assets.map((asset, index) => {
                        if (asset.crumb === id) {
                            console.log('listro para borrar', asset)
                            this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].assets.splice(index, 1)
                        }
                    })

                    firestore().collection('revisionsStates').doc(this.props.match.params.id).set(this.state.revision).then(() => {
                        swal("Activo eliminado", "", "success", { timer: 2000 });
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
        if (this.state.positionArea === '') return <div>Cargando...</div>
        return (
            <div id='topAssets' >
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb letra">
                        <li className="breadcrumb-item"><Link to={'/revisionAssetState/' + this.state.revision.idAsset}>NIVELES ASIGNADOS</Link></li>
                        <li className="breadcrumb-item" aria-current="page" >{this.state.building.type + ' ' + this.state.building.name}</li>
                        <li className="breadcrumb-item" aria-current="page" >NIVEL {this.state.level}</li>
                        <li className="breadcrumb-item"><Link to={'/altaAreas/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding + '/' + this.props.match.params.crumbLevel}>ÁREA {this.state.area}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">ACTIVOS</li>
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
                            <div className="card-header text-center bg-info ">
                                <h4>ALTA DE ACTIVOS</h4>
                            </div>
                            <div className="card-body">
                                <DataCheck
                                    className="col-12"
                                    dataBasic={this.state.asset}
                                    refresh={this.refresh}
                                    label='activo'
                                    type='activo'
                                    index={1}
                                />
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <Link to={'/altaAreas/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding + '/' + this.props.match.params.crumbLevel} className="btn btn-danger btn-block">Ir a áreas</Link>
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
                                                Guardar activo
                                            </LaddaButton>
                                        </div>
                                    }
                                    {this.state.edit &&
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-success btn-block" onClick={() => this.saveAssetEdit()}>Actualizar activo</button>
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
                                <h4>TABLA DE ACTIVOS</h4>
                            </div>
                            <div className="card-body">
                                {this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].assets.length > 0 &&
                                    <table className="table table-bordered table-responsive ">
                                        <thead>
                                            <tr className="bg-info" >
                                                <th>#</th>
                                                <th>NOMBRE</th>
                                                <th>CANTIDAD</th>
                                                <th>MARCA</th>
                                                <th>MODELO</th>
                                                <th>INSPECTOR</th>
                                                <th>EDITAR</th>
                                                <th>ELIMINAR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].assets.map((asset, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{asset.name}</td>
                                                        <td>{asset.numberAsset}</td>
                                                        <td>{asset.brand}</td>
                                                        <td>{asset.model}</td>
                                                        <td>{asset.userCreate}</td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.editAsset(asset.crumb)} ><i className="fas fa-edit"></i>  </button></td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block " onClick={() => this.deleteAsset(asset.crumb)}><i className="far fa-trash-alt"></i>  </button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }
                                {this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[this.state.positionArea].assets.length === 0 &&
                                    <h3 className="textCenter" >No hay activos</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AltaAssets