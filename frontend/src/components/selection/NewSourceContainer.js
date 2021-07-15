import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PickClinic from '../pick/PickClinic'
import PickPerson from '../pick/PickPerson'
import PickFile from '../pick/PickFile'
import PersonForm from '../forms/PersonForm'

import { menus, tables, messageColors } from '../../constants'

import { createSource, addDocuments } from '../../lib/api/'

import {
  ContainerWrapper,
  ButtonWrapper,
  InputWrapper,
  Input,
} from '../common/Styling'

import { personSet, clinicSet, menuSelect, infoSet } from '../../redux'

const NewSourceContainer = ({
  person,
  clinic,
  personSet,
  clinicSet,
  menuSelect,
  infoSet,
  files,
  token,
}) => {
  const [drawDate, setDrawDate] = useState('')
  const [arriveDate, setArriveDate] = useState('')
  const [showNewPerson, setShowNewPerson] = useState(true)

  const handleSubmit = e => {
    e.preventDefault()
    const source = {
      draw_date: drawDate,
      arrive_date: arriveDate,
      person_id: person.id,
      clinic_id: clinic.id,
    }
    createSource({ source, token })
      .then(res => {
        if (res.data && !res.data.errors) return res.data.data.addSource.id
        else throw new Error('Something went wrong!')
      })
      .then(id => addDocuments(id, tables.source, files, token))
      .then(() => {
        menuSelect(menus.MENU_INFO)
        infoSet({
          color: messageColors.SUCCESS,
          message: 'Success! Source material has been created.',
        })
        personSet({})
        clinicSet({})
      })
      .catch(error => {
        infoSet({ color: messageColors.ALERT, message: error.message })
        menuSelect(menus.MENU_INFO)
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
        {showNewPerson ? <PersonForm /> : <PickPerson isAssigned={true} />}
      </PersonInputWrap>
      <ClinicPickWrap>
        <h3>Clinic</h3>
        <PickClinic />
      </ClinicPickWrap>
      <ScalarsWrap>
        <h3>Arrival and draw dates</h3>
        <InputWrapper>
          <Input
            type='date'
            value={drawDate}
            placeholder='Draw date'
            onChange={e => setDrawDate(e.target.value)}
          />
          <Input
            type='date'
            value={arriveDate}
            placeholder='Arrival date'
            onChange={e => setArriveDate(e.target.value)}
          />
        </InputWrapper>
      </ScalarsWrap>
      <DocumentWrap>
        <h3>Documents</h3>
        <PickFile obj={person} />
      </DocumentWrap>
      <InfoSourceWrap>
        <h3>Source material</h3>
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
        <p>Arrival date: {arriveDate}</p>
        <p>Draw date: {drawDate}</p>
        <ButtonWrapper>
          <button type='button' onClick={handleSubmit}>
            <strong style={{ color: messageColors.SUCCESS }}>
              <big>Submit</big>
            </strong>
          </button>
        </ButtonWrapper>
      </InfoSourceWrap>
    </ContainerWrapper>
  )
}

const mapStateToProps = state => ({
  files: state.file.list,
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
export default connect(mapStateToProps, mapDispatchToProps)(NewSourceContainer)

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
const DocumentWrap = styled.div`
   {
     {
      width: 49%;
      max-width: 40rem;
      height: 45%;
    }
  }
`
// TODO: need a better idea where to put this extra styling
const InfoSourceWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 32%;
    & > p {
      padding-left: 0.2rem;
    }
    & > p > span:last-child {
      float: right;
      color: ${messageColors.ALERT};
    }
  }
`
