import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { styling, lists } from '../../constants'

import PersonList from '../lists/PersonList'
import DoctorList from '../lists/DoctorList'

const display = list => {
  console.log('ListContainer:display: ', lists.LIST_PERSON)
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
  return <ListContainerWrapper>{list && display(list)}</ListContainerWrapper>
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
    margin-top: ${styling.menu_height};
    margin-left: ${styling.margin_left};
  }
`
