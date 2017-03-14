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

  let scale = this.graph.getZoomScale()
  let center = this.graph.getCenter()

  // let cx = this.data.x - this.graph.offset.x + this.data.width / 2
  // let cy = this.data.y - this.graph.offset.y + this.data.height / 2

  let cx = (this.data.x + this.data.width / 2) - this.graph.offset.x
  let cy = (this.data.y + this.data.height / 2) - this.graph.offset.y

  let newX = (center.x - cx) * scale + center.x
  let newY = (center.y - cy) * scale + center.y

  // let newX = (center.x - cx) * scale + center.x
  // let newY = (center.y - cy) * scale + center.y

  util.setAttribute(this.element, 'x', newX)
  util.setAttribute(this.element, 'y', newY)
  util.setAttribute(this.element, 'width', this.data.width * scale)
  util.setAttribute(this.element, 'height', this.data.height * scale)
  util.setAttribute(this.element, 'fill', this.style.fillColor)
  this.graph._svgElement.appendChild(this.element)
}

export { Rect }
