import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const DoctorList = ({ list }) => {
  return <ListWrapper></ListWrapper>
}

const mapStateToProps = state => ({
  list: state.doctor.list,
})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(DoctorList)

const ListWrapper = styled.ul`
   {
  }
`
