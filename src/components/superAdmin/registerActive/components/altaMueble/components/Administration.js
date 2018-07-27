import React, { Component } from 'react'
import AdministrativeDocumentation from '../subcomponents/AdministrativeDocumentation'
import { InputGroup, InputGroupAddon } from 'reactstrap'
import ExternalImagesAdministration from '../subcomponents/externalImagesAdministration'
import GoogleMaps from '../../../common/googleMaps'
import { uploadFiles } from '../../../../../../uploadFiles'
import { confirmRequest } from '../../../../../../swaIInputs'
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import states from '../../../../../../states'
import CutImage from '../../../../../../cutImage'
import axios from 'axios'

export default class Administration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refresh: '',
            percentage: 0,
            upload: true,
            position: {},
            estados: [],
            map: false,
            percentege: 0,
            file: '',
            archivo: '',
            asentamientos: [
                'AEROPUERTO',
                'AMPLIACIÓN',
                'BARRIO',
                'CANTÓN',
                'CIUDAD',
                'CIUDAD INDUSTRIAL',
                'COLONIA',
                'CONDOMINIO',
                'CONJUNTO HABITACIONAL',
                'CORREDOR INDUSTRIAL',
                'COTO',
                'CUARTEL',
                'EJIDO',
                'EXHACIENDA',
                'FRACCIÓN',
                'FRACCIONAMIENTO',
                'GRANJA',
                'HACIENDA',
                'INGENIO',
                'MANZANA',
                'PARAJE',
                'PARQUE INDUSTRIAL',
                'PRIVADA',
                'PROLONGACIÓN',
                'PUEBLO',
                'PUERTO',
                'RANCHERÍA',
                'RANCHO',
                'REGIÓN',
                'RESIDENCIAL',
                'RINCONADA',
                'SECCIÓN',
                'SECTOR',
                'SUPERMANZANA',
                'UNIDAD',
                'UNIDAD HABITACIONAL',
                'VILLA',
                'ZONA FEDERAL',
                'ZONA INDUSTRIAL',
                'ZONA MILITAR',
                'ZONA NAVAL'
            ]
        }
        this.refresh = this.refresh.bind(this)
        this.uploadGifMain = this.uploadGifMain.bind(this)
        this.deleteImgMain = this.deleteImgMain.bind(this)
        this.assignPosition = this.assignPosition.bind(this)
        this.getPosition = this.getPosition.bind(this)
        this.fileSave = this.fileSave.bind(this)
        this.fileSaveGif = this.fileSaveGif.bind(this)
        this.saveImage = this.saveImage.bind(this)
    }

    componentWillMount() {
        if (this.props.edit) {
            this.getPosition()
        }
        states(estados => {
            this.setState({
                estados
            })
        })
        console.log(this.props);
        
    }

    uploadGifMain(e) {
        if (e.target.files.length > 0) {
            this.setState({ upload: false })
            uploadFiles(e, (data) => {
                this.props.active.mainGifPhoto = ''
                this.props.active.mainGifPhoto = data[0]
                this.setState({ upload: true })
                this.props.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })
            }, 'documentsFurniture/')
        }
    }
    assignPosition() {
        this.props.active.furniture.location.lng = this.state.position.lng
        this.props.active.furniture.location.lat = this.state.position.lat
        this.setState({
            refresh: ''
        })
    }
    getPosition() {
        this.setState({ map: false })

        if (this.props.active.furniture.location.lng && this.props.active.furniture.location.lat) {

            this.state.position.lng = this.props.active.furniture.location.lng
            this.state.position.lat = this.props.active.furniture.location.lat

            this.setState({
                map: true
            })
        } else {
            let location = this.props.active.furniture.location
            let direction = location.CP + ' ' + location.street + location.nExterno + ' ' + location.colony + ' ' + location.municipality + ' ' + location.country
            axios.get('https://maps.google.com/maps/api/geocode/json?address=' + direction).then(data => {
                if (data.data.results.length === 0) {
                    return toast('No se encontro la dirección');
                } else {
                    this.setState({
                        position: data.data.results[0].geometry.location,
                        map: true
                    })
                    this.assignPosition()
                }
            }).catch(error => console.log('error al solicitar', error))
        }
    }
    deleteImgMain() {
        confirmRequest('¿ESTAS SEGURO?', 'SE ELIMINARA LA FOTO', (value) => {
            if (value) {
                this.props.active.mainPhoto = ''
                this.props.refresh()
                this.refresh()
            }
        })
    }
    refresh() {
        this.setState({
            refresh: ''
        })
    }

    fileSave(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                archivo: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    fileSaveGif(){

    }
    changeDestination(e){
        if(this.props.active.destination.length >0){
            e.persist()
            let dest = e.target.value
            confirmRequest('¿Estas seguro de cambiar el destino?', 'Se perderan los cambios ', (ok) => {
                if (ok) {
                    this.props.active.destination = dest
                    this.props.refresh()
                    this.props.selectTypeOfDestination()
                }
            })
        }else{            
            this.props.active.destination = e.target.value
            this.props.refresh()
            this.refresh()
        }        
    }

    saveImage(image) {
        console.log(this.props);
        this.props.active.mainPhoto = image
        this.props.refresh()
        this.refresh()
        this.setState({
            archivo: ''
        })
    }
    render() {
        return (
            <div className="flex-sates">
                <AdministrativeDocumentation active={this.props.active} refresh={this.props.refresh} />
                <div className="doc-photo">
                    {/* <h3 className="subtitle-ind">FOTO Y VIDEO</h3> */}
                    {
                        this.state.upload === false &&
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                        </div>
                    }
                    <div className="flex-sates">
                        <div className="doc-img">
                            <h3>Foto principal</h3>
                            <figure>
                                <img src={(this.props.active['mainPhoto']) ? this.props.active['mainPhoto'] : 'https://s3.amazonaws.com/checkouts-public/placeholder-icon.png'} data-fancybox={'fancyMainPhoto'} data-src={this.props.active['mainPhoto']} href="javascript:;" alt="" />
                            </figure>
                            <div className="doc-img-btns">
                                <label className="btn-doc-img" htmlFor="mainPhoto">
                                    Foto principal
                                    <i className="fa fa-upload" aria-hidden="true"></i>
                                </label>
                                <input id="mainPhoto" accept="image/*" capture="camera" style={{ display: 'none' }} type="file" className="form-control" onChange={(e) => this.fileSave(e)} name="urlPhoto" />
                                {this.state.archivo &&
                                    <CutImage
                                        saveFile={this.saveImage}
                                        state={this.state}
                                        refresh={this.refresh}
                                    />
                                }
                                {/* {
                                        this.props.active.mainPhoto !== "" &&
                                        <div>
                                            <a style={{ height: '33px' }} className="btn btn-secondary mr-1 mt-1" data-fancybox={'fancyMainPhoto'} data-src={this.props.active['mainPhoto']} href="javascript:;">
                                                <i className="fa fa-eye fa-1x" />
                                            </a>
                                        </div>
                                    } */}
                                {
                                    this.props.active.mainPhoto !== "" &&
                                    
                                        <a onClick={() => this.deleteImgMain()} className="doc-img-del" href="javascript:;" >Eliminar
                                            <i className="fa fa-minus-circle"></i>
                                        </a>
                                    
                                }
                            </div>
                        </div>

                        <div className="docGif">
                            <h3>Gif principal</h3>
                            <figure>
                                <img src={(this.props.active['mainGifPhoto']) ? this.props.active['mainGifPhoto'] : 'https://s3.amazonaws.com/checkouts-public/placeholder-icon.png'} data-fancybox={'fancyMainPhoto'} data-src={this.props.active['mainGifPhoto']} href="javascript:;" alt="" />
                            </figure>
                            <div className="doc-img-btns">
                                <label className="btnGif" htmlFor="mainPhotoGif">
                                Gif principal
                                <i className="fa fa-upload" aria-hidden="true"></i>
                                </label>
                                <input id="mainPhotoGif" accept="image/gif" style={{ display: 'none' }} type="file" className="form-control" onChange={(e) => this.uploadGifMain(e)} name="urlPhoto" />
                            </div>
                        </div>

                        {/* Video */}
                        <div className="doc-video">
                            <h3>Video</h3>
                            <div>
                                {/* <label>Video</label> */}
                                <input type="text"
                                    onChange={(e) => { this.props.active.furniture['vehicle'].administration['videoLink'] = e.target.value, this.props.refresh() }}
                                    value={this.props.active.furniture['vehicle'].administration['videoLink']} placeholder="Ingrese URL de video" />
                                {
                                    this.props.active.furniture['vehicle'].administration['videoLink'] !== '' &&
                                    <a className="btn btn-video" data-fancybox href={this.props.active.furniture['vehicle'].administration['videoLink']}>
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="doc-ext">
                    <h2>ACTIVO EXTERNO</h2>
                    <label className="switch switch-text switch-primary-outline-alt switch-user">
                        <input type="checkbox" className="switch-input"
                            checked={this.props.active.furniture['vehicle'].administration['extActive']}
                            onChange={(e) => { this.props.active.furniture['vehicle'].administration['extActive'] = e.target.checked, this.props.refresh() }}
                        />
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                    </label>

                    {this.props.active.furniture['vehicle'].administration['extActive'] &&
                        <div>

                            <h3 className="subtitle-ind">UBICACIÓN EXTERNA</h3 >
                            <div className="act-ext-group flex-sates">
                                <div className="input-sates">
                                    <label>Código Postal: <span>*</span></label>
                                    <TextMask
                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                        Component={InputAdapter}
                                        value={this.props.active.furniture.location.CP}
                                        onChange={(e) => { this.props.active.furniture.location.CP = e.target.value, this.setState({ refresh: '' }) }}
                                    />
                                </div>

                                <div className="input-sates">
                                    <label>Calle: <span>*</span></label>
                                    <input type="text" value={this.props.active.furniture.location.street} onChange={(e) => { this.props.active.furniture.location.street = e.target.value.toUpperCase(), this.refresh() }} />
                                </div>


                                <div className="input-sates">
                                    <label>No. Exterior: </label>
                                    <TextMask
                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                                        Component={InputAdapter}
                                        value={this.props.active.furniture.location.nExterno}
                                        onChange={(e) => { this.props.active.furniture.location.nExterno = e.target.value.toUpperCase(), this.refresh() }}
                                    />
                                </div>


                                <div className="input-sates">
                                    <label>No. Interior: </label>
                                    <TextMask
                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                                        Component={InputAdapter}
                                        value={this.props.active.furniture.location.nInterno}
                                        onChange={(e) => { this.props.active.furniture.location.nInterno = e.target.value.toUpperCase(), this.refresh() }}
                                    />
                                </div>


                                <div className="input-sates">
                                    <label>Colonia: <span>*</span></label>
                                    <input type="text" value={this.props.active.furniture.location.colony} onChange={(e) => { this.props.active.furniture.location.colony = e.target.value.toUpperCase(), this.setState({ refresh: "" }) }} />
                                </div>

                                <div className="input-sates">
                                    <label>Tipo de asentamiento:</label>
                                    <select name="" id="" className="form-control" value={this.props.active.furniture.location.typeOfSettlement} onChange={(e) => { this.props.active.furniture.location.typeOfSettlement = e.target.value.toUpperCase(), this.refresh() }} >
                                        <option value="">Selecciona una opción</option>
                                        {this.state.asentamientos.map((asentamiento, index) => {
                                            return (
                                                <option key={index} value={asentamiento}>{asentamiento}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="input-sates">
                                    <label>Municipio / Delegación: <span>*</span></label>
                                    <input type="text" value={this.props.active.furniture.location.municipality} onChange={(e) => { this.props.active.furniture.location.municipality = e.target.value.toUpperCase(), this.refresh() }} />
                                </div>

                                <div className="input-sates">
                                    <label>Estado: <span>*</span></label>
                                    <select className="form-control" value={this.props.active.furniture.location.state} onChange={(e) => { this.props.active.furniture.location.state = e.target.value.toUpperCase(), this.refresh() }}>
                                        <option value="null" name="owner" >Seleccione el estado</option>
                                        {this.state.estados.map((estado, index) => {
                                            return (
                                                <option key={index} value={estado.Abreviacion}>{estado.Estado}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="input-sates">
                                    <label>País:</label>
                                    <input type="text" value={this.props.active.furniture.location.country} placeholder="País" readOnly onChange={(e) => { this.props.active.furniture.location.country = e.target.value.toUpperCase(), this.refresh() }} />
                                </div>


                                <div className="input-sates">
                                    <label>Latitud:</label>
                                    <input type="bumber" readOnly value={this.props.active.furniture.location.lat} aria-label="codigoPostal" aria-describedby="basic-addon1" onChange={(e) => { this.props.active.furniture.location.lat = e.target.value, this.setState({ refresh: "" }) }} />
                                </div>

                                <div className="input-sates">
                                    <label>Longitud:</label>
                                    <input type="number" readOnly value={this.props.active.furniture.location.lng} aria-label="codigoPostal" aria-describedby="basic-addon1" onChange={(e) => { this.props.active.furniture.location.lng = e.target.value, this.setState({ refresh: "" }) }} />
                                </div>

                                <div className="input-sates">
                                    <button type="button" className="data-map" onClick={() => this.getPosition()} >Ubicar en mapa</button>
                                    {!this.state.map &&
                                        <small className="map-ind" >{(this.props.edit) ? 'Error al cargar mapa, intente de nuevo' : 'Llene todos los campos para ver el mapa'}</small>
                                    }
                                </div>

                                {this.state.map &&
                                    <div className="map-container">
                                        <GoogleMaps
                                            position={this.state.position}
                                            refresh={this.assignPosition}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {this.props.active.furniture['vehicle'].administration['extActive'] &&
                        <ExternalImagesAdministration active={this.props.active} refresh={this.props.refresh} />
                    }
                </div>

                <div className="doc-end flex-sates">
                    <div className="input-sates doc-obs">
                        <label>Observaciones:</label>
                        <textarea
                            value={this.props.active.observations}
                            onChange={(e) => { this.props.active.observations = e.target.value.toUpperCase(), this.props.refresh() }}>
                        </textarea>
                    </div>
                    <div>
                        <div className="input-sates">
                            <label>Destino: <span>*</span></label>
                            <select
                                className="form-control"
                                value={this.props.active.destination}
                                onChange={(e) => { this.changeDestination(e),this.props.selectTypeOfDestination(), this.props.refresh() }}  >
                                <option value="null">Seleccionar opción</option>
                                {
                                        this.props.authorizedVehicleServices.map((service, indexService) => (
                                            <option key={indexService} value={service.value}>{service.label}</option>
                                        ))
                                    }
                                {
                                        this.props.authorizedVehicleServices.length < 1 &&
                                        <option disabled value="null">No tiene detinos habilitados en el contrato</option>
                                    }
                            </select>
                        </div>

                        <div className="input-sates">
                            <label> Revisión cada:</label>
                            <select name="" id="" className="form-control" value={this.props.active.reviewDays} onChange={(e) => { this.props.active.reviewDays = e.target.value, this.props.refresh() }} >
                                <option value="">Seleccione una opcion</option>
                                <option value="1">DIARIO</option>
                                <option value="7">SEMANAL</option>
                                <option value="15">QUINCENAL</option>
                                <option value="30">MENSUAL</option>
                                <option value="90">TRIMESTRAL</option>
                                <option value="180">SEMESTRAL</option>
                                <option value="360">ANUAL</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
