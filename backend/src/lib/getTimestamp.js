module.exports = issue_date => {
  let date
  if (issue_date)
    date = new Date(
      issue_date.substring(0, 4),
      issue_date.substring(5, 7),
      issue_date.substring(8, 10)
    )
  else date = new Date()
  return date.toISOString().slice(0, -1) + '+00'
}
