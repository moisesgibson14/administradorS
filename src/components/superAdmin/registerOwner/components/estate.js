import React, { Component } from 'react'
import {Label} from 'reactstrap'
import ServicesEstate from '../subComponents/servicesEstate'
export default class Estate extends Component {
  render() {
    return (
      <div>
            <div className="card">
                <div className="card-header">
                    <strong>INMUEBLES</strong>
                    <Label className="switch switch-icon switch-pill switch-primary-outline float-right">
                        <input type="checkbox" className="switch-input"
                            defaultChecked={this.props.user.estate['authorization']}
                            onChange={(e) => { this.props.user.estate['authorization'] = e.target.checked, this.props.refresh() }} />
                        <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                        <span className="switch-handle"></span>
                    </Label>
                </div>
                <div className="card-body">
                    {
                        this.props.user.estate['authorization'] === true &&
                        <ServicesEstate user={this.props.user} refresh={this.props.refresh} />
                    }
                </div>
            </div>
      </div>
    )
  }
}
