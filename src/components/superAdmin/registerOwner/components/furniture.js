import React, { Component } from 'react'
import { Label } from 'reactstrap'
import Vehicles from './vehicles'
export default class Furniture extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <strong>MUEBLES</strong>
            <Label className="switch switch-icon switch-pill switch-primary-outline float-right">
              <input type="checkbox" className="switch-input"
                defaultChecked={this.props.user.furnitures['authorization']}
                onChange={(e) => { this.props.user.furnitures['authorization'] = e.target.checked, this.props.refresh() }} />
              <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
              <span className="switch-handle"></span>
            </Label>
          </div>
          <div className="card-body">
            {
              this.props.user.furnitures['authorization'] === true &&
              <Vehicles user={this.props.user} refresh={this.props.refresh} />
            }
          </div>
        </div>
      </div>
    )
  }
}
