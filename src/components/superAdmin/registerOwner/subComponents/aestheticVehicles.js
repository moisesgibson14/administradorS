import React, { Component } from 'react'
import {Label, InputGroup, InputGroupAddon} from 'reactstrap'
import { InputText } from '../../../../swaIInputs'

export default class AestheticVehicles extends Component {
    constructor(props) {
        super(props)

        this.handleNewAesthetic = this.handleNewAesthetic.bind(this)
    }

    handleNewAesthetic() {
        InputText('Ingrese nombre nueva estética:', (value) => {
            if (value) {
                let newAesthetic = {
                    typeVehicle: value,
                    priceFull: '',
                    priceHalf: '',
                    priceWashed: '',
                    iva: false
                }
                this.props.user.furnitures['vehicles'].aesthetic['typeAesthetic'] = this.props.user.furnitures['vehicles'].aesthetic['typeAesthetic'].concat(newAesthetic)
                this.props.refresh()
            }
        })
    }
    render() {
        return (
            <div>
                <div className="card">
                    <div className="alert alert-primary" role="alert">
                        <Label className="switch switch-icon switch-pill switch-warning float-left mr-2">
                            <input type="checkbox" className="switch-input"
                                defaultChecked={this.props.user.furnitures.vehicles.aesthetic['authorization']}
                                onChange={(e) => { this.props.user.furnitures.vehicles.aesthetic['authorization'] = e.target.checked, this.props.refresh() }} />
                            <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                            <span className="switch-handle"></span>
                        </Label>
                        <strong>ESTÉTICAS</strong>
                    </div>
                    <div className="card-body">
                        {
                            this.props.user.furnitures.vehicles.aesthetic['authorization'] === true &&
                            <div>
                                {
                                    this.props.user.furnitures['vehicles'].aesthetic['typeAesthetic'].map((aesthetic, index) => (
                                        <table key={index} className="table">
                                            {
                                                index === 0 &&
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>VEHÍCULO</th>
                                                        <th>FULL</th>
                                                        <th>MEDIA</th>
                                                        <th>LAVADA</th>
                                                        <th>INCLUYE IVA</th>
                                                    </tr>
                                                </thead>
                                            }
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input className="form-control" type="text" disabled defaultValue={aesthetic.typeVehicle} />
                                                    </td>
                                                    <td>
                                                        <InputGroup>
                                                            <InputGroupAddon>
                                                                <i className="fas fa-dollar-sign" />
                                                            </InputGroupAddon>
                                                            <input className="form-control noscroll" type="number" defaultValue={aesthetic.priceFull}
                                                                onChange={(e) => { aesthetic.priceFull = e.target.value, this.props.refresh() }}
                                                            />
                                                        </InputGroup>
                                                    </td>
                                                    <td>
                                                        <InputGroup>
                                                            <InputGroupAddon>
                                                                <i className="fas fa-dollar-sign" />
                                                            </InputGroupAddon>
                                                            <input className="form-control noscroll" type="number" defaultValue={aesthetic.priceHalf}
                                                                onChange={(e) => { aesthetic.priceHalf = e.target.value, this.props.refresh() }}
                                                            />
                                                        </InputGroup>
                                                    </td>
                                                    <td>
                                                        <InputGroup>
                                                            <InputGroupAddon>
                                                                <i className="fas fa-dollar-sign" />
                                                            </InputGroupAddon>
                                                            <input className="form-control noscroll" type="number" defaultValue={aesthetic.priceWashed}
                                                                onChange={(e) => { aesthetic.priceWashed = e.target.value, this.props.refresh() }}
                                                            />
                                                        </InputGroup>
                                                    </td>
                                                    <td>
                                                        <Label className="switch switch-icon switch-pill switch-secondary float-left mr-2">
                                                            <input type="checkbox" className="switch-input"
                                                                defaultChecked={aesthetic.iva}
                                                                onChange={(e) => { aesthetic.iva = e.target.checked, this.props.refresh() }} />
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
                                        <button onClick={this.handleNewAesthetic} type="button" className="btn btn-success mb-3" >
                                            <i className="fas fa-plus-circle"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
