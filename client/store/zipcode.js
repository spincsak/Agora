import {OpenStreetMapProvider} from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

//action types
const SET_ZIPCODE = 'SET_ZIPCODE'

//action creators
export const setZipcode = (zipcode, position) => ({
  type: SET_ZIPCODE,
  zipcode,
  position
})

//thunk creators
export const fetchZipcode = zipcode => {
  return async function(dispatch) {
    try {
      const response = await provider.search({query: zipcode.value})
      console.log(response)

      dispatch(setZipcode(zipcode))
    } catch (error) {
      console.error(error)
    }
  }
}

//initial state
const initialState = {
  zipcode: 0,
  position: []
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ZIPCODE:
      return {
        zipcode: action.zipcode,
        position: action.position
      }
    default:
      return state
  }
}
