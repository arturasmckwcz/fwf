import React, { useState } from 'react'
import { connect } from 'react-redux'

import { styling } from '../../constants'

import { login } from '../../redux'

import styled from 'styled-components'

const Login = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    login({ username, password })
  }

  return (
    <LoginWrapper>
      <form onSubmit={e => handleLogin(e)}>
        <div>Login To FWF</div>
        <Input
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit' style={{ color: styling.color.button_mutate }}>
          Login
        </button>
      </form>
    </LoginWrapper>
  )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)

const LoginWrapper = styled.div`
   {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > form {
      display: flex;
      gap: 4px;
      flex-direction: column;
      min-width: 300px;
      border-radius: 4px;
      border: solid 1px ${styling.color.border};
      box-shadow: ${styling.shadow};
      padding: 10px 10px;
      &:hover {
        background-color: ${styling.color.hover};
      }
    }
    & > form > input {
      widh: 100%;
      padding: 0;
      border: 0;
      text-indent: 4px;
      background-color: ${styling.color.background};
      color: ${styling.color.text};
      height: ${styling.input_height};
    }
    & > form > button {
      width: 100%;
      background-color: ${styling.color.background};
      border-color: ${styling.color.shadow_lighter}
        ${styling.color.shadow_darker} ${styling.color.shadow_darker}
        ${styling.color.shadow_lighter};
    }
    & > form > div {
      width: 100%;
      text-transform: uppercase;
      text-align: center;
    }
  }
`
const Input = styled.input`
   {
    ::placeholder {
      color: ${styling.color.text_dimmed};
    }
  }
`
