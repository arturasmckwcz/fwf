import axios from 'axios'
import { urlAPI } from '../../constants'

export const getClinics = ({ token }) =>
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
          query: `{clinics{id,name}}`,
        },
      })
    )
  )
