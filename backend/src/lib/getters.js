const Patient = require('../api/patients/patients.model')
const Person = require('../api/persons/persons.model')
const Clinic = require('../api/clinics/clinics.model')
const Doctor = require('../api/doctors/doctors.model')
const Lysate = require('../api/lysates/lysates.model')
const Prescription = require('../api/prescriptions/prescriptions.model')
const Product = require('../api/products/products.model')
const Source = require('../api/source/source.model')
const Production = require('../api/productions/productions.model')

const tablenames = require('../../db/constants/tablenames')

const getSource = async id => {
  const source = await Source.query().where('deleted_at', null).findById(id)
  const person = await Person.query()
    .where('deleted_at', null)
    .select('first', 'last', 'age', 'gender')
    .findById(source.person_id)
  let clinic
  if (source.clinic_id) {
    clinic = await Clinic.query()
      .where('deleted_at', null)
      .select('name')
      .findById(source.clinic_id)
  }
  return {
    id: source.id,
    code: source.code,
    draw_date: source.draw_date,
    arrive_date: source.arrive_date,
    donor: { ...person },
    clinic: source.clinic_id ? clinic.name : undefined,
  }
}

const getProduction = async id => {
  const production = await Production.query()
    .where('deleted_at', null)
    .findById(id)
  return {
    id: production.id,
    code: production.code,
    prescription: await getPrescription(production.prescription_id),
    source: await getSource(production.source_id),
  }
}

const getPrescription = async id => {
  const prescription = await Prescription.query()
    .where('deleted_at', null)
    .findById(id)
  const product = await Product.query()
    .where('deleted_at', null)
    .findById(prescription.product_id)
  const lysate = await Lysate.query()
    .where('deleted_at', null)
    .findById(prescription.lysate_id)
  return {
    code: prescription.code,
    blood_source: prescription.blood_source,
    lysate: `${lysate.code}: ${lysate.name}`,
    product: product.code,
    patient: await getPatient(prescription.patient_id),
    doctor: await getDoctor(prescription.doctor_id),
  }
}

const getDoctorsJoined = async () => {
  const doctors = await Doctor.query().where('deleted_at', null)
  const clinics = await Clinic.query().where('deleted_at', null)
  const persons = await Person.query().where('deleted_at', null)

  let result = []
  doctors.map(doctor => {
    const clinic = clinics.find(item => item.id === doctor.clinic_id)
    const person = persons.find(item => item.id === doctor.person_id)
    result.push({
      ...doctor,
      ...person,
      clinic: clinic ? clinic.name : null,
      id: undefined,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    })
  })
  return result
}

const getDoctor = async id => {
  const doctor = await Doctor.query().where('deleted_at', null).findById(id)
  let clinic
  if (doctor.clinic_id) {
    clinic = await Clinic.query()
      .where('deleted_at', null)
      .select('name')
      .findById(doctor.clinic_id)
  }
  const person = await Person.query()
    .where('deleted_at', null)
    .select('first', 'last', 'email', 'phone', 'address')
    .findById(doctor.person_id)
  return {
    id: doctor.id,
    ...person,
    clinic: doctor.clinic_id ? clinic.name : undefined,
  }
}

const getPatient = async id => {
  const patient = await Patient.query()
    .where('deleted_at', null)
    .findById([id, tablenames.patient])
  let clinic
  if (patient.clinic_id) {
    clinic = await Clinic.query()
      .where('deleted_at', null)
      .select('name')
      .findById(patient.clinic_id)
  }
  const person = await Person.query()
    .where('deleted_at', null)
    .select('first', 'last', 'age', 'gender', 'email', 'phone', 'address')
    .findById(patient.person_id)
  return {
    id: patient.id,
    code: patient.code,
    status: patient.status,
    ...person,
    clinic: patient.clinic_id ? clinic.name : undefined,
  }
}

module.exports = {
  getSource,
  getPrescription,
  getProduction,
  getDoctor,
  getDoctorsJoined,
  getPatient,
}
