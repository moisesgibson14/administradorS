import React, { Component } from 'react';
import MapComponent from './components/mapComponent'
import { GoogleApiWrapper } from 'google-maps-react';
import Map, { Marker } from 'google-maps-react';
import './components/autocomplete.css'

class GoogleMaps extends Component {
  render() {
    const props = this.props;
    const { google } = this.props;
    return (
      <Map
        containerStyle={{
          position: 'relative',
          height: '300px',
          width: '100%'
        }}
        google={this.props.google}
        initialCenter={this.props.position}
        zoom={15}
        onClick={this.onMapClicked}
      >
      <Marker position={this.props.position} />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBSAXpckEB2sNMIj2pTaefhhmt62ClzzHc')
})(GoogleMaps)