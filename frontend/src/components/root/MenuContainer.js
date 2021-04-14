import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { styling, menus } from '../../constants'

import { menuSelect } from '../../redux'

const MenuContainer = ({ menuSelect }) => {
  return (
    <MenuWrapper>
      <MenuItem onClick={() => menuSelect(menus.MENU_NEW_PRESCRIPTION)}>
        New Prescription
      </MenuItem>
      <MenuItem onClick={() => menuSelect(menus.MENU_NEW_SOURCE)}>
        New Source Material
      </MenuItem>
      <MenuItem onClick={() => menuSelect(menus.MENU_NEW_PATIENT)}>
        New Patient
      </MenuItem>
    </MenuWrapper>
  )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  menuSelect: item => dispatch(menuSelect(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)

// height:${styling.menu_height}
const MenuWrapper = styled.div`
   {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-dirction: row;
    align-items: center;
    width: 100vw;
    background-color: ${styling.color.background};

    margin-top: 15px;
    margin-bottom: 10px;
    padding-left: ${styling.padding_left};
  }
`
const MenuItem = styled.div`
   {
    text-transform: uppercase;
    border-radius: 4px;
    border: solid 1px ${styling.color.border};
    box-shadow: ${styling.shadow};
    padding: 0 10px;
    margin-right: 10px;
    &:hover {
      ${styling.color.hover};
    }
  }
`
