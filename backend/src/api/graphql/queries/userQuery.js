const { GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql')

const tablenames = require('../../../constants/tablenames')
// get permissions list from enums as an object
const permissions = require('../../../lib/arrayconvert')(
  require('../../../constants/enums').permissions
)
const checkPermission = require('../../../lib/checkPermission')

const { Person, User } = require('../../../model')
const LoginType = require('../types')

const bcrypt = require('bcrypt')
const redis = require('redis')
const JwtRedis = require('jwt-redis').default
const redisClient = redis.createClient()
const jwt = new JwtRedis(redisClient)

module.exports = {
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
        return { error }
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
        return { error }
      }
    },
  },
  //   user: {
  //     type: UserType,
  //     args: {
  //       id: { type: GraphQLID },
  //     },
  //     async resolve(parent, args, req) {
  //       if (
  //         !(await checkPermission(req.userId, tablenames.user, permissions.read))
  //       )
  //         throw new Error('Unauthorised!')
  //       try {
  //         return await User.query().where('deleted_at', null).findById(args.id)
  //       } catch (error) {
  //         return { error }
  //       }
  //     },
  //   },
  //   users: {
  //     type: new GraphQLList(UserType),
  //     async resolve(parent, args, req) {
  //       if (
  //         !(await checkPermission(req.userId, tablenames.user, permissions.read))
  //       )
  //         throw new Error('Unauthorised!')
  //       try {
  //         return User.query().where('deleted_at', null)
  //       } catch (error) {
  //         return { error }
  //       }
  //     },
  //   },
}
