const API_URL = 'http://192.168.0.214:3001/api/';
const PRODUCTS_URL = API_URL + 'products';
const CLINICS_URL = API_URL + 'clinics';
const DOCTORS_URL = API_URL + 'doctors';
const PERSONS_URL = API_URL + 'persons';
const LYSATES_URL = API_URL + 'lysates';
const PATIENTS_URL = API_URL + 'patients';
const PRESCRIPTIONS_URL = API_URL + 'prescriptions';
const BLOOD_URL = API_URL + 'blood';
const PRODUCTIONS_URL = API_URL + 'productions';
const headers = { 'Content-Type': 'application/json' };
const emptyPersonsRow = {
  id: null,
  first: '',
  last: '',
  gender: '',
  age: '',
  code: '',
  web: '',
  address: '',
  email: '',
  phone: '',
};
const emptyClinicsRow = {
  id: undefined,
  name: '',
  web: '',
  address: '',
  email: '',
  phone: '',
};

module.exports = {
  PRODUCTS_URL,
  CLINICS_URL,
  DOCTORS_URL,
  PERSONS_URL,
  LYSATES_URL,
  headers,
  emptyPersonsRow,
  emptyClinicsRow,
};
