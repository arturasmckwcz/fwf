import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Input, InputWrapper, ListWrapper } from '../common/Styling'

import { doctorsFetch, doctorSet } from '../../redux'

const PickDoctor = ({ doctors, doctorsFetch, doctorSet, token }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    if (doctors.length === 0) doctorsFetch({ token })
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <InputWrapper>
        <Input
          type='text'
          placeholder='Search doctor by name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </InputWrapper>
      <ListWrapper height='59%'>
        {doctors
          .filter(doctor =>
            doctor.name.toLowerCase().includes(name.toLowerCase())
          )
          .map(doctor => (
            <li key={`doctor${doctor.id}`} onClick={() => doctorSet(doctor)}>
              {doctor.name}
            </li>
          ))}
      </ListWrapper>
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
  doctors: state.doctor.list,
})
const mapDispatchToProps = dispatch => ({
  doctorsFetch: obj => dispatch(doctorsFetch(obj)),
  doctorSet: doctor => dispatch(doctorSet(doctor)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PickDoctor)
