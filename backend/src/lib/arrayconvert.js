module.exports = arr => {
  const result = {}
  arr.map(value => (result[value] = value))
  return result
}
