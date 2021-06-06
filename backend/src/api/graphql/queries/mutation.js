const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} = require('graphql')

const tablenames = require('../../../constants/tablenames')
// get permissions list from enums as an object
const permissions = require('../../../lib/arrayconvert')(
  require('../../../constants/enums').permissions
)

const checkPermission = require('../../../lib/checkPermission')

const { Product, Person, Filesystem, Document } = require('../../model')

const {
  ProductType,
  PersonType,
  FilesystemType,
  DocumentType,
} = require('../types')

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        gender: { type: GraphQLString },
        age: { type: GraphQLInt },
        address: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (!checkPermission(req.userId, tablenames.person, permissions.create))
          throw new Error('Unauthorised!')
        try {
          return await Person.query().insertAndFetch(args)
        } catch (error) {
          return { error }
        }
      },
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !checkPermission(req.userId, tablenames.product, permissions.create)
        )
          throw new Error('Unauthorised!')
        try {
          return await Product.query().insertAndFetch(args)
        } catch (error) {
          return { error }
        }
      },
    },
    addFile: {
      type: FilesystemType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        body: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !checkPermission(
            req.userId,
            tablenames.filesystem,
            permissions.create
          )
        )
          throw new Error('Unauthorised!')
        try {
          return await Filesystem.query().insertAndFetch(args)
        } catch (error) {
          return { error }
        }
      },
    },
    addDocument: {
      type: DocumentType,
      args: {
        filesystem_id: { type: GraphQLID },
        owner_id: { type: GraphQLID },
        table_id: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !checkPermission(req.userId, tablenames.document, permissions.create)
        )
          throw new Error('Unauthorised!')
        let { filesystem_id, table_id, owner_id } = args
        filesystem_id = parseInt(filesystem_id)
        owner_id = parseInt(owner_id)
        try {
          return await Document.query().insertAndFetch({
            filesystem_id,
            table_id,
            [`${table_id}_id`]: owner_id,
          })
        } catch (error) {
          return { error }
        }
      },
    },
    addFileAndDocument: {
      type: DocumentType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        body: { type: GraphQLString },
        owner_id: { type: GraphQLID },
        table_id: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !checkPermission(
            req.userId,
            tablenames.filesystem,
            permissions.create
          )
        )
          throw new Error('Unauthorised!')
        if (
          !checkPermission(req.userId, tablenames.document, permissions.create)
        )
          throw new Error('Unauthorised!')
        let { table_id, owner_id, name, type, body } = args
        try {
          const file = await Filesystem.query().insertAndFetch({
            name,
            type,
            body,
          })
          owner_id = parseInt(owner_id)
          return await Document.query().insertAndFetch({
            filesystem_id: file.id,
            table_id,
            [`${table_id}_id`]: owner_id,
          })
        } catch (error) {
          return { error }
        }
      },
    },
  },
})