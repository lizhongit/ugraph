# uGraph [![Build Status](https://travis-ci.org/nicholasjs/ugraph.svg?branch=master)](https://travis-ci.org/nicholasjs/ugraph)

uGraph is an MIT-license open source project, and it's a feature-rich JavaScript & SVG library for implementing custom
 interactive diagrams. Use very easy and has rich API, JSON format do as data type of import/export, 
 High performance render of Big-data

## Example
Make sure installed NodeJS in your computer before next step

Clone the source code to your local 

```bash
git clone git@github.com:lizhong8532/ugraph.git
```

And open the terminal in the source root

- Install lite-server command
```bash
npm i -g lite-server
```
Mac users need sudo permission of best

For Mac
```bash
sudo npm i -g lite-server 
```
- Start lite-server service
```bash
lite-server
```
It should be auto open Chrome browser and show the example.

## Usage
Insert the tag in the HTML
```html
<script src="dist/ugraph.js"></script>
```

Create a element for uGraph, and define height and width
```html
<div id="u-graph" style="width: 500px; height: 500px;"></div>
```

Initial uGraph
```javascript
var graph = new Graph(document.querySelector('#u-graph'));
```

## API

- `exportSvg() / exportPng() / exportJson()` 
return an `Export` Object, Has two API of the Object
    - `toString()` return string
    - `toFile([fileName])` Save as files
        - `fileName` If want to definition for save as files name
    

- `zoomOut()` 
Zoom out
 
- `zoomIn()` 
Zoom in

- `zoomActual()` 
Zoom actual, default value 1

- `setBackgroundImage(url)`
Set graph background image
    - `url` String, It's image URL

- `loadJson(jsonText)`
JSON text or Export JSON text, the data format
    - `jsonText` String, It's JSON string, format see below
```json
{
    "nodes": [
        {
          "x": "Number",
          "y": "Number",
          "width": "Number",
          "height": "Number",
          "shape": "circle|rect",
          "style": "fillColor=[color]",
          "value": "Text"
        }
    ]
} 
```

- `render()` 
Re-render SVG, most of the time don't use it, when data change just only

- `exportJson()`
Export JSON format text

## Shape
Current support all the shapes in the list
- `rect` 
- `circle`

## License
uGraph is licensed under the [MIT License](https://opensource.org/licenses/MIT)
