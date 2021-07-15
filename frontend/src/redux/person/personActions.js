import { getPersonsByName } from '../../lib/api'

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

export const personsFetch = ({ obj, token }) => dispatch => {
  const { name } = obj
  if (name) {
    dispatch(personsRequest())
    getPersonsByName({ obj, token })
      .then(result =>
        dispatch(personsSuccess(result.data.data.personsByName || []))
      )
      .catch(error => dispatch(personsFailure(error)))
  } else dispatch(personsSuccess([]))
}

export const personSet = person => ({ type: PERSON_SET, payload: person })
