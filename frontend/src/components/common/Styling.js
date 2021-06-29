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
export const HeightPlaceholder = styled.div`
   {
    height: ${styling.input_height};
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
      color: ${styling.color.text};
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
    & > input,
    select {
      border-bottom: 1px solid ${styling.color.border_dimmed};
    }
    & > select {
      border-color: ${styling.color.border_dimmed};
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
    height: 70%;
    overflow-y: scroll;
    margin-top: 0;
    padding-left: 0px;
    list-style-type: none;

    & > li:hover {
      box-shadow: ${styling.shadow};
      background-color: ${styling.color.hover};
    }
  }
`
export const ContainerWrapper = styled.div`
   {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    gap: 15px;
    padding: 10px 10px;
    & > * {
      box-shadow: ${styling.shadow};
      border: solid 1px ${styling.color.border};
      border-radius: 4px;
    }
    & > div > h3 {
      text-align: center;
      margin: 0;
      padding: 0.2rem;
    }
  }
`
