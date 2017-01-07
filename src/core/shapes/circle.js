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
  let size = 0
  this.element = util.createElement('ellipse')

  size = this.data.width ? this.data.width : this.data.height
  util.setAttribute(this.element, 'cx', this.data.x + size / 2)
  util.setAttribute(this.element, 'rx', size / 2)

  size = this.data.height ? this.data.height : this.data.width
  util.setAttribute(this.element, 'cy', this.data.y + size / 2)
  util.setAttribute(this.element, 'ry', size / 2)

  util.setAttribute(this.element, 'fill', util.randomRgb())
  this.graph._svgElement.appendChild(this.element)
}

export { Circle }
