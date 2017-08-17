import ICell from '../interface/ICell'
import ICellObject from '../interface/ICellObject'
import IGraph from '../interface/IGraph'
import IShape from '../interface/IShape'
import shape from '../shapes/common'

export class Cell implements ICell {
  public x: number
  public y: number
  public width: number
  public height: number
  public style: string
  public shapeName: string
  public value: string
  public shape: IShape
  private graph: IGraph

  constructor(node: ICellObject, graph: IGraph) {
    this.x = node.x
    this.y = node.y
    this.width = node.width
    this.height = node.height
    this.style = node.style
    this.shapeName = node.shapeName
    this.value = node.value
    this.graph = graph
    this.shape = shape.getShape(node.shapeName, this, this.graph)
  }

  // public hide(): void {
  // }
}

export default Cell
