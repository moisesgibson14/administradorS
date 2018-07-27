import React, { Component } from 'react'
import {InputGroup, InputGroupAddon, Label} from 'reactstrap'
import swalInputs from '../../registerActive/swalInputs'
import { InputText } from '../../../../swaIInputs'

export default class MoreOfTransfers extends Component {
        constructor(props) {
            super(props)

            this.handleNewMoreTransfer = this.handleNewMoreTransfer.bind(this)
        }

    handleNewMoreTransfer() {
        InputText('Ingrese nombre del nuevo traslado:', (value) => {
            if (value) {
                let newMoreTransfer = {
                    nameLess: value,
                    priceCdmx: '',
                    priceGdl: '',
                    priceMty: '',
                    iva: false
                }
                this.props.user.furnitures['vehicles'].transfers['largerThan'] = this.props.user.furnitures['vehicles'].transfers['largerThan'].concat(newMoreTransfer)
                this.props.refresh()
            }
        })
    }

  render() {
    return (
      <div>
            {
                this.props.user.furnitures['vehicles'].transfers['largerThan'].map((large, index) => (
                    <table key={index} className="table">
                        {
                            index === 0 &&
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">MAYOR A 5 TONS</th>
                                    <th scope="col">CDMX</th>
                                    <th scope="col">GDL</th>
                                    <th scope="col">MTY</th>
                                    <th scope="col">INCLUYE IVA</th>
                                </tr>
                            </thead>
                        }
                        <tbody>
                            <tr>
                                <td>
                                    <input className="form-control" type="text" disabled defaultValue={large.nameLess} />
                                </td>
                                <td>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <i className="fas fa-dollar-sign" />
                                        </InputGroupAddon>
                                        <input className="form-control noscroll" type="number" defaultValue={large.priceCdmx}
                                            onChange={(e) => { large.priceCdmx = e.target.value, this.props.refresh() }}
                                        />
                                    </InputGroup>
                                </td>
                                <td>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <i className="fas fa-dollar-sign" />
                                        </InputGroupAddon>
                                        <input className="form-control noscroll" type="number" defaultValue={large.priceGdl}
                                            onChange={(e) => { large.priceGdl = e.target.value, this.props.refresh() }}
                                        />
                                    </InputGroup>
                                </td>
                                <td>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <i className="fas fa-dollar-sign" />
                                        </InputGroupAddon>
                                        <input className="form-control noscroll" type="number" defaultValue={large.priceMty}
                                            onChange={(e) => { large.priceMty = e.target.value, this.props.refresh() }}
                                        />
                                    </InputGroup>
                                </td>
                                <td>
                                    <Label className="switch switch-icon switch-pill switch-secondary float-left mr-2">
                                        <input type="checkbox" className="switch-input"
                                            defaultChecked={large.iva}
                                            onChange={(e) => { large.iva = e.target.checked, this.props.refresh() }} />
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
                    <button onClick={this.handleNewMoreTransfer} type="button" className="btn btn-success mb-3" >
                        <i className="fas fa-plus-circle"></i>
                    </button>
                </div>
            </div>
      </div>
    )
  }
}
