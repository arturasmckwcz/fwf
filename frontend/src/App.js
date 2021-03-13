import React from 'react'
import { connect } from 'react-redux'

import { menuNewPatient } from './redux'

import MenuContainer from './components/root/MenuContainer'
import FormContainer from './components/root/FormContainer'
import ListContainer from './components/root/ListContainer'
import styled from 'styled-components'

const App = ({ selected }) => {
  return (
    <AppWrapper>
      <MenuContainer />
      <FormContainer />
      <ListContainer />
    </AppWrapper>
  )
}

const mapStateToProps = state => ({
  selected: state.menu.selected,
})
const mapDispatchToProps = dispatch => ({
  menuNewPatient: () => dispatch(menuNewPatient()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

const AppWrapper = styled.div`
   {
    text-align: center;
    // background-color: #282c34;
    background-color: #30343c;
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    font-size: calc(2px + 2vmin);
    text-align: left;
    color: lightgrey;

    &:hover {
    cursor: default;
  }
`
