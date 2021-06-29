import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {} from '../common/Styling'

const Info = ({ info }) => {
  return (
    <>
      <h1 style={{ color: info.color }}>{info.message}</h1>
    </>
  )
}

const mapStateToProps = state => ({
  info: state.info,
})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Info)
