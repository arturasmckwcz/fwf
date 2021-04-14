import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { formShow } from '../../redux'

import { forms, menus } from '../../constants'

import FormList from '../forms/FormList'

const FormContainer = ({ selected, formShow, formHideAll }) => {
  useEffect(() => {
    switch (selected) {
      case menus.MENU_NEW_PATIENT:
        formShow(forms.FORM_PERSON)
        break
      default:
    }
  }, [selected, formShow])
  return <FormList />
}

const mapStateToProps = state => ({
  selected: state.menu.selected,
})
const mapDispatchToProps = dispatch => ({
  formShow: form => dispatch(formShow(form)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
