import React, {Component} from 'react'
import Leaflet from 'leaflet'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

export class TestMap extends Component {
  render() {
    const position = [41.976015, -87.671499]
    const zoomLevel = 14

    return (
      <div>
        <h1>Here is a Map!</h1>
        <Map center={position} zoom={zoomLevel} id="mapid">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[41.976543, -87.671234]}>
            <Popup>Hello World</Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}
