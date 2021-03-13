import React from 'react'
import styled from 'styled-components'

import { styling } from '../../constants'

const ListContainer = props => {
  return (
    <ListWrapper>
      <span>LIST GOES HERE</span>
    </ListWrapper>
  )
}

export default ListContainer

const ListWrapper = styled.div`
   {
    display: flex;
    flex: 2;
    flex-direction: column;
    align-items: end;
    justify-content: start;
    width: 100%;
    height: 100%;
    margin-top: ${styling.menu_height};
    margin-left: ${styling.margin_left};
  }
`
