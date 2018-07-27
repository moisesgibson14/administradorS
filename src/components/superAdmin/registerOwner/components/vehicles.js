import React, { Component } from 'react'
import {Label} from 'reactstrap'
import ServicesVehicles from '../subComponents/servicesVehicles'

export default class Vehicles extends Component {
    render() {
        return (
            <div>
                <div className="alert alert-success" role="alert">
                    <strong>VEHÍCULOS</strong>
                    <Label className="switch switch-icon switch-pill switch-success float-right">
                        <input type="checkbox" className="switch-input"
                            defaultChecked={this.props.user.furnitures.vehicles['authorization']}
                            onChange={(e) => { this.props.user.furnitures.vehicles['authorization'] = e.target.checked, this.props.refresh() }} />
                        <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                        <span className="switch-handle"></span>
                    </Label>
                </div>
                {
                    this.props.user.furnitures.vehicles['authorization'] === true &&
                    <ServicesVehicles user={this.props.user} refresh={this.props.refresh} />
                }
            </div>
        )
    }
}
