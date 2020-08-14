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
      const {data} = await axios.get(
        `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`
      )
      data.results.map(async result => {
        const id = result.id
        const {data} = await axios.get(
          `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${id}`
        )
        result.details = data.marketdetails
      })
      dispatch(setMarkets(data.results))
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
