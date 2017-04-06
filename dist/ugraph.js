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

var randomRgb = function () {
  return 'rgb(' + randomInt(0, 255) + ', ' + randomInt(0, 255) + ', '+ randomInt(0, 255) +')'
};

var error = function (errorMsg) {
  throw new Error(errorMsg)
};

var SVG_NS = 'http://www.w3.org/2000/svg';

var createElement = function (tagName) {
  return document.createElementNS(SVG_NS, tagName)
};

var setAttribute = function (element, attr, value, ns) {
  element.setAttributeNS(ns, attr, value);
};

var getAttribute = function (element, attr, ns) {
  element.getAttributeNS(ns, attr);
};

var separateChar1 = ';';
var separateChar2 = '=';

var parseStyle = function (style) {
  var o = {};

  if (typeof style === 'string') {
    style.split(separateChar1).forEach(function (item) {
      var arr = item.split(separateChar2);
      if (arr.length === 2) {
        o[arr[0]] = arr[1];
      }
    });
  }

  return check(o)
};

var check = function (o) {
  o.fillColor = o.fillColor ? o.fillColor : 'green';
  return o
};

var prefixFillNumber = function (number) {
  return number >= 10 ? number : '0' + String(number)
};

var getDateFormat = function () {
  var d = new Date();
  var f = prefixFillNumber;
  return [
    d.getFullYear(),
    f(d.getMonth() + 1),
    f(d.getDate()),
    f(d.getHours()),
    f(d.getMinutes()),
    f(d.getSeconds())
  ].join('_')
};



var util = Object.freeze({
	randomInt: randomInt,
	randomRgb: randomRgb,
	error: error,
	createElement: createElement,
	setAttribute: setAttribute,
	getAttribute: getAttribute,
	parseStyle: parseStyle,
	getDateFormat: getDateFormat
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
      this._initMouseRightOffset();
      this._initMouseWheel();
      // this.enableMouseRightOffset()
      this._element.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
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

    this._svgElement.setAttribute('xmlns', SVG_NS);
    this._element.appendChild(this._svgElement);
  };

  Graph.prototype._initOption = function (option) {
    if ( option === void 0 ) option = {};

    this._option = option;
  };

  Graph.prototype.clear = function () {
    this._svgElement.innerHTML = '';
		// this._svgElement.childNodes.forEach((node) => {
		// 	this._svgElement.removeChild(node)
		// })
  };

  Graph.prototype.getCenter = function () {
    return {
      x : this._svgElement.clientWidth / 2,
      y : this._svgElement.clientHeight / 2
    }
  };

  Graph.prototype.setBackgroundImage = function (imageUrl) {
    this._svgElement.style.backgroundImage = 'url(' + imageUrl + ')';
  };
};

function Rect (graph, data) {
  this.data = data;
  this.graph = graph;
  this.style = parseStyle(this.data.style);
  this.init();
}

/**
 * Require definition
 */
Rect.prototype.init = function () {
  this.element = createElement('rect');

  var scale = this.graph.getZoomScale();
  var center = this.graph.getCenter();

  var cx = (this.data.x + this.data.width / 2) + this.graph.offset.x;
  var cy = (this.data.y + this.data.height / 2) + this.graph.offset.y;

  var newX = center.x - (center.x - cx) * scale;
  var newY = center.y - (center.y - cy) * scale;

  setAttribute(this.element, 'x', newX);
  setAttribute(this.element, 'y', newY);
  setAttribute(this.element, 'width', this.data.width * scale);
  setAttribute(this.element, 'height', this.data.height * scale);
  setAttribute(this.element, 'fill', this.style.fillColor);
  this.graph._svgElement.appendChild(this.element);
};

function Circle (graph, data) {
  this.data = data;
  this.graph = graph;
  this.style = parseStyle(this.data.style);
  this.init();
}

/**
 * Require definition
 */
