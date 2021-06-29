import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PickClinic from '../pick/PickClinic'
import PickPerson from '../pick/PickPerson'
import PersonForm from '../forms/PersonForm'

import { statuses, menus, messageColors } from '../../constants'

import { createPatient } from '../../lib/api/patient'

import {
  ContainerWrapper,
  ButtonWrapper,
  InputWrapper,
} from '../common/Styling'

import { personSet, clinicSet, menuSelect, infoSet } from '../../redux'

const NewPatientContainer = ({
  person,
  clinic,
  personSet,
  clinicSet,
  menuSelect,
  infoSet,
  token,
}) => {
  const [status, setStatus] = useState('')
  const [showNewPerson, setShowNewPerson] = useState(true)

  const handleSubmit = e => {
    e.preventDefault()
    const patient = { person_id: person.id, clinic_id: clinic.id, status }
    createPatient({ patient, token }).then(res => {
      if (res.data && !res.data.errors) {
        menuSelect(menus.MENU_INFO)
        infoSet({
          color: messageColors.SUCCESS,
          message: 'Success! Patient has been created.',
        })
        personSet({})
        clinicSet({})
      } else {
        infoSet({ color: messageColors.ALERT, message: 'Fail!' })
        menuSelect(menus.MENU_INFO)
      }
    })
  }

  return (
    <ContainerWrapper>
      <PersonInputWrap>
        <h3>Person</h3>
        <ButtonWrapper>
          <button
            type='button'
            onClick={() => setShowNewPerson(prevState => !prevState)}
          >
            {showNewPerson ? 'Pick a person' : 'New person'}
          </button>
        </ButtonWrapper>
        {showNewPerson ? <PersonForm /> : <PickPerson />}
      </PersonInputWrap>
      <ClinicPickWrap>
        <h3>Clinic</h3>
        <PickClinic />
      </ClinicPickWrap>
      <ScalarsWrap>
        <h3>Patient status</h3>
        <InputWrapper>
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
        </InputWrapper>
      </ScalarsWrap>
      <InfoPatientWrap>
        <h3>Patient</h3>
        <p>
          Person:{' '}
          {person.name && (
            <>
              <span>
                {person.name}, {person.age}, {person.gender}
              </span>
              <span onClick={() => personSet({})}>[X]</span>
            </>
          )}
        </p>
        <p>
          Clinic:{' '}
          {clinic.name && (
            <>
              <span>{clinic.name}</span>
              <span onClick={() => clinicSet({})}>[X]</span>
            </>
          )}
        </p>
        <p>Status: {status}</p>
        <ButtonWrapper>
          <button type='button' onClick={handleSubmit}>
            <strong style={{ color: 'green' }}>
              <big>Submit</big>
            </strong>
          </button>
        </ButtonWrapper>
      </InfoPatientWrap>
      <DocumentWrap>
        <h3>Documents</h3>
      </DocumentWrap>
    </ContainerWrapper>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
  person: state.person.obj,
  clinic: state.clinic.obj,
})
const mapDispatchToProps = dispatch => ({
  personSet: pickedPerson => dispatch(personSet(pickedPerson)),
  clinicSet: clinic => dispatch(clinicSet(clinic)),
  menuSelect: menu => dispatch(menuSelect(menu)),
  infoSet: message => dispatch(infoSet(message)),
})
export default connect(mapStateToProps, mapDispatchToProps)(NewPatientContainer)

const PersonInputWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 46.2%;
  }
`
const ClinicPickWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 46.2%;
  }
`
const ScalarsWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 15%;
  }
`
// TODO: need a better idea where to put this extra styling
const InfoPatientWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 30%;
    & > p > span:last-child {
      float: right;
      color: red;
    }
  }
`
const DocumentWrap = styled.div`
   {
     {
      width: 49%;
      max-width: 40rem;
      height: 45%;
    }
  }
`
