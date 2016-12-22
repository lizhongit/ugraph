import * as util from '../util/index'

function Circle (graph, data) {
	this.data = data
	this.graph = graph
	this.init()
}

/**
 * Require definition
 */
Circle.prototype.init = function () {
	this.element = util.createElement('circle')
	util.setAttribute(this.element, 'cx', this.data.x)
	util.setAttribute(this.element, 'cy', this.data.y)
	util.setAttribute(this.element, 'r', this.data.r)
	util.setAttribute(this.element, 'fill', 'blue')
	this.graph._svgElement.appendChild(this.element)
}

export { Circle }
