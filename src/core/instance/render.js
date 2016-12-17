/**
 * Diff json
 * @type {{}}
 */
const state = {}

export default (Graph) => {

	Graph.prototype._svgNS = 'http://www.w3.org/2000/svg'

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

		// TODO nodes
		if (Array.isArray(this._json.nodes)) {
			this._json.nodes.filter((item) => this._checkNodeData(item)).forEach((item) => {
				this._createShape(item)
			})
		}
	}

	Graph.prototype._createShape = function (item) {
		switch (item.shape) {
			case 'rect':
				return this._createRectShape(item)
				break

			default:
				return false
		}
	}

	Graph.prototype._createRectShape = function (item) {
		let element = document.createElementNS(this._svgNS, 'rect')
		element.setAttributeNS(null, 'x', item.x)
		element.setAttributeNS(null, 'y', item.y)
		element.setAttributeNS(null, 'width', item.width)
		element.setAttributeNS(null, 'height', item.height)
		element.setAttributeNS(null, 'fill', 'red')
		this._svgElement.appendChild(element)
		return element
	}
}
