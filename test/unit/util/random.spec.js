import * as random from 'core/util/random'

describe('random', () => {
	describe('randomInt', () => {
		it('should be function', () => {
			expect(random.randomInt).to.be.a('function')
		})
	})
})
