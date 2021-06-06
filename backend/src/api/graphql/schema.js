const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} = require('graphql')

const tablenames = require('../../constants/tablenames')
// get permissions list from enums as an object
const permissions = require('../../lib/arrayconvert')(
  require('../../constants/enums').permissions
)

const checkPermission = require('../../lib/checkPermission')

const {
  Product,
  Person,
  Clinic,
  Doctor,
  Lysate,
  Patient,
  Prescription,
  Source,
  Production,
  Dose,
  Location,
  Filesystem,
  Document,
  Parameter,
  Science,
  Data,
  User,
  Role,
  Member,
  Right,
  Permission,
} = require('../model')

// TODO: refactor schema.js file to a file structure. do i need objection at all? maybe i can get away with knex only. if i come up to decision to refactor schema.js to apolo it would be a chance to get rid of objection
// TODO: write auth check to all resolvers

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

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLID },
    first: { type: GraphQLString },
    last: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    address: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

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

const DoctorType = new GraphQLObjectType({
  name: 'DoctorType',
  fields: () => ({
    id: { type: GraphQLID },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        try {
          return await Person.query()
            .where('deleted_at', null)
            .findById(parent.person_id)
        } catch (error) {
          return { error }
        }
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        try {
          return await Clinic.query()
            .where('deleted_at', null)
            .findById([parent.clinic_id, tablenames.clinic])
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

const LysateType = new GraphQLObjectType({
  name: 'LysateType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        try {
          return await Person.query()
            .where('deleted_at', null)
            .findById(parent.person_id)
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

const PatientType = new GraphQLObjectType({
  name: 'PatientType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        try {
          return await Person.query()
            .where('deleted_at', null)
            .findById(parent.person_id)
        } catch (error) {
          return { error }
        }
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        try {
          return await Clinic.query()
            .where('deleted_at', null)
            .findById([parent.clinic_id, tablenames.clinic])
        } catch (error) {
          return { error }
        }
      },
    },
    code: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
  id: { type: GraphQLID },
})

const PrescriptionType = new GraphQLObjectType({
  name: 'PrescriptionType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    code: { type: GraphQLString },
    blood_source: { type: GraphQLString },
    doctor: {
      type: DoctorType,
      async resolve(parent, args) {
        try {
          return await Doctor.query()
            .where('deleted_at', null)
            .findById(parent.doctor_id)
        } catch (error) {
          return { error }
        }
      },
    },
    patient: {
      type: PatientType,
      async resolve(parent, args) {
        try {
          return await Patient.query()
            .where('deleted_at', null)
            .findById([parent.patient_id, tablenames.patient])
        } catch (error) {
          return { error }
        }
      },
    },
    lysate: {
      type: LysateType,
      async resolve(parent, args) {
        try {
          return await Lysate.query()
            .where('deleted_at', null)
            .findById([parent.lysate_id, tablenames.lysate])
        } catch (error) {
          return { error }
        }
      },
    },
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
  }),
})

const SourceType = new GraphQLObjectType({
  name: 'SourceType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    code: { type: GraphQLString },
    type: { type: GraphQLString },
    draw_date: { type: GraphQLString },
    arrive_date: { type: GraphQLString },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        try {
          return await Person.query()
            .where('deleted_at', null)
            .findById(parent.person_id)
        } catch (error) {
          return { error }
        }
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        try {
          return await Clinic.query()
            .where('deleted_at', null)
            .findById([parent.clinic_id, tablenames.clinic])
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

const ProductionType = new GraphQLObjectType({
  name: 'ProductionType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    code: { type: GraphQLString },
    start_date: { type: GraphQLString },
    finish_date: { type: GraphQLString },
    expire_date: { type: GraphQLString },
    certified: { type: GraphQLBoolean },
    prescription: {
      type: PrescriptionType,
      async resolve(parent, args) {
        try {
          return await Prescription.query()
            .where('deleted_at', null)
            .findById([parent.prescription_id, tablenames.prescription])
        } catch (error) {
          return { error }
        }
      },
    },
    source: {
      type: SourceType,
      async resolve(parent, args) {
        try {
          return await Source.query()
            .where('deleted_at', null)
            .findById([parent.source_id, tablenames.source])
        } catch (error) {
          return { error }
        }
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        try {
          return await Clinic.query()
            .where('deleted_at', null)
            .findById([parent.clinic_id, tablenames.clinic])
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    id: { type: GraphQLID },
    container: { type: GraphQLString },
    handle: { type: GraphQLString },
    shelf: { type: GraphQLString },
    line: { type: GraphQLString },
    place: { type: GraphQLString },
    occupied: { type: GraphQLBoolean },
  }),
})

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

const ParameterType = new GraphQLObjectType({
  name: 'ParemeterType',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    description: { type: GraphQLString },
    mesurement: { type: GraphQLString },
  }),
})

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

const FilesystemType = new GraphQLObjectType({
  name: 'FilesystemType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    body: { type: GraphQLString },
  }),
})

const DocumentType = new GraphQLObjectType({
  name: 'DocumentType',
  fields: () => ({
    id: { type: GraphQLID },
    file: {
      type: FilesystemType,
      async resolve(parent, args) {
        try {
          return await Filesystem.query()
            .where('deleted_at', null)
            .findById(parent.filesystem_id)
        } catch (error) {
          return { error }
        }
      },
    },
    table_id: { type: GraphQLString },
    patient: {
      type: PatientType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.patient)
          try {
            return await Patient.query()
              .where('deleted_at', null)
              .findById([parent.patient_id, tablenames.patient])
          } catch (error) {
            return { error }
          }
      },
    },
    source: {
      type: GraphQLID,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.source)
          try {
            return await Source.query()
              .where('deleted_at', null)
              .findById([parent.source_id, tablenames.source])
          } catch (error) {
            return { error }
          }
      },
    },
    prescription: {
      type: PrescriptionType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.prescription)
          try {
            return await Prescription.query()
              .where('deleted_at', null)
              .findById([parent.prescription_id, tablenames.prescription])
          } catch (error) {
            return { error }
          }
      },
    },
    production: {
      type: ProductionType,
      async resolver(parent, args) {
        if (parent.table_id === tablenames.production)
          try {
            return await Production.query()
              .where('deleted_at', null)
              .findById([parent.production_id, tablenames.production])
          } catch (error) {
            return { error }
          }
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.clinic)
          try {
            return await Clinic.query()
              .where('deleted_at', null)
              .findById([parent.clinic_id, tablenames.clinic])
          } catch (error) {
            return { error }
          }
      },
    },
    lysate: {
      type: LysateType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.lysate)
          try {
            return await Lysate.query()
              .where('deleted_at', null)
              .findById([parent.lysate_id, tablenames.lysate])
          } catch (error) {
            return { error }
          }
      },
    },
    product: {
      type: ProductType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.product)
          try {
            return await Product.query()
              .where('deleted_at', null)
              .findById([parent.product_id, tablenames.product])
          } catch (error) {
            return { error }
          }
      },
    },
    dose: {
      type: DoseType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.dose)
          try {
            return await Dose.query()
              .where('deleted_at', null)
              .findById([parent.dose_id, tablenames.dose])
          } catch (error) {
            return { error }
          }
      },
    },
  }),
})

