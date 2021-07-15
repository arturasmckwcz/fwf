import { getLatestPatientsByName } from '../../lib/api'

export const PATIENTS_REQUEST = 'PATIENTS_REQUEST'
export const PATIENTS_SUCCESS = 'PATIENTS_SUCCESS'
export const PATIENTS_FAILURE = 'PATIENTS_FAILURE'
export const PATIENT_SET = 'PERSON_SET'

export const patientsRequest = () => ({
  type: PATIENTS_REQUEST,
})
export const patientsSuccess = patients => ({
  type: PATIENTS_SUCCESS,
  payload: patients,
})
export const patientsFailure = error => ({
  type: PATIENTS_FAILURE,
  payload: error,
})

export const patientsFetch = ({ obj, token }) => dispatch => {
  if (obj.name) {
    dispatch(patientsRequest())
    getLatestPatientsByName({ obj, token })
      .then(result =>
        dispatch(patientsSuccess(result.data.data.patientsByName || []))
      )
      .catch(error => dispatch(patientsFailure(error)))
  } else dispatch(patientsSuccess([]))
}

export const patientSet = patient => ({ type: PATIENT_SET, payload: patient })
