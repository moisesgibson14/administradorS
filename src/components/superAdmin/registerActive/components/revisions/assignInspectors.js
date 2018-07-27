import React, { Component } from 'react'
import { firestore } from 'firebase'
import Cryptr from 'cryptr'
import swal from 'sweetalert';
import { hashHistory } from 'react-router'
import Select from 'react-select'
import SignaturePad from '../altaMueble/components/revisions/components/subcomponents/appPaint/index'
import uploadImgCheck from '../altaMueble/components/revisions/components/subcomponents/upluadImgCheck'
import ViewLider from './vistaRevision/viewLider'
import { Button } from 'reactstrap'
import MyAssigned from './myAssigned'
var cryptr = new Cryptr('satesSeguro8102')
import 'react-select/dist/react-select.css';
import './styles.css'

class AssignInspectors extends Component {
    constructor(props) {
        super(props)

        this.state = {
            revision: '',
            user: '',
            position: -1,
            users: [],
            refresh: '',
        }

        this.saveChanges = this.saveChanges.bind(this)
        this.saveInstectors = this.saveInstectors.bind(this)
        this.cleanModel = this.cleanModel.bind(this)
        this.finished = this.finished.bind(this)
        this.finishRevision = this.finishRevision.bind(this)

    }

    componentDidMount() {

        firestore().collection('revisionsStates').where('idAsset', '==', this.props.id).where('statusRevision', '==', 'process').onSnapshot(data => {
            let revisionTem = {}

            data.forEach(revision => {
                revisionTem = revision.data()
            })

            console.log(revisionTem)

            //Desencriptamos el usuario
            let userLocal = JSON.parse(localStorage.getItem('atadresu'))

            this.setState({
                revision: revisionTem,
                user: cryptr.decrypt(userLocal.one)
            })
        })

        firestore().collection('users').where('profile', '==', 'inspector').onSnapshot(data => {
            let userTem = []
            data.forEach(user => {
                userTem.push({ value: user.data().user, label: user.data().email })
            })

            this.state.users = this.state.users.concat(userTem)

            this.setState({
                refresh: ''
            })

        })

        firestore().collection('users').where('profile', '==', 'chiefInspector').onSnapshot(data => {
            let userTem = []
            data.forEach(user => {
                userTem.push({ value: user.data().user, label: user.data().email })
            })
            console.log('lideres', userTem);
            this.state.users = this.state.users.concat(userTem);
            this.setState({
                refresh: ''
            })
        })

        firestore().collection('users').where('profile', '==', 'administrator').onSnapshot(data => {
            let userTem = []
            data.forEach(user => {
                userTem.push({ value: user.data().user, label: user.data().email })
            })
            console.log('lideres', userTem);
            this.state.users = this.state.users.concat(userTem);
            this.setState({
                refresh: ''
            })
        })
    }

    saveChanges(x, e) {
        this.state.revision.checkList.buildings[this.state.position].levels[x].userAssign = e
        this.setState({
            refresh: ''
        })
    }

    saveInstectors() {
        firestore().collection('revisionsStates').doc(this.state.revision.crumb).set(this.state.revision).then(() => {
            swal("Datos Guardados", "", "success", { timer: 2000 });
            this.setState({
                position: -1
            })
        }).catch(error => console.log('error al actualizar', error))
    }

    cleanModel() {
        this.setState({
            position: -1
        })
    }

