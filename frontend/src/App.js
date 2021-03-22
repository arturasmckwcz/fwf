import React from 'react'

import { Provider } from 'react-redux'
import store from './redux/store'

import MenuContainer from './components/root/MenuContainer'
import FormContainer from './components/root/FormContainer'
import ListContainer from './components/root/ListContainer'
import styled from 'styled-components'

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <MenuContainer />
        <FormContainer />
        <ListContainer />
      </AppWrapper>
    </Provider>
  )
}

export default App

const AppWrapper = styled.div`
   {
    text-align: center;
    // background-color: #282c34;
    // background-color: #30343c;
    background-color: #353941;
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
