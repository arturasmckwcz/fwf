const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} = require('graphql')

const tablenames = require('../../../constants/tablenames')
// get permissions list from enums as an object
const permissions = require('../../../lib/arrayconvert')(
  require('../../../constants/enums').permissions
)

const checkPermission = require('../../../lib/checkPermission')
const { getPrescriptionCode } = require('../../../lib/codes')

const {
  Product,
  Person,
  Patient,
  Prescription,
  Filesystem,
  Document,
} = require('../../../model')

const {
  ProductType,
  PersonType,
  PatientType,
  PrescriptionType,
  FilesystemType,
  DocumentType,
} = require('../types')

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        gender: { type: GraphQLString },
        age: { type: GraphQLInt },
        address: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.person,
            permissions.create
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Person.query().insertAndFetch(args)
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    },
    addPatient: {
      type: PatientType,
      args: {
        status: { type: GraphQLString },
        person_id: { type: GraphQLID },
        clinic_id: { type: GraphQLID },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.patient,
            permissions.create
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Patient.query().insertAndFetch({
            ...args,
            person_id: parseInt(args.person_id),
            clinic_id: parseInt(args.clinic_id),
            user_id: req.userId,
            code: getPatientCode(),
          })
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.product,
            permissions.create
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Product.query().insertAndFetch(args)
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    },
    addPrescription: {
      type: PrescriptionType,
      args: {
        blood_source: { type: GraphQLString },
        issue_date: { type: GraphQLString },
        doctor_id: { type: GraphQLID },
        patient_id: { type: GraphQLID },
        lysate_id: { type: GraphQLID },
        product_id: { type: GraphQLID },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.prescription,
            permissions.create
          ))
        )
          throw new Error('Unauthorised!')
        try {
          let date = new Date(
            args.issue_date.substring(0, 4),
            args.issue_date.substring(5, 7),
            args.issue_date.substring(8, 10)
          )
          date = date.toISOString().slice(0, -1) + '+00'
          return await Prescription.query().insertAndFetch({
            ...args,
            issue_date: date,
            doctor_id: parseInt(args.doctor_id),
            patient_id: parseInt(args.patient_id),
            lysate_id: parseInt(args.lysate_id),
            product_id: parseInt(args.product_id),
            user_id: req.userId,
            code: getPrescriptionCode(),
          })
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    },
    addFile: {
      type: FilesystemType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        body: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.filesystem,
            permissions.create
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Filesystem.query().insertAndFetch(args)
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    },
    addDocument: {
      type: DocumentType,
      args: {
        filesystem_id: { type: GraphQLID },
        owner_id: { type: GraphQLID },
        table_id: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !checkPermission(req.userId, tablenames.document, permissions.create)
        )
          throw new Error('Unauthorised!')
        let { filesystem_id, table_id, owner_id } = args
        filesystem_id = parseInt(filesystem_id)
        owner_id = parseInt(owner_id)
        try {
          return await Document.query().insertAndFetch({
            filesystem_id,
            table_id,
            [`${table_id}_id`]: owner_id,
          })
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    },
    addFileAndDocument: {
      type: DocumentType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        body: { type: GraphQLString },
        owner_id: { type: GraphQLID },
        table_id: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.filesystem,
            permissions.create
          ))
        )
          throw new Error('Unauthorised!')
        if (
          !(await checkPermission(
            req.userId,
            tablenames.document,
            permissions.create
          ))
        )
          throw new Error('Unauthorised!')

        let { table_id, owner_id, name, type, body } = args
        if (!(await checkPermission(req.userId, table_id, permissions.create)))
          throw new Error('Unauthorised!')

        try {
          const file = await Filesystem.query().insertAndFetch({
            name,
            type,
            body,
          })
          owner_id = parseInt(owner_id)
          return await Document.query().insertAndFetch({
            filesystem_id: file.id,
            table_id,
            [`${table_id}_id`]: owner_id,
            user_id: req.userId,
          })
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    },
  },
})
