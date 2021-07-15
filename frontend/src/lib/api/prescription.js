import axios from 'axios'
import { urlAPI } from '../../constants'

export const createPrescription = async ({ prescription, token }) => {
  const {
    blood_source,
    issue_date,
    doctor_id,
    patient_id,
    lysate_id,
    product_id,
  } = prescription
  try {
    return await axios({
      url: urlAPI,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        query: `mutation{addPrescription(
          blood_source:"${blood_source}",
          issue_date:"${issue_date}",
          doctor_id:${doctor_id},
          patient_id:${patient_id},
          lysate_id:${lysate_id},
          product_id:${product_id},
        ){id}}`,
      },
    })
  } catch (error) {
    throw error
  }
}
