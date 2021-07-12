import axios from 'axios'
import { urlAPI } from '../../constants'

export const PRODUCTS_REQUEST = 'PRODUCT_REQUEST'
export const PRODUCTS_SUCCESS = 'PRODUCT_SUCCESS'
export const PRODUCTS_FAILURE = 'PRODUCT_FAILURE'
export const PRODUCT_SET = 'PRODUCT_SET'

export const productsRequest = () => ({
  type: PRODUCTS_REQUEST,
})
export const productsSuccess = products => ({
  type: PRODUCTS_SUCCESS,
  payload: products,
})
export const productsFailure = error => ({
  type: PRODUCTS_FAILURE,
  payload: error,
})

export const productsFetch = ({ token }) => dispatch => {
  dispatch(productsRequest())
  axios({
    url: urlAPI,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    data: {
      query: `{products{id,name}}`,
    },
  })
    .then(result => dispatch(productsSuccess(result.data.data.products)))
    .catch(error => dispatch(productsFailure(error)))
}

export const productSet = product => ({ type: PRODUCT_SET, payload: product })
