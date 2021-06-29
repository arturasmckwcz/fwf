import React from 'react'
import { connect } from 'react-redux'

import { UPLOAD, DOWNLOAD, LIST } from '../redux/page/pageTypes'
import FileUploadContainer from './FileUploadContainer'
import FileDownloadContainer from './FileDownloadContainer'
import Header from './Header'
import ListContainer from './ListContainer'

const WrapContainer = ({ page }) => {
  return (
    <>
      <Header />

      {page.page === UPLOAD ? (
        <FileUploadContainer />
      ) : page.page === DOWNLOAD ? (
        <FileDownloadContainer />
      ) : page.page === LIST ? (
        <ListContainer />
      ) : (
        <h2>NOTHING</h2>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  page: state.page,
})

export default connect(mapStateToProps, null)(WrapContainer)
