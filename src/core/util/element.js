import { SVG_NS } from '../config/index'

/**
 * Create tag
 * @param tagName
 * @returns {*}
 */
const createElement = (tagName) => {
  return document.createElementNS(SVG_NS, tagName)
}

const setAttribute = function (element, attr, value, ns) {
  element.setAttributeNS(ns, attr, value)
}

const getAttribute = function (element, attr, ns) {
  element.getAttributeNS(ns, attr)
}

export { createElement, setAttribute, getAttribute }
