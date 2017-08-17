import ICell from '../interface/ICell'
import IGraph from '../interface/IGraph'
import IShape from '../interface/IShape'
import { Circle } from './circle'
import { Ellipse } from './ellipse'
import { Rect } from './rect'

const getShape = (name: string, cell: ICell, graph: IGraph): IShape => {
  switch (name) {
    case 'Rect':
      return new Rect(graph, cell)

    case 'Circle':
      return new Circle(graph, cell)

    case 'Ellipse':
      return new Ellipse(graph, cell)

    default:
      return null
  }
}

export default { getShape }
