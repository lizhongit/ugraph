import { error } from '../util/error'

export default (Graph) => {
	/**
	 * Init Element, Exclude tag name equal 'canvas'
	 * Recommend assign DIV Element
	 * @param element
	 * @param option
	 * @private
	 */
	Graph.prototype._init = function (element = error('error: element must be a HTMLElement object'), option = {}) {
		this._element = element
		this._option = option

		if (typeof element === 'object' && element instanceof HTMLElement) {
			this._initElement()
			this._initOption()
		} else {
			// throw error and stop running script
			error('Element must be a HTMLElement object')
		}
	}

	Graph.prototype._initElement = function () {

		// Check element position value of style
		let position = this._element.style.position
		if (['absolute', 'relative'].indexOf(position) === -1) {
			this._element.style.position = 'relative'
		}

		// Init element style
		this._element.style.padding = 0

		// Append canvas to element
		this._canvasElement = document.createElement('canvas')
		this._canvasElement.style.cssText = [
			'width: 100%',
			'height: 100%',
			'padding: 0'
		].join(';')

		this._element.appendChild(this._canvasElement)
	}

	Graph.prototype._initOption = function (option = {}) {
		this._option = option
	}
}
