import React from 'react'
const dateBasic = (props) => (
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-info text-center mt-6" role="alert">
                        <strong>DATOS DE INGRESO</strong>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">Fecha</div>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            value={props.data.reviewDate}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">Hora</div>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            value={props.data.hour}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="input-group mb-2 mb-sm-0">
                        <div className="input-group-addon">Ubicación</div>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            value={props.data.location}
                        />
                    </div>
                </div>
            </div>
)
export default dateBasic
