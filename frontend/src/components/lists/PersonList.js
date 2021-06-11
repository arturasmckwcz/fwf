import React from 'react'
import { connect } from 'react-redux'

import { personSet } from '../../redux'

import { List } from './List'

const PersonList = ({ list, personSet }) => {
  const handleClick = person => {
    personSet(person)
  }

  return <List list={list} handleClick={handleClick} />
}

const mapStateToProps = state => ({
  list: state.person.list,
})
const mapDispatchToProps = dispatch => ({
  personSet: person => dispatch(personSet(person)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PersonList)
