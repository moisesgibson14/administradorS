import React, { Component } from 'react'
import {Label, InputGroup, InputGroupAddon} from 'reactstrap'
import { InputText, confirmRequest } from '../../../../swaIInputs'
export default class EstateAdministration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            daysEstate: []
        }

        this.handleNewServiceEstate = this.handleNewServiceEstate.bind(this)
        this.handleDeletedServiceEstate = this.handleDeletedServiceEstate.bind(this)
    }

    componentDidMount() {
        let dayFinal = 31
        for (let day = 1; day <= 31; day++) {
            this.state.daysEstate = this.state.daysEstate.concat(day)
        }
        this.setState({
            refresh: ''
        })
    }

    handleNewServiceEstate() {
        InputText('Ingrese nombre nuevo servicio: ', (value) => {
            if (value) {
                value = value.toUpperCase()
                let newServiceEstate = {
                    authorization: false,
                    label: value,
                    percentage: '',
                    quantity: '',
                    IVA: false
                }
                this.props.user.estate.services = this.props.user.estate.services.concat(newServiceEstate)
                this.props.refresh()
            }
        })
    }

    handleDeletedServiceEstate(index) {
        confirmRequest('¿Estas seguro?', 'Se eliminara el servicio permanentemente', (ok) => {
            if (ok) {
                let contactsTMP = []
                this.props.user.estate.services.map((vehicle, key) => {
                    if (index !== key) {
                        contactsTMP = contactsTMP.concat(vehicle)
                    }
                })
                this.props.user.estate.services = contactsTMP
                this.props.refresh()
            }
        })
    }

    render() {
        let { daysEstate } = this.state
        if (!daysEstate) return <h5>Cargando...</h5>
        return (
            <div>
                <div className="card">
                    <div className="card-body" >
                        <div className="card">
                            <div className="alert alert-dark" role="alert">
                                <Label className="switch switch-icon switch-pill switch-warning float-left mr-2">
                                    <input type="checkbox" className="switch-input"
                                        defaultChecked={this.props.user.estate.administration['authorization']}
                                        onChange={(e) => { this.props.user.estate.administration['authorization'] = e.target.checked, this.props.refresh() }} />
                                    <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                                    <span className="switch-handle"></span>
                                </Label>
                                <strong>ADMINISTRACIÓN</strong>
                            </div>
                            <div className="card-body">
                                {
                                    this.props.user.estate.administration['authorization'] === true &&
                                    <div>
                                        <div className="row">
                                            <div className="col col-xs-12 col-md-10">
                                                <div className="row mt-1">
                                                    <div className="col col-xs-12 col-md-3">
                                                        <label htmlFor="chargeForService">Cobro por servicio unitario</label>
                                                    </div>
                                                    <div className="col col-xs-12 col-md-2">
                                                        <input
                                                            defaultValue={this.props.user.estate.administration['chargeForService']}
                                                            type="text"
                                                            className="form-control"
                                                            id="chargeForService" placeholder="$"
                                                            onChange={(e) => { this.props.user.estate.administration['chargeForService'] = e.target.value, this.props.refresh() }}
                                                        />
                                                    </div>
                                                    <div className="col col-xs-12 col-md-3">
                                                        <span className="mr-1" >Incluye IVA</span>
                                                        <Label className="switch switch-icon switch-pill switch-secondary">
                                                            <input type="checkbox" className="switch-input"
                                                                defaultChecked={this.props.user.estate.administration['IVA']}
                                                                onChange={(e) => { this.props.user.estate.administration['IVA'] = e.target.checked, this.props.refresh() }} />
                                                            <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                                                            <span className="switch-handle"></span>
                                                        </Label>
                                                    </div>
                                                    <div className="col col-xs-12-3 col-md-4">
                                                        <div className="row">
                                                            <div className="col col-xs-6">
                                                                <span className="mr-1">Tiempo de pago</span>
                                                            </div>
                                                            <div className="col col-xs-6">
                                                                <select className="form-control" value={this.props.user.estate.administration['paymentTime']}
                                                                    onChange={(e) => { this.props.user.estate.administration['paymentTime'] = e.target.value, this.props.refresh() }}
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
                                            <div className="col col-xs-12 col-md-6">
                                                <div className="row mt-1">
                                                    <div className="col col-xs-12 col-md-5">
                                                        <span className="mr-1" >Período de facturación:</span>
                                                    </div>
                                                    <div className="col col-xs-12 col-md-6">
                                                        <select className="form-control"
                                                            value={this.props.user.estate.administration['billingPeriod']}
                                                            onChange={(e) => { this.props.user.estate.administration['billingPeriod'] = e.target.value, this.props.refresh() }}
                                                        >
                                                            <option value="null">Selecionar</option>
                                                            <option value="monthly">Mensual</option>
                                                            <option value="annual">Anual</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col col-xs-12 col-md-4">
                                                <div className="row mt-1">
                                                    <div className="col col-xs-12 col-md-6 offset-1">
                                                        <label htmlFor="billingDay" className="mr-1" >Día de facturación:</label>
                                                    </div>
                                                    <div className="col col-xs-12 col-md-4">
                                                        <select
                                                            id="billingDay"
                                                            value={this.props.user.estate.administration['billingDay']}
                                                            className="form-control"
                                                            onChange={(e) => { this.props.user.estate.administration['billingDay'] = e.target.value, this.props.refresh() }}
                                                        >
                                                            <option value="null">Selecionar</option>
                                                            {
                                                                daysEstate.map((day, indexEstate) => (
                                                                    <option key={indexEstate} value={day}>{day}</option>
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
                            this.props.user.estate.services.map((serviceEstate, indexService) => (
                                <div key={indexService} >
                                    <div className="card">
                                        <div className="alert alert-dark" role="alert">
                                            <Label className="switch switch-icon switch-pill switch-warning float-left mr-2">
                                                <input type="checkbox" className="switch-input"
                                                    defaultChecked={serviceEstate.authorization}
                                                    onChange={(e) => { serviceEstate.authorization = e.target.checked, this.props.refresh() }} />
                                                <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                                                <span className="switch-handle"></span>
                                            </Label>
                                            <strong>{serviceEstate.label}</strong>
                                            {
                                                (indexService) >= 3 &&
                                                <button type="button" className="float-right mb-3 btn btn-danger" onClick={() => this.handleDeletedServiceEstate(indexService)} ><i className="fas fa-times-circle"></i></button>
                                            }
                                        </div>
                                        <div className="card-body">
                                            {
                                                serviceEstate.authorization === true &&
                                                <div className="row">
                                                    <div className="col col-xs-12 col-md-4">
                                                        <div className="row">
                                                            <label htmlFor="quantity" className="mr-2" >Cantidad</label>
                                                            <div className="col col-xs-12 col-md-6">
                                                                <InputGroup>
                                                                    <InputGroupAddon>$</InputGroupAddon>
                                                                    <input
                                                                        id="quantity"
                                                                        type="number"
                                                                        className="form-control"
                                                                        disabled={(serviceEstate.percentage !== '') ? true : false}
                                                                        value={serviceEstate.quantity}
                                                                        onChange={(e) => { serviceEstate.quantity = e.target.value, this.props.refresh() }}
                                                                    />
                                                                </InputGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xs-12 col-md-4">
                                                        <div className="row">
                                                            <label htmlFor="percentage">Porcentaje</label>
                                                            <div className="col col-xs-12 col-md-6">
                                                                <InputGroup>
                                                                    <InputGroupAddon>%</InputGroupAddon>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        disabled={(serviceEstate.quantity !== '') ? true : false}
                                                                        value={serviceEstate.percentage}
                                                                        onChange={(e) => { serviceEstate.percentage = e.target.value, this.props.refresh() }}
                                                                    />
                                                                </InputGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xs-12 col-md-4">
                                                        <div className="row">
                                                            <label htmlFor={indexService}>IVA</label>
                                                            <div className="col col-xs-12 col-md-6">
                                                                <Label className="switch switch-icon switch-pill switch-secondary float-left mr-2">
                                                                    <input id={indexService} type="checkbox" className="switch-input"
                                                                        defaultChecked={serviceEstate.IVA}
                                                                        onChange={(e) => { serviceEstate.IVA = e.target.checked, this.props.refresh() }} />
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
                        <button onClick={this.handleNewServiceEstate} type="button" className="float-right mb-3 mr-3 btn btn-success" ><i className="fas fa-plus-circle"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}
