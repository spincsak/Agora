import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMarkets, fetchMarketDetails} from '../store/marketData'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

export class MarketList extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('list component mounted')
  }

  render() {
    const markets = this.props.markets
    return (
      <div id="market-list">
        <ul>
          {markets.map(market => {
            return <li key={market.id}>{market.marketname}</li>
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
  getMarkets: zipCode => dispatch(fetchMarkets(zipCode)),
  getMarketDetails: id => dispatch(fetchMarketDetails(id))
})

export default connect(mapState, mapDispatch)(MarketList)
