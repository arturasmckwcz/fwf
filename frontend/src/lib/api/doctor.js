import axios from 'axios'
import { urlAPI } from '../../constants'

export const getDoctors = ({ token }) =>
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
          query: `{doctors{id,person{id,first,last},clinic{id,name}}}`,
        },
      })
    )
  )
