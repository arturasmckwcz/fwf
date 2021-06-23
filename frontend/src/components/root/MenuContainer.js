import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { styling, menus } from '../../constants'

import Login from '../root/Login'

import { menuSelect, logout } from '../../redux'

const MenuContainer = ({ user, logout, menuSelect }) => {
  return (
    <>
      {user ? (
        <>
          <MenuWrapper>
            <MenuItem onClick={() => menuSelect(menus.MENU_NEW_PATIENT)}>
              New Patient
            </MenuItem>
            <MenuItem onClick={() => menuSelect(menus.MENU_NEW_PRESCRIPTION)}>
              New Prescription
            </MenuItem>
            <MenuItem onClick={() => menuSelect(menus.MENU_NEW_SOURCE)}>
              New Source Material
            </MenuItem>
            <MenuItem onClick={() => menuSelect(menus.MENU_NEW_PRODUCTION)}>
              New Production
            </MenuItem>
            <span></span>
            <MenuItem onClick={() => logout(user)}>Logout</MenuItem>
            <span></span>
          </MenuWrapper>
          <User>{user.name}</User>
        </>
      ) : (
        <Login />
      )}
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user.user,
})
const mapDispatchToProps = dispatch => ({
  menuSelect: item => dispatch(menuSelect(item)),
  logout: user => dispatch(logout(user)),
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
    & > span {
      flex-grow: 1;
    }
    & > span:last-child {
      max-width: ${styling.padding_right};
    }
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
      background-color: ${styling.color.hover};
    }
  }
`
const User = styled.div`
   {
    position: fixed;
    bottom: 0px;
    right: 0px;
    font-size: 1em;
    border-radius: 4px;
    border: solid 1px ${styling.color.background};
    box-shadow: ${styling.shadow};
    padding: 0 10px;
    margin-right: 10px;
  }
`
