import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { menus, messageColors } from '../../constants'

import { ContainerWrapper } from '../common/Styling'

import { menuSelect, infoSet } from '../../redux'

const NewPatientContainer = ({ menuSelect, infoSet, token }) => {
  return (
    <ContainerWrapper>
      <PersonInputWrap></PersonInputWrap>
      <ScalarsWrap></ScalarsWrap>
      <ClinicPickWrap></ClinicPickWrap>
      <InfoPatientWrap></InfoPatientWrap>
    </ContainerWrapper>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
})
const mapDispatchToProps = dispatch => ({
  menuSelect: menu => dispatch(menuSelect(menu)),
  infoSet: message => dispatch(infoSet(message)),
})
export default connect(mapStateToProps, mapDispatchToProps)(NewPatientContainer)

const PersonInputWrap = styled.div`
   {
    background-color: darkgrey;
    width: 49%;
    max-width: 40rem;
    height: 60%;
  }
`
const ScalarsWrap = styled.div`
   {
    background-color: darkgrey;
    width: 49%;
    max-width: 40rem;
    height: 30%;
  }
`
const ClinicPickWrap = styled.div`
   {
    background-color: darkgrey;
    width: 49%;
    max-width: 40rem;
    height: 60%;
  }
`
const InfoPatientWrap = styled.div`
   {
    background-color: darkgrey;
    width: 49%;
    max-width: 40rem;
    height: 30%;
  }
`
