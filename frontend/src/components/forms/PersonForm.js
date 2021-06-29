import React, { useState } from 'react'
import { connect } from 'react-redux'

import { personSet, infoSet, menuSelect } from '../../redux'
import { createPerson } from '../../lib/api/person'

import { genders, menus, messageColors } from '../../constants'
import { InputWrapper, Input, ButtonWrapper } from '../common/Styling'

const emptyPerson = {
  first: '',
  last: '',
  gender: '',
  age: '',
  address: '',
  email: '',
  phone: '',
}

const PersonForm = ({ personSet, infoSet, menuSelect, token }) => {
  const [person, setPerson] = useState(emptyPerson)
  const handleChange = e =>
    setPerson({ ...person, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    createPerson({ person, token })
      .then(res => {
        console.log('PersonForm.js:handleSubmit:res: ', res)
        if (res.data)
          personSet({
            ...res.data.data.addPerson,
            name: `${res.data.data.addPerson.first} ${res.data.data.addPerson.last}`,
          })
        else {
          infoSet({
            color: messageColors.ALERT,
            message: 'ERROR: Request failed!',
          })
          menuSelect(menus.MENU_INFO)
        }
      })
      .catch(error => {
        infoSet({ color: messageColors.ALERT, message: error.message })
        menuSelect(menus.MENU_INFO)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <button type='submit' style={{ color: 'green' }}>
            Create New Person
          </button>
        </ButtonWrapper>
      </form>
    </>
  )
}
const mapStateToProps = state => ({
  token: state.user.user.token,
})
const mapDispatchToProps = dispatch => ({
  personSet: person => dispatch(personSet(person)),
  infoSet: message => dispatch(infoSet(message)),
  menuSelect: menu => dispatch(menuSelect(menu)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PersonForm)
