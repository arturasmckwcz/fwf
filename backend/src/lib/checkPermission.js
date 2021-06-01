const Member = require('../api/members/members.model')
const Role = require('../api/roles/roles.model')
const Right = require('../api/rights/rights.model')
const Permission = require('../api/permissions/permissions.model')

module.exports = async (userId, tablename, permission) => {
  // has the user got the right on tablename to do permission?
  // TODO: put all db qureies to try/catch
  console.log('checkPermission:params: ', userId, tablename, permission)

  if (!userId) return false

  const members = await Member.query()
    .where('deleted_at', null)
    .andWhere('user_id', userId)

  console.log('checkPermission:members.length: ', members.length)
  if (members.length === 0) return false

  const roles = []
  for (let member of members)
    roles.push(
      await Role.query().where('deleted_at', null).findById(member.role_id)
    )

  console.log('checkPermission:roles.length: ', roles.length)
  if (roles.length === 0) return false

  let rights = []
  for (let role of roles) {
    rights.push(
      await Right.query().where('deleted_at', null).where('role_id', role.id)
    )
  }
  console.log('checkPermission:rights.length: ', rights.length)
  if (rights.length === 0) return false

  rights = rights.reduce((acc, val) => acc.concat(val), []) // flatten rights array
  // console.log('checkPermission:rightsj: ', rights)

  const permissionObj = await Permission.query()
    .where('deleted_at', null)
    .where('relation', tablename)
    .where('permission', permission)
    .first()

  return (
    // at least one permission is found
    rights.some(right => right.permission_id === permissionObj.id)
    // rights.filter(right => right.permission_id == permissionObj.id).length > 0
  )
}
