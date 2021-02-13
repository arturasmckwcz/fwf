const express = require('express')
const {
  getPrescriptionCode,
  getSourceCode,
  getProductionCode,
  getPatientCode,
} = require('../../lib/codes')
const router = express.Router()
const { getProduction } = require('../../lib/getters')
const {
  insertPerson,
  insertPatient,
  insertPresciption,
  insertSource,
  insertProduction,
} = require('../../lib/posters')

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    res.json(await getProduction(id))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  // insert person as patient
  const person = await insertPerson(req.body.prescription.patient.person)
  if (person.id) {
    // fill in patient object
    const patientObject = req.body.prescription.patient
    patientObject.person_id = person.id
    patientObject.code = getPatientCode()
    if (patientObject.person) delete patientObject.person
    // insert patient
    const patient = await insertPatient(patientObject)
    if (patient.id) {
      // fill in prescription object
      const prescriptionObject = req.body.prescription
      prescriptionObject.patient_id = patient.id
      prescriptionObject.code = getPrescriptionCode()
      if (prescriptionObject.patient) delete prescriptionObject.patient
      // insert prescription
      const prescription = await insertPresciption(prescriptionObject)
      // if source is allogeneic insert person as donor otherwise  use the same person as patient
      let donor
      if (prescription.blood_source === 'allogeneic') {
        donor = await insertPerson(req.body.source.donor)
        if (!donor.id) return next(source)
      }
      // fill in source object
      bloodObject = req.body.source
      if (req.body.source.donor) delete req.body.source.donor
      sourceObject.person_id =
        prescription.blood_source === 'allogeneic' ? donor.id : person.id
      sourceObject.code = getSourceCode()
      // insert source
      const source = await insertSource(sourceObject)
      if (prescription.id && source.id) {
        const productionObject = {
          code: getProductionCode(),
          prescription_id: prescription.id,
          source_id: source.id,
        }
        // insert production
        const production = await insertProduction(productionObject)
        if (production.id) {
          res.json({
            person,
            patient,
            prescription,
            blood,
            production,
          })
        } else {
          next(production)
        }
      } else {
        next(prescription)
      }
    } else {
      next(patient)
    }
  } else {
    next(person)
  }
})

module.exports = router
