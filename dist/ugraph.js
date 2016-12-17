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
	 * Init Element, Exclude tag name equal 'svg'
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

		if (typeof element === 'object' && element instanceof HTMLElement && element.tagName !== 'TAG') {
			this._initElement();
			this._initOption();
		} else {
			// throw error and stop running script
			if (element instanceof HTMLElement && element.tagName.toLowerCase() === 'tag') {
				error('Can\'t into SVG element.');
			} else {
				error('Element must be a HTMLElement object.');
			}
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

		// Append svg to element
		this._svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this._svgElement.setAttributeNS(null, 'width', '100%');
		this._svgElement.setAttributeNS(null, 'height', '100%');
		this._svgElement.style.cssText = [
			'padding: 0',
			'left: 0',
			'top: 0',
			'width: 100%',
			'height: 100%',
			'position: absolute'
		].join(';');

		this._element.appendChild(this._svgElement);
	};

	Graph.prototype._initOption = function (option) {
		if ( option === void 0 ) option = {};

		this._option = option;
	};
};

function Rect () {
}

/**
 * Require definition
 */
Rect.prototype.draw = function () {

};

var shapes = {
	rect: Rect
};


var shapeMixin = function (Graph) {

	/**
	 * Register shape
	 * @param name
	 * @param shape
	 */
	Graph.prototype.setShape = function (name, shape) {
		shapes[name] = shape;
	};

	/**
	 * Get shape by name
	 * @param name
	 */
	Graph.prototype.getShape = function (name) {
		return shapes[name]
	};
};

/**
 * warn
 * @param msg
 */
var warn = function (msg) {
	console.warn(msg);
};

/**
 * Diff json
 * @type {{}}
 */
var renderMixin = function (Graph) {

	Graph.prototype._svgNS = 'http://www.w3.org/2000/svg';

	Graph.prototype._checkNodeData = function (node) {
		return typeof node.x === 'number'
			&& typeof node.y === 'number'
			&& typeof node.width === 'number'
			&& typeof node.height === 'number'
			&& this.getShape(node.shape)
	};

	/**
	 * Source from _json property
	 */
	Graph.prototype.render = function () {
		var this$1 = this;


		// TODO nodes
		if (Array.isArray(this._json.nodes)) {
			this._json.nodes.filter(function (item) { return this$1._checkNodeData(item); }).forEach(function (item) {
				this$1._createShape(item);
			});
		}
	};

	Graph.prototype._createShape = function (item) {
		switch (item.shape) {
			case 'rect':
				return this._createRectShape(item)
				break

			default:
				return false
		}
	};

	Graph.prototype._createRectShape = function (item) {
		var element = document.createElementNS(this._svgNS, 'rect');
		element.setAttributeNS(null, 'x', item.x);
		element.setAttributeNS(null, 'y', item.y);
		element.setAttributeNS(null, 'width', item.width);
		element.setAttributeNS(null, 'height', item.height);
		element.setAttributeNS(null, 'fill', 'red');
		this._svgElement.appendChild(element);
		return element
	};
};

var jsonMixin = function (Graph) {

	/**
	 * Require JSON string
	 */
	Graph.prototype.loadJson = function (json) {
		// TODO Inject loading tips
		try {
			this._json = JSON.parse(json);
		} catch (e) {
			warn(e);
		} finally {
			// TODO Inject loading tips
		}
	};

	// TODO Insert node
	/**
	 * x, y, width, height, shape
	 */
	Graph.prototype.insertNode = function () {};

	// TODO Insert line
	Graph.prototype.insertLine = function () {};

	Graph.prototype._json = {};

	Graph.prototype.getJson = function () {
		var json = '';

		// TODO Inject loading tips

		try {
			json = JSON.stringify(this._json);
		} catch (e) {
			warn(e);
		} finally {
			// TODO Inject loading tips
		}

		return json
	};
};

// import { error } from '../util/error'
function Graph (element, option) {
	if (!(this instanceof Graph)) {
		var msg = 'Graph is a constructor and should be called with the `new` keyword';
		warn(msg);
		// error('Graph is a constructor and should be called with the `new` keyword')
	}
	this._init(element, option);
}

initMixin(Graph);
shapeMixin(Graph);
renderMixin(Graph);
jsonMixin(Graph);

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
