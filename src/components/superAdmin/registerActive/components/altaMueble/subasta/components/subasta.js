import React from 'react';

const altaSubasta = (props) => (
    <div className="subasta">
        <div className="input-sates">
            <label>ESTADO DOCUMENTAL DEL ACTIVO:</label>
            <select name="" id="" value={props.data.DocumentaryStatusAsset.value} className="form-control" placeholder="Seleccionar" onChange={(e) => { props.data.DocumentaryStatusAsset.value = e.target.value, props.refresh() }} >
                <option value="">Selecciona</option>
                {props.data.DocumentaryStatusAsset.values.map((options, index) => {
                    return (
                        <option key={index} value={options.label}>{options.label}</option>
                    )
                })}
            </select>
        </div>
    </div>
);

export default altaSubasta;