Circle.prototype.init = function () {
  var size, cx, cy, newX, newY;
  this.element = createElement('ellipse');

  var scale = this.graph.getZoomScale();
  var center = this.graph.getCenter();

  size = this.data.width ? this.data.width : this.data.height;

  cx = (this.data.x + this.data.width / 2) + this.graph.offset.x;

  newX = center.x - (center.x - cx) * scale;

  setAttribute(this.element, 'cx', newX);
  setAttribute(this.element, 'rx', size * scale / 2);

  size = this.data.height ? this.data.height : this.data.width;

  cy = (this.data.y + this.data.height / 2) + this.graph.offset.y;
  newY = center.y - (center.y - cy) * scale;

  setAttribute(this.element, 'cy', newY);
  setAttribute(this.element, 'ry', size * scale / 2);

  setAttribute(this.element, 'fill', this.style.fillColor);
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
var error$1 = function (msg) {
  console.error(msg);
  throw new Error(msg)
};

/**
 * Diff json
 * @type {{}}
 */
// const state = {}

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

    this.clear();

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

var zoomMixin = function (Graph) {
  var maxZoomScale = 2000;
  var minZoomScale = 0.03;
  var zoomScale = 1;

  Graph.prototype.zoomFactor = 1.2;

  Graph.prototype.setZoomScale = function (value) {
    zoomScale = value;
  };

  Graph.prototype.getZoomScale = function () {
    return zoomScale
  };

  Graph.prototype.zoomOut = function () {
    if (zoomScale > minZoomScale) {
      zoomScale = Number((zoomScale /= this.zoomFactor).toFixed(2));
      this.render();
    }
  };

  Graph.prototype.zoomIn = function () {
    if (zoomScale < maxZoomScale) {
      zoomScale = Number((zoomScale *= this.zoomFactor).toFixed(2));
      this.render();
    }
  };

  Graph.prototype.zoomActual = function () {
    zoomScale = 1;
    this.offset.x = 0;
    this.offset.y = 0;
    this.render();
  };
};

var mouseMixin = function (Graph) {

  var isEnableMouseRightOffset = true;
  var isEnableMouseWheel = true;

  Graph.prototype.offset = {
    x: 0,
    y: 0
  };

  Graph.prototype._initMouseRightOffset = function () {
    var this$1 = this;

    var triggerPoint = {
      x: 0,
      y: 0
    };

    var isMouseDown = false;

    this._element.addEventListener('mousedown', function (evt) {
      isMouseDown = true;
      triggerPoint.x = evt.x;
      triggerPoint.y = evt.y;
    });

    this._element.addEventListener('mousemove', function (evt) {
      if (isMouseDown && isEnableMouseRightOffset) {
        var scale = this$1.getZoomScale();

        this$1.offset.x += 1 / scale * (evt.x - triggerPoint.x);
        this$1.offset.y += 1 / scale * (evt.y - triggerPoint.y);
        triggerPoint.x = evt.x;
        triggerPoint.y = evt.y;
        this$1.render();
      }
    });

    this._element.addEventListener('mouseup', function () {
      if (isMouseDown) {
        isMouseDown = false;
        triggerPoint.x = 0;
        triggerPoint.y = 0;
      }
    });
  };

  Graph.prototype._initMouseWheel = function () {
    var this$1 = this;

    this._element.addEventListener('mousewheel', function (evt) {
      if (isEnableMouseWheel) {
        if (evt.deltaY > 0) {
          this$1.zoomOut();
        } else {
          this$1.zoomIn();
        }
      }
    });
  };

  Graph.prototype.enableMouseWheel = function () {

  };

  Graph.prototype.enableMouseRightOffset = function () {
    isEnableMouseRightOffset = true;
  };

  Graph.prototype.disableMouseRightOffset = function () {
    isEnableMouseRightOffset = false;
  };
};

var _a = document.createElement('a');
var _canvas = document.createElement('canvas');

var returns = function (str, prefix, ext, w, h) {
  var o = {};
  o.toString = function () {
    return str
  };
  o.toFile = function (fileName) {
    var name = fileName ? fileName : 'ugraph_export_' + getDateFormat() + '.' + ext;

    if (ext === 'png') {
      _canvas.width = w;
      _canvas.height = h;
      var context = _canvas.getContext('2d');
      var image = new Image;
      image.onload = function() {
        context.drawImage(image, 0, 0);
        _a.download = name;
        _a.href = _canvas.toDataURL('image/' + ext);
        _a.click();
      };
      image.src = prefix + str;
    } else {
      if (ext === 'svg') {
        str = '<?xml version="1.0" encoding="UTF-8"?>' + str;
      }
      _a.href = 'data:' + prefix + str;
      _a.download = name;
      _a.click();
    }
  };
  return o
};

var ioMixin = function (Graph) {

  Graph.prototype.exportJson = function () {
    var json = JSON.stringify(this._json);
    return returns(json, 'text/json;charset=utf-8,', 'json')
  };

  Graph.prototype.exportSvg = function () {
    return returns(this._svgElement.outerHTML, 'text/svg;charset=utf-8,', 'svg')
  };

  Graph.prototype.exportPng = function () {
    var s = window.btoa(new XMLSerializer().serializeToString(this._svgElement));
    return returns(s, 'data:image/svg+xml;base64,', 'png', this._svgElement.clientWidth, this._svgElement.clientHeight)
  };
};

var Event = function Event () {
  this.isStop = false;
};
Event.prototype.stop = function stop () {
  this.isStop = true;
};

var EventCursor = function EventCursor (arr, index, fn) {
  this.arr = arr;
  this.index = index;
  this.fn = fn;
};

EventCursor.prototype.remove = function remove () {
  this.fn._disabeld = true;
};

EventCursor.prototype.restore = function restore () {
  this.fn._disabeld = false;
};

var triggerEvent = function (eventName) {
  var this$1 = this;

  if (eventListens[eventName]) {
    var evt = new Event;
    eventListens[eventName].fns.forEach(function (item) {
      if (!evt.isStop && !item._disabeld) {
        item.fn.apply(this$1, [evt]);
      }
    });
  }
};

var EVENT_NAMES = {
  CLICK: 'click'
};

var eventListens = {};

for (var name in EVENT_NAMES) {
  eventListens[EVENT_NAMES[name]] = {
    fns: []
  };
}

var eventMixin = function (Graph) {


  Graph.prototype.EVENT = EVENT_NAMES;

  Graph.prototype.eventTrigger = function (eventName) {
    if ( eventName === void 0 ) eventName = '';

    triggerEvent.apply(this, [eventName]);
  };

  Graph.prototype.addEventListener = function (eventName, fn) {
    if (eventListens[eventName] && typeof fn === 'function') {
      var item = { fn:fn };
      eventListens[eventName].fns.push(item);
      return new EventCursor(eventListens[eventName].fns, eventListens[eventName].fns.length - 1, item)
    } else {
      if (!eventListens[eventName]) {
        error$1('Unknown this event name:' + eventName + ', please see the EVENT definition.');
      } else if (typeof fn !== 'function') { (
        error$1('The second param must be a function.')
      ); }
    }
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
zoomMixin(Graph);
mouseMixin(Graph);
ioMixin(Graph);
eventMixin(Graph);

Graph.util = util;

return Graph;

})));
