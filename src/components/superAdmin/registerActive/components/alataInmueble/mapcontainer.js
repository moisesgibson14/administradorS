import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedPlace: ''
        }
    }

    render() {
        return (
            <Map className="map" google={this.props.google}
                initialCenter={{
                    lat: this.props.lat,
                    lng: this.props.lng
                }}
                zoom={14}>
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey:('AIzaSyDRVkSDlbBq_0oXBUNo5xawI2T5mMeo2LY')
})(MapContainer)