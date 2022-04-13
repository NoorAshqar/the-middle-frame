import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import mapDeco from './mapDecorations.js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './Map.css';

// Onclick on a map card scrolls down to its hotel card
var go=(x)=> {
    x="#"+x
    $('html,body').animate({
    scrollTop: $(x).offset().top},
    'slow');
};
export class MapContainer extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            showInfo: false,
            marker: {key2: 0},
            place: {}
        }
    }
    onMapClicked = (a, s,d) => {
        this.setState({
            showInfo: false
        })
    }
    onMarkerClick = (props, marker, e) => {
            this.setState({
                marker,
                showInfo: true,
            })
    } 
    _mapLoaded = (mapProps, map) => {
        map.setOptions({
            styles: mapDeco
        })
    }

    onInfoWindowOpen(props,state) {
        const info = ( <div className="infoWindow"><img src={props.hotels[state.marker.key2].thumbnailUrl} alt="hotel-pic" style={{borderRadius:15, width:"20vw"}} />
        <div>
        <span>{props.hotels[state.marker.key2].name}</span>
        <span>{props.hotels[state.marker.key2].address.streetAddress}</span>
        <span>{props.hotels[state.marker.key2].ratePlan.price.current} for one person per night</span>
        </div>
        <div>
        <span>Stars : {props.hotels[state.marker.key2].starRating} / 5</span>
        <span>Guests : {props.hotels[state.marker.key2].guestReviews.unformattedRating} / 10</span>
        <span>Reviews : {props.hotels[state.marker.key2].guestReviews.total}</span>
        <p className="go" onClick={()=>{go("a"+props.hotels[state.marker.key2].id)}}>Go</p>
        </div></div>);
        ReactDOM.render(React.Children.only(info), document.getElementById("info"));
      }
    render() {
        return (
            <div style={{height:"90vh", width:"90vw", position:"relative", marginLeft:"5vw", marginBottom:"5vh" }}>
            <Map google={this.props.google}
                initialCenter={this.props.location ? { lat: this.props.location.latitude, lng: this.props.location.longitude } : { lat: 0, lng: 0 }}
                zoom={15}
                onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
                onClick={this.onMapClicked}>
                {this.props.hotels.map((elem, i) => (
                <Marker onClick={this.onMarkerClick} key={elem.id} key2={i} name={elem.name}
                    position={{ lat: elem.coordinate.lat, lng: elem.coordinate.lon }}
                    icon={{
                        url: 'hotel-icon-png.png',
                        anchor: new this.props.google.maps.Point(25, 10),
                        scaledSize: new this.props.google.maps.Size(50, 50)
                    }}
                    label={elem.name}
                    ></Marker>))}
                <InfoWindow
                    visible={this.state.showInfo}
                    onOpen={e => {this.onInfoWindowOpen(this.props,this.state)}}
                    position={this.state.marker.position}>
                    <div id="info"></div>
                </InfoWindow>
            </Map>
            </div>
        )
    }
};

export default GoogleApiWrapper({ apiKey: (process.env.REACT_APP_GOOGLE_KEY||"AIzaSyA290JxnUbW5ma-SY6qgc8l4VeKAJyUV14") })(MapContainer);
