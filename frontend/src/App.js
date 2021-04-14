import React from 'react'

import { Provider } from 'react-redux'
import store from './redux/store'

import MenuContainer from './components/root/MenuContainer'
import FormContainer from './components/root/FormContainer'
import ListContainer from './components/root/ListContainer'
import styled from 'styled-components'

import { styling } from './constants'

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <MenuContainer />
        <ContentWrapper>
          <FormContainer />
          <VerticalSeparator />
          <ListContainer />
        </ContentWrapper>
      </AppWrapper>
    </Provider>
  )
}

export default App

const ContentWrapper = styled.div`
   {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
`

const VerticalSeparator = styled.div`
   {
    border-right: solid 1px ${styling.color.border};
    margin-top: ${styling.menu_height};
    margin-bottom: 10px;
  }
`

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
