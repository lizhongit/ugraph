import * as util from '../util/index'

function Rect (graph, data) {
  this.data = data
  this.graph = graph
  this.style = util.parseStyle(this.data.style)
  this.init()
}

/**
 * Require definition
 */
Rect.prototype.init = function () {
  this.element = util.createElement('rect')

  let center = this.graph.getCenter()
  let cx = this.data.x + this.data.width / 2
  let cy = this.data.y + this.data.height / 2

  let newX = (center.x - cx) * this.graph.zoomFactor + center.x
  let newY = (center.y - cy) * this.graph.zoomFactor + center.y

  util.setAttribute(this.element, 'x', newX)
  util.setAttribute(this.element, 'y', newY)
  util.setAttribute(this.element, 'width', this.data.width * this.graph.zoomFactor)
  util.setAttribute(this.element, 'height', this.data.height * this.graph.zoomFactor)
  util.setAttribute(this.element, 'fill', this.style.fillColor)
  this.graph._svgElement.appendChild(this.element)
}

export { Rect }
