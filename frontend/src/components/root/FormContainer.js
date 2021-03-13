import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { styling } from '../../constants'
import {
  NEW_PRESCRIPTION,
  NEW_SOURCE,
  NEW_PATIENT,
  // menuNewPatient,
  // menuNewSource,
  // menuNewPrescription,
} from '../../redux'

import PersonForm from '../forms/PersonForm'

const FormContainer = ({ selected }) => {
  return (
    <FormContainerWrapper>
      <PersonForm />
    </FormContainerWrapper>
  )
}

const mapStateToProps = state => ({
  selected: state.menu.selected,
})
const mapDispatchToProps = dispatch => ({
  // menuNewPatient: () => dispatch(menuNewPatient()),
  // menuNewPrescription: () => dispatch(menuNewPrescription()),
  // menuNewSource: () => dispatch(menuNewSource()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)

const FormContainerWrapper = styled.div`
   {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    border-right: solid 1px lightgrey;
    width: 100%;
    height: 100%;
    margin-top: ${styling.menu_height};
    margin-left: ${styling.margin_left};
    margin-bottom: ${styling.margin_bottom};
  }
`
