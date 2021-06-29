import axios from 'axios'
import { urlAPI } from '../../constants'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'

export const userSet = user => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
})

export const userLoginError = error => ({
  type: USER_LOGIN_ERROR,
  payload: error,
})

export const login = ({ username, password }) => dispatch => {
  axios({
    url: urlAPI,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      query: `{login(username:"${username}",password:"${password}"){token,name}}`,
    },
  })
    .then(result =>
      result.data.data.login
        ? dispatch(userSet(result.data.data.login))
        : dispatch(userLoginError(result.data.errors[0].message))
    )
    .catch(error => dispatch(userLoginError(error.message)))
}

export const logout = ({ token }) => dispatch => {
  axios({
    url: urlAPI,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    data: {
      query: `{logout}`,
    },
  })
    .then(result => {
      dispatch(userSet(null))
      dispatch(userLoginError(''))
    })
    .catch(error => dispatch(userLoginError(error.message)))
}
