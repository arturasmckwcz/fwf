import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { personsFetch, menuSelect, listShow } from '../../redux'
import { genders, menus, lists, styling } from '../../constants'
import { FormWrapper, InputWrapper, ButtonWrapper, Input } from './FormStyling'

const emptyPerson = {
  first: '',
  last: '',
  gender: '',
  age: '',
  address: '',
  email: '',
  phone: '',
}

const PersonForm = ({
  user,
  personObj,
  personsFetch,
  menuSelect,
  listShow,
}) => {
  const [person, setPerson] = useState(emptyPerson)

  const handleChange = e =>
    setPerson({ ...person, [e.target.name]: e.target.value })

  const handleUpdate = e =>
    console.log('PersonFullForm:handleSubmit:person: ', person)

  const handleSearch = e => {
    e.preventDefault()
    personsFetch({ person, token: user.token })
    setPerson({})
    menuSelect(menus.MENU_NULL)
    listShow(lists.LIST_PERSON)
  }

  useEffect(() => setPerson(personObj), [personObj])

  return (
    <FormWrapper>
      <form>
        <div>
          <strong>PERSON</strong>
        </div>
        <div>SEARCH</div>
        <InputWrapper>
          <Input
            name='first'
            placeholder='First name'
            value={person.first ? person.first : ''}
            onChange={handleChange}
          />
          <Input
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
        <div>MANAGE</div>
        <InputWrapper>
          {' '}
          <Input
            name='first'
            placeholder='First name'
            value={person.first ? person.first : ''}
            onChange={handleChange}
          />
          <Input
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
          <Input
            name='age'
            placeholder='Age'
            value={person.age ? person.age : ''}
            onChange={handleChange}
          />
          <Input
            name='address'
            placeholder='Address'
            value={person.address ? person.address : ''}
            onChange={handleChange}
          />
          <Input
            name='email'
            placeholder='Email'
            value={person.email ? person.email : ''}
            onChange={handleChange}
          />
          <Input
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
  user: state.user.user,
})
const mapDispatchToProps = dispatch => ({
  personsFetch: person => dispatch(personsFetch(person)),
  listShow: list => dispatch(listShow(list)),
  menuSelect: menu => dispatch(menuSelect(menu)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PersonForm)
