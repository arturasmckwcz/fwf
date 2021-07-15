import { getDoctors } from '../../lib/api'

export const DOCTORS_REQUEST = 'DOCTORS_REQUEST'
export const DOCTORS_SUCCESS = 'DOCTORS_SUCCESS'
export const DOCTORS_FAILURE = 'DOCTORS_FAILURE'
export const DOCTOR_SET = 'DOCTOR_SET'

export const doctorsRequest = () => ({
  type: DOCTORS_REQUEST,
})
export const doctorsSuccess = doctors => ({
  type: DOCTORS_SUCCESS,
  payload: doctors,
})
export const doctorsFailure = error => ({
  type: DOCTORS_FAILURE,
  payload: error,
})

export const doctorsFetch = ({ token }) => dispatch => {
  dispatch(doctorsRequest())

  getDoctors({ token })
    .then(result =>
      dispatch(
        doctorsSuccess(
          result.data.data.doctors.map(doctor => ({
            ...doctor,
            name: `${doctor.person.first} ${doctor.person.last}`,
          }))
        )
      )
    )
    .catch(error => dispatch(doctorsFailure(error)))
}

export const doctorSet = doctor => ({ type: DOCTOR_SET, payload: doctor })
