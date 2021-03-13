import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { styling } from '../../constants'

import { menuNewPatient, menuNewPrescription, menuNewSource } from '../../redux'

const MenuContainer = ({
  selected,
  menuNewPatient,
  menuNewPrescription,
  menuNewSource,
}) => {
  return (
    <MenuWrapper>
      <MenuItem onClick={menuNewPrescription}>New Prescription</MenuItem>
      <MenuItem onClick={menuNewSource}>New Source Material</MenuItem>
      <MenuItem onClick={menuNewPatient}>New Patient</MenuItem>
    </MenuWrapper>
  )
}

const mapStateToProps = state => ({
  selected: state.menu.selected,
})
const mapDispatchToProps = dispatch => ({
  menuNewPatient: () => dispatch(menuNewPatient()),
  menuNewPrescription: () => dispatch(menuNewPrescription()),
  menuNewSource: () => dispatch(menuNewSource()),
})
export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)

const MenuWrapper = styled.div`
   {
    display: flex;
    flex-dirction: row;
    position: absolute;
    top: 0;
    left: 0;
    width:100%
    height:${styling.menu_height}
    padding-top: 10px;
    margin-top: 10px;
  }
`
const MenuItem = styled.div`
   {
    text-transform: uppercase;
    margin-left: 20px;
    border-radius: 4px;
    border: solid 1px lightgrey;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 3px 10px;
    &:hover {
      background-color: black;
    }
  }
`
