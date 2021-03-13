export const PERSONS_FETCH_REQUEST = 'PERSON_FETCH_REQUEST'
export const PERSONS_FETCH_SUCCESS = 'PERSON_FETCH_SUCCESS'
export const PERSONS_FETCH_FAILURE = 'PERSON_FETCH_FAILURE'
export const PERSON_CREATE = 'PERSON_CREATE'
export const PERSON_UPDATE = 'PERSON_UPDATE'
export const PERSON_DELETE = 'PERSON_DELETE'

import { urlAPI } from '../../constants'

export const personsFetchRequest = person => ({
  type: PERSONS_FETCH_REQUEST,
  payload: person,
})
export const personsFetchSuccess = persons => ({
  type: PERSONS_FETCH_SUCCESS,
  payload: persons,
})
export const personsFetchFailure = error => ({
  type: PERSONS_FETCH_FAILURE,
  payload: error,
})

export const personsFetch = person => {
  personsFetchQuery(person)

  fetch(urlAPI, {})
    .then(response => respinse.json())
    .then(result => personFetchSuccess(result))
    .catch(error => personsFetchFailure(error))
}
