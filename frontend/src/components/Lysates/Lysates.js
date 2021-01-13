import React, { useContext, useEffect, useState } from 'react';
import List from '../common/List';
import '../common/common.css';
import { emptyPersonsRow } from '../lib/constants';
import { PersonsContext } from '../contexts/PersonsContext';
import { LysatesContext } from '../contexts/LystateContext';

const Lysates = () => {
  const emptyRow = {
    id: undefined,
    person_id: undefined,
    name: '',
    code: '',
  };
  // const emptyRow = { person: { emptyPersonsRow }, clinic: null };
  const { personsList } = useContext(PersonsContext);
  const { lysatesList, updateLysatesList } = useContext(LysatesContext);
  const [row, setRow] = useState(emptyRow);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (lysatesList.length > 1) {
      setList([]);
      for (let lysate of lysatesList) {
        setList((prevList) => [...prevList, { ...lysate }]);
      }
    }
  }, [lysatesList]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRow({ ...row, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(row) !== JSON.stringify(emptyRow)) {
      // New doctor: insert new person, get id, insert new doctor using person id and clinic id
      // Update person and update doctor's clinic_id with form data
      setRow(emptyRow);
    }
  };

  const handleClick = (id) => {
    let row = list.find((item) => id === item.id);
    // empty values may come as null, but we need "" for input value=
    for (let key in emptyRow) {
      if (row[key] === null) {
        row[key] = '';
      }
    }
    console.log(row);
    setRow(row);
  };

  return (
    <div className="dummy">
      <h3>Lysates</h3>
      <button onClick={() => setRow(emptyRow)}>Clear form</button>
      <p></p>
      {list.length > 0 ? (
        <List handleClick={handleClick} list={list} />
      ) : (
        <div>There's nothing to display!</div>
      )}
    </div>
  );
};

export default Lysates;
