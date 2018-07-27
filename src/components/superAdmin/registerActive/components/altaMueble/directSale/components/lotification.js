import React from 'react'

const lotification = (props) => (
    <div className="row">
        <div className="col-md-6">
            <div className="input-group">
                <span className="input-group-addon">LOTE</span>
                <input type="number" value={props.data.lot} className="form-control uppercase" placeholder="(#)" onChange={(e) => { props.data.lot = e.target.value, props.refresh() }} />
            </div>
        </div>
        <div className="col-md-6">
            <div className="input-group mb-3">
                <div className="input-group-addon"> MONEDA:</div>
                <select name="" id="" className="form-control uppercase" value={props.data.coin.value} placeholder="Seleccionar" onChange={(e) => { props.data.coin.value = e.target.value, props.refresh() }} >
                    <option value="">Selecciona</option>
                    {props.data.coin.values.map((options, index) => {
                        return (
                            <option key={index} value={options.label}>{options.label}</option>
                        )
                    })}
                </select>
            </div>
        </div>
        <div className="col-md-6">
            <div className="input-group mb-3">
                <span className="input-group-addon">TIPO DE CAMBIO</span>
                <input type="number" value={props.data.exchangeRate} className="form-control uppercase" placeholder="(#)" onChange={(e) => { props.data.exchangeRate = e.target.value, props.refresh() }} />
            </div>
        </div>
        <div className="col-md-6">
            <div className="input-group mb-3">
                <span className="input-group-addon">PRECIO DE VENTA</span>
                <input type="number" value={props.data.salePrice} className="form-control uppercase" placeholder="$" onChange={(e) => { props.data.salePrice = e.target.value, props.refresh() }} />
            </div>
        </div>
        <div className="col-md-6">
            <div className="input-group mb-3">
                <span className="input-group-addon">COMISIÓN PROPIETARIO</span>
                <select name="" id="" className="form-control uppercase" value={props.data.typeCommissionOwner} placeholder="Seleccionar" onChange={(e) => { props.data.typeCommissionOwner = e.target.value, props.refresh() }} >
                    <option value="">Selecciona % / $</option>
                    {props.data.typeCommission.values.map((typeCom, index) => {
                        return (
                            <option key={index} value={typeCom.label}>{typeCom.label}</option>
                        )
                    })}
                </select>
                {props.data.typeCommissionOwner &&
                    <input type="number" value={props.data.commissionOwner} className="form-control uppercase" placeholder="valor" onChange={(e) => { props.data.commissionOwner = e.target.value, props.refresh() }} />
                }
            </div>
        </div>
        <div className="col-md-6">
            <div className="input-group mb-3">
                <span className="input-group-addon">COMISIÓN COMPRADOR</span>
                <select name="" id="" className="form-control uppercase" value={props.data.typeCommissionBuyer} placeholder="Seleccionar" onChange={(e) => { props.data.typeCommissionBuyer = e.target.value, props.refresh() }} >
                    <option value="">Selecciona % / $</option>
                    {props.data.typeCommission.values.map((typeCom, index) => {
                        return (
                            <option key={index} value={typeCom.label}>{typeCom.label}</option>
                        )
                    })}
                </select>
                {props.data.typeCommissionBuyer &&
                    <input type="number" value={props.data.commissionBuyer} className="form-control uppercase" placeholder="valor" onChange={(e) => { props.data.commissionBuyer = e.target.value, props.refresh() }} />
                }
            </div>
        </div>
        <div className="col-md-12">
            <div className="input-group mb-3">
                <span className="input-group-addon">DESTACAR</span>
                <input type="text" value={props.data.forHighlighting} className="form-control uppercase" placeholder="Destacar" onChange={(e) => { props.data.forHighlighting = e.target.value, props.refresh() }} />
            </div>
        </div>
        <div className="col-md-6">
            <div className="input-group mb-3">
                <div className="input-group-addon"> ESTADO DE LOTE:</div>
                <select name="" id="" className="form-control uppercase" value={props.data.lotStatus.value} placeholder="Seleccionar" onChange={(e) => { props.data.lotStatus.value = e.target.value, props.refresh() }} >
                    <option value="">Selecciona</option>
                    {props.data.lotStatus.values.map((options, index) => {
                        return (
                            <option key={index} value={options.label}>{options.label}</option>
                        )
                    })}
                </select>
            </div>
        </div>
        <div className="col-md-6">
            <div className="input-group mb-3">
                <span className="input-group-addon">OBSERVACIONES</span>
                <input type="text" value={props.data.observations} className="form-control uppercase" placeholder="Observaciones" onChange={(e) => { props.data.observations = e.target.value.toUpperCase(), props.refresh() }} />
            </div>
        </div>
        <br />
        <div className="subastaSwitch">
            <span>DESTACAR:</span>
            <label className="switch switch-text switch-primary-outline-alt switch-user">
                <input type="checkbox" className="switch-input"
                    checked={props.furniture.furniture.highlightActive}
                    onChange={(e) => { props.furniture.furniture.highlightActive = e.target.checked, props.refresh() }}
                />
                <span className="switch-label" data-on="On" data-off="Off"></span>
                <span className="switch-handle"></span>
            </label>
        </div>
    </div>
);
export default lotification