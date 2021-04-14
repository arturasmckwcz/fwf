const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} = require('graphql')

const tablenames = require('../../../db/constants/tablenames')

const Product = require('../products/products.model')
const Person = require('../persons/persons.model')
const Clinic = require('../clinics/clinics.model')
const Doctor = require('../doctors/doctors.model')
const Lysate = require('../lysates/lysates.model')
const Patient = require('../patients/patients.model')
const Prescription = require('../prescriptions/prescriptions.model')
const Source = require('../source/source.model')
const Production = require('../productions/productions.model')
const Dose = require('../doses/doses.model')
const Location = require('../locations/locations.model')
const Filesystem = require('../filesystem/filesystem.model')
const Document = require('../documents/documents.model')
const Parameter = require('../parameters/parameters.model')
const Science = require('../science/science.model')
const Data = require('../data/data.model')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
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
            .findById(parent.clinic_id)
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
      async resolver(parent, args) {
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
      async resolver(parent, args) {
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
      async resolver(parent, args) {
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
      async resolver(parent, args) {
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
      async resolver(parent, args) {
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
      async resolver(parent, args) {
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
      async resolver(parent, args) {
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
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
      async resolve(parent, args) {
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
      async resolve(parent, args) {
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
      async resolve(parent, args) {
        try {
          return await Person.query()
            .skipUndefined()
            .where('first', 'ilike', `%${args.first}%`)
            .andWhere('last', 'ilike', `%${args.last}%`)
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
      async resolve(parent, args) {
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
      async resolve(parent, args) {
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
            .findById([args.id, tablenames.lysate])
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

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
