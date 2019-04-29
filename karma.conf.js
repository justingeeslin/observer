// Karma configuration
// Generated on Tue Feb 02 2016 00:54:15 GMT-0600 (CST)
var istanbul = require('browserify-istanbul');
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'browserify'
    ],


    // list of files / patterns to load in the browser
    files: [
			'https://code.jquery.com/jquery-3.4.0.js',
      'dist/style.css',
			'tests/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/*.js': ['browserify'],
    },

    browserify: {
        debug: true,
        transform: [
          istanbul({})
        ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'progress',
      'coverage'
      // 'html'
    ],

    coverageReporter : {
      reporters: [
        { type : 'lcov', dir : 'coverage/' },
        { type : 'lcovonly', subdir : '.', file: 'lcov.info' }
      ]

    },

    client: {
      useIframe: true
    },

    htmlReporter: {
      outputFile: 'tests/index.html',

      // Optional
      pageTitle: 'Sensible Unit Tests',
      // subPageTitle: '',
      groupSuites: true,
      useCompactStyle: true
      // useLegacyStyle: true
    },

    // web server port
    port: 9876,

    hostname: 'localhost',

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // logLevel: config.LOG_INFO,

    // browserConsoleLogOptions: {level: "error", format: "%b %T: %m", terminal: true},


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      // 'chrome_perf',
      // 'IE10',
      // 'IE11',
      'Safari',
      // 'Firefox',
      // 'IE11'
    ],

		customLaunchers: {
				Chrome_travis_ci: {
						base: 'Chrome',
						flags: ['--no-sandbox']
				},
        chrome_perf: {
            base: 'Chrome',
            flags: ['--disable-popup-blocking', '--enable-gpu-benchmarking', '--enable-threaded-compositing']
        },
        'IE10': {
          base: 'WebDriver',
          config: {
            hostname: '192.168.2.25',
            port: 4444
          },
          browserName: 'internet explorer',
          platform: 'Windows 8',
          version: '10',
          'x-ua-compatible': 'IE=EmulateIE10',
          name: 'Karma',
          pseudoActivityInterval: 30000
        },
        'IE11': {
          base: 'WebDriver',
          config: {
            hostname: '192.168.2.25',
            port: 4444
          },
          browserName: 'internet explorer',
          platform: 'Windows 8',
          version: '10',
          // 'x-ua-compatible': 'IE=EmulateIE10',
          name: 'Karma',
          pseudoActivityInterval: 30000
        },
		},

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })

  if (process.env.TRAVIS || process.env.CIRCLECI) {
		config.browsers = ['Chrome_travis_ci'];
	}
}
