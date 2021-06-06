const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const ClinicType = new GraphQLObjectType({
  name: 'Clinic',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    web: { type: GraphQLString },
  }),
})
module.exports = ClinicType
