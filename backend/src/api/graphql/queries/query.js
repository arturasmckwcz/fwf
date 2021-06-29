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

const {
  Product,
  Person,
  Clinic,
  Doctor,
  Lysate,
  Patient,
  Location,
  Filesystem,
  Document,
  User,
} = require('../../../model')

const {
  ProductType,
  PersonType,
  PersonSearchType,
  ClinicType,
  DoctorType,
  DocumentLookupType,
  LysateType,
  LocationType,
  LoginType,
  FilesystemType,
  PatientType,
  UserType,
} = require('../types')

const bcrypt = require('bcrypt')
const redis = require('redis')
const JwtRedis = require('jwt-redis').default
const redisClient = redis.createClient()
const jwt = new JwtRedis(redisClient)

// const { login, logout } = require('./userQuery')

module.exports = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    logout: {
      type: GraphQLBoolean,
      async resolve(parent, args, { tokenJti }) {
        try {
          return await jwt.destroy(tokenJti)
        } catch (error) {
          return error
        }
      },
    },
    login: {
      type: LoginType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, { username, password }) {
        let user
        if (!username || !password) throw new Error('Invalid credentials.')
        try {
          user = await User.query()
            .where('deleted_at', null)
            .where('username', username)
            .first()
        } catch (error) {
          return error
        }
        if (!user) throw new Error('Invalid credentials.')
        const logedIn = await bcrypt.compare(password, user.password)
        if (!logedIn) throw new Error('Invalid credentials.')
        try {
          const person = await Person.query()
            .where('deleted_at', null)
            .findById(user.person_id)
          return {
            token: await jwt.sign(
              {
                userId: user.id,
              },
              process.env.API_ACCESS_TOKEN,
              { expiresIn: '1d' }
            ),
            name: person ? `${person.first} ${person.last}` : undefined,
          }
        } catch (error) {
          return error
        }
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.product,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Product.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.product])
        } catch (error) {
          return error
        }
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.product,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Product.query().where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    personsByName: {
      type: new GraphQLList(PersonSearchType),
      args: {
        name: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.person,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          const persons = await Person.query()
            .where('first', 'ilike', `%${args.name}%`)
            .orWhere('last', 'ilike', `%${args.name}%`)
            .andWhere('deleted_at', null)
            .returning(['id', 'first', 'last', 'gender', 'age'])
          return persons.map(person => ({
            ...person,
            name: `${person.first} ${person.last}`,
            first: undefined,
            last: undefined,
          }))
        } catch (error) {
          return error
        }
      },
    },
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.person,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Person.query()
            .where('deleted_at', null)
            .findById(args.id)
        } catch (error) {
          return error
        }
      },
    },
    persons: {
      type: new GraphQLList(PersonType),
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.person,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Person.query().where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    patient: {
      type: PatientType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.patient,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Patient.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.patient])
        } catch (error) {
          return error
        }
      },
    },
    patients: {
      type: new GraphQLList(PatientType),
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.patient,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Patient.query().where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    clinic: {
      type: ClinicType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.clinic,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Clinic.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.clinic])
        } catch (error) {
          return error
        }
      },
    },
    clinics: {
      type: new GraphQLList(ClinicType),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.clinic,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Clinic.query()
            .where('name', 'ilike', `%${args.name}%`)
            .where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    doctor: {
      type: DoctorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.doctor,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Doctor.query()
            .where('deleted_at', null)
            .findById(args.id)
        } catch (error) {
          return error
        }
      },
    },
    doctors: {
      type: new GraphQLList(DoctorType),
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.doctor,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Doctor.query().where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    lysate: {
      type: LysateType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.lysate,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Lysate.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.lysate])
        } catch (error) {
          return error
        }
      },
    },
    lysates: {
      type: new GraphQLList(LysateType),
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.lysate,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Lysate.query().where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    location: {
      type: LocationType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.location,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Location.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.location])
        } catch (error) {
          return error
        }
      },
    },
    locations: {
      type: new GraphQLList(LocationType),
      args: {
        container: { type: GraphQLString },
        occupied: { type: GraphQLBoolean },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.location,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Location.query().where(args).where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    file: {
      type: FilesystemType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.filesystem,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Filesystem.query()
            .where('deleted_at', null)
            .findById(args.id)
        } catch (error) {
          return error
        }
      },
    },
    files: {
      type: new GraphQLList(FilesystemType),
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.filesystem,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await Filesystem.query().where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    documents: {
      type: new GraphQLList(DocumentLookupType),
      args: {
        table_id: { type: GraphQLString },
        owner_id: { type: GraphQLID },
      },
      async resolve(parent, { owner_id, table_id }, { userId }) {
        if (
          !(await checkPermission(
            userId,
            tablenames.document,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        if (!(await checkPermission(userId, table_id, permissions.read)))
          throw new Error('Unauthorised!')
        try {
          return await Document.query()
            .where({ table_id, [`${table_id}_id`]: owner_id })
            .where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.user,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return await User.query().where('deleted_at', null).findById(args.id)
        } catch (error) {
          return error
        }
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.user,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
        try {
          return User.query().where('deleted_at', null)
        } catch (error) {
          return error
        }
      },
    },
  },
})
