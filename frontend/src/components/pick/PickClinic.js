import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Input, InputWrapper, ListWrapper } from '../common/Styling'

import { clinicsFetch, clinicSet } from '../../redux'

const PickClinic = ({ clinics, clinicsFetch, clinicSet, token }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => clinicsFetch({ name, token }), 500)
    return () => clearTimeout(timeoutId)
  }, [name])

  return (
    <>
      <InputWrapper>
        <Input
          type='text'
          placeholder='Search clinic by name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </InputWrapper>
      <ListWrapper>
        {clinics &&
          clinics.map(clinic => (
            <li key={`clinic${clinic.id}`} onClick={() => clinicSet(clinic)}>
              {clinic.name}
            </li>
          ))}
      </ListWrapper>
    </>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
  clinics: state.clinic.list,
})
const mapDispatchToProps = dispatch => ({
  clinicsFetch: obj => dispatch(clinicsFetch(obj)),
  clinicSet: clinic => dispatch(clinicSet(clinic)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PickClinic)
