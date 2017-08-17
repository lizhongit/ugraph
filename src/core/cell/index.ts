
function Cell (obj) {
  this.x = obj.x
  this.y = obj.y
  this.width = obj.width
  this.height = obj.height
  this.shape = obj.shape
  this.style = obj.style

  this.getOriginData = () => {
    return obj
  }
}

Cell.prototype.root = null
Cell.prototype.setValue = function () {

}

export default Cell
