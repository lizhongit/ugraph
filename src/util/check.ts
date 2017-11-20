
const isString = (something: any): boolean => {
  return typeof something === 'string'
}

const isBlob = (something: any): boolean => {
  return something instanceof Blob
}

export { isString, isBlob }
