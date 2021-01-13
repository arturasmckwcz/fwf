import React, { createContext, useEffect, useState } from 'react';
import { headers, PERSONS_URL } from '../lib/constants';

export const PersonsContext = createContext();

const PersonsContextProvider = (props) => {
  const [list, setList] = useState([]);

  const updateList = async (row) => {
    let body = {};
    for (let key in row) {
      // empty values as "" may violate database constrains, so change to undefined
      body[key] = row[key] === '' ? undefined : row[key];
    }
    const response = await fetch(PERSONS_URL, {
      method: row.id === undefined ? 'POST' : 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    const result = await response.json();
    setList([...list.filter((item) => item.id !== row.id), result]);
    return result;
  };

  useEffect(() => {
    fetch(PERSONS_URL, {
      method: 'GET',
      headers,
    })
      .then((response) => response.json())
      .then((result) => setList(result));
  }, []);

  return (
    <PersonsContext.Provider
      value={{ personsList: list, updatePersonsList: updateList }}
    >
      {props.children}
    </PersonsContext.Provider>
  );
};

export default PersonsContextProvider;
