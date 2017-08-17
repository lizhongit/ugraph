import initMixin from './init'
// import { error } from '../util/error'

import cellMixin from './cell'
import eventMixin from './event'

import renderMixin from './render'
import jsonMixin from './json'
import mouseMixin from './mouse'
import ioMixin from './io'
import { warn } from '../util/console'
import shapeMixin from './shape'
import zoomMixin from './zoom'

function Graph(element: Element, option: any): void {
  if (!(this instanceof Graph)) {
    const msg = 'Graph is a constructor and should be called with the `new` keyword'
    warn(msg) // error('Graph is a constructor and should be called with the `new` keyword')
  }
  this._init(element, option)
}

initMixin(Graph)
shapeMixin(Graph)
renderMixin(Graph)
jsonMixin(Graph)
zoomMixin(Graph)
mouseMixin(Graph)
ioMixin(Graph)
eventMixin(Graph)
cellMixin(Graph)

export default Graph
