import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { styling, forms } from '../../constants'
import { MenuPlaceHolder } from '../root/MenuPlaceHolder'

import PersonForm from './PersonForm'

const display = (form, idx) => {
  switch (form) {
    case forms.FORM_PERSON:
      return <PersonForm key={form + `${idx}`} />
    default:
      return <></>
  }
}

const FormList = ({ forms }) => {
  return (
    <FormsWrapper>
      <MenuPlaceHolder />
      {forms.map((form, idx) => display(form, idx))}
    </FormsWrapper>
  )
}

const mapStateToProps = state => ({
  forms: state.form.show,
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(FormList)

const FormsWrapper = styled.div`
   {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 100%;
    height: 100%;
    padding-left: ${styling.padding_left};
    padding-bottom: 10px;
  }
`
// margin-top: ${styling.menu_height};
// margin-left: ${styling.margin_left};
// margin-bottom: ${styling.margin_bottom};
