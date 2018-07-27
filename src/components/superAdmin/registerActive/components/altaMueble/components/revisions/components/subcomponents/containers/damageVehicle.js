import React from 'react';

const damageVehicle = (props) => (
    <div className="row">
        <div className="col-md-12">
            <div className="alert alert-danger text-center mt-6" role="alert">
                <strong>DAÑOS</strong>
            </div>
        </div>
        {props.data.vehicleDamage.length > 0 &&
        <div className="col-md-12">
        {props.data.vehicleDamage.map((damage, indexChildren) => {
            return (
                <div key={indexChildren} className="row">
                    <div className="col-md-4">
                        <img src={damage.firstPhoto} className="card-img-top" alt="" />
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <div className="input-group-addon">ZONA:</div>
                            <input
                                type="text"
                                disabled
                                className="form-control"
                            value={damage.zone}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-addon">PARTE:</div>
                            <input
                                type="text"
                                disabled
                                className="form-control"
                            value={damage.part}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <div className="input-group-addon">DAÑO:</div>
                            <select name="" id="" value={damage.hurt} className="form-control uppercase" placeholder="Seleccionar" onChange={(e) => { damage.hurt = e.target.value, props.refresh() }} >
                                <option value="">Selecciona</option>
                                {props.Catalogue.map((catalogue, index) => {
                                    return (
                                        <option key={index} value={catalogue}>{catalogue}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-addon">OBSERVACIONES:</div>
                            <input
                                type="text"
                                className="form-control"
                                value={damage.observations}
                                onChange={(e) => { damage.observations = e.target.value.toUpperCase(), props.refresh()} }

                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-addon">COSTO* :</div>
                            <input
                                type="number"
                                min="0"
                                max="999999"
                                className="form-control"
                                value={damage.cost}
                                placeholder="$"
                                onChange={(e) => { damage.cost = e.target.value, props.refresh() }}
                            />
                        </div>
                    </div>
                    <br/><br/>
                    <div className="col-md-12">
                        <hr />
                    </div>                    
                </div>
            )
        })}
            </div>
        } 
        {
        props.data.vehicleDamage.length === 0 &&
        <div className="col-md-12 text-center">
            <h5>NO HAY DAÑOS</h5>
        </div>
        }
    </div>
);
export default damageVehicle;