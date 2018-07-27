import React, { Component } from 'react';
import GoogleMaps from '../../../../../common/googleMaps'
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import states from '../../../../../../../../states'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
class LocationRevision extends Component {
    constructor(props){
        super(props);
        this.state = {
            refresh : '',         
            position: {},
            estados: [],
            map: false,
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
        this.assignPosition = this.assignPosition.bind(this)
        this.getPosition = this.getPosition.bind(this)
    }
    componentDidMount() { 

        if (this.props.edit) {
            this.getPosition()
        }else if(this.props.location == true ){
            this.getPosition()
        }
        states(estados => {
            this.setState({
                estados
            })
        })
    }
    refresh() {
        this.setState({
            refresh: ''
        })                
    }
    assignPosition() {
        this.props.data.location.lng = this.state.position.lng
        console.log(this.props.data.revision.location.lng);
        
        this.props.data.location.lat = this.state.position.lat
        console.log(this.props.data.revision.location.lat);
        
        this.refresh()
    }
    getPosition() {
        this.setState({ map: false })
        if (this.props.data.location.lng && this.props.data.location.lat) {
            this.state.position.lng = this.props.data.location.lng
            this.state.position.lat = this.props.data.location.lat
            this.setState({
                map: true
            })
        } else {
        let location = this.props.data.location
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
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-addon">C.P*</span>
                            <TextMask
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                Component={InputAdapter}
                                className="form-control"
                                value={this.props.data.location.CP}
                                placeholder="Código Postal"
                                onChange={(e) => { this.props.data.location.CP = e.target.value, this.props.refresh(),this.state.refresh= '' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input-group">
                            <span className="input-group-addon">Calle*</span>
                            <input type="text" value={this.props.data.location.street} className="form-control uppercase" placeholder="Calle" onChange={(e) => { this.props.data.location.street = e.target.value.toUpperCase(), this.props.refresh(),this.state.refresh= '' }} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-addon">No. Exterior</span>
                            <TextMask
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                                Component={InputAdapter}
                                className="form-control"
                                value={this.props.data.location.nExterno}
                                placeholder="EXTERIOR"
                                onChange={(e) => { this.props.data.location.nExterno = e.target.value.toUpperCase(), this.props.refresh(),this.state.refresh= '' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 mt-3 ">
                        <div className="input-group">
                            <span className="input-group-addon">No. Interior</span>
                            <TextMask
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                                Component={InputAdapter}
                                className="form-control"
                                value={this.props.data.location.nInterno}
                                placeholder="INTERIOR"
                                onChange={(e) => { this.props.data.location.nInterno = e.target.value.toUpperCase(), this.props.refresh(),this.state.refresh= '' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-8 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon"> Colonia*</span>
                            <input type="text" value={this.props.data.location.colony} className="form-control uppercase" placeholder="COLONIA" onChange={(e) => { this.props.data.location.colony = e.target.value.toUpperCase(), this.props.refresh(),this.state.refresh= '' }} />
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon">Tipo de asentamiento</span>
                            <select name="" id="" value={this.props.data.location.typeOfSettlement} className="form-control uppercase" placeholder="Tipo de asentamiento" onChange={(e) => { this.props.data.location.typeOfSettlement = e.target.value.toUpperCase(), this.refresh() }} >
                                <option value="">Selecciona una opción</option>
                                {this.state.asentamientos.map((asentamiento, index) => {
                                    return (
                                        <option key={index} value={asentamiento}>{asentamiento}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon">Municipio/ <br /> Delegación*</span>
                            <input type="text" value={this.props.data.location.municipality} className="form-control uppercase" placeholder="Municipio/Delegación" onChange={(e) => { this.props.data.location.municipality = e.target.value.toUpperCase(), this.props.refresh(),this.state.refresh= '' }} />
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon">Estado*</span>
                            <select value={this.props.data.location.state} className="form-control" onChange={(e) => { this.props.data.location.state = e.target.value.toUpperCase(), this.props.refresh(),this.state.refresh= '' }}>
                                <option value="null" name="owner" >Seleccione el estado</option>
                                {this.state.estados.map((estado, index) => {
                                    return (
                                        <option key={index} value={estado.Abreviacion}>{estado.Estado}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon">País</span>
                            <input type="text" value={this.props.data.location.country} className="form-control uppercase" placeholder="País" readOnly onChange={(e) => { this.props.data.location.country = e.target.value.toUpperCase(), this.props.refresh(),this.state.refresh= '' }} />
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon">Longitud</span>
                            <input type="number" readOnly value={this.props.data.location.lng} className="form-control" placeholder="LONGITUD" aria-label="codigoPostal" aria-describedby="basic-addon1" onChange={(e) => { this.props.data.location.lng = e.target.value, this.props.refresh(),this.state.refresh= '' }} />
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon">Latitud</span>
                            <input type="bumber" readOnly value={this.props.data.location.lat} className="form-control" placeholder="LATITUD" aria-label="codigoPostal" aria-describedby="basic-addon1" onChange={(e) => { this.props.data.location.lat = e.target.value, this.props.refresh(),this.state.refresh= '' }} />
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 ">
                        <button type="button" className="btn btn-primary btn-block" onClick={() => this.getPosition()} >Ubicar en mapa</button>
                    </div>
                    {this.state.map &&
                        <div className="col-12 mt-3 ">
                            <GoogleMaps
                                position={this.state.position}
                                refresh={this.assignPosition}
                            />
                        </div>
                    }
                    {!this.state.map &&
                        <h5 className="col-12 textCenter mt-3" >{(this.props.edit) ? 'Error al cargar mapa, intente de nuevo' : 'Llene todos los campos para ver el mapa'}</h5>
                    }
                </div>
            </div>                
        );
    }
}

export default LocationRevision;