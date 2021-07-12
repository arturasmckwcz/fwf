import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { menus, messageColors, bloodSources } from '../../constants'

import {
  ContainerWrapper,
  InputWrapper,
  ButtonWrapper,
} from '../common/Styling'

import Select from '../common/Select'

import { menuSelect, infoSet, doctorSet, productSet } from '../../redux'

import PickDoctor from '../pick/PickDoctor'
import PickFile from '../pick/PickFile'
import PickProduct from '../pick/PickProduct'

const NewPrescriptionContainer = ({
  doctor,
  doctorSet,
  product,
  productSet,
  menuSelect,
  infoSet,
  token,
}) => {
  const [bloodSource, setBloodSource] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [files, setFiles] = useState([])

  const handleSubmit = e => e.preventDefault()

  useEffect(() => {}, [])

  return (
    <ContainerWrapper>
      <DoctorPickWrapp>
        <h3>Doctor</h3>
        <PickDoctor />
      </DoctorPickWrapp>
      <PatientPickWrapp>
        <h3>Patient</h3>
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
          <input
            type='date'
            value={issueDate}
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
      </LysatePickWrapp>
      <DocumentWrap>
        <h3>Documents</h3>
        <PickFile files={files} setFiles={setFiles} obj={{}} />
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
          {true && (
            <>
              <span>Placeholder</span>
              <span onClick={() => {}}>[X]</span>
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
          {true && (
            <>
              <span>Placeholder</span>
              <span onClick={() => {}}>[X]</span>
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
  product: state.product.obj,
})
const mapDispatchToProps = dispatch => ({
  menuSelect: menu => dispatch(menuSelect(menu)),
  infoSet: message => dispatch(infoSet(message)),
  doctorSet: doctor => dispatch(doctorSet(doctor)),
  productSet: product => dispatch(productSet(product)),
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
const InfoPrescriptionWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 43%;
    & > p {
      padding-left: 0.2rem;
    }
    & > p > span:last-child {
      float: right;
      color: ${messageColors.ALERT};
    }
  }
`
