import React, { Component } from 'react'
import {InputGroup, InputGroupAddon, Label} from 'reactstrap'
import { InputText } from '../../../../swaIInputs'

export default class OutdoorPatiosVehicles extends Component {
    constructor(props) {
        super(props)

        this.handleNewOutdoorPatio = this.handleNewOutdoorPatio.bind(this)
    }

    handleNewOutdoorPatio() {
        InputText('Ingrese nombre nueva ubicación:', (value) => {
            if (value) {
                let newOutdoorPatio = {
                    placeOfPosition: value,
                    price: '',
                    iva: false
                }
                this.props.user.furnitures['vehicles'].gestures['outdoorPatios'] = this.props.user.furnitures['vehicles'].gestures['outdoorPatios'].concat(newOutdoorPatio)
                this.props.refresh()
            }
        })
    }
    render() {
        return (
            <div>
                <div className="alert alert-warning text-center" role="alert">
                    Los servicios de gestorías en el interior de la República generan viáticos
                </div>
                {
                    this.props.user.furnitures['vehicles'].gestures['outdoorPatios'].map((priceOutdoor, keyIndex) => (
                        <table key={keyIndex} className="table">
                            {
                                keyIndex === 0 &&
                                <thead className="thead-dark" >
                                    <tr>
                                        <th>UBICACIÓN</th>
                                        <th>PRECIO</th>
                                        <th>INCLUYE IVA</th>
                                    </tr>
                                </thead>
                            }
                            <tbody>
                                <tr>
                                    <td>
                                        <input className="form-control" type="text" disabled defaultValue={priceOutdoor.placeOfPosition} />
                                    </td>
                                    <td>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <i className="fas fa-dollar-sign" />
                                            </InputGroupAddon>
                                            <input className="form-control" type="number"
                                                defaultValue={priceOutdoor.price}
                                                onChange={(e) => { priceOutdoor.price = e.target.value, this.props.refresh() }}
                                            />
                                        </InputGroup>
                                    </td>
                                    <td>
                                        <Label className="switch switch-icon switch-pill switch-secondary float-rigth mr-2">
                                            <input type="checkbox" className="switch-input"
                                                defaultChecked={priceOutdoor.IVA}
                                                onChange={(e) => { priceOutdoor.IVA = e.target.checked, this.props.refresh() }} />
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
                        <button onClick={this.handleNewOutdoorPatio} type="button" className="btn btn-success mb-3" >
                            <i className="fas fa-plus-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
