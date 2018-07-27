import React, { Component } from 'react'
import {Label, InputGroup, InputGroupAddon} from 'reactstrap'
import { InputText, confirmRequest } from '../../../../swaIInputs'

export default class VehiclesAdministration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            day: [],
            refresh: ''
        }
        this.handleNewService = this.handleNewService.bind(this)
        this.handleDeletedService = this.handleDeletedService.bind(this)
    }

    componentDidMount() {
        let dayFinal = 31
        for (let day = 1; day <= 31; day++) {
            this.state.day = this.state.day.concat(day)
        }
        this.setState({
            refresh: ''
        })
    }

    handleNewService() {
        InputText('Ingrese nombre nuevo servicio: ', (value) => {
            if (value) {
                value = value.toUpperCase()
                let newService = {
                    authorization: false,
                    label: value,
                    percentage: '',
                    quantity: '',
                    IVA: false
                }
                this.props.user.furnitures['vehicles'].services = this.props.user.furnitures['vehicles'].services.concat(newService)
                this.props.refresh()
            }
        })
    }

    handleDeletedService(index) {
        confirmRequest('Estas seguro?', 'Se eliminara el servicio permanentemente', (ok) => {
            if (ok) {
                let contactsTMP = []
                this.props.user.furnitures['vehicles'].services.map((vehicle, key) => {
                    if (index !== key) {
                        contactsTMP = contactsTMP.concat(vehicle)
                    }
                })
                this.props.user.furnitures['vehicles'].services = contactsTMP
                this.props.refresh()
            }
        })
    }

    render() {
        let { day } = this.state
        if (!day) return <h5>Cargando...</h5>
        return (
            <div>
                <div className="card">
                    <div className="card-body" >
                        <div className="card">
                            <div className="alert alert-dark" role="alert">
                                <Label className="switch switch-icon switch-pill switch-warning float-left mr-2">
                                    <input type="checkbox" className="switch-input"
                                        defaultChecked={this.props.user.furnitures.vehicles.administration['authorization']}
                                        onChange={(e) => { this.props.user.furnitures.vehicles.administration['authorization'] = e.target.checked, this.props.refresh() }} />
                                    <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                                    <span className="switch-handle"></span>
                                </Label>
                                <strong>ADMINISTRACIÓN</strong>
                            </div>
                            <div className="card-body">
                                {
                                    this.props.user.furnitures.vehicles.administration['authorization'] === true &&
                                    <div>
                                        <div className="row">
                                            <div className=" col-md-10">
                                                <div className="row mt-1">
                                                    <div className=" col-md-3">
                                                        <label htmlFor="chargeForService">Cobro por servicio unitario</label>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <input
                                                            defaultValue={this.props.user.furnitures.vehicles.administration['chargeForService']}
                                                            type="text"
                                                            className="form-control"
                                                            id="chargeForService" placeholder="$"
                                                            onChange={(e) => { this.props.user.furnitures.vehicles.administration['chargeForService'] = e.target.value, this.props.refresh() }}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <span className="mr-1" >Incluye IVA</span>
                                                        <Label className="switch switch-icon switch-pill switch-secondary">
                                                            <input type="checkbox" className="switch-input"
                                                                defaultChecked={this.props.user.furnitures.vehicles.administration['IVA']}
                                                                onChange={(e) => { this.props.user.furnitures.vehicles.administration['IVA'] = e.target.checked, this.props.refresh() }} />
                                                            <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                                                            <span className="switch-handle"></span>
                                                        </Label>
                                                    </div>
                                                    <div className=" col-md-4">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <span className="mr-1">Tiempo de pago</span>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <select className="form-control" value={this.props.user.furnitures.vehicles.administration['paymentTime']}
                                                                    onChange={(e) => { this.props.user.furnitures.vehicles.administration['paymentTime'] = e.target.value, this.props.refresh() }}
                                                                >
                                                                    <option value="null">Selecionar</option>
                                                                    <option value="monthly">Mensual</option>
                                                                    <option value="trimester">Trimestral</option>
                                                                    <option value="annual">Anual</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <div className="row mt-1">
                                                    <div className="col-md-5">
                                                        <span className="mr-1" >Período de facturación:</span>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <select className="form-control"
                                                            value={this.props.user.furnitures.vehicles.administration['billingPeriod']}
                                                            onChange={(e) => { this.props.user.furnitures.vehicles.administration['billingPeriod'] = e.target.value, this.props.refresh() }}
                                                        >
                                                            <option value="null">Selecionar</option>
                                                            <option value="monthly">Mensual</option>
                                                            <option value="annual">Anual</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row mt-1">
                                                    <div className="col-md-6 offset-1">
                                                        <label htmlFor="billingDay" className="mr-1" >Día de facturación:</label>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <select
                                                            id="billingDay"
                                                            value={this.props.user.furnitures.vehicles.administration['billingDay']}
                                                            className="form-control"
                                                            onChange={(e) => { this.props.user.furnitures.vehicles.administration['billingDay'] = e.target.value, this.props.refresh() }}
                                                        >
                                                            <option value="null">Selecionar</option>
                                                            {
                                                                day.map((d, index) => (
                                                                    <option key={index} value={d}>{d}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            this.props.user.furnitures['vehicles'].services.map((service, index) => (
                                <div key={index} >
                                    <div className="card">
                                        <div className="alert alert-dark" role="alert">
                                            <Label className="switch switch-icon switch-pill switch-warning float-left mr-2">
                                                <input type="checkbox" className="switch-input"
                                                    defaultChecked={service.authorization}
                                                    onChange={(e) => { service.authorization = e.target.checked, this.props.refresh() }} />
                                                <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                                                <span className="switch-handle"></span>
                                            </Label>
                                            <strong>{service.label}</strong>
                                            {
                                                (index) >= 3 &&
                                                <button type="button" className="float-right mb-3 btn btn-danger" onClick={() => this.handleDeletedService(index)} ><i className="fas fa-times-circle"></i></button>
                                            }
                                        </div>
                                        <div className="card-body">
                                            {
                                                service.authorization === true &&
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <label htmlFor="quantity" className="mr-2" >Cantidad</label>
                                                            <div className=" col-md-6">
                                                                <InputGroup>
                                                                    <InputGroupAddon>$</InputGroupAddon>
                                                                    <input
                                                                        id="quantity"
                                                                        type="number"
                                                                        className="form-control"
                                                                        disabled={(service.percentage !== '') ? true : false}
                                                                        value={service.quantity}
                                                                        onChange={(e) => { service.quantity = e.target.value, this.props.refresh() }}
                                                                    />
                                                                </InputGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" col-md-4">
                                                        <div className="row">
                                                            <label htmlFor="percentage">Porcentaje</label>
                                                            <div className=" col-md-6">
                                                                <InputGroup>
                                                                    <InputGroupAddon>%</InputGroupAddon>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        disabled={(service.quantity !== '') ? true : false}
                                                                        value={service.percentage}
                                                                        onChange={(e) => { service.percentage = e.target.value, this.props.refresh() }}
                                                                    />
                                                                </InputGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" col-md-4">
                                                        <div className="row">
                                                            <label htmlFor={index}>IVA</label>
                                                            <div className=" col-md-6">
                                                                <Label className="switch switch-icon switch-pill switch-secondary float-left mr-2">
                                                                    <input id={index} type="checkbox" className="switch-input"
                                                                        defaultChecked={service.IVA}
                                                                        onChange={(e) => { service.IVA = e.target.checked, this.props.refresh() }} />
                                                                    <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                                                                    <span className="switch-handle"></span>
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <button onClick={this.handleNewService} type="button" className="float-right mb-3 mr-3 btn btn-success" ><i className="fas fa-plus-circle"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}
