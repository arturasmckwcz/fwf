import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
  personsFetch,
  formShow,
  formHide,
  listShow,
  menuSelect,
} from '../../redux'

import { genders, menus, forms, lists } from '../../constants'
import { FormWrapper } from './FormStyling'

const PersonSearchForm = ({
  personsFetch,
  menuSelect,
  formHide,
  formShow,
  listShow,
}) => {
  const [person, setPerson] = useState({})

  const handleSubmit = e => {
    e.preventDefault()
    personsFetch(person)
    setPerson({})
    menuSelect(menus.MENU_NULL)
    listShow(lists.LIST_PERSON)
  }

  const handleChange = e =>
    setPerson({ ...person, [e.target.name]: e.target.value })

  const newPerson = () => {
    setPerson({})
    formHide(forms.FORM_PERSON_SEARCH)
    formShow(forms.FORM_PERSON_FULL)
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <div>PERSON SEARCH</div>
      <input
        name='first'
        placeholder='First name'
        value={person.first ? person.first : ''}
        onChange={handleChange}
      />
      <input
        name='last'
        placeholder='Last name'
        value={person.last ? person.last : ''}
        onChange={handleChange}
      />

      <select name='gender' value={person.gender || undefined}>
        <option>GENDER</option>
        {genders.map(gender => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>

      <button type='button' onClick={newPerson}>
        {'New'}
      </button>
      <button type='submit'>{'Find'}</button>
    </FormWrapper>
  )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  formHide: form => dispatch(formHide(form)),
  formShow: form => dispatch(formShow(form)),
  personsFetch: person => dispatch(personsFetch(person)),
  listShow: list => dispatch(listShow(list)),
  menuSelect: menu => dispatch(menuSelect(menu)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PersonSearchForm)
