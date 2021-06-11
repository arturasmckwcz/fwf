import axios from 'axios'
import { urlAPI } from '../../constants'

export const PERSONS_REQUEST = 'PERSONS_REQUEST'
export const PERSONS_SUCCESS = 'PERSONS_SUCCESS'
export const PERSONS_FAILURE = 'PERSONS_FAILURE'
export const PERSON_SET = 'PERSON_SET'

export const personsRequest = () => ({
  type: PERSONS_REQUEST,
})
export const personsSuccess = persons => ({
  type: PERSONS_SUCCESS,
  payload: persons,
})
export const personsFailure = error => ({
  type: PERSONS_FAILURE,
  payload: error,
})

export const personsFetch = ({ person, token }) => dispatch => {
  dispatch(personsRequest())
  const params = `(first:"${person.first ? person.first : ''}"last:"${
    person.last ? person.last : ''
  }"${person.gender ? 'gender:"' + person.gender + '"' : ''})`
  console.log('personsFetch: person', person)
  console.log('personsFetch: params', params)
  console.log('personsFetch: token', token)
  axios({
    url: urlAPI,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    data: {
      query: `{persons${params}{id,first,last,gender,age,address,email,phone}}`,
    },
  })
    .then(result => dispatch(personsSuccess(result.data.data.persons || [])))
    .catch(error => dispatch(personsFailure(error)))
}

export const personSet = person => ({ type: PERSON_SET, payload: person })