const DocumentLookupType = new GraphQLObjectType({
  name: 'DocumentOwnerType',
  fields: () => ({
    filesystem_id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    owner: { type: GraphQLID },
  }),
})

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        try {
          return await Person.query()
            .where('deleted_at', null)
            .findById(parent.person_id)
        } catch (error) {
          return { error }
        }
      },
    },
    roles: {
      type: new GraphQLList(RoleType),
      async resolve(parent, args) {
        const memberships = await Member.query()
          .where('deleted_at', null)
          .where('user_id', parent.id)
        const roles = []
        for (let membership of memberships)
          roles.push(
            await Role.query()
              .where('deleted_at', null)
              .findById(membership.role_id)
          )
        return roles
      },
    },
  }),
})

const RoleType = new GraphQLObjectType({
  name: 'RoleType',
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    permissions: {
      type: new GraphQLList(PermissionType),
      async resolve(parent, args) {
        const rights = await Right.query()
          .where('deleted_at', null)
          .where('role_id', parent.id)
        const permissions = []
        for (let right of rights)
          permissions.push(
            await Permission.query()
              .where('deleted_at', null)
              .findById(right.permission_id)
          )
        return permissions
      },
    },
  }),
})

const PermissionType = new GraphQLObjectType({
  name: 'PermissionType',
  fields: () => ({
    id: { type: GraphQLID },
    relation: { type: GraphQLString },
    permission: { type: GraphQLString },
  }),
})

const LoginType = new GraphQLObjectType({
  name: 'LoginType',
  fields: () => ({
    token: { type: GraphQLString },
  }),
})

