import axios from 'axios'
import { urlAPI } from '../../constants'
import { dateToTimestamp } from '../utils'

export const getLatestPatientsByName = ({ obj, token }) => {
  const { name, date } = obj
  let date_from = date
  if (!date) {
    date_from = new Date()
    date_from.setDate(date_from.getDate() - 3)
  }
  return new Promise((resolve, reject) =>
    resolve(
      axios({
        url: urlAPI,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        data: {
          query: `{patientsByName(name:"${
            name !== ' ' ? name : ''
          }",date_from:"${dateToTimestamp(
            date_from
          )}"){id,person{first,last,gender,age}}}`,
        },
      })
    )
  )
}

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
    throw error
  }
}
