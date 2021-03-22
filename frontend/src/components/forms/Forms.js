import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { styling, forms } from '../../constants'

import PersonSearchForm from '../forms/PersonSearchForm'
import PersonFullForm from '../forms/PersonFullForm'

const display = (form, idx) => {
  switch (form) {
    case forms.FORM_PERSON_SEARCH:
      return <PersonSearchForm key={form + `${idx}`} />
    case forms.FORM_PERSON_FULL:
      return <PersonFullForm key={form + `${idx}`} />
    default:
      return <></>
  }
}

const Forms = ({ forms }) => {
  return (
    <FormsWrapper>{forms.map((form, idx) => display(form, idx))}</FormsWrapper>
  )
}

const mapStateToProps = state => ({
  forms: state.form.show,
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Forms)

const FormsWrapper = styled.div`
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
