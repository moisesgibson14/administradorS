import React, { Component } from 'react'
import { uploadFiles, deleteFiles } from '../../../../../uploadFiles'
import dateFormat from 'dateformat'
import Cryptr from 'cryptr'
import { firestore } from 'firebase'
import RevisionModel from './modelRevision'
var cryptr = new Cryptr('satesSeguro8102')

class DataCheck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            perfil: '',
            upload: false,
            percentege: 0,
            assets: ''
        }

        this.deleteImage = this.deleteImage.bind(this)
        this.fileChangeEvent = this.fileChangeEvent.bind(this)
        this.openFancy = this.openFancy.bind(this)
        this.deleteImages = this.deleteImages.bind(this)
    }

    componentWillMount() {

        RevisionModel.assets(assets => {
            this.setState({
                assets
            })
        })

        let userLocal = JSON.parse(localStorage.getItem('atadresu'))
        let dataUserLogged = {
            email: cryptr.decrypt(userLocal.one),
            password: cryptr.decrypt(userLocal.two)
        }

        firestore().collection('users').where('email', '==', dataUserLogged.email).onSnapshot(data => {
            data.forEach(user => {
                if (user.exists) {
                    this.props.dataBasic.userCreate = user.data().email
                    this.props.dataBasic.dateCreation = data.dateRevision = dateFormat(new Date, 'dd/mm/yyyy h:MM TT')
                }
            })

        })

    }

    fileChangeEvent(e) {



        uploadFiles(e, (data) => {

            data.map(image => {
                this.props.dataBasic.conditions.photosUrl = this.props.dataBasic.conditions.photosUrl.concat(image)
            })

            console.log(this.props.dataBasic.conditions.photosUrl);

            this.setState({
                upload: false
            })

        }, (porcentaje) => {
            this.setState({ upload: true })

            this.setState({ percentege: Math.round(porcentaje) })

        }, 'documentsState')
    }

    deleteImage(j, x, y) {

        deleteFiles(this.props.dataBasic.conditions.photosUrl[j], (data) => {
            if (data) {
                this.props.dataBasic.conditions.photosUrl.splice(j, 1)
                this.props.refresh()

                if (this.props.dataBasic.conditions.photosUrl.length === 0) {
                    $(document).ready(function () {
                        $('#close' + x + y).click()
                    });
                }

            } else {
                console.log('error al eliminar');
            }
        })
    }

    deleteImages(x, y) {
        swal({
            title: "Seguro",
            text: "¿Quieres eliminar todas las fotos?",
            icon: "warning",
            buttons: ['NO', 'SI'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    deleteFiles(this.props.dataBasic.conditions.photosUrl, (data) => {
                        if (data) {
                            this.props.dataBasic.conditions.photosUrl = []
                            this.props.refresh()

                            $(document).ready(function () {
                                $('#close' + x + y).click()
                            });
                        } else {
                            console.log('error al eliminar');
                        }
                    })

                } else {

                }
            })
    }

    openFancy(x, y) {
        $(document).ready(function () {
            $('#0fancy' + x + y).click()
        });
    }

    render() {
        return (
            <div className="row" >
                {this.props.type === 'construccion' &&
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <div className="input-group">
                            <span className="input-group-addon">{'Tipo de ' + this.props.label + '*'}</span>
                            <select name="" id="" className="form-control" aria-label="proximaRevision" value={this.props.dataBasic.type} onChange={(e) => { this.props.dataBasic.type = e.target.value.toUpperCase(), this.props.refresh() }} >
                                <option value="">SELECCIONE...</option>
                                <option value="EDIFICIO">EDIFICIO</option>
                                <option value="BARDA">BARDA</option>
                                <option value="ALBERCA">ALBERCA</option>
                                <option value="FOSA">FOSA</option>
                            </select>
                        </div>
                    </div>
                }
                {this.props.type != 'activo' &&
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <div className="input-group">
                            <span className="input-group-addon">{'Nombre de ' + this.props.label + '*'}</span>
                            <input type="text" className="form-control" aria-label="proximaRevision" value={this.props.dataBasic.name} onChange={(e) => { this.props.dataBasic.name = e.target.value.toUpperCase(), this.props.refresh() }} />
                        </div>
                    </div>
                }
                {this.props.type === 'activo' &&
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <div className="input-group">
                            <span className="input-group-addon">{'Nombre de ' + this.props.label + '*'}</span>
                            <select name="" id=""  className="form-control" aria-label="proximaRevision" value={this.props.dataBasic.name} onChange={(e) => { this.props.dataBasic.name = e.target.value.toUpperCase(), this.props.refresh() }}>
                                <option value="">SELECCIONE...</option>
                                {this.state.assets.map(asset =>{
                                    return(
                                        <option value={asset}>{asset}</option>
                                    )
                                })

                                }
                            </select>
                        </div>
                    </div>
                }
                {this.props.type === 'activo' &&
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <div className="input-group">
                            <span className="input-group-addon">Número de activos</span>
                            <input type="number" className="form-control" disabled aria-label="proximaRevision" value={this.props.dataBasic.numberAsset} onChange={(e) => {
                                if (e.target.value <= 0) {
                                    console.log(e)
                                    this.props.dataBasic.numberAsset = ''
                                } else {
                                    console.log('valido')
                                    this.props.dataBasic.numberAsset = e.target.value
                                }
                                this.props.refresh()
                            }} />
                        </div>
                    </div>
                }
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="input-group">
                        <span className="input-group-addon">ID QR</span>
                        <input type="text" className="form-control" aria-label="proximaRevision" value={this.props.dataBasic.idQR} onChange={(e) => { this.props.dataBasic.idQR = e.target.value, this.props.refresh() }} />
                    </div>
                </div>
                {this.props.type === 'construccion' &&
                    <div className="col-12 mb-3 " >
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="input-group">
                                    <span className="input-group-addon">Superficie de <br /> construcción</span>
                                    <input type="number" className="form-control" placeholder="en m²" aria-label="proximaRevision" value={this.props.dataBasic.surfaceOfBuilding} onChange={(e) => { this.props.dataBasic.surfaceOfBuilding = e.target.value.toUpperCase(), this.props.refresh() }} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="input-group">
                                    <span className="input-group-addon">Tipo de material</span>
                                    <select name="" id="" className="form-control" aria-label="proximaRevision" value={this.props.dataBasic.typeOfMaterial} onChange={(e) => { this.props.dataBasic.typeOfMaterial = e.target.value.toUpperCase(), this.props.refresh() }}>
                                        <option value="">SELECIONE...</option>
                                        <option value="ACERO">ACERO</option>
                                        <option value="ALUMINIO">ALUMINIO</option>
                                        <option value="ARCILLA">ARCILLA</option>
                                        <option value="HORMIGON">HORMIGÓN</option>
                                        <option value="MADERA">MADERA</option>
                                        <option value="MATERIALES PETREOS">MATERIALES PETREOS</option>
                                        <option value="PLASTICO">PLÁSTICOS</option>
                                        <option value="VIDRIO">VIDRIO</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {this.props.type === 'activo' &&
                    <div className="col-12 mb-3 " >
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="input-group">
                                    <span className="input-group-addon">Marca</span>
                                    <input type="text" className="form-control" aria-label="proximaRevision" value={this.props.dataBasic.brand} onChange={(e) => { this.props.dataBasic.brand = e.target.value.toUpperCase(), this.props.refresh() }} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="input-group">
                                    <span className="input-group-addon">Modelo</span>
                                    <input type="text" className="form-control" aria-label="proximaRevision" value={this.props.dataBasic.model} onChange={(e) => { this.props.dataBasic.model = e.target.value.toUpperCase(), this.props.refresh() }} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="input-group">
                                    <span className="input-group-addon">Precio estimado</span>
                                    <input type="number" className="form-control" aria-label="proximaRevision" value={this.props.dataBasic.price} onChange={(e) => { this.props.dataBasic.price = e.target.value.toUpperCase(), this.props.refresh() }} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-12 mb-3 ">
                    <label htmlFor="">Descripción:</label>
                    <textarea className="form-control maxHeight" value={this.props.dataBasic.description} onChange={(e) => { this.props.dataBasic.description = e.target.value.toUpperCase(), this.props.refresh() }} />
                </div>
                <div className="col-12 mb-3 ">
                    <div className="">
                        <span className="">Condiciones generales*</span>
                        <div className="col-12" >
                            <form action="" className="formulario">
                                <div className="radio">
                                    <input type="radio" name="typeRevision" id={'Excelentes' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Excelentes'} onChange={() => { this.props.dataBasic.conditions.label = 'Excelentes', this.props.refresh() }} />
                                    <label className="col-12 col-sm-6 col-md-3 col-xl-2" htmlFor={'Excelentes' + this.props.label + this.props.index}>Excelentes</label>

                                    <input type="radio" name="typeRevision" id={'Buenas' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Buenas'} onChange={() => { this.props.dataBasic.conditions.label = 'Buenas', this.props.refresh() }} />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'Buenas' + this.props.label + this.props.index}>Buenas</label>

                                    <input type="radio" name="typeRevision" id={'Regulares' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Regulares'} onChange={() => { this.props.dataBasic.conditions.label = 'Regulares', this.props.refresh() }} />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'Regulares' + this.props.label + this.props.index}>Regulares</label>

                                    <input type="radio" name="typeRevision" id={'Malas' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Malas'} onChange={() => { this.props.dataBasic.conditions.label = 'Malas', this.props.refresh() }} />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'Malas' + this.props.label + this.props.index}>Malas</label>

                                    <input type="radio" name="typeRevision" id={'MuyMalas' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Muy malas'} onChange={() => { this.props.dataBasic.conditions.label = 'Muy malas', this.props.refresh() }} />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'MuyMalas' + this.props.label + this.props.index}>Muy malas</label>

                                    <input type="radio" name="typeRevision" id={'EnObra' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'En obra'} onChange={() => { this.props.dataBasic.conditions.label = 'En obra', this.props.refresh() }} />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'EnObra' + this.props.label + this.props.index}>En obra</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className=" col-3 col-sm-2 col-md-1">
                    <input type="file" capture="camera" accept="image/*" multiple id={'file' + this.props.label + this.props.index} className="display-none" onChange={(e) => this.fileChangeEvent(e)} />
                    <label htmlFor={'file' + this.props.label + this.props.index} className="btn btn-outline-dark mr-1" ><i className="fa fa-camera" aria-hidden="true"></i></label>
                </div>
                {this.props.dataBasic.conditions.photosUrl.length > 0 &&
                    <div className="col-3 col-sm-2 col-md-1">
                        {this.props.dataBasic.conditions.photosUrl.map((image, index) => {
                            return (
                                <a key={index} href={image} style={{ display: 'none' }} className="btn btn-outline-dark mr-1" id={index + 'fancy' + this.props.label + this.props.index} data-fancybox={'fancy' + this.props.label + this.props.index}>
                                </a>
                            )
                        })}
                        <button className="btn btn-outline-dark mr-1" onClick={() => this.openFancy(this.props.label, this.props.index)} ><i className="fa fa-eye" aria-hidden="true"></i></button>
                    </div>
                }
                {this.props.dataBasic.conditions.photosUrl.length > 0 &&
                    <div className="col-3 col-sm-2 col-md-1  mr-1 ">
                        <button className="btn btn-outline-dark" data-toggle="modal" data-target={'#modal' + this.props.label + this.props.index}> <i className="far fa-trash-alt" aria-hidden="true"></i> </button>
                    </div>
                }

                {/* empesamos el modal de imagenes */}
                <div className="modal fade" id={'modal' + this.props.label + this.props.index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Eliminar imagenes</h5>
                                <button type="button" className="close" id={'close' + this.props.label + this.props.index} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="col-12 d-flex justify-content-end " >
                                    <button type="button" className="ml-2 btn btn-outline-dark " onClick={() => this.deleteImages(this.props.label, this.props.index)} ><i className="far fa-trash-alt fa-2x" aria-hidden="true"></i></button>
                                </div>
                                <hr />
                                {this.props.dataBasic.conditions.photosUrl.map((data, index) => {
                                    let j = index
                                    return (
                                        <div key={j} >
                                            <div className="d-flex justify-content-between" >
                                                <a href={data} data-fancybox={index + 'data' + this.props.label + this.props.index} id={index + 'data' + this.props.label + this.props.index} >
                                                    <img src={data} className="col-md-3" alt="Responsive image" />
                                                </a>
                                                <div className="col-2">
                                                    <button type="button" className="ml-2 btn btn-outline-dark " onClick={() => this.deleteImage(j, this.props.label, this.props.index)}> <i className="fas fa-minus-square" aria-hidden="true"></i> </button>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* terminamos el modal de imagenes */}

                {this.state.upload &&
                    <div className="progress mb-3  col-12">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
                            {this.state.percentege}%
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default DataCheck