import React, { Component } from 'react'
import ValidationData from './validationData'
import GoogleMaps from '../../../common/googleMaps'

const Location = (props) => (
    <div className="row">

        <ValidationData
            refresh={props.refresh}
            name='C.P.'
            previousValue={props.location.CP}
            newLocation={props.newLocation.CP}
        />

        <ValidationData
            refresh={props.refresh}
            name='Calle'
            previousValue={props.location.street}
            newLocation={props.newLocation.street}
        />

        <ValidationData
            refresh={props.refresh}
            name='No. Exterior'
            previousValue={props.location.nExterno}
            newLocation={props.newLocation.nExterno}
        />

        <ValidationData
            refresh={props.refresh}
            name='No. Interior'
            previousValue={props.location.nInterno}
            newLocation={props.newLocation.nInterno}
        />

        <ValidationData
            refresh={props.refresh}
            name='Colonia'
            previousValue={props.location.colony}
            newLocation={props.newLocation.colony}
        />

        <ValidationData
            refresh={props.refresh}
            name='Tipo de asentamiento'
            previousValue={props.location.typeOfSettlement}
            newLocation={props.newLocation.typeOfSettlement}
        />

        <ValidationData
            refresh={props.refresh}
            name='Municipio/Delegación'
            previousValue={props.location.municipality}
            newLocation={props.newLocation.municipality}
        />

        <ValidationData
            refresh={props.refresh}
            name='Estado'
            previousValue={props.location.state}
            newLocation={props.newLocation.state}
        />

        <div className="col-12 mt-3 ">
            <div className="row">
                <div className="col-lg-5">
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Longitud</span>
                        <input type="text" className="form-control" disabled value={props.location.lng} />
                    </div>
                </div>
                <div className="col-lg-2">
                    <span className="mr-2" >Correcto:</span>
                    <label className="switch switch-text switch-pill switch-primary-outline">
                        <input type="checkbox" className="switch-input" checked={props.newLocation.lng.status && props.newLocation.lat.status} onChange={(e) => { props.newLocation.lng.status = e.target.checked, props.newLocation.lat.status = e.target.checked, props.refresh() }} />
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                    </label>
                </div>
                {!props.newLocation.lng.status &&
                    <div className="col-lg-5">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Nueva longitud</span>
                            <input type="text" className="form-control" disabled value={props.newLocation.lng.value} onChange={(e) => { props.newLocation.lng.value = e.target.value, props.refresh() }} />
                        </div>
                    </div>
                }
            </div>
        </div>

        <div className="col-12 mt-3 ">
            <div className="row">
                <div className="col-lg-5">
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Latitud</span>
                        <input type="text" className="form-control" disabled value={props.location.lat} />
                    </div>
                </div>
                <div className="col-lg-2">
                    <span className="mr-2" >Correcto:</span>
                    <label className="switch switch-text switch-pill switch-primary-outline">
                        <input type="checkbox" className="switch-input" checked={props.newLocation.lng.status && props.newLocation.lat.status} onChange={(e) => { props.newLocation.lng.status = e.target.checked, props.newLocation.lat.status = e.target.checked, props.refresh() }} />
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                    </label>
                </div>
                {!props.newLocation.lat.status &&
                    <div className="col-lg-5">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Nueva latitud</span>
                            <input type="text" className="form-control" disabled value={props.newLocation.lat.value} onChange={(e) => { props.newLocation.lat.value = e.target.value, props.refresh() }} />
                        </div>
                    </div>
                }
            </div>
        </div>
        {!props.newLocation.lat.status &&

            <div className="col-md-5 mt-3">
                <button type="button" onClick={() => props.handleGPS()} className="btn btn-primary btn-block" >Obtener coordenadas</button>
            </div>

        }
        {props.newLocation.lat.value &&
            <div className="col-12 mt-3 ">
                <GoogleMaps
                    position={props.position}
                    refresh={props.refresh}
                />
            </div>
        }
    </div>
)

export default Location
