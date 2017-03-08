module.exports = {
  port: 8000,
  files: [
    './examples/**/*'
  ],
  server: {
    baseDir: './',
    index: 'index.html'
  },
  browser: "google chrome",
  startPath: "/examples/index.html"
}