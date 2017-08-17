import * as conf from '../config/index'
import EventDefine from '../event/define'
import ICell from '../interface/ICell'
import ICellObject from '../interface/ICellObject'
import IGraph from '../interface/IGraph'
import IPoint from '../interface/IPoint'
import IShape from '../interface/IShape'
import * as shapes from '../shapes/index'
import * as util from '../util/index'
import { Cell } from './cell'

interface IOriginJson {
  nodes: ICellObject[]
}

type ICallBack = () => void

interface IListensMapItem {
  queue: ICallBack[]
}

interface IListensMap {
  [key: string]: IListensMapItem
}

class Graph implements IGraph {
  private element: HTMLElement
  private cells: ICell[] = []
  private svgHtml: string[]
  private svgElement: SVGElement
  private scale: number = 1
  private minScale: number = 0.03
  private maxScale: number = 2000
  private zoomFactor: number = 1.2
  private isMouseWheel: boolean = true
  private isMouseRightOffset: boolean = true
  private listensMap: IListensMap = {}

  private offset: IPoint = { x: 0, y: 0 }

  constructor(element: HTMLElement) {
    this.element = element
    this.initElement()
    this.initMouse()
    this.enableMouseWheel()
    this.initMouseRightOffset()
  }

  public getScale(): number {
    return this.scale
  }

  public getCenter(): IPoint {
    return {
      x : this.svgElement.clientWidth / 2,
      y : this.svgElement.clientHeight / 2,
    }
  }

  public getOffset(): IPoint {
    return this.offset
  }

  public setBackgroundImage(imageUrl: string): void {
    this.element.style.backgroundImage = 'url(' + imageUrl + ')'
  }

  public loadJSON(json: string): void {
    let o: IOriginJson
    try {
      o = JSON.parse(json)
    } catch (e) {
      util.warn(e)
    } finally {
      // TODO Inject loading tips
      this.addCells(o.nodes.map((node: ICellObject) => new Cell(node, this)))
    }
  }

  public setData(data): void {
    this.addCells(data.nodes.map((node: ICellObject) => new Cell(node, this)))
  }

  public addCells(cells: ICell[]): void {
    cells
      .filter((cell) => this.cells.indexOf(cell) === -1)
      .forEach((cell) => { this.cells.push(cell) })

    this.render()
  }

  public clear(): void {
    this.svgElement.innerHTML = ''
  }

  public render(): void {
    this.clear()
    this.svgHtml = []

    // TODO nodes
    this.cells.forEach((cell: ICell) => {
      // cell.id = !cell.id || this._model[item.id] ? String(++this._autoindexId) : item.id
      // this._autoindexId = Number(this._autoindexId)
      this.svgHtml.push(cell.shape.getHtml())
    })

    this.svgElement.innerHTML = this.svgHtml.join('')
  }

  public appendSVGElement(element: SVGElement): void {
    this.svgElement.appendChild(element)
  }

  public zoomOut(): void {
    if (this.scale > this.minScale) {
      this.scale  = Number((this.scale /= this.zoomFactor).toFixed(2))
      this.render()
    }
  }

  public zoomIn(): void {
    if (this.scale < this.maxScale) {
      this.scale = Number((this.scale *= this.zoomFactor).toFixed(2))
      this.render()
    }
  }

  public addEventListener(eventName: EventDefine, callback: ICallBack): boolean {
    if (!this.listensMap[eventName]) {
      const item: IListensMapItem = {
        queue: [],
      }
      this.listensMap[eventName] = item
    }

    if (this.listensMap[eventName].queue.indexOf(callback) === -1) {
      this.listensMap[eventName].queue.push(callback)
      return true
    } else {
      return false
    }
  }

  public removeEventListener(eventName: EventDefine, callback: ICallBack): boolean {
    const index: number = this.listensMap[eventName].queue.indexOf(callback)
    if (!this.listensMap[eventName] || index === -1) {
      return false
    }
    this.listensMap[eventName].queue.splice(index, 1)
    return true
  }

  public eventTrigger(eventName: EventDefine, evt?: MouseEvent, data?: any): void {
    if (this.listensMap[eventName]) {
      this.listensMap[eventName].queue.forEach((callback: ICallBack) => {
        callback.apply(this, [evt, data])
      })
    }
  }

  public enableMouseWheel(isEnable: boolean = true): void {
    if (isEnable) {
      this.addEventListener(EventDefine.MOUSE_WHEEL_DOWN, this.zoomOut)
      this.addEventListener(EventDefine.MOUSE_WHEEL_UP, this.zoomIn)
    } else {
      this.removeEventListener(EventDefine.MOUSE_WHEEL_DOWN, this.zoomOut)
      this.removeEventListener(EventDefine.MOUSE_WHEEL_UP, this.zoomIn)
    }
  }

  public enableMouseRightOffset(isEnable: boolean): void {
    this.isMouseRightOffset = isEnable
  }

  private getShape(shape: string): IShape {
    return shapes[shape]
  }

  private initElement(): void {
    this.element.style.position = !this.element.style.position || this.element.style.position === 'static' ?
      'relative' : this.element.style.position

    this.svgElement = util.createSVGElement('svg')
    this.svgElement.style.cssText = [
      'padding: 0',
      'left: 0',
      'top: 0',
      'width: 100%',
      'height: 100%',
      'position: absolute',
      'z-index: 1',
    ].join(';')
    this.svgElement.setAttribute('xmlns', conf.SVG_NS)

    this.element.appendChild(this.svgElement)
  }

  private initMouseRightOffset(): void {
    const triggerPoint: IPoint = {
      x: 0,
      y: 0,
    }

    let isMouseDown: boolean = false

    this.element.oncontextmenu = () => {
      return !this.isMouseRightOffset
    }

    this.element.addEventListener('mousedown', (evt: MouseEvent) => {
      if (this.isMouseRightOffset && evt.button === 2) {
        isMouseDown = true
        triggerPoint.x = evt.x
        triggerPoint.y = evt.y
      }
    })

    this.element.addEventListener('mousemove', (evt: MouseEvent) => {
      if (isMouseDown && this.isMouseRightOffset) {
        const scale: number = this.getScale()

        this.offset.x += 1 / scale * (evt.x - triggerPoint.x)
        this.offset.y += 1 / scale * (evt.y - triggerPoint.y)
        triggerPoint.x = evt.x
        triggerPoint.y = evt.y
        this.render()
      }
    })

    this.element.addEventListener('mouseup', (evt: MouseEvent) => {
      if (isMouseDown && this.isMouseRightOffset && evt.button === 2) {
        isMouseDown = false
        triggerPoint.x = 0
        triggerPoint.y = 0
      }
    })
  }

  private initMouse(): void {
    this.element.addEventListener('mousewheel', (evt: MouseWheelEvent) => {
      if (this.isMouseWheel) {
        if (evt.deltaY > 0) {
          this.eventTrigger(EventDefine.MOUSE_WHEEL_DOWN, evt)
        } else {
          this.eventTrigger(EventDefine.MOUSE_WHEEL_UP, evt)
        }
      }
    })
  }
}

export default Graph
