const { GraphQLObjectType, GraphQLID } = require('graphql')

const tablenames = require('../../../constants/tablenames')

const { Product, Parameter } = require('../../model')

const ProductType = require('./ProductType')
const ParameterType = require('./ParameterType')

const ScienceType = new GraphQLObjectType({
  name: 'ScienceType',
  fields: () => ({
    id: { type: GraphQLID },
    product: {
      type: ProductType,
      async resolve(parent, args) {
        try {
          return await Product.query()
            .where('deleted_at', null)
            .findById([parent.product_id, tablenames.product])
        } catch (error) {
          return { error }
        }
      },
    },
    parameter: {
      type: ParameterType,
      async resolve(parent, args) {
        try {
          return await Parameter.query()
            .where('deleted_at', null)
            .findById(parent.parameter_id)
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

module.exports = ScienceType
