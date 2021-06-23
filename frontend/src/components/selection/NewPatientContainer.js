import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PickClinic from '../pick/PickClinic'

const NewPatientContainer = ({ person, clinic }) => {
  const [personId, setPersonId] = useState()
  const [clinicId, setClinicId] = useState()
  const [status, setStatus] = useState()

  return (
    <ContainerWrapper>
      <PersonInputWrap>
        <h3>Person input placeholder</h3>
      </PersonInputWrap>
      <ClinicPickWrap>
        <h3>Pick a clinic placeholder</h3>
        <PickClinic />
      </ClinicPickWrap>
      <ScalarsWrap>
        <h3>Scalar field input form placeholder</h3>
      </ScalarsWrap>
      <InfoPatientWrap>
        <h3>Inormation being sent to API placeholder</h3>
        <p>
          Person: {person.first} {person.last}, {person.age}
        </p>
        <p>Clinic: {clinic.name}</p>
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

const ContainerWrapper = styled.div`
   {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    gap: 15px;
    padding: 10px 10px;
  }
`

const PersonInputWrap = styled.div`
   {
    background-color: #555;
    width: 49%;
    height: 60%;
  }
`
const ClinicPickWrap = styled.div`
   {
    background-color: #555;
    width: 49%;
    height: 38%;
  }
`
const ScalarsWrap = styled.div`
   {
    background-color: #555;
    width: 49%;
    height: 66%;
  }
`
const InfoPatientWrap = styled.div`
   {
    background-color: #555;
    width: 49%;
    height: 30%;
  }
`
