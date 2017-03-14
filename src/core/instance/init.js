import * as util from '../util/index'
import { error } from '../util/error'

export default (Graph) => {

	/**
	 * Init Element, Exclude tag name equal 'svg'
	 * Recommend assign DIV Element
	 * @param element
	 * @param option
	 * @private
	 */
  Graph.prototype._init = function (element = error('error: element must be a HTMLElement object'), option = {}) {
    this._element = element
    this._option = option

    if (typeof element === 'object' && element instanceof HTMLElement && element.tagName !== 'TAG') {
      this._initElement()
      this._initOption()
      this._initMouseRightOffset()
      this._initMouseWheel()
      // this.enableMouseRightOffset()
      this._element.addEventListener('contextmenu', event => event.preventDefault())
    } else {
			// throw error and stop running script
      if (element instanceof HTMLElement && element.tagName.toLowerCase() === 'tag') {
        util.error('Can\'t into SVG element.')
      } else {
        util.error('Element must be a HTMLElement object.')
      }
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

		// Append svg to element
    this._svgElement = util.createElement('svg')
    util.setAttribute(this._svgElement, 'width', '100%')
    util.setAttribute(this._svgElement, 'height', '100%')
    this._svgElement.style.cssText = [
      'padding: 0',
      'left: 0',
      'top: 0',
      'width: 100%',
      'height: 100%',
      'position: absolute'
    ].join(';')

    this._element.appendChild(this._svgElement)
  }

  Graph.prototype._initOption = function (option = {}) {
    this._option = option
  }

  Graph.prototype.clear = function () {
    this._svgElement.innerHTML = ''
		// this._svgElement.childNodes.forEach((node) => {
		// 	this._svgElement.removeChild(node)
		// })
  }

  Graph.prototype.getCenter = function () {
    return {
      x : this._svgElement.clientWidth / 2,
      y : this._svgElement.clientHeight / 2
    }
  }
}
