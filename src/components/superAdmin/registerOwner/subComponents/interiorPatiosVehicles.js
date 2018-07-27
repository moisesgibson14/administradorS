import React, { Component } from 'react'
import {InputGroup, InputGroupAddon, Label} from 'reactstrap'
import OutdoorPatiosVehicles from './outdoorPatiosVehicles'
import { InputText } from '../../../../swaIInputs'

export default class InteriorPatiosVehicles extends Component {
    constructor(props) {
        super(props)

        this.handleNewInteriorPatio = this.handleNewInteriorPatio.bind(this)
    }

    handleNewInteriorPatio() {
        InputText('Ingrese nombre del nuevo tramite:', (value) => {
            if (value) {
                let newProcess = {
                    nameProcess: value,
                    priceCdmx: '',
                    priceEdoMex: '',
                    republicanInterior: '',
                    iva: false
                }
                this.props.user.furnitures['vehicles'].gestures['interiorPatios'] = this.props.user.furnitures['vehicles'].gestures['interiorPatios'].concat(newProcess)
                this.props.refresh()
            }
        })
    }


    render() {
        return (
            <div>
                {
                    this.props.user.furnitures['vehicles'].gestures['interiorPatios'].map((price, index) => (
                        <table key={index} className="table table-responsive ">
                            {
                                index === 0 &&
                                <thead className="thead-dark">
                                    <tr>
                                        <th>TRÁMITES</th>
                                        <th>CDMX</th>
                                        <th>EDO MEX,GDL,MTY</th>
                                        <th>INTERIOR DE LA REPÚBLICA</th>
                                        <th>INCLUYE IVA</th>
                                    </tr>
                                </thead>
                            }
                            <tbody>
                                <tr>
                                    <td>
                                        <input className="form-control" type="text" disabled defaultValue={price.nameProcess} />
                                    </td>
                                    <td>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <i className="fas fa-dollar-sign" />
                                            </InputGroupAddon>
                                            <input className="form-control noscroll" type="number" defaultValue={price.priceCdmx}
                                                onChange={(e) => { price.priceCdmx = e.target.value, this.props.refresh() }}
                                            />
                                        </InputGroup>
                                    </td>
                                    <td>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <i className="fas fa-dollar-sign" />
                                            </InputGroupAddon>
                                            <input className="form-control noscroll" type="number" defaultValue={price.priceEdoMex}
                                                onChange={(e) => { price.priceEdoMex = e.target.value, this.props.refresh() }}
                                            />
                                        </InputGroup>
                                    </td>
                                    <td>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <i className="fas fa-dollar-sign" />
                                            </InputGroupAddon>
                                            <input className="form-control noscroll" type="number" defaultValue={price.republicanInterior}
                                                onChange={(e) => { price.republicanInterior = e.target.value, this.props.refresh() }}
                                            />
                                        </InputGroup>
                                    </td>
                                    <td>
                                        <Label className="switch switch-icon switch-pill switch-secondary float-left mr-2">
                                            <input type="checkbox" className="switch-input"
                                                defaultChecked={price.IVA}
                                                onChange={(e) => { price.IVA = e.target.checked, this.props.refresh() }} />
                                            <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                                            <span className="switch-handle"></span>
                                        </Label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))
                }
                <div className="row">
                    <div className="col col-xs-12 col-md-1 offset-11">
                        <button onClick={this.handleNewInteriorPatio} type="button" className="btn btn-success mb-3" >
                            <i className="fas fa-plus-circle"></i>
                         </button>
                    </div>
                </div>
                <OutdoorPatiosVehicles user={this.props.user} refresh={this.props.refresh} />
            </div>
        )
    }
}
