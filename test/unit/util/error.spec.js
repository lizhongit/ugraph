import * as util from 'core/util/error'

describe('error', () => {
	it('should be function', () => {
		expect(util.error).to.be.a('function');
	})

	it('throw', () => {
		expect(util.error).to.throw(Error);
	})
})
