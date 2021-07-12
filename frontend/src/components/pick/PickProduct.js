import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { ListWrapper } from '../common/Styling'

import { productsFetch, productSet } from '../../redux'

const PickProduct = ({ products, productsFetch, productSet, token }) => {
  useEffect(() => {
    if (products.length === 0) productsFetch({ token })
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <ListWrapper height='67%'>
        {products.map(product => (
          <li key={`product${product.id}`} onClick={() => productSet(product)}>
            {product.name}
          </li>
        ))}
      </ListWrapper>
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
  products: state.product.list,
})
const mapDispatchToProps = dispatch => ({
  productsFetch: obj => dispatch(productsFetch(obj)),
  productSet: product => dispatch(productSet(product)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PickProduct)
