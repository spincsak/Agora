import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMarkets} from '../store/markets'
import {appendMarketDetails} from '../store/singleMarket'

export class MarketList extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const markets = await Promise.all(
      this.props.markets.map(market => {
        return this.props.getMarketDetails(market)
      })
    )
    console.log('are we there yet? ', markets)
  }

  render() {
    const markets = this.props.markets
    console.log('props on MarketList ', this.props)
    return (
      <div id="market-list">
        <ul>
          {markets.map(market => {
            return (
              <li key={market.id}>
                <div>Name: {market.marketname}</div>
                <div>Address: {market.address}</div>
              </li>
            )
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
  getMarketDetails: singleMarket => dispatch(appendMarketDetails(singleMarket))
})

export default connect(mapState, mapDispatch)(MarketList)
