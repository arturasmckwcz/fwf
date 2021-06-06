const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql')

const { Parameter, Science } = require('../../model')

const ParameterType = require('./ParameterType')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    params: {
      type: new GraphQLList(ParameterType),
      async resolve(parent, args) {
        try {
          const science = await Science.query()
            .where('deleted_at', null)
            .where('product_id', parent.id)
          return await science.map(
            async item =>
              await Parameter.query()
                .where('deleted_at', null)
                .findById(item.parameter_id)
          )
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

module.exports = ProductType
