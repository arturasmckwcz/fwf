import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Input, InputWrapper, ListWrapper } from '../common/Styling'

import { lysatesFetch, lysateSet } from '../../redux'

const PickLysate = ({ lysates, lysatesFetch, lysateSet, token }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    if (lysates.length === 0) lysatesFetch({ token })
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <InputWrapper>
        <Input
          type='text'
          placeholder='Search lysate by name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </InputWrapper>
      <ListWrapper height='57%'>
        {lysates
          .filter(lysate =>
            lysate.name.toLowerCase().includes(name.toLowerCase())
          )
          .map(lysate => (
            <li key={`lysate${lysate.id}`} onClick={() => lysateSet(lysate)}>
              {lysate.name}
            </li>
          ))}
      </ListWrapper>
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
  lysates: state.lysate.list,
})
const mapDispatchToProps = dispatch => ({
  lysatesFetch: obj => dispatch(lysatesFetch(obj)),
  lysateSet: lysate => dispatch(lysateSet(lysate)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PickLysate)