/*
============================================================================================================
*/
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const redis = require('redis')
const JwtRedis = require('jwt-redis').default
const redisClient = redis.createClient()
const jwt = new JwtRedis(redisClient)

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // TODO: write logout and refresh of jwt
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

        if (!username || !password) throw new Error('Invalid credentials 1.')

        try {
          user = await User.query()
            .where('deleted_at', null)
            .where('username', username)
            .first()
        } catch (error) {
          return { error }
        }
        if (!user) throw new Error('Invalid credentials 2.')

        const logedIn = await bcrypt.compare(password, user.password)
        if (!logedIn) throw new Error('Invalid credentials login 3.')

        try {
          return {
            token: await jwt.sign(
              { userId: user.id },
              process.env.API_ACCESS_TOKEN,
              { expiresIn: '1d' }
            ),
          }
        } catch (error) {
          return { error }
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
          return { error }
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
          return { error }
        }
      },
    },
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (!checkPermission(req.userId, tablenames.person, permissions.read))
          throw new Error('Unauthorised!')
        try {
          return await Person.query()
            .where('deleted_at', null)
            .findById(args.id)
        } catch (error) {
          return { error }
        }
      },
    },
    persons: {
      type: new GraphQLList(PersonType),
      args: {
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        gender: { type: GraphQLString },
        older: { type: GraphQLInt },
        younger: { type: GraphQLInt },
      },
      async resolve(parent, args, req) {
        if (!checkPermission(req.userId, tablenames.person, permissions.read))
          throw new Error('Unauthorised!')
        try {
          return await Person.query()
            .skipUndefined()
            .where('first', 'ilike', `%${args.first}%`)
            .andWhere('last', 'ilike', `%${args.last}%`) // TODO: last must be presented, doesn't work if not
            .andWhere('gender', args.gender)
            .andWhere('age', '>', args.older)
            .andWhere('age', '<', args.younger)
            .andWhere('deleted_at', null)
        } catch (error) {
          return { error }
        }
      },
    },
    patient: {
      type: PatientType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args, req) {
        if (!checkPermission(req.userId, tablenames.patient, permissions.read))
          throw new Error('Unauthorised!')
        try {
          return await Patient.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.patient])
        } catch (error) {
          return { error }
        }
      },
    },
    patients: {
      type: new GraphQLList(PatientType),
      async resolve(parent, args, req) {
        if (!checkPermission(req.userId, tablenames.patient, permissions.read))
          throw new Error('Unauthorised!')
        try {
          return await Patient.query().where('deleted_at', null)
        } catch (error) {
          return { error }
        }
      },
    },
    clinic: {
      type: ClinicType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await Clinic.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.clinic])
        } catch (error) {
          return { error }
        }
      },
    },
    clinics: {
      type: new GraphQLList(ClinicType),
      async resolve(parent, args) {
        try {
          return await Clinic.query().where('deleted_at', null)
        } catch (error) {
          return { error }
        }
      },
    },
    doctor: {
      type: DoctorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await Doctor.query()
            .where('deleted_at', null)
            .findById(args.id)
        } catch (error) {
          return { error }
        }
      },
    },
    doctors: {
      type: new GraphQLList(DoctorType),
      async resolve(parent, args) {
        try {
          return await Doctor.query().where('deleted_at', null)
        } catch (error) {
          return { error }
        }
      },
    },
    lysate: {
      type: LysateType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await Lysate.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.lysate])
        } catch (error) {
          return { error }
        }
      },
    },
    lysates: {
      type: new GraphQLList(LysateType),
      async resolve(parent, args) {
        try {
          return await Lysate.query().where('deleted_at', null)
        } catch (error) {
          return { error }
        }
      },
    },
    location: {
      type: LocationType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await Location.query()
            .where('deleted_at', null)
            .findById([args.id, tablenames.location])
        } catch (error) {
          return { error }
        }
      },
    },
    locations: {
      type: new GraphQLList(LocationType),
      args: {
        container: { type: GraphQLString },
        occupied: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        try {
          return await Location.query().where(args).where('deleted_at', null)
        } catch (error) {
          return { error }
        }
      },
    },
    file: {
      type: FilesystemType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await Filesystem.query()
            .where('deleted_at', null)
            .findById(args.id)
        } catch (error) {
          return { error }
        }
      },
    },
    files: {
      type: new GraphQLList(FilesystemType),
      async resolve(parent, args) {
        try {
          return await Filesystem.query().where('deleted_at', null)
        } catch (error) {
          return { error }
        }
      },
    },
    documents: {
      type: new GraphQLList(DocumentLookupType),
      args: {
        filesystem_id: { type: GraphQLID },
        table_id: { type: GraphQLString },
        owner_id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        try {
          return await Document.query().where(args).where('deleted_at', null)
        } catch (error) {
          return { error }
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
          return { error }
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
          return { error }
        }
      },
    },
  },
})

const Mutation = new GraphQLObjectType({
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
      async resolve(parent, args) {
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
      async resolve(parent, args) {
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
      async resolve(parent, args) {
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
      async resolve(parent, args) {
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
      async resolve(parent, args) {
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

// module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
module.exports = { RootQuery, Mutation }
