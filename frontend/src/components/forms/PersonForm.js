import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { personsFetch, menuSelect, listShow } from '../../redux'
import { genders, menus, lists, styling } from '../../constants'
import { FormWrapper, InputWrapper, ButtonWrapper } from './FormStyling'

const emptyPerson = {
  first: '',
  last: '',
  gender: '',
  age: '',
  address: '',
  email: '',
  phone: '',
}

const PersonForm = ({ personObj, personsFetch, menuSelect, listShow }) => {
  const [person, setPerson] = useState(emptyPerson)

  const handleChange = e =>
    setPerson({ ...person, [e.target.name]: e.target.value })

  const handleUpdate = e =>
    console.log('PersonFullForm:handleSubmit:person: ', person)

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
      <form>
        <span>
          <strong>PERSON</strong>
        </span>
        <InputWrapper>
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
        </InputWrapper>
        <ButtonWrapper>
          <button
            style={{ color: styling.color.button_normal }}
            type='button'
            onClick={handleSearch}
          >
            Search
          </button>
        </ButtonWrapper>
        <span>MANAGE</span>
        <InputWrapper>
          {' '}
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
          <select name='gender' value={person.gender} onChange={handleChange}>
            <option value=''>GENDER</option>
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
        </InputWrapper>
        <ButtonWrapper>
          <button
            style={{ color: styling.color.button_delete }}
            type='button'
            onClick={handleSearch}
          >
            Delete
          </button>
          <button
            style={{ color: styling.color.button_mutate }}
            type='button'
            onClick={handleUpdate}
          >
            Update
          </button>
        </ButtonWrapper>
      </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(PersonForm)
