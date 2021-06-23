import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import { menus, styling } from '../../constants'

import NewPatientContainer from '../selection/NewPatientContainer'

const display = selected => {
  switch (selected) {
    case menus.MENU_NEW_PATIENT:
      return <NewPatientContainer />
    case menus.MENU_NEW_PRESCRIPTION:
      return <h1>Placeholder for MENU_NEW_PRESCRIPTION</h1>
    case menus.MENU_NEW_SOURCE:
      return <h1>Placeholder for MENU_NEW_SOURCE</h1>
    case menus.MENU_NEW_PRODUCTION:
      return <h1>Placeholder for MENU_NEW_PRODUCTION</h1>
    default:
      return <h1>DEFAULT</h1>
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
    height: 100%;
    margin-top: ${styling.margin_top_container};
  }
`

const VerticalSeparator = styled.div`
   {
    border-right: solid 1px ${styling.color.border};
    margin-top: ${styling.menu_height};
    margin-bottom: 10px;
  }
`
