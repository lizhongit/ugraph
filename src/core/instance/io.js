import * as date from '../util/date'

let _a = document.createElement('a')
let _canvas = document.createElement('canvas')

const returns = (str, prefix, ext, w, h) => {
  let o = {}
  o.toString = () => {
    return str
  }
  o.toFile = (fileName) => {
    let name = fileName ? fileName : 'ugraph_export_' + date.getDateFormat() + '.' + ext

    if (ext === 'png') {
      _canvas.width = w
      _canvas.height = h
      let context = _canvas.getContext('2d')
      let image = new Image
      image.onload = function() {
        context.drawImage(image, 0, 0)
        _a.download = name
        _a.href = _canvas.toDataURL('image/' + ext)
        _a.click()
      }
      image.src = prefix + str
    } else {
      if (ext === 'svg') {
        str = '<?xml version="1.0" encoding="UTF-8"?>' + str
      }
      _a.href = 'data:' + prefix + str
      _a.download = name
      _a.click()
    }
  }
  return o
}

export default (Graph) => {

  Graph.prototype.exportJson = function () {
    let json = JSON.stringify(this._json)
    return returns(json, 'text/json;charset=utf-8,', 'json')
  }

  Graph.prototype.exportSvg = function () {
    return returns(this._svgElement.outerHTML, 'text/svg;charset=utf-8,', 'svg')
  }

  Graph.prototype.exportPng = function () {
    let s = window.btoa(new XMLSerializer().serializeToString(this._svgElement))
    return returns(s, 'data:image/svg+xml;base64,', 'png', this._svgElement.clientWidth, this._svgElement.clientHeight)
  }
}
