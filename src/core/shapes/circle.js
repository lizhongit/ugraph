import * as util from '../util/index'

function Circle (graph, data) {
  this.data = data
  this.graph = graph
  this.style = util.parseStyle(this.data.style)
  this.init()
}

/**
 * Require definition
 */
Circle.prototype.init = function () {
  let size
  this.element = util.createElement('ellipse')

  size = this.data.width ? this.data.width : this.data.height
  size *= this.graph.zoomFactor
  util.setAttribute(this.element, 'cx', this.data.x * this.graph.zoomFactor + size / 2)
  util.setAttribute(this.element, 'rx', size / 2)

  size = this.data.height ? this.data.height : this.data.width
  size *= this.graph.zoomFactor
  util.setAttribute(this.element, 'cy', this.data.y * this.graph.zoomFactor + size / 2)
  util.setAttribute(this.element, 'ry', size / 2)

  util.setAttribute(this.element, 'fill', this.style.fillColor)
  this.graph._svgElement.appendChild(this.element)
}

export { Circle }
