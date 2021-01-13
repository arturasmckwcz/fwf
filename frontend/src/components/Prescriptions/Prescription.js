import React, { useContext, useEffect, useState } from 'react';
import List from '../common/List';
import '../common/common.css';
import { emptyPersonsRow } from '../lib/constants';
import { PersonsContext } from '../contexts/PersonsContext';
import { ClinicsContext } from '../contexts/ClinicsContext';
import { DoctorsContext } from '../contexts/DoctorsContext';

const Prescriptions = () => {
  const emptyRow = {
    doctor_id: undefined,
    patient_id: undefined,
    ...emptyPersonsRow,
  };
  // const emptyRow = { person: { emptyPersonsRow }, clinic: null };
  const { clinicsList } = useContext(ClinicsContext);
  const { personsList, updatePersonsList } = useContext(PersonsContext);
  const { doctorsList, updateDoctorsList } = useContext(DoctorsContext);
  const { prescriptionsList, updatePrescriptionsList } = useContext(
    PrescriptionsContext,
  );
  const { patientsList, updatePatientsList } = useContext(patientsList);
  const [row, setRow] = useState(emptyRow);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (
      doctorsList.length > 1 &&
      personsList.length > 1 &&
      patientsList.length > 1 &&
      prescriptionsList.length > 1
    ) {
      setList([]);
      for (let doctor of doctorsList) {
        setList((prevList) => [
          ...prevList,
          {
            doctor_id: doctor.id,
            ...personsList.find((person) => person.id === doctor.person_id),
            clinic_id: doctor.clinic_id,
            clinic_name:
              doctor.clinic_id === null
                ? null
                : clinicsList.find((clinic) => clinic.id === doctor.clinic_id)
                    .name,
          },
        ]);
      }
    }
  }, [doctorsList, personsList, clinicsList]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRow({ ...row, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(row) !== JSON.stringify(emptyRow)) {
      // New doctor: insert new person, get id, insert new doctor using person id and clinic id
      if (row.doctor_id === undefined) {
        const person = {
          ...row,
          age: parseInt(row.age),
          clinic_id: undefined,
          clinic_name: undefined,
          doctor_id: undefined,
        };
        const result = await updatePersonsList(person);
        updateDoctorsList({
          id: undefined,
          person_id: parseInt(result.id),
          clinic_id: row.clinic_id ? parseInt(row.clinic_id) : undefined,
        });
      }
      // ;
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
      <h3>Doctors</h3>
      <button onClick={() => setRow(emptyRow)}>Clear form</button>
      <form
        style={{
          display: 'grid',
          gridTemplateColumns: '150px 150px 150px',
          columnGap: '10px',
        }}
        onSubmit={handleSubmit}
      >
        <select name="doctor_id" value={row.doctor_id} onChange={handleChange}>
          <option value={''}>Select Doctor</option>
          {doctorList.map((doctor, index) => (
            <option key={index} value={doctor.doctor_id}>
              {`${doctor.first} ${doctor.last}`}
            </option>
          ))}
        </select>
        <p style={{ fontWeight: 'bold' }}>Patient:</p>
        <div></div>
        <div></div>
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
      {list.length > 0 ? (
        <List handleClick={handleClick} list={list} />
      ) : (
        <div>There's nothing to display!</div>
      )}
    </div>
  );
};

export default Prescriptions;
