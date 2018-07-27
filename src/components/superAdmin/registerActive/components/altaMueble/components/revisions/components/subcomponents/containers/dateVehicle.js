import React from "react";
const DateVehicle = (props) =>(
    <div className="row">
        <div className="col-md-12">
            <div className="alert alert-info text-center mt-6" role="alert">
                <strong>DATOS DEL VEHÍCULO</strong>
            </div>            
        </div>
        <div className="col-md-4 mb-3">
            <img src={props.data.mainPhoto} className="card-img-top" alt=""/>
        </div>
        <div className="col-md-4 mb-3">
            <div className="input-group mb-3">
                <div className="input-group-addon">Tipo de vehículo</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.typeVehicle}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-addon">Año</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.year}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-addon">Marca</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.brand}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-addon">Modelo</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.model}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-addon">Versión</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.version}
                />
            </div>
        </div>
        <div className="col-md-4 mb-3">
            <div className="input-group mb-3">
                <div className="input-group-addon">Color</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.color}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-addon">Odómetro</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.odometer}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-addon">Número de serie</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.serialNumber}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-addon">Número de motor</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.engineNumber}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-addon">ID Activo</div>
                <input
                    type="text"
                    disabled
                    className="form-control"
                    value={props.data.vehicle.idActive}
                />
            </div>
        </div>      
    </div>
);
export default DateVehicle;