const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const tablenames = require('../../../constants/tablenames')

const { Production, Science } = require('../../model')

const ProductionType = require('./ProductionType')
const ScienceType = require('./ScienceType')

const DataType = new GraphQLObjectType({
  name: 'DataType',
  fields: () => ({
    id: { type: GraphQLID },
    value: { type: GraphQLString },
    production: {
      type: ProductionType,
      async resolve(parent, args) {
        try {
          return await Production.query()
            .where('deleted_at', null)
            .findById([parent.production_id, tablenames.production])
        } catch (error) {
          return { error }
        }
      },
    },
    science: {
      type: ScienceType,
      async resolve(parent, args) {
        try {
          return await Science.query()
            .where('deleted_at', null)
            .findById(parent.science_id)
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

module.exports = DataType
