import axios from 'axios'
import {OpenStreetMapProvider} from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

//ACTION TYPES:
const GET_GEOCODE = 'GET_GEOCODE'

//ACTION CREATORS
export const getGeocode = coordinates => ({
  type: GET_GEOCODE,
  coordinates
})

//THUNK CREATORS
export const fetchCoordinates = address => {
  return async function(dispatch) {
    try {
      const result = await provider.search({query: address})
      console.log('the result, ', result)
      dispatch(getGeocode(result))
    } catch (error) {
      console.error(error)
    }
  }
}

//INITIAL STATE
const initialState = {}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GEOCODE:
      return action.coordinates
    default:
      return state
  }
}
