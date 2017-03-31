import * as util from 'core/util/error'

describe('Error', () => {
  it('should be function', () => {
    expect(util.error).to.be.a('function')
  })

  it('throw', () => {
    expect(util.error).to.throw(Error)
  })
})
