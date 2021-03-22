import {
  PERSONS_REQUEST,
  PERSONS_SUCCESS,
  PERSONS_FAILURE,
  PERSON_SET,
} from './personActions'

const initialState = { loading: false, obj: {}, list: [], error: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONS_REQUEST:
      return { ...state, loading: true }
    case PERSONS_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case PERSONS_FAILURE:
      return { ...state, loading: false, list: [], error: action.payload }
    case PERSON_SET:
      return { ...state, obj: action.payload }
    default:
      return state
  }
}
export default reducer
