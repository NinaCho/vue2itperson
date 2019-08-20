const firstLetterToUpperCase = str => {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

const getCurrentDate = () => {
  const date = new Date()
  const month = date.getMonth() + 1

  return `${date.getFullYear()}-${
    month > 10 ? month : '0' + month
  }-${date.getDate()}`
}

module.exports = { firstLetterToUpperCase, getCurrentDate }
