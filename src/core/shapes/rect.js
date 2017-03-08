import * as util from '../util/index'

function Rect (graph, data) {
	this.data = data
	this.graph = graph
	this.init()
}

/**
 * Require definition
 */
Rect.prototype.init = function () {
	this.element = util.createElement('rect')
	util.setAttribute(this.element, 'x', this.data.x * this.graph.zoomFactor)
	util.setAttribute(this.element, 'y', this.data.y * this.graph.zoomFactor)
	util.setAttribute(this.element, 'width', this.data.width * this.graph.zoomFactor)
	util.setAttribute(this.element, 'height', this.data.height * this.graph.zoomFactor)
	util.setAttribute(this.element, 'fill', util.randomRgb())
	this.graph._svgElement.appendChild(this.element)
}

export { Rect }
