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
    & > form {
      width: 100%;
    }
    & > form > div:first-child {
      text-align: center;
    }
    &:hover {
      background-color: ${styling.color.hover};
    }
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
      border-color: ${styling.color.shadow_lighter}
        ${styling.color.shadow_darker} ${styling.color.shadow_darker}
        ${styling.color.shadow_lighter};
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
    & > select {
      border-color: ${styling.color.border_dimmed};
    }
    & > select > option {
      color: red;
    }
    & > * {
      width: 100%;
      border-radius: 3px;
      height: ${styling.input_height};
      background-color: ${styling.color.background};
      color: ${styling.color.text};
    }
  }
`
export const Input = styled.input`
   {
    ::placeholder {
      color: ${styling.color.text_dimmed};
    }
  }
`
export const TableWrapper = styled.table`
   {
    height: 100%;
    & > thead > tr > th {
      position: sticky;
      top: ${styling.menu_height};
      background-color: ${styling.color.background};
    }
    & > tbody {
      max-height: 100%;
      overflow-y: auto;
    }
    & > tbody > tr:hover {
      box-shadow: ${styling.shadow};
      background-color: ${styling.color.hover};
    }
  }
`
export const ListWrapper = styled.ul`
   {
    padding-left: 0px;
    & > li:hover {
      box-shadow: ${styling.shadow};
      background-color: ${styling.color.hover};
    }
  }
`
