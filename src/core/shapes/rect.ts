import * as util from '../util/index'

function Rect (graph, data) {
  this.data = data
  this.graph = graph
  this.style = util.parseStyle(this.data.style)
  // this.init()
}

/**
 * Require definition
 */
Rect.prototype.init = function () {
  this.element = util.createElement('rect')

  let scale = this.graph.getZoomScale()
  let center = this.graph.getCenter()

  let cx = (this.data.x + this.data.width / 2) + this.graph.offset.x
  let cy = (this.data.y + this.data.height / 2) + this.graph.offset.y

  let newX = center.x - (center.x - cx) * scale
  let newY = center.y - (center.y - cy) * scale

  util.setAttribute(this.element, 'x', newX + '')
  util.setAttribute(this.element, 'y', newY + '')
  util.setAttribute(this.element, 'width', this.data.width * scale + '')
  util.setAttribute(this.element, 'height', this.data.height * scale + '')
  util.setAttribute(this.element, 'fill', this.style.fillColor)
  this.graph._svgElement.appendChild(this.element)
}

Rect.prototype.getHtml = function () {
  let html = []

  let scale = this.graph.getZoomScale()
  let center = this.graph.getCenter()

  let cx = (this.data.x + this.data.width / 2) + this.graph.offset.x
  let cy = (this.data.y + this.data.height / 2) + this.graph.offset.y

  let newX = center.x - (center.x - cx) * scale
  let newY = center.y - (center.y - cy) * scale
  html.push('<rect')
  html.push('x=' + newX)
  html.push('y=' + newY)
  html.push('width=' + this.data.width * scale)
  html.push('height=' + this.data.width * scale)
  html.push('fill="' + this.style.fillColor + '"')
  html.push('_id="' + this.data.id + '"')
  html.push('></rect>')

  return html.join(' ')
}

export { Rect }
