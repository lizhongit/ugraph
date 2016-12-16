import initMixin from './init'
import shapeMixin from './shape'
// import { error } from '../util/error'
import { warn } from '../util/console'

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
export default Graph
