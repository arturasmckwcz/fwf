const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = require('graphql')

const Product = require('../products/products.model')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({ id: { type: GraphQLID }, name: { type: GraphQLString } }),
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
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Product.query().insertAndFetch(args)
      },
    },
  },
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
