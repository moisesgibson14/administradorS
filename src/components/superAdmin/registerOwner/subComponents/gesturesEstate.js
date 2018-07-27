import React, { Component } from 'react'
import {Label, InputGroup, InputGroupAddon} from 'reactstrap'
import { InputText } from '../../../../swaIInputs'

export default class GesturesEstate extends Component {
    constructor(props) {
        super(props)

        this.handleNewGestureEstate = this.handleNewGestureEstate.bind(this)
    }

    handleNewGestureEstate() {
        InputText('Ingrese nombre nueva gestoria:', (value) => {
            if (value) {
                let newGestureEstate = {
                    nameGesture: value,
                    percentage: '',
                    quantity: '',
                    iva: false
                }
                this.props.user.estate.gestures['gesture'] = this.props.user.estate.gestures['gesture'].concat(newGestureEstate)
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
                                defaultChecked={this.props.user.estate.gestures['authorization']}
                                onChange={(e) => { this.props.user.estate.gestures['authorization'] = e.target.checked, this.props.refresh() }} />
                            <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                            <span className="switch-handle"></span>
                        </Label>
                        <strong>GESTORIAS</strong>
                    </div>
                    <div className="card-body">
                    {
                            this.props.user.estate.gestures['authorization'] === true &&
                            <div>
                                {
                                    this.props.user.estate.gestures['gesture'].map((gestureEstate, indexGestureEstate) => (
                                        <table key={indexGestureEstate} className="table">
                                            {
                                                indexGestureEstate === 0 &&
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>TRÁMITES</th>
                                                        <th>$</th>
                                                        <th>%</th>
                                                        <th>INCLUYE IVA</th>
                                                    </tr>
                                                </thead>
                                            }
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input className="form-control" type="text" disabled defaultValue={gestureEstate.nameGesture} />
                                                    </td>
                                                    <td>
                                                        <InputGroup>
                                                            <InputGroupAddon>
                                                                <i className="fas fa-dollar-sign" />
                                                            </InputGroupAddon>
                                                            <input
                                                                disabled={(gestureEstate.percentage !== '') ? true : false}
                                                                className="form-control noscroll" type="number" defaultValue={gestureEstate.quantity}
                                                                onChange={(e) => { gestureEstate.quantity = e.target.value, this.props.refresh() }}
                                                            />
                                                        </InputGroup>
                                                    </td>
                                                    <td>
                                                        <InputGroup>
                                                            <InputGroupAddon>
                                                                <span>%</span>
                                                            </InputGroupAddon>
                                                            <input
                                                                disabled={(gestureEstate.quantity !== '') ? true : false}
                                                                className="form-control noscroll" type="number" defaultValue={gestureEstate.percentage}
                                                                onChange={(e) => { gestureEstate.percentage = e.target.value, this.props.refresh() }}
                                                            />
                                                        </InputGroup>
                                                    </td>
                                                    <td>
                                                        <Label className="switch switch-icon switch-pill switch-secondary float-left mr-2">
                                                            <input type="checkbox" className="switch-input"
                                                                defaultChecked={gestureEstate.iva}
                                                                onChange={(e) => { gestureEstate.iva = e.target.checked, this.props.refresh() }} />
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
                                        <button onClick={this.handleNewGestureEstate} type="button" className="btn btn-success mb-3" >
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