    finished() {
        swal({
            title: "¡Atención!",
            text: "Antes de finalizar debes asegurarte de que todos los inspectores hayan terminado.",
            icon: "warning",
            buttons: ["Atras", "Continuar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal({
                        title: "¿Estás seguro de finalizar la revisión?",
                        text: "Para poder reanudar la revisión deberas comunicarte con soporte tecníco.",
                        icon: "warning",
                        buttons: ["Cancelar", "Finalizar"],
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {

                                this.finishRevision()

                            } else {

                            }
                        });
                } else {

                }
            });
    }

    handleCleanSignature(i) {
        let signature = ''
        if (i === 1) {
            signature = this.refs.mySignature2
        } else {
            signature = this.refs.mySignature3
        }
        signature.clear()
    }

    handleSaveSignature(i) {
        let signature = ''
        if (i === 1) {
            signature = this.refs.mySignature2
        } else {
            signature = this.refs.mySignature3
        }
        let img = signature.toDataURL()
        var file = this.dataURLtoFile(img, 'firm.png');
        this.hanldeUploadDocument(file, i)
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    hanldeUploadDocument(e, i) {
        uploadImgCheck(e, (link) => {

            if (i === 1) {
                this.state.revision.firmResponsible.firm = link[0]
                this.saveInstectors()
            } else {
                this.state.revision.firmLeader.firm = link[0]
                this.state.revision.firmLeader.name = this.state.user
                this.saveInstectors()
            }

            this.setState({ upload: true })
        }, (percentage) => {
            this.setState({ percentage: Math.round(percentage) })
        }, 'documentsState/'
        )
    }

    finishRevision() {
        this.state.revision.statusRevision = 'finished'
        firestore().collection('revisionsStates').doc(this.state.revision.crumb).set(this.state.revision).then(() => {
            swal("Has finalizado la inspección", "", "success", { timer: 2000 });

            return hashHistory.push('/assets')

        }).catch(error => console.log('error al actualizar', error))
    }

    render() {
        if (this.state.revision === '') return <div>Cargando...</div>
        return (
            <div className="">
                {!this.state.revision.checkList &&
                    <ViewLider
                        id={this.props.id}
                        refreshId={this.props.refreshId}
                    />
                }
                <div className="container">
                    <div className="card">
                        <div className="card-header text-center colorConstruccion ">
                            <h4>CONSTRUCCIONES</h4>
                        </div>
                        <div className="card-body">
                            {this.state.revision.checkList &&
                                <div className="row">
                                    {this.state.revision.checkList.buildings.length > 0 &&
                                        <div className="col-12" >
                                            <table className="table table-bordered table-responsive">
                                                <thead>
                                                    <tr className="colorConstruccion" >
                                                        <th>#</th>
                                                        <th>TIPO</th>
                                                        <th>NOMBRE</th>
                                                        <th>NIVELES</th>
                                                        <th>CONDICIONES GENERALES</th>
                                                        <th>ASIGNAR INSPECTORES</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.revision.checkList.buildings.map((building, index) => {
                                                        return (
                                                            <tr key={index} className="pointer">
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{building.type}</td>
                                                                <td>{building.name}</td>
                                                                <td>{building.levels.length}</td>
                                                                <td>{building.conditions.label}</td>
                                                                <td><button className="btn btn-outline-dark btn-block" onClick={() => this.setState({ position: index })} ><i className="fas fa-level-up-alt" ></i></button></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                    {this.state.revision.checkList.buildings - length === 0 &&
                                        <div className="col-12" >
                                            <h3 className="textCenter" >No hay contrucciones</h3>
                                        </div>
                                    }

                                    {this.state.position != -1 &&
                                        <div className="col-12">
                                            <div className="col-12">
                                                <div className="alert alert-primary textCenter mt-3 ">
                                                    NIVELES
                                            </div>
                                            </div>
                                            {this.state.revision.checkList.buildings[this.state.position].levels.length > 0 &&
                                                <div className="col-12">
                                                    {this.state.revision.checkList.buildings[this.state.position].levels.map((level, index) => {
                                                        let x = index
                                                        return (
                                                            <div key={x} className="col-12" >
                                                                <div className="alert alert-light textCenter mt-3 ">
                                                                    ASIGNACIÓN DE USUARIOS PARA EL NIVEL {x + 1}
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-addon" id="basic-addon1">Nombre del nivel</span>
                                                                    <input readOnly type="text" className="form-control" aria-label="proximaRevision" value={level.name} onChange={(e) => { level.name = e.target.value, this.refresh() }} />
                                                                </div>
                                                                <Select
                                                                    name="form-field-name2"
                                                                    value={level.userAssign}
                                                                    options={this.state.users}
                                                                    onChange={(e) => this.saveChanges(x, e)}
                                                                    multi
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="row" >
                                                        <div className="col-md-6">
                                                            <button className="btn btn-danger btn-block mt-3 " onClick={() => this.cleanModel()} type="button" >Cancelar</button>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <button className="btn btn-success btn-block mt-3 " onClick={() => this.saveInstectors()} type="button" >Guardar usuarios</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {this.state.revision.checkList.buildings[this.state.position].levels.length === 0 &&
                                                <h5 className="textCenter" >No hay niveles creados, contacta al Valuador</h5>
                                            }
                                        </div>
                                    }

                                </div>
                            }
                            {!this.state.revision.checkList &&
                                <h3 className="textCenter" >NO HAY REVISIONES ACTIVAS</h3>
                            }
                        </div>
                    </div>
                </div>
                {this.state.revision.checkList &&
                    <MyAssigned
                        id={this.props.id}
                        refreshId={this.props.refreshId}
                    />
                }
                {this.state.revision.checkList &&
                    <div className="container">
                        <div className="card pr-3 pl-3 pb-3 pt-3 ">
                            <div className="row">
                                {!this.state.revision.firmResponsible.firm &&
                                    <div className="col-md-6" >
                                        <h5 className="text-center">FIRMA RESPONSABLE</h5>
                                        <div className="signatureFirm mb-3 mr-3">
                                            <SignaturePad clearButton="true" ref="mySignature2" id="mySignature" />
                                        </div>

                                        <select className="form-control" onChange={(e) => { this.state.revision.firmResponsible.name = e.target.value, this.setState({ refresh: '' }) }} >
                                            <option value="null" name="owner" >Seleccióne el nombre del responsable</option>
                                            {this.state.revision.dataResponsable.map((responsable, index) => {
                                                return (
                                                    <option key={index} value={responsable.name + ' ' + responsable.surnames}>{responsable.name + ' ' + responsable.surnames}</option>
                                                )
                                            })}
                                        </select>

                                        <div className="row text-center">
                                            <div className="col col-lg-6">
                                                <Button title="Nuevo" outline color="danger" className="mr-3" style={{ "marginTop": "5px" }} onClick={() => this.handleCleanSignature(1)}>Borrar <i className='fa fa-eraser'></i></Button>

                                                <Button title="Nuevo" outline color="success" style={{ "marginTop": "5px" }} onClick={() => this.handleSaveSignature(1)}>Guardar <i className='far fa-save'></i></Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {this.state.revision.firmResponsible.firm &&
                                    <div className="col-md-6">
                                        <h5 className="text-center">FIRMA RESPONSABLE</h5>
                                        <img src={this.state.revision.firmResponsible.firm} style={{ width: '100%' }} alt="" />
                                    </div>
                                }
                                {!this.state.revision.firmLeader.firm &&
                                    <div className="col-md-6" >
                                        <h5 className="text-center">FIRMA LIDER</h5>
                                        <div className="signatureFirm mb-3 mr-3">
                                            <SignaturePad clearButton="true" ref="mySignature3" id="mySignature" />
                                        </div>

                                        <div className="row text-center">
                                            <div className="col col-lg-6">
                                                <Button title="Nuevo" outline color="danger" className="mr-3" style={{ "marginTop": "5px" }} onClick={() => this.handleCleanSignature(2)}>Borrar <i className='fa fa-eraser'></i></Button>

                                                <Button title="Nuevo" outline color="success" style={{ "marginTop": "5px" }} onClick={() => this.handleSaveSignature(2)}>Guardar <i className='far fa-save'></i></Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {this.state.revision.firmLeader.firm &&
                                    <div className="col-md-6">
                                        <h5 className="text-center">FIRMA LÍDER</h5>
                                        <img src={this.state.revision.firmLeader.firm} style={{ width: '100%' }} alt="" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }

                {this.state.revision.checkList &&
                    <div className="container">
                        <div className="col-12 mt-3 ">
                            <button type="button" className="btn btn-block  colorConstruccion" data-toggle="modal" data-target=".finishInspeccion">Finalizar inspección</button>
                        </div>
                    </div>
                }

                <div className="modal fade finishInspeccion " id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg " role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Comentarios</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <textarea className="form-control maxHeight" value={this.state.revision.completionComments} onChange={(e) => { this.state.revision.completionComments = e.target.value }} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.finished()}  >Finalizar inspección</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default AssignInspectors