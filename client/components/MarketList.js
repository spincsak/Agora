import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMarkets} from '../store/marketData'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

export class MarketList extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getMarkets('60625')
  }

  render() {
    const markets = this.props.markets
    return (
      <div id="market-list">
        <ul>
          {markets.map(market => {
            return <li id={market.id}>{market.marketname}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapState = reduxState => ({
  markets: reduxState.markets
})

const mapDispatch = dispatch => ({
  getMarkets: zipCode => dispatch(fetchMarkets(zipCode))
})

export default connect(mapState, mapDispatch)(MarketList)
