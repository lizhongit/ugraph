
export default (Graph) => {

  let isEnableMouseRightOffset = true
  let isEnableMouseWheel = true

  Graph.prototype.offset = {
    x: 0,
    y: 0
  }

  Graph.prototype._initMouseRightOffset = function () {
    let triggerPoint = {
      x: 0,
      y: 0
    }

    let isMouseDown = false

    this._element.addEventListener('mousedown', (evt) => {
      isMouseDown = true
      triggerPoint.x = evt.x
      triggerPoint.y = evt.y
    })

    this._element.addEventListener('mousemove', (evt) => {
      if (isMouseDown && isEnableMouseRightOffset) {
        let scale = this.getZoomScale()

        this.offset.x += 1 / scale * (evt.x - triggerPoint.x)
        this.offset.y += 1 / scale * (evt.y - triggerPoint.y)
        triggerPoint.x = evt.x
        triggerPoint.y = evt.y
        this.render()
      }
    })

    this._element.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false
        triggerPoint.x = 0
        triggerPoint.y = 0
      }
    })
  }

  Graph.prototype._initMouseWheel = function () {
    this._element.addEventListener('mousewheel', (evt) => {
      if (isEnableMouseWheel) {
        if (evt.deltaY > 0) {
          this.zoomOut()
        } else {
          this.zoomIn()
        }
      }
    })
  }

  Graph.prototype.enableMouseWheel = function () {

  }

  Graph.prototype.enableMouseRightOffset = function () {
    isEnableMouseRightOffset = true
  }

  Graph.prototype.disableMouseRightOffset = function () {
    isEnableMouseRightOffset = false
  }
}
