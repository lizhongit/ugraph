const randomInt = (min = 0, max = 1000) => {
	return Number(min) + Math.floor(Math.random() * (Number(max) - Number(min)))
}

export { randomInt }
