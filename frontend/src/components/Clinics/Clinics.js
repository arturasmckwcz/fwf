import React, { useContext, useState } from 'react';
import List from '../common/List';
import '../common/common.css';
import { emptyClinicsRow } from '../lib/constants';
import { ClinicsContext } from '../contexts/ClinicsContext';

const Clinics = () => {
  const emptyRow = { ...emptyClinicsRow };
  const [row, setRow] = useState(emptyRow);

  const { clinicsList, updateClinicsList } = useContext(ClinicsContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRow({ ...row, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(row) !== JSON.stringify(emptyRow)) {
      updateClinicsList(row);
      setRow(emptyRow);
    }
  };

  const handleClick = (id) => {
    let row = clinicsList.find((item) => id === item.id);
    // empty values may come as null, but we need "" for input value=
    for (let key in emptyRow) {
      if (row[key] === null) {
        row[key] = '';
      }
    }
    setRow(row);
  };

  return (
    <div className="dummy">
      <h3>Clinics</h3>
      <button onClick={() => setRow(emptyRow)}>Clear form</button>
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
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={row.name}
        />
        <input
          type="text"
          name="web"
          placeholder="Web"
          onChange={handleChange}
          value={row.web}
        />
        <input
          type="text"
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
      {clinicsList.length !== 0 ? (
        <List handleClick={handleClick} list={clinicsList} />
      ) : (
        <div>There's nothing to display!</div>
      )}
    </div>
  );
};

export default Clinics;
