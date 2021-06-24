import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Input, InputWrapper, ListWrapper } from '../common/Styling'

import { personsFetch, personSet } from '../../redux'

import timedOutFetch from '../../lib/timedOutFetch'

const PickClinic = ({ persons, personsFetch, personSet, token }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    const cleanUp = timedOutFetch(personsFetch, name, token)
    return cleanUp
  }, [name, token, personsFetch])

  return (
    <>
      <InputWrapper>
        <Input
          type='text'
          placeholder='Search person by name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </InputWrapper>
      <ListWrapper>
        {persons &&
          persons
            .filter(person => !person.clinic)
            .map(person => (
              <li key={`person${person.id}`} onClick={() => personSet(person)}>
                {person.name}, {person.age}yrs, {person.gender}
              </li>
            ))}
      </ListWrapper>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(PickClinic)
