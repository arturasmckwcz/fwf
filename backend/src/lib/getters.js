const Patient = require('../api/patients/patients.model');
const Person = require('../api/persons/persons.model');
const Clinic = require('../api/clinics/clinics.model');
const Doctor = require('../api/doctors/doctors.model');
const Prescription = require('../api/prescriptions/prescriptions.model');
const Product = require('../api/products/products.model');

const getPrescription = async (id) => {
  const prescription = await Prescription.query()
    .where('deleted_at', null)
    .findById(id);
  const product = await Product.query()
    .where('deleted_at', null)
    .findById(prescription.product_id);
  const lysate = await Lysate.query()
    .where('deleted_at', null)
    .findById(prescription.lysate_id);
  return {
    code: prescription.code,
    blood_source: prescription.blood_source,
    lysate: `${lysate.code}: ${lysate.name}`,
    product: product.code,
    patient: await getPatient(prescription.patient_id),
    doctor: await getDoctor(prescription.doctor_id),
  };
};


const getDoctor = async (id) => {
  
  const doctor = await Doctor.query()
    .where('deleted_at',  null)
    .findById(id);
  let clinic;
  if (doctor.clinic_id) {
    clinic = await Clinic.query()
      .where('deleted_at', null)
      .select('name')
      .findById(doctor.clinic_id);
  };
  const person = await Person.query()
    .where('deleted_at',  null)
    .select(
      'first',
      'last',
      'email',
      'phone',
      'address'
      )
    .findById(doctor.person_id);
  return {
    'id': doctor.id,
    ... person,
    'clinic': doctor.clinic_id
      ? clinic.name
      : undefined
  };
};


const getPatient = async (id) => {

  const patient = await Patient.query()
    .where('deleted_at',  null)
    .findById(id);
  let clinic;
  if (patient.clinic_id) {
    clinic = await Clinic.query()
      .where('deleted_at', null)
      .select('name')
      .findById(patient.clinic_id);
  };
  const person = await Person.query()
    .where('deleted_at',  null)
    .select(
      'first',
      'last',
      'age',
      'gender',
      'email',
      'phone',
      'address'
      )
    .findById(patient.person_id);
  return {
    'id': patient.id,
    'code': patient.code,
    'status': patient.status,
    ... person,
    'clinic': patient.clinic_id
      ? clinic.name
      : undefined
  };

};

module.exports = {
  getPrescription,
  getDoctor,
  getPatient,
};
