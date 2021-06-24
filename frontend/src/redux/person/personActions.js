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

export const personsFetch = ({ name, token }) => dispatch => {
  if (name) {
    console.log(
      'personActions.js:personsFetch:query: ',
      `{personsByName(name:"${name}"){id,name,gender,age}}`
    )
    dispatch(personsRequest())
    axios({
      url: urlAPI,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        query: `{personsByName(name:"${name}"){id,name,gender,age,clinic}}`,
      },
    })
      .then(result =>
        dispatch(personsSuccess(result.data.data.personsByName || []))
      )
      .catch(error => dispatch(personsFailure(error)))
  } else dispatch(personsFailure(new Error('Parameter name is falsy')))
}

export const personSet = person => ({ type: PERSON_SET, payload: person })
