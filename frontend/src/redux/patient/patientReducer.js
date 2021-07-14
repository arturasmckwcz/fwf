import {
  PATIENTS_REQUEST,
  PATIENTS_SUCCESS,
  PATIENTS_FAILURE,
  PATIENT_SET,
} from './patientActions'

const initialState = { loading: false, obj: {}, list: [], error: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PATIENTS_REQUEST:
      return { ...state, loading: true }
    case PATIENTS_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case PATIENTS_FAILURE:
      return { ...state, loading: false, list: [], error: action.payload }
    case PATIENT_SET:
      return { ...state, obj: action.payload }
    default:
      return state
  }
}
export default reducer
