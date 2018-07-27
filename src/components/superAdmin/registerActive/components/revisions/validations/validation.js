import React, { Component } from 'react'
import Location from './location'
import { firestore } from 'firebase'
import AssetData from './assetData'

export class Validation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            location: '',
            assetData: '',
            position: {}
        }

        this.handleGPS = this.handleGPS.bind(this)
        this.successCallback = this.successCallback.bind(this)
        this.errorCallback = this.errorCallback.bind(this)


    }

    componentDidMount() {

        this.state.position.lat = this.props.revision.validations.location.lat.value
        this.state.position.lng = this.props.revision.validations.location.lng.value 

        if (this.props.active) {
            this.setState({
                location: this.props.active.states.location,
                assetData: this.props.active.states.assetData
            })
        } else {
            firestore().collection('assets').doc(this.props.revision.idAsset).get().then(asset => {
                this.setState({
                    location: asset.data().states.location,
                    assetData: asset.data().states.assetData
                })
            }).catch(error => console.log('error al traer el activo', error))
        }

    }

    handleGPS() {
        var nav = null;
        if (navigator.geolocation) {
            if (nav == null) {
                nav = window.navigator;
            }

            var geoloc = nav.geolocation;
            if (geoloc != null) {
                geoloc.getCurrentPosition(this.successCallback, this.errorCallback);
            }
        }
        else {
            // No hay soporte para la geolocalización: podemos desistir o utilizar algún método alternativo
        }
    }

    successCallback(position) {
        this.props.revision.validations.location.lat.value =
            position.coords.latitude;
        this.props.revision.validations.location.lng.value =
            position.coords.longitude;

        this.state.position.lat = position.coords.latitude;
        this.state.position.lng = position.coords.longitude;


            this.props.refresh()
    }

    errorCallback(error) {
        var strMessage = "";

        // Check for known errors
        switch (error.code) {
            case error.PERMISSION_DENIED:
                strMessage = "Access to your location is turned off. " +
                    "Change your settings to turn it back on.";
                break;
            case error.POSITION_UNAVAILABLE:
                strMessage = "Data from location services is " +
                    "currently unavailable.";
                break;
            case error.TIMEOUT:
                strMessage = "Location could not be determined " +
                    "within a specified timeout period.";
                break;
            default:
                break;
        }

        document.getElementById("status").innerHTML = strMessage;
    }

    render() {
        return (
            <div className="row" >
                {this.state.location != '' &&
                    <div className="col-12">
                        <h5 className="text-center" >UBICACIÓN</h5>
                        <hr />
                        <Location
                            location={this.state.location}
                            newLocation={this.props.revision.validations.location}
                            refresh={this.props.refresh}
                            handleGPS={this.handleGPS}
                            position={this.state.position}
                        />
                    </div>
                }
                {this.state.assetData != '' &&
                    <div className="col-12">
                        <hr />
                        <h5 className="text-center" >DATOS DEL ACTIVO</h5>
                        <hr />
                        <AssetData
                            assetData={this.state.assetData}
                            newData={this.props.revision.validations.assetData}
                            refresh={this.props.refresh}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default Validation
