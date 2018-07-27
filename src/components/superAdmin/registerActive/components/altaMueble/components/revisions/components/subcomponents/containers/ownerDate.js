import React from 'react';
const ownerDate = (props) =>(
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-info text-center mt-6" role="alert">
                        <strong>DATOS DEL PROPIETARIO</strong>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">ID Propietario</div>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            value={props.data.idOwner}
                        />
                    </div>
                </div>   
                <div className="col-md-8 mb-3">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">Propietario</div>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            value={props.data.Owner}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">1. Área</div>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            value={props.data.OneArea}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">2. Área</div>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            value={props.data.TwoArea}
                        />
                    </div>
                </div>
            </div>
        );

export default ownerDate;