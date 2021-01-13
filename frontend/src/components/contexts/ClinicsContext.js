import React, { createContext, useEffect, useState } from 'react';
import { headers, CLINICS_URL } from '../lib/constants';

export const ClinicsContext = createContext();

const ClinicsContextProvider = (props) => {
  const [list, setList] = useState([]);

  const updateList = async (row) => {
    let body = {};
    for (let key in row) {
      // empty values as "" may violate database constrains, so change to undefined
      body[key] = row[key] === '' ? undefined : row[key];
      console.log(body[key]);
    }
    if (row.id === undefined) {
      const response = await fetch(CLINICS_URL, {
        method: row.id === undefined ? 'POST' : 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setList([...list.filter((item) => item.id !== row.id), result]);
      return result;
    }
  };

  useEffect(() => {
    fetch(CLINICS_URL, {
      method: 'GET',
      headers,
    })
      .then((response) => response.json())
      .then((result) => setList(result));
  }, []);

  return (
    <ClinicsContext.Provider
      value={{ clinicsList: list, updateClinicsList: updateList }}
    >
      {props.children}
    </ClinicsContext.Provider>
  );
};

export default ClinicsContextProvider;
