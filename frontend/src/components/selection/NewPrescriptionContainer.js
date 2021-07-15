import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { createPrescription, addDocuments } from '../../lib/api/'

import { menus, tables, messageColors, bloodSources } from '../../constants'

import {
  ContainerWrapper,
  InputWrapper,
  ButtonWrapper,
  Input,
} from '../common/Styling'

import Select from '../common/Select'

import {
  menuSelect,
  infoSet,
  doctorSet,
  patientSet,
  productSet,
  lysateSet,
} from '../../redux'

import PickDoctor from '../pick/PickDoctor'
import PickPatient from '../pick/PickPatient'
import PickFile from '../pick/PickFile'
import PickProduct from '../pick/PickProduct'
import PickLysate from '../pick/PickLysate'

const NewPrescriptionContainer = ({
  doctor,
  doctorSet,
  patient,
  patientSet,
  product,
  productSet,
  lysate,
  lysateSet,
  files,
  menuSelect,
  infoSet,
  token,
}) => {
  const [bloodSource, setBloodSource] = useState('')
  const [issueDate, setIssueDate] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const prescription = {
      blood_source: bloodSource,
      issue_date: issueDate,
      doctor_id: doctor.id,
      patient_id: patient.id,
      lysate_id: lysate.id,
      product_id: product.id,
    }
    createPrescription({ prescription, token })
      .then(res => {
        console.log(
          'NewPrescriptionContainer.js:handleSub:res: ',
          res.data,
          res.data.errors,
          res.data.data.addPrescription.id
        )
        if (res.data && !res.data.errors)
          return res.data.data.addPrescription.id
        else throw new Error('Something went wrong!')
      })
      .then(id => addDocuments(id, tables.prescription, files, token))
      .then(() => {
        menuSelect(menus.MENU_INFO)
        infoSet({
          color: messageColors.SUCCESS,
          message: 'Success! Prescription has been created.',
        })
        doctorSet({})
        patientSet({})
        productSet({})
        lysateSet({})
      })
      .catch(error => {
        infoSet({ color: messageColors.ALERT, message: error.message })
        menuSelect(menus.MENU_INFO)
      })
  }

  return (
    <ContainerWrapper>
      <DoctorPickWrapp>
        <h3>Doctor</h3>
        <PickDoctor />
      </DoctorPickWrapp>
      <PatientPickWrapp>
        <h3>Patient</h3>
        <PickPatient />
      </PatientPickWrapp>
      <ScalarsWrap>
        <h3>Blood source and issue date</h3>
        <InputWrapper>
          <Select
            name='BLOOD SOURCE'
            list={bloodSources}
            value={bloodSource}
            handleChange={setBloodSource}
          />
          <Input
            type='date'
            value={issueDate}
            placeholder='Issue date'
            onChange={e => setIssueDate(e.target.value)}
          />
        </InputWrapper>
      </ScalarsWrap>
      <ProductPickWrapp>
        <h3>Product</h3>
        <PickProduct />
      </ProductPickWrapp>
      <LysatePickWrapp>
        <h3>Lysate</h3>
        <PickLysate />
      </LysatePickWrapp>
      <DocumentWrap>
        <h3>Documents</h3>
        <PickFile obj={null} />
      </DocumentWrap>
      <InfoPrescriptionWrap>
        <h3>Prescription</h3>
        <p>
          Doctor:{' '}
          {doctor.id && (
            <>
              <span>{doctor.name}</span>
              <span onClick={() => doctorSet({})}>[X]</span>
            </>
          )}
        </p>
        <p>
          Patient:{' '}
          {patient.person && (
            <>
              <span>{`${patient.person.first} ${patient.person.last}`}</span>
              <span onClick={() => patientSet({})}>[X]</span>
            </>
          )}
        </p>
        <p>Blood source: {bloodSource}</p>
        <p>Issue date: {issueDate}</p>
        <p>
          Product:{' '}
          {product && (
            <>
              <span>{product.name}</span>
              <span onClick={() => productSet({})}>[X]</span>
            </>
          )}
        </p>
        <p>
          Lysate:{' '}
          {lysate && (
            <>
              <span>{lysate.name}</span>
              <span onClick={() => lysateSet({})}>[X]</span>
            </>
          )}
        </p>
        <ButtonWrapper>
          <button type='button' onClick={handleSubmit}>
            <strong style={{ color: messageColors.SUCCESS }}>
              <big>Submit</big>
            </strong>
          </button>
        </ButtonWrapper>
      </InfoPrescriptionWrap>
    </ContainerWrapper>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
  doctor: state.doctor.obj,
  patient: state.patient.obj,
  product: state.product.obj,
  lysate: state.lysate.obj,
  files: state.file.list,
})
const mapDispatchToProps = dispatch => ({
  menuSelect: menu => dispatch(menuSelect(menu)),
  infoSet: message => dispatch(infoSet(message)),
  doctorSet: doctor => dispatch(doctorSet(doctor)),
  patientSet: patient => dispatch(patientSet(patient)),
  productSet: product => dispatch(productSet(product)),
  lysateSet: lysate => dispatch(lysateSet(lysate)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPrescriptionContainer)

const DoctorPickWrapp = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 20%;
  }
`
const PatientPickWrapp = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 20%;
  }
`
const ScalarsWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 12%;
  }
`
const ProductPickWrapp = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 15%;
  }
`
const LysatePickWrapp = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 20%;
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
const InfoPrescriptionWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 44%;
    & > p {
      padding-left: 0.2rem;
    }
    & > p > span:last-child {
      float: right;
      color: ${messageColors.ALERT};
    }
  }
`
