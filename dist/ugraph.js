(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Graph = factory());
}(this, (function () { 'use strict';

var error = function (errorMsg) {
	throw new Error(errorMsg)
};

var initMixin = function (Graph) {
	/**
	 * Init Element, Exclude tag name equal 'canvas'
	 * Recommend assign DIV Element
	 * @param element
	 * @param option
	 * @private
	 */
	Graph.prototype._init = function (element, option) {
		if ( element === void 0 ) element = error('error: element must be a HTMLElement object');
		if ( option === void 0 ) option = {};

		this._element = element;
		this._option = option;

		if (typeof element === 'object' && element instanceof HTMLElement) {
			this._initElement();
			this._initOption();
		} else {
			// throw error and stop running script
			error('Element must be a HTMLElement object');
		}
	};

	Graph.prototype._initElement = function () {

		// Check element position value of style
		var position = this._element.style.position;
		if (['absolute', 'relative'].indexOf(position) === -1) {
			this._element.style.position = 'relative';
		}

		// Init element style
		this._element.style.padding = 0;

		// Append canvas to element
		this._canvasElement = document.createElement('canvas');
		this._canvasElement.style.cssText = [
			'width: 100%',
			'height: 100%',
			'padding: 0'
		].join(';');

		this._element.appendChild(this._canvasElement);
	};

	Graph.prototype._initOption = function (option) {
		if ( option === void 0 ) option = {};

		this._option = option;
	};
};

function Graph (element, option) {
	if (!(this instanceof Graph)) {
		// error('Graph is a constructor and should be called with the `new` keyword')
	}
	this._init(element, option);
}

initMixin(Graph);

var randomInt = function (min, max) {
	if ( min === void 0 ) min = 0;
	if ( max === void 0 ) max = 1000;

	return Number(min) + Math.floor(Math.random() * (Number(max) - Number(min)))
};



var util = Object.freeze({
	randomInt: randomInt,
	error: error
});

Graph.util = util;

return Graph;

})));
