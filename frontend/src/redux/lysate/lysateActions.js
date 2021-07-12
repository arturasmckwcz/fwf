import axios from 'axios'
import { urlAPI } from '../../constants'

export const LYSATES_REQUEST = 'LYSATES_REQUEST'
export const LYSATES_SUCCESS = 'LYSATES_SUCCESS'
export const LYSATES_FAILURE = 'LYSATES_FAILURE'
export const LYSATE_SET = 'LYSATE_SET'

export const lysatesRequest = () => ({
  type: LYSATES_REQUEST,
})
export const lysatesSuccess = lysates => ({
  type: LYSATES_SUCCESS,
  payload: lysates,
})
export const lysatesFailure = error => ({
  type: LYSATES_FAILURE,
  payload: error,
})

export const lysatesFetch = ({ token }) => dispatch => {
  dispatch(lysatesRequest())
  axios({
    url: urlAPI,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    data: {
      query: `{lysates{id,name}}`,
    },
  })
    .then(result => dispatch(lysatesSuccess(result.data.data.lysates)))
    .catch(error => dispatch(lysatesFailure(error)))
}

export const lysateSet = lysate => ({ type: LYSATE_SET, payload: lysate })
