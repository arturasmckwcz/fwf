import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { formShow, formHideAll } from '../../redux'

import { forms, menus } from '../../constants'

import Forms from '../forms/Forms'

const FormContainer = ({ selected, formShow, formHideAll }) => {
  useEffect(() => {
    formHideAll()
    switch (selected) {
      case menus.MENU_NEW_PATIENT:
        formShow(forms.FORM_PERSON_SEARCH)
        break
      default:
    }
  }, [selected, formShow, formHideAll])
  return <Forms />
}

const mapStateToProps = state => ({
  selected: state.menu.selected,
})
const mapDispatchToProps = dispatch => ({
  formShow: form => dispatch(formShow(form)),
  formHideAll: () => dispatch(formHideAll()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
