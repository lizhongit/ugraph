import { Rect } from '../shapes/index'

const shapes = {
	rect: Rect
}


export default (Graph) => {

	/**
	 * Register shape
	 * @param name
	 * @param shape
	 */
	Graph.prototype.setShape = function (name, shape) {
		shapes[name] = shape
	}

	/**
	 * Get shape by name
	 * @param name
	 */
	Graph.prototype.getShape = function (name) {
		return shapes[name]
	}
}
