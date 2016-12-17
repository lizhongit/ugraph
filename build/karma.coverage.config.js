// Karma configuration
// Generated on Sun Dec 04 2016 22:34:22 GMT+0800 (CST)
let base = require('./karma.base.config')

module.exports = function (config) {
	config.set(Object.assign(base, {

		reporters: ['coverage'],

		coverageReporter: {
			dir: '../coverage',
			reporters: [
				{ type: 'text-summary', subdir: '.' },
				{ type: 'html', subdir: 'report-html' }
			]
		},

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.ERROR,

		singleRun: true
	}))
}
