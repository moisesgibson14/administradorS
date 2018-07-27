import React from 'react';

const directSale = (props) => (
    <div className="row">
        <div className="col-md-12">
            <div className="input-group mb-3">
                <div className="input-group-addon"> ESTADO DOCUMENTAL:</div>
                    <select name="" id="" value={props.data.documentaryStatus.value} className="form-control uppercase" placeholder="Seleccionar" onChange={(e) => { props.data.documentaryStatus.value = e.target.value, props.refresh() }} >
                        <option value="">Selecciona</option>
                        {props.data.documentaryStatus.values.map((options, index) => {
                            return (
                                <option key={index} value={options.label}>{options.label}</option>
                            )
                        })}
                    </select>
            </div>
        </div>
    </div>
);

export default directSale;