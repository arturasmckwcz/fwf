import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { personsFetch, menuSelect, listShow } from '../../redux'
import { genders, menus, lists } from '../../constants'
import { FormWrapper } from './FormStyling'

const PersonFullForm = ({ personObj, personsFetch, menuSelect, listShow }) => {
  const [person, setPerson] = useState({})

  const handleChange = e =>
    setPerson({ ...person, [e.taget.name]: e.taget.value })

  const handleSearch = e => {
    e.preventDefault()
    personsFetch(person)
    setPerson({})
    menuSelect(menus.MENU_NULL)
    listShow(lists.LIST_PERSON)
  }

  useEffect(() => setPerson(personObj), [personObj])

  return (
    <FormWrapper>
      <span>MANAGE PERSON</span>
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
      <input
        name='age'
        placeholder='Age'
        value={person.age ? person.age : ''}
        onChange={handleChange}
      />
      <input
        name='address'
        placeholder='Address'
        value={person.address ? person.address : ''}
        onChange={handleChange}
      />
      <input
        name='email'
        placeholder='Email'
        value={person.email ? person.email : ''}
        onChange={handleChange}
      />
      <input
        name='phone'
        placeholder='Phone'
        value={person.phone ? person.phone : ''}
        onChange={handleChange}
      />
      <button type='button' onClick={handleSearch}>
        {'Search'}
      </button>
      <button type='submit'>{'Update'}</button>
    </FormWrapper>
  )
}
const mapStateToProps = state => ({
  personObj: state.person.obj,
})
const mapDispatchToProps = dispatch => ({
  personsFetch: person => dispatch(personsFetch(person)),
  listShow: list => dispatch(listShow(list)),
  menuSelect: menu => dispatch(menuSelect(menu)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PersonFullForm)
