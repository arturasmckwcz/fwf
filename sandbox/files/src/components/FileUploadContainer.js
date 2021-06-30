import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import EntityContainer from './EntityContainer'
import { getKey } from './helpers'
import { apiUrl, token } from '../constants'

const FileUploadContainer = ({ list }) => {
  const [files, setFiles] = useState([])
  const handleUploadFiles = () => {
    files.forEach(file => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        axios({
          url: apiUrl,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          data: {
            query: `mutation{
              addFileAndDocument(
                name:"${file.name}",
                type:"${file.type}",
                body:"${fileReader.result}"
                table_id:"${
                  list.list[list.list.findIndex(item => item.id === list.id)]
                    .table_id
                }",
                owner_id:${list.id})
                {id}
              }`,
          },
        })
          .then(resultDoc =>
            console.log(
              'FileUploadContainer:handleUploadFiles:axios:document:resultDoc: ',
              resultDoc
            )
          )
          .catch(error =>
            console.log(
              'FileUploadContainer:handleUploadFiles:axios:document:error.message: ',
              error.message
            )
          )
      }
      fileReader.readAsDataURL(file)
    })
  }
  const handleSelectFiles = event => setFiles(Array.from(event.target.files))
  const obj = list.list.find(obj => obj.id === list.id)
  return (
    <div className='container'>
      <EntityContainer />
      <h2>UPLOAD</h2>
      <p>
        FOR:{' '}
        {obj
          ? Object.values(obj).map(value => (
              <span key={getKey()}>
                {value}
                {' | '}
              </span>
            ))
          : 'NOTHING'}
      </p>
      <input type='file' name='file' multiple onChange={handleSelectFiles} />
      <input
        type='submit'
        name='upload'
        onClick={handleUploadFiles}
        value='Upload'
      />
    </div>
  )
}

const mapStateToProps = state => ({
  list: state.list,
})

export default connect(mapStateToProps, null)(FileUploadContainer)
