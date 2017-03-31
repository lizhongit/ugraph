import Graph from 'core/index'

describe('JSON', () => {
  let graph = new Graph(document.body)
  let json = JSON.stringify({})

  it('has a loadJson property', () => {
    expect(graph).to.have.property('loadJson')
  })

  graph.loadJson(json)

  it('has a getJson property', () => {
    expect(graph).to.have.property('getJson')
  })

  it('test getJson', () => {
    expect(graph.getJson()).to.equal(json)
  })
})
