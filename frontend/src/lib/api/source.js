import axios from 'axios'
import { urlAPI } from '../../constants'

export const createSource = async ({ source, token }) => {
  const { draw_date, arrive_date, person_id, clinic_id } = source
  try {
    return await axios({
      url: urlAPI,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        query: `mutation{addSource(
            draw_date:"${draw_date}",
            arrive_date:"${arrive_date}",
            person_id:${person_id},
            clinic_id:${clinic_id})
            {id}}`,
      },
    })
  } catch (error) {
    throw error
  }
}
