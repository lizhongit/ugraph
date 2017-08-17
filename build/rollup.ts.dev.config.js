import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/main.ts',
  format: 'umd',
  moduleName: 'ug',
  plugins: [buble(), (txt) => {
    console.log(txt)
    return txt
  }],
  dest: 'dist/ugraph_ts.js'
}
