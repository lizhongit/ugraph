
let separateChar1 = ';'
let separateChar2 = '='

const parseStyle = (style) => {
  let o = {}

  if (typeof style === 'string') {
    style.split(separateChar1).forEach((item) => {
      let arr = item.split(separateChar2)
      if (arr.length === 2) {
        o[arr[0]] = arr[1]
      }
    })
  }

  return check(o)
}

const check = (o) => {
  o.fillColor = o.fillColor ? o.fillColor : 'green'
  return o
}


export { parseStyle }
