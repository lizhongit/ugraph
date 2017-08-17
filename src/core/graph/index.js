import initMixin from './init'
import shapeMixin from './shape'
// import { error } from '../util/error'
import { warn } from '../util/console'
import renderMixin from './render'
import jsonMixin from './json'
import zoomMixin from './zoom'
import mouseMixin from './mouse'
import ioMixin from './io'
import eventMixin from './event'

function Graph (element, option) {
  if (!(this instanceof Graph)) {
    let msg = 'Graph is a constructor and should be called with the `new` keyword'
    warn(msg)
		// error('Graph is a constructor and should be called with the `new` keyword')
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

export default Graph
