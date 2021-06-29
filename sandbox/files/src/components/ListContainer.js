import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchList, selectItem, setPageFromNext } from '../redux'

import EntityContainer from './EntityContainer'
import { getKey } from './helpers'

const ListContainer = ({ list, fetchList, handleSelect, gotoPage }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchList(list.entity), [list.entity])

  const handleClick = id => {
    handleSelect(id)
    gotoPage()
  }

  return (
    <div className='container'>
      <EntityContainer />
      {list.loading ? (
        <p>LOADING...</p>
      ) : list.list ? (
        list.list.map(item => (
          <div
            className='list_item'
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            {Object.values(item).map(value => (
              <span key={getKey()}>{`${value} | `}</span>
            ))}
          </div>
        ))
      ) : list.error ? (
        <div>ERROR: {list.error.message}</div>
      ) : (
        <div>Nothing to show.</div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  list: state.list,
})
const mapDispatchToProps = dispatch => ({
  fetchList: entity => dispatch(fetchList(entity)),
  handleSelect: id => dispatch(selectItem(id)),
  gotoPage: () => dispatch(setPageFromNext()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
