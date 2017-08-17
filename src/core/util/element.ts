import { SVG_NS } from '../config/index'

/**
 * Create tag
 * @param tagName
 * @returns {*}
 */
const createElement = (tagName) => {
  return document.createElementNS(SVG_NS, tagName)
}

const setAttribute = function (element: Element, attr: string, value: string, ns?: string) {
  element.setAttributeNS(ns, attr, value)
}

const getAttribute = function (element, attr, ns) {
  element.getAttributeNS(ns, attr)
}

export { createElement, setAttribute, getAttribute }
