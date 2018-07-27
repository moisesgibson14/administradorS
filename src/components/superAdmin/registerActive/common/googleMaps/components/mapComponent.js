import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Map, { Marker } from 'google-maps-react';

export class MapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: '',
            position: null
        }
        this.renderAutoComplete = this.renderAutoComplete.bind(this)
    }
    componentDidMount() {
        this.renderAutoComplete();
    }
    componentDidUpdate(prevProps) {
        const { google, map } = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    }
    renderAutoComplete() {
        console.log('adentro');
        const { google, map } = this.props;
        if (!google || !map) return;
        const aref = this.refs.autocomplete;
        const node = ReactDOM.findDOMNode(aref);
        console.log(node)
        var autocomplete = new google.maps.places.Autocomplete(node);
        console.log(autocomplete)
        autocomplete.bindTo('bounds', map);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log(place);
            if (!place.geometry) {
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            
            
             this.props.position.lat = place.geometry.location.lat()
             this.props.position.lng = place.geometry.location.lng()
            this.props.refresh()
            this.setState({
                place: place,
                position: place.geometry.location
            })
        })
    }
    onSubmit(e) {
        e.preventDefault();
    }
    render() {
        const props = this.props;
        const { position } = this.state;
        return (
            <div className='flexWrapper'>
                <div className='left'>
                    <input
                        className="form-control"
                        ref='autocomplete'
                        type="text"
                        placeholder="Ingresa una dirección" />
                    <button type="button" onClick={()=>this.renderAutoComplete()} >buscar</button>
                </div>
                <div className='right'>
                    <Map {...props}
                        containerStyle={{
                            position: 'relative',
                            height: '300px',
                            width: '100%'
                        }}
                        center={this.state.position}
                        centerAroundCurrentLocation={false}>
                        <Marker position={this.state.position} />
                    </Map>
                </div>
            </div>

        );
    }
}

export default MapComponent