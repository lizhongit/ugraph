export default (Graph) => {
  let maxZoomScale = 2000
  let minZoomScale = 0.03
  let zoomScale = 1

  Graph.prototype.zoomFactor = 1.2

  Graph.prototype.setZoomScale = function (value) {
    zoomScale = value
  }

  Graph.prototype.getZoomScale = function () {
    return zoomScale
  }

  Graph.prototype.zoomOut = function () {
    if (zoomScale > minZoomScale) {
      zoomScale = Number((zoomScale /= this.zoomFactor).toFixed(2))
      this.render()
    }
  }

  Graph.prototype.zoomIn = function () {
    if (zoomScale < maxZoomScale) {
      zoomScale = Number((zoomScale *= this.zoomFactor).toFixed(2))
      this.render()
    }
  }

  Graph.prototype.zoomActual = function () {
    zoomScale = 1
    this.offset.x = 0
    this.offset.y = 0
    this.render()
  }
}
