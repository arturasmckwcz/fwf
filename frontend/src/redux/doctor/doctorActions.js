import axios from 'axios'
import { urlAPI } from '../../constants'

export const DOCTORS_REQUEST = 'DOCTORS_REQUEST'
export const DOCTORS_SUCCESS = 'DOCTORS_SUCCESS'
export const DOCTORS_FAILURE = 'DOCTORS_FAILURE'
export const DOCTOR_SET = 'DOCTOR_SET'

export const doctorsRequest = () => ({
  type: DOCTORS_REQUEST,
})
export const doctorsSuccess = persons => ({
  type: DOCTORS_SUCCESS,
  payload: persons,
})
export const doctorsFailure = error => ({
  type: DOCTORS_FAILURE,
  payload: error,
})

export const doctorsFetch = person => dispatch => {
  dispatch(doctorsRequest())

  axios({
    url: urlAPI,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      query: `{doctors{id,person{first,last,email,phone},clinic{name}}}`,
    },
  })
    .then(result => dispatch(doctorsSuccess(result.data.data.persons)))
    .catch(error => dispatch(doctorsFailure(error)))
}

export const doctorSet = doctor => ({ type: DOCTOR_SET, payload: doctor })
