import { error } from '../util/index'

export default (Graph) => {

	/**
	 * Require JSON string
	 */
	Graph.prototype.loadJson = function (json) {
		// TODO Inject loading tips
		try {
			this._json = JSON.parse(json)
		} catch (e) {
			error(e)
		} finally {
			// TODO Inject loading tips
		}
	}

	// TODO Insert node
	Graph.prototype.insertNode = function () {}

	// TODO Insert line
	Graph.prototype.insertLine = function () {}

	Graph.prototype.getJson = function () {
		let json = ''

		// TODO Inject loading tips

		try {
			json = JSON.stringify(this._json)
		} catch (e) {
			error(e)
		} finally {
			// TODO Inject loading tips
		}

		return json
	}
}
