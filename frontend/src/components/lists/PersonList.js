import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { personSet, formShow, formHide } from '../../redux'
import { forms } from '../../constants'

const PersonList = ({ list, personSet, formShow, formHide }) => {
  const handleClick = person => {
    personSet(person)
  }
  const isSearchNeeded = useRef(true)

  useEffect(() => {
    if (list.length !== 0) {
      formHide(forms.FORM_PERSON_SEARCH)
      formShow(forms.FORM_PERSON_FULL)
    } else if (isSearchNeeded.current) {
      isSearchNeeded.current = false
      formShow(forms.FORM_PERSON_SEARCH)
    }
  }, [list, formHide, formShow])

  return (
    <ListWrapper>
      {list.length !== 0 &&
        list.map(person => (
          <li key={person.id} onClick={() => handleClick(person)}>
            {Object.keys(person).map(
              key => key !== 'id' && `${person[key]} | `
            )}
          </li>
        ))}
    </ListWrapper>
  )
}

const mapStateToProps = state => ({
  list: state.person.list,
})
const mapDispatchToProps = dispatch => ({
  personSet: person => dispatch(personSet(person)),
  formShow: form => dispatch(formShow(form)),
  formHide: form => dispatch(formHide(form)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PersonList)

const ListWrapper = styled.ul`
   {
    & > li {
      list-style-type: none;
    }
    & > li:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      background-color: black;
    }
  }
`
