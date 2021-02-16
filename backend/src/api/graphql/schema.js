const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} = require('graphql')

const Product = require('../products/products.model')
const Person = require('../persons/persons.model')
const Clinic = require('../clinics/clinics.model')
const Doctor = require('../doctors/doctors.model')

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Product.query().where('deleted_at', null).findById(args.id)
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
        return await Clinic.query().where('deleted_at', null).findById(args.id)
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
