// import buble from 'rollup-plugin-buble'
import typescript from 'rollup-plugin-typescript'

export default {
  // entry: 'built/main.js',
  entry: 'src/main.ts',
  format: 'umd',
  moduleName: 'ug',
  plugins: [typescript()],
  dest: 'dist/ugraph.js'
}
