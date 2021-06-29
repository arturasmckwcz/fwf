import axios from 'axios'
import { urlAPI } from '../../constants'

export const createPerson = async ({ person, token }) => {
  console.log('person.js:person: ', person)
  console.log('person.js:token: ', token)
  try {
    return await axios({
      url: urlAPI,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        query: `mutation{addPerson(
          first:"${person.first}",
          last:"${person.last}",
          gender:"${person.gender}",
          age:${person.age},
          address:"${person.address}",
          email:"${person.email}",
          phone:"${person.phone}"
      ){id,first,last,gender,age,address,email,phone}}`,
      },
    })
  } catch (error) {
    return error
  }
}
