import Graph from 'core/index'

describe('Initialization', () => {
	it('element is null', () => {
		expect(Graph).to.throw(Error)
	})

	let graph = new Graph(document.body)

	it('should be has property _element', () => {
		expect(graph).to.have.property('_element')
	})

	it('element equal document.body', () => {
		expect(graph._element).to.equal(document.body)
	})

	it('should be has property _svgElement', () => {
		expect(graph).to.have.property('_svgElement')
	})

	it('should be has property _option', () => {
		expect(graph).to.have.property('_option')
	})

	describe('setShape', () => {
		it('should be a function ', () => {
			expect(graph.setShape).to.be.a('function')
		})

		let shape = () => {}
		graph.setShape('testShape', shape)
		it('has a testShape', () => {
			expect(graph.getShape('testShape')).to.equal(shape)
		})
	})

	describe('_svgElement', () => {
		let style = graph._svgElement.style

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
