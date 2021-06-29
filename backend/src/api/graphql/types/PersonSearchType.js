const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
} = require('graphql')

const { Patient } = require('../../../model')

const PersonSearchType = new GraphQLObjectType({
  name: 'PersonSearch',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    patient: {
      type: GraphQLBoolean,
      async resolve(parent, args) {
        try {
          const patient = await Patient.query()
            .where('deleted_at', null)
            .andWhere('person_id', parseInt(parent.id))
          return patient.length !== 0
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

module.exports = PersonSearchType
