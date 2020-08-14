import axios from 'axios'

//ACTION TYPES
const SET_SINGLE_MARKET = 'SET_SINGLE_MARKET'

//ACTION CREATORS
export const setSingleMarket = market => ({
  type: SET_SINGLE_MARKET,
  market
})

//THUNK CREATORS
export const fetchMarkets = zipCode => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(
        `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`
      )
      dispatch(setMarkets(data.results))
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
    case SET_SINGLE_MARKET:
      return action.market
    default:
      return state
  }
}
