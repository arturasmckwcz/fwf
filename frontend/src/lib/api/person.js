import axios from 'axios'
import { urlAPI } from '../../constants'

export const getPersonsByName = ({ obj, token }) => {
  const { name, isAssigned } = obj
  const is_assigned = typeof isAssigned === 'boolean' ? isAssigned : false
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
          query: `{personsByName(name:"${
            name !== ' ' ? name : ''
          }",is_assigned:${is_assigned}){id,name,gender,age}}`,
        },
      })
    )
  )
}

export const createPerson = async ({ person, token }) => {
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
