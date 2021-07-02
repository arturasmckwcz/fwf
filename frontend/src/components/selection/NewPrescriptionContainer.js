import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { menus, messageColors, bloodSources } from '../../constants'

import { ContainerWrapper, InputWrapper } from '../common/Styling'

import { menuSelect, infoSet } from '../../redux'

import PickFile from '../pick/PickFile'

const NewPatientContainer = ({ menuSelect, infoSet, token }) => {
  const [bloodSource, setBloodSource] = useState('')
  const [files, setFiles] = useState([])
  return (
    <ContainerWrapper>
      <ScalarsWrap>
        <h3>Blood source</h3>
        <InputWrapper>
          <select
            name='bloodSource'
            value={bloodSource}
            onChange={e => setBloodSource(e.target.value)}
          >
            <option value=''>BLOOD SOURCE</option>
            {bloodSources.map(source => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </InputWrapper>
      </ScalarsWrap>
      <DocumentWrap>
        <h3>Documents</h3>
        <PickFile files={files} setFiles={setFiles} obj={{}} />
      </DocumentWrap>
    </ContainerWrapper>
  )
}

const mapStateToProps = state => ({
  token: state.user.user.token,
})
const mapDispatchToProps = dispatch => ({
  menuSelect: menu => dispatch(menuSelect(menu)),
  infoSet: message => dispatch(infoSet(message)),
})
export default connect(mapStateToProps, mapDispatchToProps)(NewPatientContainer)

const ScalarsWrap = styled.div`
   {
    width: 49%;
    max-width: 40rem;
    height: 30%;
  }
`
const DocumentWrap = styled.div`
   {
     {
      width: 49%;
      max-width: 40rem;
      height: 45%;
    }
  }
`
