import React, { Component } from 'react'
import {Label} from 'reactstrap'
import InteriorPatiosVehicles from './interiorPatiosVehicles'

export default class VehicleManagement extends Component {
  constructor(props) {
    super(props)
  
  }
  render() {
    return (
      <div>
        <div className="card">
          <div className="alert alert-primary" role="alert">
            <Label className="switch switch-icon switch-pill switch-warning float-left mr-2">
              <input type="checkbox" className="switch-input"
                defaultChecked={this.props.user.furnitures.vehicles.gestures['authorization']}
                onChange={(e) => { this.props.user.furnitures.vehicles.gestures['authorization'] = e.target.checked, this.props.refresh() }} />
              <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
              <span className="switch-handle"></span>
            </Label>
            <strong>GESTORIAS</strong>
          </div>
          <div className="card-body">
            {
              this.props.user.furnitures.vehicles.gestures['authorization'] === true &&
              <InteriorPatiosVehicles user={this.props.user} refresh={this.props.refresh} />
            }
          </div>
        </div>
      </div>
    )
  }
}
