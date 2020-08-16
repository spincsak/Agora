import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMarkets} from '../store/markets'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import MarketList from './MarketList'
import PinList from './PinList'
import {fetchZipcode} from '../store/zipcode'

export class TestMap extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getZipcode('60625')
    this.props.getMarkets('60625')
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(event.target.value)
    getZipcode(event.target.value)
  }

  render() {
    if (!this.props.markets.length) {
      return <div>Please Wait</div>
    } else {
      const zoomLevel = 12

      return (
        <div id="map-page">
          <div id="map-div">
            <h1>Here is a Map!</h1>
            <div>
              <form>
                <label htmlFor="zipcode">
                  zipcode:
                  <input type="number" />
                </label>

                <input type="submit" value="Submit" />
              </form>
            </div>
            <Map center={this.state.position} zoom={zoomLevel} id="mapid">
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
  markets: reduxState.markets,
  zipcode: reduxState.startLocation.zipcode,
  position: reduxState.startLocation.position
})

const mapDispatch = dispatch => ({
  getMarkets: zipCode => dispatch(fetchMarkets(zipCode)),
  getZipcode: zipcode => dispatch(fetchZipcode(zipcode))
})

export default connect(mapState, mapDispatch)(TestMap)
