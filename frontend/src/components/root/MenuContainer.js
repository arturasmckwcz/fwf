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
            {/* <span></span> */}
            <MenuItem onClick={() => logout(user)}>Logout</MenuItem>
            {/* <span></span> */}
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
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 7%;
    background-color: ${styling.color.background};
    & > div:last-child {
      margin-left: auto;
      margin-right: 0.6rem;
    }
  }
`
const MenuItem = styled.div`
   {
    text-transform: uppercase;
    border-radius: 4px;
    border: solid 1px ${styling.color.border};
    box-shadow: ${styling.shadow};
    padding: 0 0.6rem;
    margin-left: 0.6rem;
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
