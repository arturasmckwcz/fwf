import styled from 'styled-components'
import { styling } from '../../constants'

export const FormWrapper = styled.form`
   {
    width: 90%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border: solid 1px lightgrey;
    border-radius: 4px;
    & > div,
    select {
      width: 96.7%;
      margin-left: 3px;
    }
    & > input,
    select {
      width: 96.7%;
    }
    & > button {
      width: 50%;
    }
    & > div,
    input,
    select,
    button {
      border-radius: 3px;
      height: ${styling.input_height};
    }
  }
`
