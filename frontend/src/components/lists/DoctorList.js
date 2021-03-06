import React from 'react'
import { connect } from 'react-redux'

import { doctorSet } from '../../redux'

import { List } from './List'

const DoctorList = ({ list, doctorSet }) => {
  const handleClick = doctor => {
    doctorSet(doctor)
  }

  return <List list={list} handleClick={handleClick} />
}

const mapStateToProps = state => ({
  list: state.doctor.list,
})
const mapDispatchToProps = dispatch => ({
  doctorSet: doctor => dispatch(doctorSet(doctor)),
})
export default connect(mapStateToProps, mapDispatchToProps)(DoctorList)
