/// <binding ProjectOpened='Auto-Compile' />
'use-strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var del = require('del');
const webpack = require('webpack-stream');
sass.compiler = require('node-sass');
const webpack_config = require('./webpack.config.js');

const reactFiles = [
    './react/index.tsx'
];

/**
 * COMPILE SCRIPTS
 * 
 * This function takes all JS within '~/scripts' and compiles them into '~/www/scripts/dist'.
 * On completion, site scripts will be production ready (minified & uglified).
 */
async function compileNewScripts() {
    console.log(`${await getCurrentTime()} Compiling '.js' files within '~/scripts' to 'www/scripts/dist' suffixed with '.min'.`);
    return await gulp.src('scripts/**/*.js')
        .pipe(uglify({ compress: true, mangle: true })
            .on('error', function (e) { console.log(e); }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('www/scripts/dist'));
}

/**
 * COMPILE REACT SCRIPTS
 *
 * This function takes all React js within '~/react' and compiles them into '~/www/react'.
 */
async function compileNewReactScripts() {
    console.log(`${await getCurrentTime()} Compiling React.js application within '~/react' via WebPack into '~/www/react'.`);
    return await gulp.src(reactFiles)
        .pipe(webpack(webpack_config, null, function (err, stats) {
            if (err !== null) {
                console.log(err);
            }
        }))
        .pipe(gulp.dest('./www/react/'));
}

/**
 * COMPILE STYLES
 * 
 * This function takes all SCSS within '~/styles' and compiles them into '~/www/styles/dist'.
 * On completion, site styles will be production ready (minified).
 */
async function compileNewStyles() {
    console.log(`${await getCurrentTime()} Compiling '.scss' files within '~/styles' to 'www/styles/dist' suffixed with '.min'.`);
    return await gulp.src('styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })
            .on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('www/styles/dist'));
}

/**
 * REMOVE OLD SCRIPTS
 * 
 * This function removes all previously compiled JavaScript '.dev' and '.min' files from '~/www/scripts/dist'.
 */
async function removeOldScripts() {
    console.log(`${await getCurrentTime()} Deleting all '.min' & '.dev' files within '~/www/scripts/dist'`);
    return await del([
        'www/scripts/dist/**/*.js'
    ]);
}

/**
 * REMOVE OLD REACT SCRIPTS
 * 
 * This function removes all previously compiled React '.dev' and '.min' files from '~/www/react/dist'.
 */
async function removeOldReactScripts() {
    console.log(`${await getCurrentTime()} Deleting all '.min' & '.dev' files within '~/www/react/dist'`);
    return await del([
        'www/react/**/*.*'
    ]);
}

/**
 * REMOVE OLD STYLES
 * 
 * This function removes all previously compiled CSS '.dev' and '.min' files from '~/www/styles/dist'.
 */
async function removeOldStyles() {
    console.log(`${await getCurrentTime()} Deleting all '.min' & '.dev' files within '~/www/styles/dist'`);
    return await del([
        'www/styles/dist/**/*.css'
    ]);
}

/**
 * GET CURRENT TIME
 * Returns [HH:MM:SS]
 */
async function getCurrentTime() {
    var currentdate = new Date(); 
    return await '[' + (currentdate.getHours() < 10 ? '0' + currentdate.getHours() : currentdate.getHours()) +
                 ':' + (currentdate.getMinutes() < 10 ? '0' + currentdate.getMinutes() : currentdate.getMinutes()) + 
                 ':' + (currentdate.getSeconds() < 10 ? '0' + currentdate.getSeconds() : currentdate.getSeconds()) + ']';
}

/**
 * Compile
 * 
 * CLI:
 * $gulp Compile
 */
gulp.task('Compile', async function() {
    console.log(`${await getCurrentTime()} Compile task initiated. See 'gulpfile.js' for process definitions.`);
    return await [ 
        await removeOldScripts(), 
        await compileNewScripts(),
        await removeOldReactScripts(),
        await compileNewReactScripts(),
        await removeOldStyles(), 
        await compileNewStyles()
    ];
});

 /**
 * Auto-Compile
 * 
 * CLI:
 * $gulp Auto-Compile
 */
gulp.task('Auto-Compile', async function() {
    console.log(`${await getCurrentTime()} Auto-Compile task initiated. See 'gulpfile.js' for process definitions.`);
    gulp.watch(['scripts/**/*.js'], async function () { return await [ await removeOldScripts(), await compileNewScripts() ];});
    gulp.watch(['styles/**/*.scss'], async function () { return await [await removeOldStyles(), await compileNewStyles()]; });
    gulp.watch(['react/**/*.tsx'], async function () { return await [await removeOldReactScripts(), await compileNewReactScripts()]; });
});
