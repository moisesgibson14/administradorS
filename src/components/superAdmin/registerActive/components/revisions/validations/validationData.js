import React from 'react'

const ValidationData = (props) => {
    return (
        <div className="col-12 mt-3 ">
            <div className="row">
                <div className="col-lg-5">
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">{props.name}</span>
                        <input type="text" className="form-control" disabled value={props.previousValue} />
                    </div>
                </div>
                <div className="col-lg-2">
                    <span className="mr-2" >Correcto:</span>
                    <label className="switch switch-text switch-pill switch-primary-outline">
                        <input type="checkbox" className="switch-input" checked={props.newLocation.status} onChange={(e) => { props.newLocation.status = e.target.checked, props.refresh() }} />
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                    </label>
                </div>
                {!props.newLocation.status &&
                    <div className="col-lg-5">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Nuevo {props.name}</span>
                            <input type="text" className="form-control" value={props.newLocation.value} onChange={(e) => { props.newLocation.value = e.target.value, props.refresh() }} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ValidationData
