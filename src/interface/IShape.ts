// import ICell from './ICell'
import IGraph from './IGraph'

interface IShape {
  graph: IGraph
  getHtml(): string
  getElement(): SVGElement
}

export default IShape
