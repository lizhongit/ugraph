import Cell from '../cell/index'
import { warn } from '../util/console'

export default (Graph) => {

  // Require JSON string
  Graph.prototype.loadJson = function(json) {

    // TODO Inject loading tips
    let o
    try {
      o = JSON.parse(json)
    } catch (e) {
      warn(e)
    } finally {
      // TODO Inject loading tips
      if (o.nodes instanceof Array) {
        const nodeCells = []
        o.nodes.forEach((node) => {
          nodeCells.push(new Cell(node))
        })

        this.addCells(nodeCells)
      }
    }

  }

  // TODO Insert node
  // Graph.prototype.insertNode = () => {}

  // TODO Insert line
  // Graph.prototype.insertLine = () => {}

  Graph.prototype._json = {}

  Graph.prototype.getJson = function() {
    let json = ''

    // TODO Inject loading tips
    try {
      json = JSON.stringify(this._json)
    } catch (e) {
      warn(e)
    } finally {
      // TODO Inject loading tips
    }

    return json
  }
}
