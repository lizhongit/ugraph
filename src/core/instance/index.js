import initMixin from './init'
// import { error } from '../util/error'

function Graph (element, option) {
	if (!(this instanceof Graph)) {
		// error('Graph is a constructor and should be called with the `new` keyword')
	}
	this._init(element, option)
}

initMixin(Graph)
export default Graph
