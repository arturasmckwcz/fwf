const Member = require('../api/members/members.model')
const Role = require('../api/roles/roles.model')
const Right = require('../api/rights/rights.model')
const Permission = require('../api/permissions/permissions.model')

module.exports = async (userId, tablename, permission) => {
  // has the user got the right on tablename to do permission?

  const members = await Member.query()
    .where('deleted_at', null)
    .andWhere('user_id', userId)

  if (members == []) return false

  const roles = []
  for (let member of members)
    roles.push(
      await Role.query().where('deleted_at', null).findById(member.role_id)
    )

  if (roles.length == 0) return false

  let rights = []
  for (let role of roles) {
    rights.push(
      await Right.query().where('deleted_at', null).where('role_id', role.id)
    )
  }
  rights = rights.reduce((acc, val) => acc.concat(val), []) // flatten rights array
  if (rights.length == 0) return false

  const permissionObj = await Permission.query()
    .where('deleted_at', null)
    .where('relation', tablename)
    .where('permission', permission)
    .first()

  return (
    rights.filter(right => right.permission_id == permissionObj.id).length > 0 // at least one permission is found
  )
}
