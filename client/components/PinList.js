import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import {parseLatLang} from '../../utils'

export class PinList extends Component {
  render() {
    const markets = this.props.markets
    const pinArray = markets.map(market => {
      const position = parseLatLang(market.mapLink)
      const newMarker = (
        <Marker key={market.id} position={position}>
          <Popup>{market.marketname}</Popup>
        </Marker>
      )
      return newMarker
    })

    return pinArray
  }
}

const mapState = reduxState => ({
  markets: reduxState.markets
})

export default connect(mapState)(PinList)
