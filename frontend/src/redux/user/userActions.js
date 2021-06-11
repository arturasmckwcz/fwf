import axios from 'axios'
import { urlAPI } from '../../constants'

export const USER_SET = 'USER_SET'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

export const userSet = user => ({
  type: USER_SET,
  payload: user,
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
    .then(result => dispatch(userSet(result.data.data.login)))
    .catch(error => dispatch(userSet(null)))
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
    .then(result => dispatch(userSet(result.data.data.login)))
    .catch(error => dispatch(userSet(null)))
}
