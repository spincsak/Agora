import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMarkets} from '../store/markets'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import MarketList from './MarketList'
import PinList from './PinList'

export class TestMap extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    //next, make this a search feature so the user can input a zip code.
    this.props.getMarkets('60625')
  }

  render() {
    if (!this.props.markets.length) {
      return <div>Please Wait</div>
    } else {
      const position = [41.976015, -87.671499]
      const zoomLevel = 12
      const markets = this.props.markets

      return (
        <div id="map-page">
          <div id="map-div">
            <h1>Here is a Map!</h1>
            <Map center={position} zoom={zoomLevel} id="mapid">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[41.976543, -87.671234]}>
                <Popup>Hello World</Popup>
              </Marker>
              <PinList />
            </Map>
          </div>
          <div id="list-div">
            <h1>Here is a List</h1>
            <MarketList />
          </div>
        </div>
      )
    }
  }
}

const mapState = reduxState => ({
  markets: reduxState.markets
})

const mapDispatch = dispatch => ({
  getMarkets: zipCode => dispatch(fetchMarkets(zipCode))
})

export default connect(mapState, mapDispatch)(TestMap)
