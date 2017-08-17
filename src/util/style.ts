
import ICellStyle from '../interface/ICellStyle'

const separateChar1 = ';'
const separateChar2 = '='

const parseStyle = (style: string): ICellStyle => {
  const o: ICellStyle = {
    fillColor: '',
  }

  style.split(separateChar1).forEach((item: string) => {
    const arr: string[] = item.split(separateChar2)
    if (arr.length === 2) {
      o[arr[0]] = arr[1]
    }
  })

  return check(o)
}

const check = (o: ICellStyle): ICellStyle => {
  o.fillColor = o.fillColor ? o.fillColor : 'green'
  return o
}

export { parseStyle }
