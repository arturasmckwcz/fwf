import axios from 'axios'
import { urlAPI } from '../../constants'

export const userLogin = ({ username, password }) =>
  new Promise((resolve, reject) =>
    resolve(
      axios({
        url: urlAPI,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          query: `{login(username:"${username}",password:"${password}"){token,name}}`,
        },
      })
    )
  )

export const userLogout = ({ token }) =>
  new Promise((resolve, reject) =>
    resolve(
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
    )
  )
