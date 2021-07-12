import {
  LYSATES_REQUEST,
  LYSATES_SUCCESS,
  LYSATES_FAILURE,
  LYSATE_SET,
} from './lysateActions'

const initialState = { loading: false, obj: {}, list: [], error: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LYSATES_REQUEST:
      return { ...state, loading: true }
    case LYSATES_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case LYSATES_FAILURE:
      return { ...state, loading: false, list: [], error: action.payload }
    case LYSATE_SET:
      return { ...state, obj: action.payload }
    default:
      return state
  }
}
export default reducer
