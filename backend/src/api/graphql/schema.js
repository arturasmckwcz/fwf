const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} = require('graphql')

const tablenames = require('../../../db/constants/tablenames')

const Product = require('../products/products.model')
const Person = require('../persons/persons.model')
const Clinic = require('../clinics/clinics.model')
const Doctor = require('../doctors/doctors.model')
const Lysate = require('../lysates/lysates.model')
const Patient = require('../patients/patients.model')
const Prescription = require('../prescriptions/prescriptions.model')
const Source = require('../source/source.model')
const Production = require('../productions/productions.model')
const Dose = require('../doses/doses.model')
const Location = require('../locations/locations.model')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
})

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLID },
    first: { type: GraphQLString },
    last: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    address: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

const ClinicType = new GraphQLObjectType({
  name: 'Clinic',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    web: { type: GraphQLString },
  }),
})

const DoctorType = new GraphQLObjectType({
  name: 'DoctorType',
  fields: () => ({
    id: { type: GraphQLID },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query()
          .where('deleted_at', null)
          .findById(parent.person_id)
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        return await Clinic.query()
          .where('deleted_at', null)
          .findById(parent.clinic_id)
      },
    },
  }),
})

const LysateType = new GraphQLObjectType({
  name: 'LysateType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query()
          .where('deleted_at', null)
          .findById(parent.person_id)
      },
    },
  }),
})

const PatientType = new GraphQLObjectType({
  name: 'PatientType',
  fields: () => ({
    person: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query()
          .where('deleted_at', null)
          .findById(parent.person_id)
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        return await Clinic.query()
          .where('deleted_at', null)
          .findById([parent.clinic_id, tablenames.clinic])
      },
    },
  }),
  id: { type: GraphQLID },
})

const PrescriptionType = new GraphQLObjectType({
  name: 'PrescriptionType',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    blood_source: { type: GraphQLString },
    doctor: {
      type: DoctorType,
      async resolve(parent, args) {
        return await Doctor.query()
          .where('deleted_at', null)
          .findById(parent.doctor_id)
      },
    },
    patient: {
      type: PatientType,
      async resolve(parent, args) {
        return await Patient.query()
          .where('deleted_at', null)
          .findById([parent.patient_id, tablenames.patient])
      },
    },
    lysate: {
      type: LysateType,
      async resolve(parent, args) {
        return await Lysate.query()
          .where('deleted_at', null)
          .findById([parent.lysate_id, tablenames.lysate])
      },
    },
    product: {
      type: ProductType,
      async resolve(parent, args) {
        return await Product.query()
          .where('deleted_at', null)
          .findById([parent.product_id, tablenames.product])
      },
    },
  }),
})

const SourceType = new GraphQLObjectType({
  name: 'SourceType',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    type: { type: GraphQLString },
    draw_date: { type: GraphQLString },
    arrive_date: { type: GraphQLString },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        return await Person.query()
          .where('deleted_at', null)
          .findById(parent.person_id)
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        return await Clinic.query()
          .where('deleted_at', null)
          .findById([parent.clinic_id, tablenames.clinic])
      },
    },
  }),
})

const ProductionType = new GraphQLObjectType({
  name: 'ProductionType',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    start_date: { type: GraphQLString },
    finish_date: { type: GraphQLString },
    expire_date: { type: GraphQLString },
    certified: { type: GraphQBoolean },
    prescription: {
      type: PrescriptionType,
      async resolve(parent, args) {
        return await Prescription.query()
          .where('deleted_at', null)
          .findById([parent.prescription_id, tablenames.prescription])
      },
    },
    source: {
      type: SourceType,
      async resolve(parent, args) {
        return await Source.query()
          .where('deleted_at', null)
          .findById([parent.source_id, tablenames.source])
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        return await Clinic.query()
          .where('deleted_at', null)
          .findById([parent.clinic_id, tablenames.clinic])
      },
    },
  }),
})

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    id: { type: GraphQLID },
    container: { type: GraphQLString },
    handle: { type: GraphQLString },
    shelf: { type: GraphQLString },
    place: { type: GraphQLString },
    occupied: { type: GraphQBoolean },
  }),
})

const DoseType = new GraphQLObjectType({
  name: 'DoseType',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    status: { type: GraphQLString },
    scheduled_date: { type: GraphQLString },
    dispatch_date: { type: GraphQLString },
    production: {
      type: ProductionType,
      async resolve(parent, args) {
        Production.query()
          .where('deleted_at', null)
          .findById([parent.production_id, tablenames.production])
      },
    },
    location: {
      type: LocationType,
      async resolve(parent, args) {
        return await Location.query()
          .where('deleted_at', null)
          .findById(parent.location_id)
      },
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Product.query()
          .where('deleted_at', null)
          .findById([args.id, tablenames.product])
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        return await Product.query().where('deleted_at', null)
      },
    },
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Person.query().where('deleted_at', null).findById(args.id)
      },
    },
    persons: {
      type: new GraphQLList(PersonType),
      async resolve(parent, args) {
        return await Person.query().where('deleted_at', null)
      },
    },
    clinic: {
      type: ClinicType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Clinic.query()
          .where('deleted_at', null)
          .findById([args.id, tablenames.clinic])
      },
    },
    clinics: {
      type: new GraphQLList(ClinicType),
      async resolve(parent, args) {
        return await Clinic.query().where('deleted_at', null)
      },
    },
    doctor: {
      type: DoctorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Doctor.query().where('deleted_at', null).findById(args.id)
      },
    },
    doctors: {
      type: new GraphQLList(DoctorType),
      async resolve(parent, args) {
        return await Doctor.query().where('deleted_at', null)
      },
    },
    lysate: {
      type: LysateType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Lysate.query()
          .where('deleted_at', null)
          .findById([args.id, tablenames.lysate])
      },
    },
    lysates: {
      type: new GraphQLList(LysateType),
      async resolve(parent, args) {
        return await Lysate.query().where('deleted_at', null)
      },
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await Product.query().insertAndFetch(args)
      },
    },
  },
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
