import axios from 'axios'

//ACTION TYPES
const SET_SINGLE_MARKET = 'SET_SINGLE_MARKET'

//ACTION CREATORS
export const setSingleMarket = (marketObj, marketDetails) => ({
  type: SET_SINGLE_MARKET,
  market: {
    name: marketObj.marketname,
    id: marketObj.id,
    details: marketDetails
  }
})

//THUNK CREATORS

export const appendMarketDetails = marketObj => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(
        `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${marketObj.id}`
      )
      dispatch(setSingleMarket(marketObj, data.marketdetails))
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
