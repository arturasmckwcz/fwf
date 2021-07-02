import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { messageColors } from '../../constants'
import { ListWrapper } from '../common/Styling'

import { setFiles } from '../../redux'

import FileInput from '../common/FileInput'

const PickFile = ({ files, setFiles, obj, inputRef }) => {
  useEffect(() => {
    console.log('PickFile.js:useEffect:inputRef', inputRef)
    console.log('PickFile.js:useEffect:obj', obj)
    if (inputRef.current) inputRef.current.value = null
    setFiles([])
  }, [obj])
  return (
    <div style={{ height: '100%' }}>
      <p style={{ paddingLeft: '0.2rem' }}>
        Documents for {obj.id && obj.name}
      </p>
      <FileInput />
      <ListWrapper>
        {files.map(file => (
          <li key={file.name}>
            {file.name}
            <span
              style={{ float: 'right', color: messageColors.ALERT }}
              onClick={() =>
                setFiles(files.filter(({ name }) => name !== file.name))
              }
            >
              [X]
            </span>
          </li>
        ))}
      </ListWrapper>
    </div>
  )
}

const mapStateToProps = state => ({
  files: state.file.list,
  inputRef: state.file.ref,
})
const mapDispatchToProps = dispatch => ({
  setFiles: files => dispatch(setFiles(files)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PickFile)
