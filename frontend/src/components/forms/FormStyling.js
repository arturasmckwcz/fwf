import styled from 'styled-components'
import { styling } from '../../constants'

export const FormWrapper = styled.form`
   {
    width: 95%;
    box-shadow: ${styling.shadow};
    border: solid 1px ${styling.color.border};
    border-radius: 4px;
    & > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: end;
    }
    & > select {
      width: 96.7%;
      margin-left: 3px;
    }
    & > input,
    select {
      width: 96.7%;
    }
    & > input,
    select,
    button {
      border-radius: 3px;
      height: ${styling.input_height};
      flex:1;
    }
    
    &:hover {
      background-color: ${styling.color.hover}
      ;
  }
`
export const ButtonWrapper = styled.button`
   {
    color: ${props => props.color};
  }
`
