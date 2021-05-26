import styled from 'styled-components'
import { styling } from '../../constants'

export const FormWrapper = styled.div`
   {
    display: flex;
    flex-direction: column;
    width: 95%;
    padding: 0px 2px 2px 2px;
    box-shadow: ${styling.shadow};
    border: solid 1px ${styling.color.border};
    border-radius: 4px;
    &:hover {
      background-color: ${styling.color.hover};
  }
`
export const ButtonWrapper = styled.div`
   {
    display: flex;
    width: 100%;
    padding: 2px 0 0 0;
    & > button {
      width: 100%;
      height: ${styling.input_height};
      background-color: ${styling.color.background};
    }
  }
`
export const InputWrapper = styled.div`
   {
    display: flex;
    gap: 2px;
    flex-direction: column;
    width: 100%;
    & > input {
      padding: 0;
      border: 0;
      text-indent: 4px;
    }
    & > * {
      width: 100%;
      border-radius: 3px;
      height: ${styling.input_height};
      background-color: ${styling.color.background};
      color: ${styling.color.text};
    }
    ::placeholder,
    & > select > option[value=''] {
      color: red;
    }
  }
`
