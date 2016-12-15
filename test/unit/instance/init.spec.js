import Graph from 'core/index'

describe('Initialization', () => {
	it('element is null', () => {
		expect(Graph).to.throw(Error);
	})

	let graph = new Graph(document.body)

	it('should be has property _element', () => {
		expect(graph).to.have.property('_element')
	})

	it('element equal document.body', () => {
		expect(graph._element).to.equal(document.body)
	})

	it('should be has property _canvasElement', () => {
		expect(graph).to.have.property('_canvasElement')
	})

	it('should be has property _option', () => {
		expect(graph).to.have.property('_option')
	})

	describe('_canvasElement', () => {
		let style = graph._canvasElement.style

		it('width 100%', () => {
			expect(style.width).to.equal('100%')
		})

		it('height 100%', () => {
			expect(style.height).to.equal('100%')
		})

		it('padding 0', () => {
			expect(style.padding).to.equal('0px')
		})
	})

	describe('_element', () => {
		let style = graph._element.style

		it('position relative', () => {
			expect(style.position).to.equal('relative')
		})

	})

})
