const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

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
  PatientSearchByNameType,
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

module.exports = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    logout: {
      type: GraphQLBoolean,
      async resolve(parent, args, { tokenJti }) {
        try {
          return await jwt.destroy(tokenJti)
        } catch (error) {
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
        }
      },
    },
    personsByName: {
      type: new GraphQLList(PersonSearchType),
      args: {
        name: { type: GraphQLString },
        is_assigned: { type: GraphQLBoolean },
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
          console.log('mutation.js:personsByName:args: ', args)
          const persons = await Person.query()
            .where('first', 'ilike', `%${args.name}%`)
            .orWhere('last', 'ilike', `%${args.name}%`)
            .andWhere('deleted_at', null)
            .returning(['id', 'first', 'last', 'gender', 'age'])
          if (args.is_assigned)
            return persons.map(person => ({
              ...person,
              name: `${person.first} ${person.last}`,
              first: undefined,
              last: undefined,
            }))
          const result = await Promise.all(
            persons.map(async person => {
              const { id } = person
              const patient = await Patient.query()
                .where('deleted_at', null)
                .andWhere('person_id', id)
              const doctor = await Doctor.query()
                .where('deleted_at', null)
                .andWhere('person_id', id)
              const user = await User.query()
                .where('deleted_at', null)
                .andWhere('person_id', id)
              return {
                ...person,
                name: `${person.first} ${person.last}`,
                first: undefined,
                last: undefined,
                isnot_assigned:
                  patient.length === 0 &&
                  doctor.length === 0 &&
                  user.length === 0,
              }
            })
          )
          return result.filter(person => person.isnot_assigned)
        } catch (error) {
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
        }
      },
    },
    patientsByName: {
      type: new GraphQLList(PatientType /*PatientSearchByNameType*/),
      args: {
        name: { type: GraphQLString },
        date_from: { type: GraphQLString /*GraphQLDateTime*/ },
      },
      async resolve(parent, args, req) {
        if (
          !(await checkPermission(
            req.userId,
            tablenames.patient,
            permissions.read
          ))
        )
          throw new Error('Unauthorised!')
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
            .where('deleted_at', null)
            .where('first', 'ilike', `%${args.name}%`)
            .orWhere('last', 'ilike', `%${args.name}%`)
          return await Patient.query()
            .where('deleted_at', null)
            .andWhere(
              'created_at',
              '>',
              args.date_from ? args.date_from : '2021-01-01T00:00:00.000000+00'
            )
            .whereIn(
              'person_id',
              persons.length ? persons.map(person => person.id) : []
            )
        } catch (error) {
          console.error(error)
          throw error
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
          console.error(error)
          throw error
        }
      },
    },
    clinics: {
      type: new GraphQLList(ClinicType),
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
          return await Clinic.query().where('deleted_at', null)
        } catch (error) {
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
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
          console.error(error)
          throw error
        }
      },
    },
  },
})
