import React, { Component } from 'react'
import VehiclesAdministration from './vehiclesAdministration'
import VehicleManagement from './vehicleManagement'
import TransfersVehicles from './transfersVehicles'
import AestheticVehicles from './aestheticVehicles'

export default class ServicesVehicles extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <VehiclesAdministration user={this.props.user} refresh={this.props.refresh} />
                <VehicleManagement user={this.props.user} refresh={this.props.refresh} />
                <TransfersVehicles user={this.props.user} refresh={this.props.refresh} />
                <AestheticVehicles user={this.props.user} refresh={this.props.refresh} />
            </div>
        )
    }
}
