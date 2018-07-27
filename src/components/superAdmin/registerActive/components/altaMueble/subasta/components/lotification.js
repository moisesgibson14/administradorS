import React from 'react' 

const lotification = (props) => (
    <div className="flex-sates">

        <div className="input-sates">
            <label>LOTE:</label>
            <input type="number" value={props.data.lot} disabled={!props.data.eventNumber}  min="1" max="999" placeholder="(#)" onChange={(e) => { props.numberLot(e.target.value), props.refresh() }} />

            {props.lotAvailable &&
                <small className="alert alert-danger"> <i className="fas fa-exclamation-circle"></i> NÚMERO DE LOTE NO DISPONIBLE</small>
            }
            {/* {!props.lotAvailable && props.data.lot &&
                <span className="alert alert-success"><i className="fas fa-thumbs-up"></i> NÚMERO DE LOTE DISPONIBLE</span>
            } */}
        </div>       

        <div className="input-sates">
            <label>GARANTIA:</label>
            {/* {props.warranty && */}
            <select name="" id="" className="form-control" value={props.data.warrantyColor.value} placeholder="Seleccionar" onChange={(e) => { props.selectWarrantyColor(e.target.value), props.refresh() }} >
                <option value="">Selecciona</option>
                {props.warranty.map((options, index) => {
                    return (
                        <option key={index} value={options.title}>{options.title}</option>
                    )
                })}
            </select>
            {/* } */}
        </div>

        <div className="input-sates">
            <label>MONEDA:</label>
            <select name="" id="" className="form-control" value={props.data.coin.value} placeholder="Seleccionar" onChange={(e) => { props.data.coin.value = e.target.value, props.refresh() }} >
                <option value="">Selecciona</option>
                {props.data.coin.values.map((options, index) => {
                    return (
                        <option key={index} value={options.label}>{options.label}</option>
                    )
                })}
            </select>
        </div>

        <div className="input-sates">
            {props.data.coin.value !== 'MXN' &&props.data.coin.value !== 'mxn' && props.data.coin.value !== 'Mxn' &&
            <div>
                <label>TIPO DE CAMBIO:</label>
                <input type="number" value={props.data.exchangeRate} placeholder="(#)" onChange={(e) => { props.data.exchangeRate = e.target.value, props.refresh() }} />
            </div>
            }
        </div>


        <div className="input-sates">
            <label>PRECIO DE SALIDA:</label>
            <input type="number" value={props.data.startingPrice} placeholder="$" onChange={(e) => { props.data.startingPrice = e.target.value, props.refresh() }} />
        </div>


        <div className="input-sates">
            <label>PRECIO DE RESERVA:</label>
            <input type="number" value={props.data.reservePrice} placeholder="$" onChange={(e) => { props.data.reservePrice = e.target.value, props.refresh() }} />
        </div>


        <div className="input-sates">
            <label>COMISIÓN PROPIETARIO:</label>                
            <select name="" id="" className="form-control" value={props.data.typeCommissionOwner} placeholder="Seleccionar" onChange={(e) => { props.data.typeCommissionOwner = e.target.value, props.refresh() }} >
                <option value="">Selecciona % / $</option>
                {props.data.typeCommission.values.map((typeCom, index) => {
                    return (
                        <option key={index} value={typeCom.label}>{typeCom.label}</option>
                    )
                })}
            </select>
            {props.data.typeCommissionOwner &&
                <input type="number" value={props.data.commissionOwner} placeholder="valor" onChange={(e) => { props.data.commissionOwner = e.target.value, props.refresh() }} />
            }
        </div>            

        
        <div className="input-sates">
            <label>COMISIÓN COMPRADOR:</label>
            <select name="" id="" className="form-control" value={props.data.typeCommissionBuyer} placeholder="Seleccionar" onChange={(e) => { props.data.typeCommissionBuyer = e.target.value, props.refresh() }} >
                <option value="">Selecciona % / $</option>
                {props.data.typeCommission.values.map((typeCom, index) => {
                    return (
                        <option key={index} value={typeCom.label}>{typeCom.label}</option>
                    )
                })}
            </select>
            {props.data.typeCommissionBuyer && 
                <input type="number" value={props.data.commissionBuyer} placeholder="valor" onChange={(e) => { props.data.commissionBuyer = e.target.value, props.refresh() }} />
            }
        </div>

        <div className="input-sates">
            <label>COMISIÓN ESPECIAL:</label>
            <select name="" id="" className="form-control" value={props.data.comissionSpecial.option} placeholder="Seleccionar" onChange={(e) => { props.data.comissionSpecial.option = e.target.value, props.refresh() }} >
                <option value="">Selecciona SI / NO</option>
                {props.data.comissionSpecial.values.map((typeCom, index) => {
                    return (
                        <option key={index} value={typeCom.label}>{typeCom.label}</option>
                    )
                })}
            </select>
            {props.data.comissionSpecial.option === 'SI' && 
                <input type="number" value={props.data.comissionSpecial.value} placeholder="valor" onChange={(e) => { props.data.comissionSpecial.value = e.target.value, props.refresh() }} />
            }
        </div>

        <div className="input-sates ubsObs">
            <label>DESTACAR:</label>
            {/* <input type="text"  placeholder="Destacar"  /> */}
            <textarea type="textarea" rows="3" maxLength="500" id="destacar" name="destacar" value={props.data.forHighlighting} onChange={(e) => { props.data.forHighlighting = e.target.value, props.refresh() }} >   </textarea>
        </div>

        <div className="input-sates">
            <label>ESTADO DE LOTE:</label>
            <select name="" id="" className="form-control" value={props.data.lotStatus.value} placeholder="Seleccionar" onChange={(e) => { props.data.lotStatus.value = e.target.value, props.refresh() }} >
                <option value="">Selecciona</option>
                {props.data.lotStatus.values.map((options, index) => {
                    return (
                        <option key={index} value={options.label}>{options.label}</option>
                    )
                })}
            </select>
        </div>

        <div className="input-sates subsObs">
            <label>OBSERVACIONES:</label>
            <textarea type="textarea" rows="3" maxLength="500" id="Observaciones" name="Observaciones" value={props.data.observations} onChange={(e) => { props.data.observations = e.target.value.toUpperCase(), props.refresh() }} >
            </textarea>
        </div>
        
        <div className="flex-sates switchGroup"> 
            <div className="subastaSwitch">                        
                <span>COMO NUEVO:</span>
                <label className="switch switch-text switch-primary-outline-alt switch-user">
                    <input type="checkbox" className="switch-input"
                    checked={props.data.specifications.asNew}
                    onChange={(e) => { props.data.specifications.asNew = e.target.checked, props.refresh() }} 
                    />
                    <span className="switch-label" data-on="On" data-off="Off"></span>
                    <span className="switch-handle"></span>
                </label>
            </div>  
            <div className="subastaSwitch">                        
                <span>BAJO KILOMETRAJE:</span>
                <label className="switch switch-text switch-primary-outline-alt switch-user">
                    <input type="checkbox" className="switch-input"
                    checked={props.data.specifications.LowMileage}
                    onChange={(e) => { props.data.specifications.LowMileage = e.target.checked, props.refresh() }} 
                    />
                    <span className="switch-label" data-on="On" data-off="Off"></span>
                    <span className="switch-handle"></span>
                </label>
            </div> 
            <div className="subastaSwitch">                        
                <span>SERVICIOS DE AGENCIA:</span>
                <label className="switch switch-text switch-primary-outline-alt switch-user">
                    <input type="checkbox" className="switch-input"
                    checked={props.data.specifications.agencyServices}
                    onChange={(e) => { props.data.specifications.agencyServices = e.target.checked, props.refresh() }} 
                    />
                    <span className="switch-label" data-on="On" data-off="Off"></span>
                    <span className="switch-handle"></span>
                </label>
            </div> 
            <div className="subastaSwitch">                        
                <span>SIN PRECIOS DE RESERVA:</span>
                <label className="switch switch-text switch-primary-outline-alt switch-user">
                    <input type="checkbox" className="switch-input"
                    checked={props.data.specifications.noReservePrice}
                    onChange={(e) => { props.data.specifications.noReservePrice = e.target.checked, props.refresh() }} 
                    />
                    <span className="switch-label" data-on="On" data-off="Off"></span>
                    <span className="switch-handle"></span>
                </label>
            </div> 
        </div>
        <br/>
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