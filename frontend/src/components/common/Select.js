import React from 'react'

const Select = ({ name, list, value, handleChange }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={e => handleChange(e.target.value)}
    >
      <option style={{ display: 'none' }}>Select {name}</option>
      {list.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}

export default Select
