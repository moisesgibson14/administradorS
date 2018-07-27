import React from 'react'

const listSettings = (props) => (
    <div className="tb-responsive">
        <table className="table table-borderless tableSettings">
            <tbody>
                {props.report.map((list, indexG) => {
                    return (
                        <tr key={indexG}>
                            <td>
                                <label>CCT:</label>
                                <input type="text" className="form-control" value={props.dataB.states.basicInformation[0].valueId} disabled />
                            </td>
                            <td>
                                <label>Número de Cuenta:</label>
                                <select className="form-control" id="sel1">
                                    <option>SELECCIONA</option>
                                    <option>5565-5334-3443-4333</option>
                                </select>
                            </td>
                            <td>
                                <label id="basic-addon1">Activo</label>
                                <select className="form-control" value={props.asset} onChange={(e) => props.handleSelectChange(e.target.value, indexG)}>
                                    <option value="null" name="owner" >Seleccionar</option>
                                    {
                                        props.listGeneralAsset.map((activo, index) => {
                                            return (
                                                <option key={index} value={activo.label}>
                                                    {/* {list.asset !== activo.label &&
                                                    <label htmlFor=""> */}
                                                        {activo.label}
                                                    {/* </label>                                                    
                                                    } */}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={() => props.deleteItem(indexG)}><i className="far fa-trash-alt"></i></button>
                            </td>
                            {list.countB &&
                                <td>
                                    <label id="basic-addon1">Existencia en Libros</label>
                                    <input type="number" value={list.countB} className="form-control" disabled />
                                </td>
                            }
                            {list.countR &&
                                <td>
                                    <label id="basic-addon1">Existencia Real</label>
                                    <input type="number" value={list.countR} className="form-control" disabled />
                                </td>
                            }
                            {list.discrepancy &&
                                <td>
                                    <label id="basic-addon1">Discrepancia</label>
                                    <input type="number" value={list.discrepancy} className="form-control" disabled />
                                </td>
                            }
                            {list.price &&
                                <td>
                                    <label id="basic-addon1">Precio Promedio</label>
                                    <input type="text" value={new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'MXN',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(list.price)} className="form-control" disabled />
                                </td>
                            }
                            {list.charge &&
                                <td>
                                    <label id="basic-addon1">Cargo</label>
                                    <input type="text" value={new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'MXN',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(list.charge)} className="form-control" disabled />
                                </td>
                            }
                            {list.payment &&
                                <td>
                                    <label id="basic-addon1">Abono</label>
                                    <input type="text" value={new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'MXN',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(list.payment)} className="form-control" disabled />
                                </td>
                            }
                        </tr>
                    )
                })}
                {props.existTotal && props.report.length > 0 &&
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        {props.reportsTot &&
                            <td>
                                <label id="basic-addon1">Total Cargos:</label>
                                <input type="text" value={new Intl.NumberFormat('en-GB', {
                                    style: 'currency',
                                    currency: 'MXN',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(props.reportsTot)} className="form-control" disabled />
                            </td>
                        }
                        {props.reportsTotal &&
                            <td>
                                <label id="basic-addon1">Total Abono:</label>
                                <input type="text" className="form-control settingsTotal" value={new Intl.NumberFormat('en-GB', {
                                    style: 'currency',
                                    currency: 'MXN',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(props.reportsTotal)} disabled />
                            </td>
                        }
                    </tr>
                }
            </tbody>
        </table>
        <div className="settingsBtns flex-sates">
            <button className="btn btn-primary" onClick={() => props.handleNewDocument()}><i className="fas fa-plus-circle"></i> AGREGAR NUEVO</button>
            {props.report.length > 0 && props.existTotal &&
                <button className="btn btn-outline-success" onClick={() => props.handleAddNewReport()}> <i className="fas fa-save"></i> GUARDAR REPORTE</button>
            }
        </div>
    </div>
)

export default listSettings