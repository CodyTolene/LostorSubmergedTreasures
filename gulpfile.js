/// <binding ProjectOpened='Auto-Compile-Production' />
'use-strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var del = require('del');
sass.compiler = require('node-sass');

/**
 * COMPILE SCRIPTS
 * 
 * This function takes all JS within '~/scripts' and compiles them into '~/www/scripts/dist'.
 * 
 * Files will be suffixed with '.dev' or '.min' depending on 'isProduction'.
 * if(!isProduction) = On completion, your site scripts are ready to be tested using development files (!minified & !uglified).
 * if(isProduction)  = On completion, your site scripts will be production ready (minified & uglified).
 */
async function compileNewScripts(isProduction) {
    console.log(`${await getCurrentTime()} Compiling '~/scripts' into 'www/scripts/dist' suffixed with '.${isProduction ? 'min' : 'dev'}'.`);
    if(isProduction){
        return await gulp.src('scripts/**/*.js')
            .pipe(uglify({ compress: true, mangle: true })
                .on('error', function (e) { console.log(e); }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('www/scripts/dist'));
    } else {
        return await gulp.src('scripts/**/*.js')
            .pipe(rename({ suffix: '.dev' }))
            .pipe(gulp.dest('www/scripts/dist'));
    }
}

/**
 * COMPILE STYLES
 * 
 * This function takes all SCSS within '~/styles' and compiles them into '~/www/styles/dist'.
 * 
 * Files will be suffixed with '.dev' or '.min' depending on 'isProduction'.
 * if(!isProduction) = On completion, your site styles are ready to be tested using development files (!minified).
 * if(isProduction)  = On completion, your site styles will be production ready (minified).
 */
async function compileNewStyles(isProduction) {
    console.log(`${await getCurrentTime()} Compiling '~/styles' into 'www/styles/dist' suffixed with '.${isProduction ? 'min' : 'dev'}'.`);
    if(isProduction){
        return await gulp.src('styles/**/*.scss')
            .pipe(sass({ outputStyle: 'compressed' })
                .on('error', sass.logError))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('www/styles/dist'));
    } else {
        return await gulp.src('styles/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(rename({ suffix: '.dev' }))
            .pipe(gulp.dest('www/styles/dist'));
    }
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
 * DEVELOPMENT RUN (SINGLE)
 * 
 * CLI:
 * $gulp Development
 */
gulp.task('Development', async function() {
    console.log(`${await getCurrentTime()} Development task initiated. See 'gulpfile.js' for process definitions.`);
    return await [ 
        await removeOldScripts(), 
        await compileNewScripts(false),
        await removeOldStyles(),
        await compileNewStyles(false)
    ];
});

/**
 * PRODUCTION RUN (SINGLE)
 * 
 * CLI:
 * $gulp Production
 */
gulp.task('Production', async function() {
    console.log(`${await getCurrentTime()} Production task initiated. See 'gulpfile.js' for process definitions.`);
    return await [ 
        await removeOldScripts(), 
        await compileNewScripts(true),
        await removeOldStyles(), 
        await compileNewStyles(true)
    ];
});

 /**
 * DEVELOPMENT RUN (AUTO-COMPILED)
 * 
 * CLI:
 * $gulp Auto-Compile-Development
 */
gulp.task('Auto-Compile-Development', async function() {
    console.log(`${await getCurrentTime()} Auto-Compile-Development task initiated. See 'gulpfile.js' for process definitions.`);
    gulp.watch(['scripts/**/*.js'], async function () { return await [ await removeOldScripts(), await compileNewScripts(false) ];});
    gulp.watch(['styles/**/*.scss'], async function () { return await [ await removeOldStyles(), await compileNewStyles(false) ];});
});

 /**
 * PRODUCTION RUN (AUTO-COMPILED)
 * 
 * CLI:
 * $gulp Auto-Compile-Production
 */
gulp.task('Auto-Compile-Production', async function() {
    console.log(`${await getCurrentTime()} Auto-Compile-Production task initiated. See 'gulpfile.js' for process definitions.`);
    gulp.watch(['scripts/**/*.js'], async function () { return await [ await removeOldScripts(), await compileNewScripts(true) ];});
    gulp.watch(['styles/**/*.scss'], async function () { return await [ await removeOldStyles(), await compileNewStyles(true) ];});
});
