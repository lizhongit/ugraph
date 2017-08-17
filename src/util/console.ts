/**
 * warn
 * @param msg
 */
const warn = (msg) => {
  console.warn(msg)
}

/**
 * log
 * @param msg
 */
const log = (msg) => {
  console.log(msg)
}

const error = (msg) => {
  console.error(msg)
  throw new Error(msg)
}

export { warn, log, error }
