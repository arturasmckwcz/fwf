import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { InputWrapper, Input } from '../common/Styling'

import { setFiles, setFileRef } from '../../redux'

const FileInput = ({ setFiles, setFileRef }) => {
  const ref = useRef()
  useEffect(() => {
    console.log('FileInput.js:useEffect:ref', ref)
    setFileRef(ref)
  }, [])
  return (
    <>
      <InputWrapper>
        <Input
          ref={ref}
          type='file'
          name='file'
          multiple
          onChange={e => setFiles(Array.from(e.target.files))}
        />
      </InputWrapper>
    </>
  )
}

const mapStateToProps = state => ({
  files: state.file.list,
})
const mapDispatchToProps = dispatch => ({
  setFiles: files => dispatch(setFiles(files)),
  setFileRef: ref => dispatch(setFileRef(ref)),
})
export default connect(mapStateToProps, mapDispatchToProps)(FileInput)
