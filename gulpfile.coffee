gulp = require 'gulp'
gutil = require 'gulp-util'
typescript = require 'gulp-typescript'
browserSync = require 'browser-sync'

paths =
  appDir: './app'
  appViewFiles: './app/views/**/*.html'
  appFiles: './app/**/*.ts'
  testFiles: './test/**/*.ts'
  distDir: './dist'
  distViewDir: './dist/views'
  compiledApp: './.tmp/app/scripts/app.js'
  compiledAppFiles: './.tmp/app/**/*.js'
  compiledAppDir: './.tmp/app'
  compiledTestFiles: './.tmp/test/**/*.js'
  compiledTestDir: './.tmp/test'
  coverageDir: './coverage'

typescriptProject = typescript.createProject
  declarationFiles: true
  # noExternalResolve: true
  target: 'ES5'
  module: 'commonjs'

gulp.task 'build', (done) ->
  run = require 'run-sequence'
  run.apply run, [
    'typescript'
    'webpack'
    'font'
    'less'
    'html'
    done
  ]
  null

gulp.task 'clean', (done) ->
  del = require 'del'
  del [
    paths.compiledAppDir
    paths.compiledTestDir
    paths.distDir
  ], done

gulp.task 'default', ->
  run = require 'run-sequence'
  run.apply(run, ['clean', 'build'])

gulp.task 'deps', ['tsd']

gulp.task 'font', ->
  gulp
    .src './bower_components/bootstrap/dist/fonts/*'
    .pipe gulp.dest paths.distDir + '/fonts'

gulp.task 'html', ->
  rev = require 'gulp-rev'
  usemin = require 'gulp-usemin'
  merge = require 'merge-stream'
  merge(
    gulp
      .src paths.appDir + '/index.html'
      .pipe usemin(
        css: [rev()]
        vendorjs: [rev()]
        mainjs: [rev()]
      )
      .pipe gulp.dest paths.distDir
  ,
    gulp
      .src paths.appViewFiles
      .pipe gulp.dest paths.distViewDir
  ).pipe browserSync.reload(stream: true)

gulp.task 'karma', (done) ->
  karma = require 'gulp-karma'
  gulp
    .src paths.compiledTestFiles
    .pipe karma(
      configFile: 'karma.conf.js'
      aciton: 'run'
    )
    .on 'error', (e) ->
      gutil.log e
      @emit 'end'
    .on 'end', done
  null

gulp.task 'less', ->
  less = require 'gulp-less'
  gulp
    .src paths.appDir + '/styles/**/*.less'
    .pipe less()
    .on 'error', (e) ->
      gutil.log e
      @emit 'end'
    .pipe gulp.dest paths.distDir + '/styles'
    .pipe browserSync.reload(stream: true)

gulp.task 'test', (done) ->
  run = require 'run-sequence'
  run.apply run, [
    'typescript-app'
    'typescript-test'
    'karma'
    done
  ]
  null

gulp.task 'tsd', ->
  tsd = require 'tsd'
  path = require 'path'
  api = new tsd.getAPI(path.resolve(__dirname, 'tsd.json'))
  api.readConfig().then ->
    options = tsd.Options.fromJSON
      overwriteFiles: true
      saveToConfig: false
    api.reinstall options

gulp.task 'typescript', ->
  sourcemaps = require 'gulp-sourcemaps'
  merge = require 'merge-stream'
  compiled = gulp
    .src paths.appFiles
    .pipe sourcemaps.init()
    .pipe typescript typescriptProject
  merge(
    compiled.dts.pipe gulp.dest paths.compiledAppDir
    compiled.js.pipe(sourcemaps.write()).pipe gulp.dest paths.compiledAppDir
  )

gulp.task 'typescript-app', ->
  sourcemaps = require 'gulp-sourcemaps'
  gulp
    .src paths.appFiles
    .pipe sourcemaps.init()
    .pipe typescript typescriptProject
    .js
    .pipe sourcemaps.write()
    .pipe gulp.dest paths.compiledAppDir

gulp.task 'typescript-test', ->
  espower = require 'gulp-espower'
  sourcemaps = require 'gulp-sourcemaps'
  gulp
    .src paths.testFiles
    .pipe sourcemaps.init()
    .pipe typescript typescriptProject
    .js
    .pipe espower()
    .pipe sourcemaps.write()
    .pipe gulp.dest(paths.compiledTestDir)

gulp.task 'test-and-build', (done) ->
  run = require 'run-sequence'
  run.apply run, [
    'test'
    'build'
    done
  ]
  null

gulp.task 'watch', ['build'], ->
  gulp.watch [
    paths.appFiles
    paths.appViewFiles
    paths.testFiles
    paths.appDir + '/styles/**/*.less'
    paths.appDir + '/index.html'
  ], ['test-and-build']
  browserSync
    port: parseInt(process.env.PORT ? '5000')
    server:
      baseDir: './dist'

gulp.task 'webpack', ->
  webpack = require 'gulp-webpack'
  options =
    output:
      filename: 'main.js'
    resolve:
      extensions: ['', '.js']
    devtool: 'eval'
  gulp
    .src paths.compiledApp
    .pipe webpack options
    .pipe gulp.dest paths.distDir + '/scripts'
