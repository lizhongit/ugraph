import buble from 'rollup-plugin-buble'

export default {
	entry: 'src/main.js',
	format: 'umd',
	moduleName: 'Graph',
	plugins: [
		buble()
	],
	dest: 'dist/ugraph.js'
}
