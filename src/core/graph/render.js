/**
 * Diff json
 * @type {{}}
 */
// const state = {}

export default (Graph) => {

  Graph.prototype._svgHtml = []

  Graph.prototype._model = {}
  Graph.prototype._autoindexId = 0

  Graph.prototype._checkNodeData = function (node) {
    return typeof node.x === 'number'
			&& typeof node.y === 'number'
			&& typeof node.width === 'number'
			&& typeof node.height === 'number'
			&& this.getShape(node.shape)
  }

	/**
	 * Source from _json property
	 */
  Graph.prototype.render = function () {
    this.clear()
    this._svgHtml = []

		// TODO nodes
    if (Array.isArray(this._json.nodes)) {
      this._json.nodes.filter((item) => this._checkNodeData(item)).forEach((item) => {

        item.id = !item.id || this._model[item.id] ? String(++this._autoindexId) : item.id
        this._autoindexId = Number(this._autoindexId)

        var Shape = this.getShape(item.shape)
        if (Shape) {
          this._svgHtml.push((new Shape(this, item).getHtml()))
        }
      })

      this._svgElement.innerHTML = this._svgHtml.join('')
    }
  }

  Graph.prototype._createShape = function (item) {
    var Shape = this.getShape(item.shape)
    if (Shape) {
      new Shape(this, item)
    }
  }
}
