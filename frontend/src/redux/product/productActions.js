import { getProducts } from '../../lib/api'

export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST'
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS'
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE'
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
  getProducts({ token })
    .then(result => dispatch(productsSuccess(result.data.data.products)))
    .catch(error => dispatch(productsFailure(error)))
}

export const productSet = product => ({ type: PRODUCT_SET, payload: product })
