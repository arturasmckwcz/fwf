import React from 'react'
import { connect } from 'react-redux'
import {
  setUploadPage,
  setDownloadPage,
  setListPage,
  setNextPage,
  setBackPage,
} from '../redux'

import { UPLOAD, DOWNLOAD } from '../redux/page/pageTypes'

const Header = ({ setUpload, setDownload, setList, setNext, setBack }) => {
  return (
    <div className='header_container'>
      <div className='menu_header'>FWF FILE SERVICE:</div>
      <div
        className='menu_item'
        onClick={() => {
          setNext(UPLOAD)
          setUpload()
        }}
      >
        upload files
      </div>
      <div
        className='menu_item'
        onClick={() => {
          setNext(DOWNLOAD)
          setDownload()
        }}
      >
        download files
      </div>
      <div
        className='menu_item'
        onClick={() => {
          setBack()
          setList()
        }}
      >
        list
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setUpload: () => dispatch(setUploadPage()),
  setDownload: () => dispatch(setDownloadPage()),
  setList: () => dispatch(setListPage()),
  setNext: page => dispatch(setNextPage(page)),
  setBack: () => dispatch(setBackPage()),
})

export default connect(null, mapDispatchToProps)(Header)
