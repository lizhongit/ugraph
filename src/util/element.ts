import { SVG_NS } from '../config/index'

/**
 * Create tag
 * @param tagName
 * @returns {*}
 */
const createSVGElement = (tagName: string): SVGElement => {
  return document.createElementNS(SVG_NS, tagName)
}

const setAttribute = (element: SVGElement, attr: string, value: string | number, ns?: string) => {
  element.setAttributeNS(ns, attr, String(value))
}

const getAttribute = (element: SVGElement, attr: string, ns?: string) => {
  element.getAttributeNS(ns, attr)
}

export { createSVGElement, setAttribute, getAttribute }
