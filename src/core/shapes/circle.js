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
  let size, cx, cy, newX, newY
  this.element = util.createElement('ellipse')

  let scale = this.graph.getZoomScale()
  let center = this.graph.getCenter()

  size = this.data.width ? this.data.width : this.data.height

  cx = (this.data.x + this.data.width / 2) + this.graph.offset.x

  newX = center.x - (center.x - cx) * scale

  util.setAttribute(this.element, 'cx', newX)
  util.setAttribute(this.element, 'rx', size * scale / 2)

  size = this.data.height ? this.data.height : this.data.width

  cy = (this.data.y + this.data.height / 2) + this.graph.offset.y
  newY = center.y - (center.y - cy) * scale

  util.setAttribute(this.element, 'cy', newY)
  util.setAttribute(this.element, 'ry', size * scale / 2)

  util.setAttribute(this.element, 'fill', this.style.fillColor)
  this.graph._svgElement.appendChild(this.element)
}

export { Circle }
