import { SVG_NS } from '../config/index'

/**
 * Create tag
 * @param tagName
 * @returns {*}
 */
const createElement = (tagName) => {
	return document.createElementNS(SVG_NS, tagName)
}

const setAttribute = function (element, attr, value) {
	element.setAttributeNS(null, attr, value)
}

export { createElement, setAttribute }
