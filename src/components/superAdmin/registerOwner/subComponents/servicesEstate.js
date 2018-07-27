import React, { Component } from 'react'
import EstateAdministration from './estateAdministration'
import GesturesEstate from './gesturesEstate'

export default class ServicesEstate extends Component {
  render() {
    return (
      <div>
            <EstateAdministration user={this.props.user} refresh={this.props.refresh} />
            <GesturesEstate user={this.props.user} refresh={this.props.refresh} />
      </div>
    )
  }
}
