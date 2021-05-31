const db = require('../src/db')
const checkPermission = require('../src/lib/checkPermission')
;(async () => {
  console.log(
    'checkPermission.test.js\t',
    await checkPermission(0, 'patient', 'read')
  )
  console.log(
    'usecheckPermission.test.js\t',
    await checkPermission(null, 'patient', 'read')
  )
  console.log(
    'ucheckPermission.test.js\t',
    await checkPermission(20, 'patient', 'read')
  )
  console.log(
    'checkPermission.test.js\t',
    await checkPermission(7, 'patient', 'read')
  )
})()
