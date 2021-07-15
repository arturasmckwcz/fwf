import axios from 'axios'
import { urlAPI } from '../../constants'

export const getProducts = ({ token }) =>
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
          query: `{products{id,name}}`,
        },
      })
    )
  )
