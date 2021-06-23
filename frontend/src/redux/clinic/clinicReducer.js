import {
  CLINICS_REQUEST,
  CLINICS_SUCCESS,
  CLINICS_FAILURE,
  CLINIC_SET,
} from './clinicActions'

const initialState = { loading: false, obj: {}, list: [], error: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLINICS_REQUEST:
      return { ...state, loading: true }
    case CLINICS_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case CLINICS_FAILURE:
      return { ...state, loading: false, list: [], error: action.payload }
    case CLINIC_SET:
      return { ...state, obj: action.payload }
    default:
      return state
  }
}
export default reducer
