import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PickClinic from '../pick/PickClinic'
import PickPerson from '../pick/PickPerson'
import { statuses } from '../../constants'

import { ContainerWrapper, FormWrapper, ButtonWrapper } from '../common/Styling'

const NewPatientContainer = ({ person, clinic }) => {
  const [status, setStatus] = useState()
  const handleSubmit = e => {
    e.preventDefault()
    console.log('NewPatientContainer.js:handleSubmit: ', {
      person_id: person.id,
      clinic_id: clinic.id,
      status,
    })
  }
  console.log(person)
  return (
    <ContainerWrapper onSubmit={handleSubmit}>
      <PersonInputWrap>
        <h3>Person input placeholder</h3>
        <PickPerson />
      </PersonInputWrap>
      <ScalarsWrap>
        <h3>Scalar field input form placeholder</h3>
        <FormWrapper>
          <select
            name='status'
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value=''>STATUS</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </FormWrapper>
      </ScalarsWrap>
      <ClinicPickWrap>
        <h3>Pick a clinic placeholder</h3>
        <PickClinic />
      </ClinicPickWrap>
      <InfoPatientWrap>
        <h3>Inormation being sent to API placeholder</h3>
        <p>
          Person: {person.name}, {person.age}, {person.gender}
        </p>
        <p>Clinic: {clinic.name}</p>
        <p>Status: {status}</p>
        <ButtonWrapper>
          <button type='submit' onClick={handleSubmit}>
            Submit
          </button>
        </ButtonWrapper>
      </InfoPatientWrap>
    </ContainerWrapper>
  )
}

const mapStateToProps = state => ({
  person: state.person.obj,
  clinic: state.clinic.obj,
})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(NewPatientContainer)

const PersonInputWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 60%;
  }
`
const ScalarsWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 30%;
  }
`
const ClinicPickWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 60%;
  }
`
const InfoPatientWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 30%;
  }
`
