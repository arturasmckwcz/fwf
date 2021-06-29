import axios from 'axios'

import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  SELECT_ITEM,
  SELECT_ENTITY,
} from './listTypes'

import { apiUrl, entities, token } from '../../constants'

export const fetchListRequest = () => ({ type: FETCH_LIST_REQUEST })
export const fetchListSuccess = lysates => ({
  type: FETCH_LIST_SUCCESS,
  payload: lysates,
})
export const fetchListFailure = error => ({
  type: FETCH_LIST_FAILURE,
  payload: error,
})
export const fetchList = entity => dispatch => {
  dispatch(fetchListRequest())
  axios({
    url: apiUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    data: { query: `{${entities[entity]}{id,table_id}}` },
  })
    // .get(`${apiUrl}${entities[entity]}`)
    // .then(result => dispatch(fetchListSuccess(result.data)))
    .then(result =>
      dispatch(fetchListSuccess(result.data.data[entities[entity]]))
    )
    .catch(error => dispatch(fetchListFailure(error)))
}

export const selectEntity = entity => ({ type: SELECT_ENTITY, payload: entity })
export const selectItem = id => ({ type: SELECT_ITEM, payload: id })
