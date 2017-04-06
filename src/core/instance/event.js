import { error } from '../util/console'

class Event {
  constructor () {
    this.isStop = false
  }
  stop () {
    this.isStop = true
  }
}

class EventCursor {
  constructor (arr, index, fn) {
    this.arr = arr
    this.index = index
    this.fn = fn
  }

  remove () {
    this.fn._disabeld = true
  }

  restore () {
    this.fn._disabeld = false
  }
}

const triggerEvent = function (eventName) {
  if (eventListens[eventName]) {
    let evt = new Event
    eventListens[eventName].fns.forEach((item) => {
      if (!evt.isStop && !item._disabeld) {
        item.fn.apply(this, [evt])
      }
    })
  }
}

const EVENT_NAMES = {
  CLICK: 'click'
}

let eventListens = {}

for (let name in EVENT_NAMES) {
  eventListens[EVENT_NAMES[name]] = {
    fns: []
  }
}

export default (Graph) => {


  Graph.prototype.EVENT = EVENT_NAMES

  Graph.prototype.eventTrigger = function (eventName = '') {
    triggerEvent.apply(this, [eventName])
  }

  Graph.prototype.addEventListener = function (eventName, fn) {
    if (eventListens[eventName] && typeof fn === 'function') {
      let item = { fn:fn }
      eventListens[eventName].fns.push(item)
      return new EventCursor(eventListens[eventName].fns, eventListens[eventName].fns.length - 1, item)
    } else {
      if (!eventListens[eventName]) {
        error('Unknown this event name:' + eventName + ', please see the EVENT definition.')
      } else if (typeof fn !== 'function') (
        error('The second param must be a function.')
      )
    }
  }
}
