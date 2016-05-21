import gulp from 'gulp'
import stylus from 'gulp-stylus'
import concat from 'gulp-concat'
import debug from 'gulp-debug'
import sourcemap from 'gulp-sourcemaps'
import gulpIf from 'gulp-if'
import autoprefixer from 'gulp-autoprefixer'

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

export default gulp.task('styles', () => {
	return gulp.src(['./app/styles/**/*.styl', './app/blocks/**/*.styl'])
		.pipe(gulpIf(isDevelopment, sourcemap.init()))
		.pipe(debug({title: 'src'}))
		.pipe(stylus())
		.pipe(debug({title: 'stylus'}))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(debug({title: 'autoprefixer'}))
		.pipe(concat('style.css'))
		.pipe(debug({title: 'concat'}))
		.pipe(gulpIf(isDevelopment, sourcemap.write('.')))
		.pipe(gulp.dest('./app/resources/styles'))
})
