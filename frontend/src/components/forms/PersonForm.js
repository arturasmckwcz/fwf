import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'
import { styling } from '../../constants'

const PersonForm = props => {
  return (
    <FormWrapper>
      <input type='text' />
    </FormWrapper>
  )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(PersonForm)

const FormWrapper = styled.form`
   {
    width: 90%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    & > input {
      width: 100%;
      height: ${styling.input_height};
    }
  }
`
