(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ug = factory());
}(this, (function () { 'use strict';

var Enum;
(function (Enum) {
    Enum[Enum["MOUSE_WHEEL_DOWN"] = 1] = "MOUSE_WHEEL_DOWN";
    Enum[Enum["MOUSE_WHEEL_UP"] = 2] = "MOUSE_WHEEL_UP";
})(Enum || (Enum = {}));
var EventDefine = Enum;
//# sourceMappingURL=define.js.map

/**
 * warn
 * @param msg
 */
const warn = (msg) => {
    console.warn(msg);
};
/**
 * log
 * @param msg
 */
const log = (msg) => {
    console.log(msg);
};
const error = (msg) => {
    console.error(msg);
    throw new Error(msg);
};

const SVG_NS = 'http://www.w3.org/2000/svg';
//# sourceMappingURL=index.js.map

const createSVGElement = (tagName) => {
    return document.createElementNS(SVG_NS, tagName);
};
const setAttribute = (element, attr, value, ns) => {
    element.setAttributeNS(ns, attr, String(value));
};
const getAttribute = (element, attr, ns) => {
    element.getAttributeNS(ns, attr);
};

const separateChar1 = ';';
const separateChar2 = '=';
const parseStyle = (style) => {
    const o = {
        fillColor: '',
    };
    style.split(separateChar1).forEach((item) => {
        const arr = item.split(separateChar2);
        if (arr.length === 2) {
            o[arr[0]] = arr[1];
        }
    });
    return check(o);
};
const check = (o) => {
    o.fillColor = o.fillColor ? o.fillColor : 'green';
    return o;
};



var util = Object.freeze({
	warn: warn,
	log: log,
	error: error,
	createSVGElement: createSVGElement,
	setAttribute: setAttribute,
	getAttribute: getAttribute,
	parseStyle: parseStyle
});

class Circle {
    constructor(graph, data) {
        this.graph = graph;
        this.data = data;
        this.style = parseStyle(data.style);
        this.element = createSVGElement('circle');
        setAttribute(this.element, 'fill', this.style.fillColor);
    }
    resize() {
        const scale = this.graph.getScale();
        const center = this.graph.getCenter();
        const offset = this.graph.getOffset();
        const size = this.data.width ? this.data.width : this.data.height;
        const cx = (this.data.x + size / 2) + offset.x;
        const cy = (this.data.y + size / 2) + offset.y;
        const newX = center.x - (center.x - cx) * scale;
        const newY = center.y - (center.y - cy) * scale;
        setAttribute(this.element, 'cx', newX);
        setAttribute(this.element, 'cy', newY);
        setAttribute(this.element, 'r', size / 2 + '');
    }
    setElement(element) {
        this.resize();
        this.element = element;
    }
    getHtml() {
        this.resize();
        return this.element.outerHTML;
    }
    getElement() {
        return this.element;
    }
}

class Ellipse {
    constructor(graph, data) {
        this.graph = graph;
        this.data = data;
        this.style = parseStyle(data.style);
        this.element = createSVGElement('ellipse');
        setAttribute(this.element, 'fill', this.style.fillColor);
    }
    resize() {
        const scale = this.graph.getScale();
        const center = this.graph.getCenter();
        const offset = this.graph.getOffset();
        const cx = (this.data.x + this.data.width / 2) + offset.x;
        const cy = (this.data.y + this.data.height / 2) + offset.y;
        const newX = center.x - (center.x - cx) * scale;
        const newY = center.y - (center.y - cy) * scale;
        setAttribute(this.element, 'cx', newX);
        setAttribute(this.element, 'rx', this.data.width * scale / 2 + '');
        setAttribute(this.element, 'cy', newY);
        setAttribute(this.element, 'ry', this.data.height * scale / 2 + '');
    }
    setElement(element) {
        this.resize();
        this.element = element;
    }
    getHtml() {
        this.resize();
        return this.element.outerHTML;
    }
    getElement() {
        return this.element;
    }
}

class Rect {
    constructor(graph, data) {
        this.graph = graph;
        this.data = data;
        this.style = parseStyle(data.style);
        this.element = createSVGElement('rect');
        setAttribute(this.element, 'fill', this.style.fillColor);
    }
    resize() {
        const scale = this.graph.getScale();
        const center = this.graph.getCenter();
        const offset = this.graph.getOffset();
        const cx = (this.data.x + this.data.width / 2) + offset.x;
        const cy = (this.data.y + this.data.height / 2) + offset.y;
        const newX = center.x - (center.x - cx) * scale;
        const newY = center.y - (center.y - cy) * scale;
        setAttribute(this.element, 'x', newX + '');
        setAttribute(this.element, 'y', newY + '');
        setAttribute(this.element, 'width', this.data.width * scale + '');
        setAttribute(this.element, 'height', this.data.height * scale + '');
    }
    setElement(element) {
        this.resize();
        this.element = element;
    }
    getHtml() {
        this.resize();
        return this.element.outerHTML;
    }
    getElement() {
        return this.element;
    }
}

const getShape = (name, cell, graph) => {
    switch (name) {
        case 'Rect':
            return new Rect(graph, cell);
        case 'Circle':
            return new Circle(graph, cell);
        case 'Ellipse':
            return new Ellipse(graph, cell);
        default:
            return null;
    }
};
var shape = { getShape };
//# sourceMappingURL=common.js.map

class Cell {
    constructor(node, graph) {
        this.x = node.x;
        this.y = node.y;
        this.width = node.width;
        this.height = node.height;
        this.style = node.style;
        this.shapeName = node.shapeName;
        this.value = node.value;
        this.graph = graph;
        this.shape = shape.getShape(node.shapeName, this, this.graph);
    }
}



var shapes = Object.freeze({
	Rect: Rect,
	Circle: Circle,
	Ellipse: Ellipse
});

class Graph {
    constructor(element) {
        this.cells = [];
        this.scale = 1;
        this.minScale = 0.03;
        this.maxScale = 2000;
        this.zoomFactor = 1.2;
        this.isMouseWheel = true;
        this.isMouseRightOffset = true;
        this.listensMap = {};
        this.offset = { x: 0, y: 0 };
        this.element = element;
        this.initElement();
        this.initMouse();
        this.enableMouseWheel();
        this.initMouseRightOffset();
    }
    getScale() {
        return this.scale;
    }
    getCenter() {
        return {
            x: this.svgElement.clientWidth / 2,
            y: this.svgElement.clientHeight / 2,
        };
    }
    getOffset() {
        return this.offset;
    }
    setBackgroundImage(imageUrl) {
        this.element.style.backgroundImage = 'url(' + imageUrl + ')';
    }
    loadJSON(json) {
        let o;
        try {
            o = JSON.parse(json);
        }
        catch (e) {
            warn(e);
        }
        finally {
            // TODO Inject loading tips
            this.addCells(o.nodes.map((node) => new Cell(node, this)));
        }
    }
    setData(data) {
        this.addCells(data.nodes.map((node) => new Cell(node, this)));
    }
    addCells(cells) {
        cells
            .filter((cell) => this.cells.indexOf(cell) === -1)
            .forEach((cell) => { this.cells.push(cell); });
        this.render();
    }
    clear() {
        this.svgElement.innerHTML = '';
    }
    render() {
        this.clear();
        this.svgHtml = [];
        // TODO nodes
        this.cells.forEach((cell) => {
            // cell.id = !cell.id || this._model[item.id] ? String(++this._autoindexId) : item.id
            // this._autoindexId = Number(this._autoindexId)
            this.svgHtml.push(cell.shape.getHtml());
        });
        this.svgElement.innerHTML = this.svgHtml.join('');
    }
    appendSVGElement(element) {
        this.svgElement.appendChild(element);
    }
    zoomOut() {
        if (this.scale > this.minScale) {
            this.scale = Number((this.scale /= this.zoomFactor).toFixed(2));
            this.render();
        }
    }
    zoomIn() {
        if (this.scale < this.maxScale) {
            this.scale = Number((this.scale *= this.zoomFactor).toFixed(2));
            this.render();
        }
    }
    addEventListener(eventName, callback) {
        if (!this.listensMap[eventName]) {
            const item = {
                queue: [],
            };
            this.listensMap[eventName] = item;
        }
        if (this.listensMap[eventName].queue.indexOf(callback) === -1) {
            this.listensMap[eventName].queue.push(callback);
            return true;
        }
        else {
            return false;
        }
    }
    removeEventListener(eventName, callback) {
        const index = this.listensMap[eventName].queue.indexOf(callback);
        if (!this.listensMap[eventName] || index === -1) {
            return false;
        }
        this.listensMap[eventName].queue.splice(index, 1);
        return true;
    }
    eventTrigger(eventName, evt, data) {
        if (this.listensMap[eventName]) {
            this.listensMap[eventName].queue.forEach((callback) => {
                callback.apply(this, [evt, data]);
            });
        }
    }
    enableMouseWheel(isEnable = true) {
        if (isEnable) {
            this.addEventListener(EventDefine.MOUSE_WHEEL_DOWN, this.zoomOut);
            this.addEventListener(EventDefine.MOUSE_WHEEL_UP, this.zoomIn);
        }
        else {
            this.removeEventListener(EventDefine.MOUSE_WHEEL_DOWN, this.zoomOut);
            this.removeEventListener(EventDefine.MOUSE_WHEEL_UP, this.zoomIn);
        }
    }
    enableMouseRightOffset(isEnable) {
        this.isMouseRightOffset = isEnable;
    }
    getShape(shape) {
        return shapes[shape];
    }
    initElement() {
        this.element.style.position = !this.element.style.position || this.element.style.position === 'static' ?
            'relative' : this.element.style.position;
        this.svgElement = createSVGElement('svg');
        this.svgElement.style.cssText = [
            'padding: 0',
            'left: 0',
            'top: 0',
            'width: 100%',
            'height: 100%',
            'position: absolute',
            'z-index: 1',
        ].join(';');
        this.svgElement.setAttribute('xmlns', SVG_NS);
        this.element.appendChild(this.svgElement);
    }
    initMouseRightOffset() {
        const triggerPoint = {
            x: 0,
            y: 0,
        };
        let isMouseDown = false;
        this.element.oncontextmenu = () => {
            return !this.isMouseRightOffset;
        };
        this.element.addEventListener('mousedown', (evt) => {
            if (this.isMouseRightOffset && evt.button === 2) {
                isMouseDown = true;
                triggerPoint.x = evt.x;
                triggerPoint.y = evt.y;
            }
        });
        this.element.addEventListener('mousemove', (evt) => {
            if (isMouseDown && this.isMouseRightOffset) {
                const scale = this.getScale();
                this.offset.x += 1 / scale * (evt.x - triggerPoint.x);
                this.offset.y += 1 / scale * (evt.y - triggerPoint.y);
                triggerPoint.x = evt.x;
                triggerPoint.y = evt.y;
                this.render();
            }
        });
        this.element.addEventListener('mouseup', (evt) => {
            if (isMouseDown && this.isMouseRightOffset && evt.button === 2) {
                isMouseDown = false;
                triggerPoint.x = 0;
                triggerPoint.y = 0;
            }
        });
    }
    initMouse() {
        this.element.addEventListener('mousewheel', (evt) => {
            if (this.isMouseWheel) {
                if (evt.deltaY > 0) {
                    this.eventTrigger(EventDefine.MOUSE_WHEEL_DOWN, evt);
                }
                else {
                    this.eventTrigger(EventDefine.MOUSE_WHEEL_UP, evt);
                }
            }
        });
    }
}

var main = {
    Cell,
    Graph,
    events: EventDefine,
    util,
};
//# sourceMappingURL=main.js.map

return main;

})));
