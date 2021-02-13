const random_4 = () => {
  return Math.floor(Math.random() * 10000).toString()
}

const getSourceCode = () => {
  return 'XNIA' + random_4()
}
const getPatientCode = () => {
  return 'XNIA' + random_4()
}
const getLysateCode = () => {
  return 'XNIA' + random_4()
}
const getPrescriptionCode = () => {
  return 'XNIA' + random_4()
}
const getProductionCode = () => {
  return 'XNIA' + random_4()
}

module.exports = {
  getSourceCode,
  getPatientCode,
  getLysateCode,
  getPrescriptionCode,
  getProductionCode,
}
