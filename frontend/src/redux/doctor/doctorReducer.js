import {
  DOCTORS_REQUEST,
  DOCTORS_SUCCESS,
  DOCTORS_FAILURE,
  DOCTOR_SET,
} from './doctorActions'

const initialState = { loading: false, obj: {}, list: [], error: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCTORS_REQUEST:
      return { ...state, loading: true }
    case DOCTORS_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case DOCTORS_FAILURE:
      return { ...state, loading: false, list: [], error: action.payload }
    case DOCTOR_SET:
      return { ...state, obj: action.payload }
    default:
      return state
  }
}
export default reducer
