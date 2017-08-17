export default (Graph) => {

  Graph.prototype.cells = []

  Graph.prototype.addCells = function (cells) {
    cells.forEach((cell) => {
      if (this.cells.indexOf(cell) === -1) {
        this.cells.push(cell)
      }
    })

    this.render()
  }

  Graph.prototype.removeCells = function (cells) {
    let elements = []

    cells.forEach((cell) => {
      let i = this.cells.indexOf(cell)
      if (i >= 0) {
        this.cells.splice(i, 1)
        elements.push(cell.root)
      }
    })

    if (elements.length) {
      this._svgElement.removeChild(elements)
    }
  }
}
