const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('graphql')

const { Patient, Person } = require('../../../model')

const PatientSearchType = new GraphQLObjectType({
  name: 'PatientSearch',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

module.exports = PatientSearchType
