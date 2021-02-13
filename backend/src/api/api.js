const express = require('express')
const router = express.Router()

const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
router.use('/graphql', graphqlHTTP({ schema }))

const doctors = require('./doctors/doctors.routes')
const patients = require('./patients/patients.routes')
const persons = require('./persons/persons.routes')
const products = require('./products/products.routes')
const clinics = require('./clinics/clinics.routes')
const source = require('./source/source.routes')
const lysates = require('./lysates/lysates.routes')
const prescriptions = require('./prescriptions/prescriptions.routes')
const productions = require('./productions/productions.routes')
const users = require('./users/users.routes')
const roles = require('./roles/roles.routes')
const documents = require('./documents/documents.routes')
const joined = require('./joined/joined')
const pdfs = require('./storage/pdfs')

router.use('/doctors', doctors)
router.use('/documents', documents)
router.use('/patients', patients)
router.use('/persons', persons)
router.use('/products', products)
router.use('/clinics', clinics)
router.use('/source', source)
router.use('/lysates', lysates)
router.use('/prescriptions', prescriptions)
router.use('/productions', productions)
router.use('/users', users)
router.use('/roles', roles)
router.use('/joined', joined)
router.use('/pdfs', pdfs)

router.get('/', (req, res) => {
  res.json({
    message: 'Go .../api/ for REST or .../api/graphql for GraphQL',
  })
})

module.exports = router
