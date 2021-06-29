import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import EntityContainer from './EntityContainer'
import { getKey } from './helpers'
import { apiUrl, token } from '../constants'

const FileDownloadContainer = ({ list }) => {
  const [preview, setPreview] = useState()
  const [files, setFiles] = useState([])
  const obj = list.list.find(obj => obj.id === list.id)
  useEffect(() => {
    if (obj)
      axios({
        url: apiUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        data: {
          query: `{
          documents(
            owner_id:${obj.id},
            table_id:"${obj.table_id}")
            {filesystem_id}
          }`,
        },
      })
        .then(result => setFiles(result.data.data.documents))
        .catch(error => alert(error.message + ' NNX'))
  }, [obj])
  const handleDownload = (filesystem_id, action) => {
    axios({
      url: apiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        query: `{
          file(id:${filesystem_id}){name,body}
        }`,
      },
    })
      .then(result => {
        if (action === 'download') {
          const link = document.createElement('a')
          link.href = result.data.data.file.body
          link.setAttribute('download', result.data.data.file.name)
          document.body.appendChild(link)
          link.click()
        }
        if (action === 'preview') {
          // const blob = new Blob([result.data.data.file.body])
          setPreview(
            <iframe
              title={result.data.data.file.name}
              src={result.data.data.file.body}
              width='30rem'
              heigth='50rem'
              alt=''
            />
          )
        }
      })
      .catch(error => console.log(error.message))
  }
  return (
    <div className='container'>
      <EntityContainer />
      <h2>DOWNLOAD</h2>
      <div>
        FOR:{' '}
        {obj
          ? Object.values(obj).map(value => (
              <span key={getKey()}>
                {value}
                {' | '}
              </span>
            ))
          : 'NOTHING'}
      </div>
      <div>
        FILES:{' '}
        {files
          ? files.map(item => (
              <div key={getKey()}>
                {' | '}
                <span>{item.filesystem_id}</span>
                {' | '}
                <span
                  className='list_item'
                  onClick={() => handleDownload(item.filesystem_id, 'download')}
                >
                  download
                </span>
                {' | '}
                <span
                  className='list_item'
                  onClick={() => handleDownload(item.filesystem_id, 'preview')}
                >
                  preview
                </span>
                {' | '}
              </div>
            ))
          : 'NOTHING'}
      </div>
      <>{preview ? preview : 'NOTHING TO PREVIEW'}</>
    </div>
  )
}

const mapStateToProps = state => ({
  list: state.list,
})
const mapDispatchToProps = dispatch => ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileDownloadContainer)
