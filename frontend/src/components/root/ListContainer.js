import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { lists, styling } from '../../constants'

import PersonList from '../lists/PersonList'
import DoctorList from '../lists/DoctorList'

import { MenuPlaceHolder } from '../root/MenuPlaceHolder'

const display = list => {
  switch (list) {
    case lists.LIST_PERSON:
      return <PersonList />
    case lists.LIST_DOCTOR:
      return <DoctorList />
    default:
      return <></>
  }
}

const ListContainer = ({ list }) => {
  return (
    <ListContainerWrapper>
      <MenuPlaceHolder />
      <ListWrapper>{list && display(list)}</ListWrapper>
    </ListContainerWrapper>
  )
}

const mapStateToProps = state => ({
  list: state.list.list,
})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)

const ListContainerWrapper = styled.div`
   {
    display: flex;
    flex: 2;
    flex-direction: column;
    align-items: end;
    justify-content: start;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-left: 10px;
  }
`
const ListWrapper = styled.div`
   {
    width: 100%;
    height: calc(100% - ${styling.menu_height});
  }
`

// margin-top: ${styling.menu_height};
// margin-left: ${styling.margin_left};
