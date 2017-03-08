export default (Graph) => {
  let maxZoomFactor = 2
  let minZoomFactor = 0.1
  let zoomStep = 0.1

  Graph.prototype.zoomFactor = 1

  Graph.prototype.setMinZoomFactor = function (value) {
    minZoomFactor = value
  }

  Graph.prototype.getMinZoomFactor = function () {
    return minZoomFactor
  }

	Graph.prototype.zoomOut = function () {
    if (this.zoomFactor > minZoomFactor) {
      this.zoomFactor -= zoomStep
      this.render()
    }
	}

  Graph.prototype.zoomIn = function () {
    if (this.zoomFactor < maxZoomFactor) {
		  this.zoomFactor += zoomStep
      this.render()
    }
	}
}
