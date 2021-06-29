import React from 'react'
import { connect } from 'react-redux'

import { setNextPage, setListPage, selectEntity } from '../redux'
import { LIST } from '../redux/page/pageTypes'
import { entities } from '../constants'

const EntityContainer = ({ list, page, setEntity, gotoList }) => {
  const handleSelect = event => {
    setEntity(event.target.value)
    if (page !== LIST) {
      gotoList()
      setNextPage(page)
    }
  }

  return (
    <>
      <select
        onChange={event => handleSelect(event)}
        name='selected'
        defaultValue={list.entity}
      >
        {entities.map((entity, idx) => (
          <option key={idx} value={idx}>
            {entity}
          </option>
        ))}
      </select>
    </>
  )
}

const mapStateToProps = state => ({
  list: state.list,
  page: state.page,
})
const mapDispatchToProps = dispatch => ({
  setEntity: entity => dispatch(selectEntity(entity)),
  setNextPage: page => dispatch(setNextPage(page)),
  gotoList: () => dispatch(setListPage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityContainer)
