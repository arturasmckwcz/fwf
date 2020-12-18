const Patient = require('../api/patients/patients.model');
const Person = require('../api/persons/persons.model');
const Clinic = require('../api/clinics/clinics.model');
const Doctor = require('../api/doctors/doctors.model');
const Lysate = require('../api/lysates/lysates.model');
const Prescription = require('../api/prescriptions/prescriptions.model');
const Product = require('../api/products/products.model');
const Blood = require('../api/blood/blood.model');
const Production = require('../api/productions/productions.model');

async function insertPerson(person) {
  console.log("inserPerson person:\n", person);
  try {
    const result = await Person.query()
      .insert(person);
    return result;
  } catch(error) {
    console.log("inserPerson went wrong: ", error);
    return error;
  };  
};

async function insertPatient(patient) {
  console.log("insertPatient patient:\n", patient);
  try {
    const result = await Patient.query()
      .insert(patient);
    return result;
  } catch(error) {
    console.log("inserPatient went wrong: ", error);
    return error;
  };  
};

async function insertPresciption(prescription) {
  console.log("insertPrescription prescription:\n", prescription);
  try {
    const result = await Prescription.query()
      .insert(prescription);
    return result;
  } catch(error) {
    console.log("insertPrescription went wrong: ", error);
    return error;
  };  
};

async function insertBlood(blood) {
  console.log("insertBlood blood:\n", blood);
  try {
    const result = await Blood.query()
      .insert(blood);
    return result;
  } catch(error) {
    console.log("insertBlood went wrong: ", error);
    return error;
  };  
};

async function insertProduction(production) {
  console.log("insertProduction production:\n", production);
  try {
    const result = await Production.query()
      .insert(production);
    return result;
  } catch(error) {
    console.log("insertProduction went wrong: ", error);
    return error;
  };  
};

module.exports = {
  insertPerson,
  insertPatient,
  insertPresciption,
  insertBlood,
  insertProduction,
}