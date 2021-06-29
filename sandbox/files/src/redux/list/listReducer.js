import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  SELECT_ITEM,
  SELECT_ENTITY,
} from './listTypes'

const initialState = {
  loading: false,
  list: [],
  id: null,
  entity: 0,
  error: '',
}

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return { ...state, loading: true }
    case FETCH_LIST_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case FETCH_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case SELECT_ITEM:
      return { ...state, id: action.payload }
    case SELECT_ENTITY:
      return { ...state, entity: action.payload }
    default:
      return state
  }
}

export default listReducer
