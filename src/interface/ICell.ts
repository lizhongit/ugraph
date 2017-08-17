import ICellObject from './ICellObject'
import IShape from './IShape'

interface ICell extends ICellObject {
  shape: IShape
}

export default ICell
