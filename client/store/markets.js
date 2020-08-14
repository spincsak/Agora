import axios from 'axios'

//ACTION TYPES
const SET_MARKETS = 'SET_MARKETS'

//ACTION CREATORS
export const setMarkets = markets => ({
  type: SET_MARKETS,
  markets
})

//THUNK CREATORS
export const fetchMarkets = zipCode => {
  return async function(dispatch) {
    try {
      const marketList = []

      const {data} = await axios.get(
        `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`
      )
      data.results.forEach(async result => {
        const response = await axios.get(
          `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${result.id}`
        )
        const thisMarket = {
          id: result.id,
          name: result.marketname,
          address: response.data.marketdetails.address
        }

        marketList.push(thisMarket)
      })
      await Promise.all(marketList)
      dispatch(setMarkets(marketList))
    } catch (error) {
      console.error(error)
    }
  }
}

//INITIAL STATE
const initialState = []

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MARKETS:
      return action.markets
    default:
      return state
  }
}
