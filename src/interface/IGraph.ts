import EventDefine from '../event/define'
import ICell from './ICell'
import IPoint from './IPoint'

interface IGraph {
  render(): void
  setBackgroundImage(imageUrl: string): void
  getScale(): number
  getCenter(): IPoint
  getOffset(): IPoint
  appendSVGElement(element: SVGElement): void
  zoomIn(): void
  zoomOut(): void
  zoomActual(): void
  addEventListener(eventName: EventDefine, callback: () => void): boolean
  removeEventListener(eventName: EventDefine, callback: () => void): boolean
  addCells(cells: ICell[]): void
  saveAsJson(): void
  getJson(): string
}

interface IGraphConstructor {
  new (element: HTMLElement): IGraph
}

export default IGraph
