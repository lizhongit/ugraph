(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Graph = factory());
}(this, (function () { 'use strict';

var randomInt = function (min, max) {
	if ( min === void 0 ) min = 0;
	if ( max === void 0 ) max = 1000;

	return Number(min) + Math.floor(Math.random() * (Number(max) - Number(min)))
};

var error$1 = function (errorMsg) {
	throw new Error(errorMsg)
};

var SVG_NS = 'http://www.w3.org/2000/svg';

var createElement = function (tagName) {
	return document.createElementNS(SVG_NS, tagName)
};

var setAttribute = function (element, attr, value) {
	element.setAttributeNS(null, attr, value);
};



var util = Object.freeze({
	randomInt: randomInt,
	error: error$1,
	createElement: createElement,
	setAttribute: setAttribute
});

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
				error$1('Can\'t into SVG element.');
			} else {
				error$1('Element must be a HTMLElement object.');
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
		this._svgElement = createElement('svg');
		setAttribute(this._svgElement, 'width', '100%');
		setAttribute(this._svgElement, 'height', '100%');
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

function Rect (graph, data) {
	this.data = data;
	this.graph = graph;
	this.init();
}

/**
 * Require definition
 */
Rect.prototype.init = function () {
	this.element = createElement('rect');
	setAttribute(this.element, 'x', this.data.x);
	setAttribute(this.element, 'y', this.data.y);
	setAttribute(this.element, 'width', this.data.width);
	setAttribute(this.element, 'height', this.data.height);
	setAttribute(this.element, 'fill', 'red');
	this.graph._svgElement.appendChild(this.element);
};

function Circle (graph, data) {
	this.data = data;
	this.graph = graph;
	this.init();
}

/**
 * Require definition
 */
Circle.prototype.init = function () {
	this.element = createElement('circle');
	setAttribute(this.element, 'cx', this.data.x);
	setAttribute(this.element, 'cy', this.data.y);
	setAttribute(this.element, 'r', this.data.r);
	setAttribute(this.element, 'fill', 'blue');
	this.graph._svgElement.appendChild(this.element);
};

var shapes = {
	rect: Rect,
	circle: Circle
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
 * log
 * @param msg
 */

/**
 * Diff json
 * @type {{}}
 */
var renderMixin = function (Graph) {

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
		var Shape = this.getShape(item.shape);
		if (Shape) {
			new Shape(this, item);
		}
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

Graph.util = util;

return Graph;

})));
