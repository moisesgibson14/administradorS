import React, { Component } from 'react'
import { Label } from 'reactstrap'
import LessThan from './lessThanTransfers'
import MoreOfTransfers from './moreOfTransfers'

export default class TransfersVehicles extends Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="alert alert-primary" role="alert">
                        <Label className="switch switch-icon switch-pill switch-warning float-left mr-2">
                            <input type="checkbox" className="switch-input"
                                defaultChecked={this.props.user.furnitures.vehicles.transfers['authorization']}
                                onChange={(e) => { this.props.user.furnitures.vehicles.transfers['authorization'] = e.target.checked, this.props.refresh() }} />
                            <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                            <span className="switch-handle"></span>
                        </Label>
                        <strong>TRASLADOS</strong>
                    </div>
                    <div className="card-body">
                        {
                            this.props.user.furnitures.vehicles.transfers['authorization'] === true &&
                            <div>
                                <LessThan user={this.props.user} refresh={this.props.refresh} />
                                <MoreOfTransfers user={this.props.user} refresh={this.props.refresh} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
