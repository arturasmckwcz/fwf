const Product = require('./products/products.model')
const Person = require('./persons/persons.model')
const Clinic = require('./clinics/clinics.model')
const Doctor = require('./doctors/doctors.model')
const Lysate = require('./lysates/lysates.model')
const Patient = require('./patients/patients.model')
const Prescription = require('./prescriptions/prescriptions.model')
const Source = require('./source/source.model')
const Production = require('./productions/productions.model')
const Dose = require('./doses/doses.model')
const Location = require('./locations/locations.model')
const Filesystem = require('./filesystem/filesystem.model')
const Document = require('./documents/documents.model')
const Parameter = require('./parameters/parameters.model')
const Science = require('./science/science.model')
const Data = require('./data/data.model')
const User = require('./users/users.model')
const Role = require('./roles/roles.model')
const Member = require('./members/members.model')
const Right = require('./rights/rights.model')
const Permission = require('./permissions/permissions.model')

// TODO: check all models!

module.exports = {
  Product,
  Person,
  Clinic,
  Doctor,
  Lysate,
  Patient,
  Prescription,
  Source,
  Production,
  Dose,
  Location,
  Filesystem,
  Document,
  Parameter,
  Science,
  Data,
  User,
  Role,
  Member,
  Right,
  Permission,
}
