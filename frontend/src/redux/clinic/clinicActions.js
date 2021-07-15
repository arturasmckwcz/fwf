import { getClinics } from '../../lib/api'

export const CLINICS_REQUEST = 'CLINICS_REQUEST'
export const CLINICS_SUCCESS = 'CLINICS_SUCCESS'
export const CLINICS_FAILURE = 'CLINICS_FAILURE'
export const CLINIC_SET = 'CLINIC_SET'

export const clinicsRequest = () => ({
  type: CLINICS_REQUEST,
})
export const clinicsSuccess = clinics => ({
  type: CLINICS_SUCCESS,
  payload: clinics,
})
export const clinicsFailure = error => ({
  type: CLINICS_FAILURE,
  payload: error,
})

export const clinicsFetch = ({ token }) => dispatch => {
  dispatch(clinicsRequest())
  getClinics({ token })
    .then(result => dispatch(clinicsSuccess(result.data.data.clinics)))
    .catch(error => dispatch(clinicsFailure(error)))
}

export const clinicSet = clinic => ({ type: CLINIC_SET, payload: clinic })
