import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMarkets} from '../store/markets'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import {fetchCoordinates} from '../store/address'
import {parseLatLang} from '../../utils'

export class MarketList extends Component {
  constructor() {
    super()

    this.setMarket = this.setMarket.bind(this)
  }

  componentDidMount() {
    console.log('list component mounted!')
  }

  async setMarket(event) {
    event.preventDefault()
    const mapLink = event.target.value
    console.log('what does my link say? ', mapLink)
    const coordinates = parseLatLang(mapLink)
    console.log('my coordinates ', coordinates)
  }

  render() {
    const markets = this.props.markets
    return (
      <div id="market-list">
        <ul>
          {markets.map(market => {
            return (
              <li key={market.id}>
                <div>Name: {market.marketname}</div>
                <div>Address: {market.address}</div>
                <button
                  value={market.mapLink}
                  onClick={event => this.setMarket(event)}
                >
                  Map Me!
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = reduxState => ({
  markets: reduxState.markets,
  coordinates: reduxState.coordinates
})

const mapDispatch = dispatch => ({
  getMarkets: zipCode => dispatch(fetchMarkets(zipCode)),
  getCoordinates: address => dispatch(fetchCoordinates(address))
})

export default connect(mapState, mapDispatch)(MarketList)
