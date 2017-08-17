const randomInt = (min = 0, max = 1000) => {
  return Number(min) + Math.floor(Math.random() * (Number(max) - Number(min)))
}

const randomRgb = () => {
  return 'rgb(' + randomInt(0, 255) + ', ' + randomInt(0, 255) + ', '+ randomInt(0, 255) +')'
}

export { randomInt, randomRgb }
