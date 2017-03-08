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

export { createElement, setAttribute }
