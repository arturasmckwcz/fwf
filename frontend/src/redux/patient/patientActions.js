import axios from 'axios'
import { urlAPI } from '../../constants'
import dateToTimestamp from '../../lib/dateToTimestamp'

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

export const patientsFetch = ({ name, date, token }) => dispatch => {
  if (name) {
    dispatch(patientsRequest())
    if (!date) {
      date = new Date()
      date.setDate(date.getDate() - 3)
    }
    axios({
      url: urlAPI,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        query: `{patientsByName(name:"${
          name !== ' ' ? name : ''
        }",date_from:"${dateToTimestamp(
          date
        )}"){id,person{first,last,gender,age}}}`,
      },
    })
      .then(result =>
        dispatch(patientsSuccess(result.data.data.patientsByName || []))
      )
      .catch(error => dispatch(patientsFailure(error)))
  } else dispatch(patientsSuccess([]))
}

export const patientSet = patient => ({ type: PATIENT_SET, payload: patient })
