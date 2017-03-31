const prefixFillNumber = (number) => {
  return number >= 10 ? number : '0' + String(number)
}

const getDateFormat = () => {
  let d = new Date()
  let f = prefixFillNumber
  return [
    d.getFullYear(),
    f(d.getMonth() + 1),
    f(d.getDate()),
    f(d.getHours()),
    f(d.getMinutes()),
    f(d.getSeconds())
  ].join('_')
}
export { getDateFormat }
