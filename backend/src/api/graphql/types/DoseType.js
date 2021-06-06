const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const tablenames = require('../../../constants/tablenames')

const { Production, Location } = require('../../model')

const ProductionType = require('./ProductionType')
const LocationType = require('./LocationType')

const DoseType = new GraphQLObjectType({
  name: 'DoseType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    code: { type: GraphQLString },
    status: { type: GraphQLString },
    scheduled_date: { type: GraphQLString },
    dispatch_date: { type: GraphQLString },
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
    location: {
      type: LocationType,
      async resolve(parent, args) {
        try {
          return await Location.query()
            .where('deleted_at', null)
            .findById(parent.location_id)
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

module.exports = DoseType
