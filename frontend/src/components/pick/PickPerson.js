import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Input, InputWrapper, ListWrapper } from '../common/Styling'

import { personsFetch, personSet } from '../../redux'

import timedOutFetch from '../../lib/timedOutFetch'

const PickPerson = ({ persons, personsFetch, personSet, token }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    // TODO: need to rethink how many persons to fetch
    const cleanUp = timedOutFetch(personsFetch, { name, token })
    return cleanUp
  }, [name, token, personsFetch])

  return (
    <div style={{ height: '100%' }}>
      <InputWrapper>
        <Input
          type='text'
          placeholder='Search person by name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </InputWrapper>
      <ListWrapper height='73%'>
        {persons.map(person => (
          <li key={`person${person.id}`} onClick={() => personSet(person)}>
            {person.name}, {person.age}yrs, {person.gender}
          </li>
        ))}
      </ListWrapper>
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
  persons: state.person.list,
})
const mapDispatchToProps = dispatch => ({
  personsFetch: obj => dispatch(personsFetch(obj)),
  personSet: person => dispatch(personSet(person)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PickPerson)
