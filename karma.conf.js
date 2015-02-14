module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: [], // use gulp.src (gulp-karma)

    autoWatch: false,

    browsers: [
      'PhantomJS'
    ],

    singleRun: true,

    reporters: [
      'progress'
    ],

    webpackMiddleware: {
      quiet: true
    },

    preprocessors: {
      './.tmp/test/**/*.js': ['webpack']
    }
  });
};
