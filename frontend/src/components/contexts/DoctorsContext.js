import React, { useState, useEffect, createContext } from 'react';
import { headers, DOCTORS_URL } from '../lib/constants';

export const DoctorsContext = createContext();

const DoctorsContextProvider = (props) => {
  const [list, setList] = useState([]);

  const updateList = async (row) => {
    let body = {};
    for (let key in row) {
      // empty values as "" may violate database constrains, so change to undefined
      body[key] = row[key] === '' ? undefined : row[key];
    }
    console.log(body);
    const response = await fetch(DOCTORS_URL, {
      method: row.id === undefined ? 'POST' : 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    const result = await response.json();
    setList([...list.filter((item) => item.id !== row.id), result]);
    return result;
  };

  useEffect(() => {
    fetch(DOCTORS_URL, {
      method: 'GET',
      headers,
    })
      .then((response) => response.json())
      .then((result) => setList(result));
  }, []);

  return (
    <DoctorsContext.Provider
      value={{ doctorsList: list, updateDoctorsList: updateList }}
    >
      {props.children}
    </DoctorsContext.Provider>
  );
};

export default DoctorsContextProvider;
