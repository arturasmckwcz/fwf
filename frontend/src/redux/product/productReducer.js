import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAILURE,
  PRODUCT_SET,
} from './productActions'

const initialState = { loading: false, obj: {}, list: [], error: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { ...state, loading: true }
    case PRODUCTS_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case PRODUCTS_FAILURE:
      return { ...state, loading: false, list: [], error: action.payload }
    case PRODUCT_SET:
      return { ...state, obj: action.payload }
    default:
      return state
  }
}
export default reducer
