import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import { menus, styling } from '../../constants'

import NewPatientContainer from '../selection/NewPatientContainer'
import NewPrescriptionContainer from '../selection/NewPrescriptionContainer'
import NewSourceContainer from '../selection/NewSourceContainer'
import Info from '../common/Info'

const display = selected => {
  switch (selected) {
    case menus.MENU_NEW_PATIENT:
      return <NewPatientContainer />
    case menus.MENU_NEW_PRESCRIPTION:
      return <NewPrescriptionContainer />
    case menus.MENU_NEW_SOURCE:
      return <NewSourceContainer />
    case menus.MENU_NEW_PRODUCTION:
      return <h1>Placeholder for MENU_NEW_PRODUCTION</h1>
    case menus.MENU_INFO:
    default:
      return <Info />
  }
}

const ContentContainer = ({ user, selected }) => {
  return <ContentWrapper>{user && display(selected)}</ContentWrapper>
}

const mapStateToProps = state => ({
  selected: state.menu.selected,
  user: state.user.user,
})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)

const ContentWrapper = styled.div`
   {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 93%;
    margin: 0;
    padding: 0;
  }
`
