const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('graphql')

const { Patient, Person } = require('../../../model')

const PatientSearchByNameType = new GraphQLObjectType({
  name: 'PatientSearchByName',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

module.exports = PatientSearchByNameType
