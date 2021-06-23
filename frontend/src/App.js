import React from 'react'

import { Provider } from 'react-redux'
import store from './redux/store'

import MenuContainer from './components/root/MenuContainer'
import ContentContainer from './components/root/ContentContainer'
import styled from 'styled-components'

import { styling } from './constants'

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <MenuContainer />
        <ContentContainer />
      </AppWrapper>
    </Provider>
  )
}

export default App

const AppWrapper = styled.div`
   {
    text-align: center;
    background-color: ${styling.color.background};
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    font-size: calc(2px + 2vmin);
    text-align: left;
    color: ${styling.color.text};

    &:hover {
    cursor: default;
  }
`
