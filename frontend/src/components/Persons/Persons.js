import React, { useState, useContext } from 'react';
import List from '../common/List';
import '../common/common.css';
import { emptyPersonsRow } from '../lib/constants';
import { PersonsContext } from '../contexts/PersonsContext';

const Persons = () => {
  const emptyRow = emptyPersonsRow;
  const [row, setRow] = useState(emptyRow);
  const { personsList, updatePersonsList } = useContext(PersonsContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRow({ ...row, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(row) !== JSON.stringify(emptyRow)) {
      updatePersonsList(row);
      setRow(emptyRow);
    }
  };

  const handleClick = (id) => {
    let row = personsList.find((item) => id === item.id);
    // empty values may come as null, but we need "" for input value=
    for (let key in emptyPersonsRow) {
      if (row[key] === null) {
        row[key] = '';
      }
    }
    setRow(row);
  };

  return (
    <div className="dummy">
      <h3>Persons</h3>
      <button
        onClick={() => {
          setRow(emptyRow);
        }}
      >
        Clear form
      </button>
      <form
        style={{
          display: 'grid',
          gridTemplateColumns: '150px 150px 150px',
          columnGap: '10px',
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="first"
          placeholder="Given name"
          onChange={handleChange}
          value={row.first}
        />
        <input
          type="text"
          name="last"
          placeholder="Surname"
          onChange={handleChange}
          value={row.last}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          value={row.gender}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          value={row.age}
        />
        <input
          type="Adress"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={row.address}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={row.email}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          onChange={handleChange}
          value={row.phone}
        />
        <button type="submit">{row.id === null ? 'Add new' : 'Save'}</button>
      </form>
      {personsList.length !== 0 ? (
        <List handleClick={handleClick} list={personsList} />
      ) : (
        <div>There's nothing to display!</div>
      )}
    </div>
  );
};

export default Persons;
