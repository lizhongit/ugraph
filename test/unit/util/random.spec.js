import * as random from 'core/util/random'

describe('random', () => {

  describe('randomRgb', () => {
    it('should be function', () => {
      expect(random.randomRgb).to.be.a('function')
    })
  })

  describe('randomInt', () => {
    it('should be function', () => {
      expect(random.randomInt).to.be.a('function')
    })

    describe('No params', () => {
      let num = random.randomInt()
      it('should be a number', () => {
        expect(num).to.be.a('number')
      })

      it('>=  0', () => {
        expect(num >= 0).to.equal(true)
      })

      it('<=  1000', () => {
        expect(num <= 1000).to.equal(true)
      })
    })

    describe('>= 50', () => {
      let num = random.randomInt(50)
      it('should be a number', () => {
        expect(num).to.be.a('number')
      })

      it('>=  50', () => {
        expect(num >= 50).to.equal(true)
      })

      it('<=  1000', () => {
        expect(num <= 1000).to.equal(true)
      })
    })

    describe('>= 50 and <= 100', () => {
      let num = random.randomInt(50, 100)
      it('should be a number', () => {
        expect(num).to.be.a('number')
      })

      it('>=  50', () => {
        expect(num >= 50).to.equal(true)
      })

      it('<= 100', () => {
        expect(num <= 100).to.equal(true)
      })
    })

  })
})
