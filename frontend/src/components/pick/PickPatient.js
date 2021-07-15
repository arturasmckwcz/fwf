import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Input, InputWrapper, ListWrapper } from '../common/Styling'

import { patientsFetch, patientSet } from '../../redux'

import { timedOutFetch } from '../../lib/utils'

const PickPatient = ({ patients, patientsFetch, patientSet, token }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    const cleanUp = timedOutFetch(patientsFetch, { obj: { name }, token })
    return cleanUp
  }, [name, token, patientsFetch])

  return (
    <div style={{ height: '100%' }}>
      <InputWrapper>
        <Input
          type='text'
          placeholder='Search patient by name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </InputWrapper>
      <ListWrapper height='60%'>
        {patients.map(patient => (
          <li key={`patient${patient.id}`} onClick={() => patientSet(patient)}>
            {`${patient.person.first} ${patient.person.last}`},{' '}
            {patient.person.age}yrs, {patient.person.gender}
          </li>
        ))}
      </ListWrapper>
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
  patients: state.patient.list,
})
const mapDispatchToProps = dispatch => ({
  patientsFetch: obj => dispatch(patientsFetch(obj)),
  patientSet: person => dispatch(patientSet(person)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PickPatient)
