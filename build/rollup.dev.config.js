import buble from 'rollup-plugin-buble'

export default {
	entry: 'src/main.js',
	format: 'umd',
	moduleName: 'uGraph',
	plugins: [
		buble()
	],
	dest: 'dist/ugraph.js'
}
