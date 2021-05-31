module.exports = arr => {
  const result = []
  arr.map(value => result.push({ [value]: value }))
  return result
}
