/**
 * Diff json
 * @type {{}}
 */
// const state = {}

export default (Graph) => {

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

		// TODO nodes
    if (Array.isArray(this._json.nodes)) {
      this._json.nodes.filter((item) => this._checkNodeData(item)).forEach((item) => {
        this._createShape(item)
      })
    }
  }

  Graph.prototype._createShape = function (item) {
    var Shape = this.getShape(item.shape)
    if (Shape) {
      new Shape(this, item)
    }
  }
}
