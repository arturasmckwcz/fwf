import axios from 'axios'
import { urlAPI } from '../../constants'

export const createPatient = async ({ patient, token }) => {
  const { person_id, clinic_id, status } = patient
  try {
    return await axios({
      url: urlAPI,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        query: `mutation{addPatient(person_id:${person_id},clinic_id:${clinic_id},status:"${status}"){id}}`,
      },
    })
  } catch (error) {
    return error
  }
}
