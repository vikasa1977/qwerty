var gulp = require("gulp"),
    concat = require('gulp-concat'),
    cssmin = require('gulp-css'),
    uglify = require("gulp-uglify"),
    templateCache = require('gulp-angular-templatecache'),
    sass = require('gulp-sass'),
    tfs = require('gulp-tfs-checkout'),
    concat = require("gulp-concat"),
    fs = require("fs"),
    pathLibrary = require("path"),
    es = require("event-stream"),
    //clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
   // minifycss = require('gulp-minify-css'),
   // jshint = require('gulp-jshint'),
    //runSequence = require('gulp-run-sequence'),
    gulpUtil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    //minifyHtml = require('gulp-minify-html'),
    templateCache = require('gulp-angular-templatecache');
    //folders = require('gulp-folders'),
    //sourcemaps = require('gulp-sourcemaps'),
    //gulpif = require('gulp-if'),
    //server = require('tiny-lr')(),
    //stripDebugStatements = require('gulp-strip-debug');


//autoprefixer = require('gulp-autoprefixer'),
//rtlcss = require('gulp-rtlcss'),
//rename = require('gulp-rename');


var gulpVersionNumber = '__buildVersion__';

var options = {
    css: {
        src: './distribution/platform/resources/css/',
        target: './distribution/platform/resources/css/'
    },
    platform: {
        src: "../smart2platform/workspace/",
        target: "./distribution/platform/",
        externalLibraries: "../smart2platform/distribution/platform/externalLibraries/"
    },
    analytics: {
        dashboard: {
            target: "./distribution/" + gulpVersionNumber + "_dashboard/"
        }
    },
    workspace: {
        target: "./distribution/" + gulpVersionNumber + "_workspace/",
    },
    src: "./workspace/",
    target: "./distribution/workspace.dist/",
};


gulp.task('sass', ['checkout', 'css'], function () {
    gulp.src('workspace/shared/resources/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('./workspace/shared/resources/css/'));

    gulp.watch('workspace/shared/resources/sass/**/*.scss', ['sass']);
});

gulp.task('checkout', function () {
    return gulp.src([
        'workspace/shared/resources/css/*',
    ])
        .pipe(tfs());
});

gulp.task('controllers', function () {
    return gulp.src([
        'workspace/**/*.controller.js'
    ])
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('distribution/workspace.dist/controllers'));
});

gulp.task('directives-1', function () {
    return gulp.src('workspace/shared/directivesPerformance/directives/**/*.directive.js')
        .pipe(concat('performanceDirectives.js'))
        .pipe(gulp.dest('distribution/workspace.dist/performanceDirectives'));
});

gulp.task('directives-2', function () {
    return gulp.src('workspace/shared/directives/**/*.directive.js')
        .pipe(concat('performanceDirectivesTwo.js'))
        .pipe(gulp.dest('distribution/workspace.dist/performanceDirectives'));
});

// Minify the directives and place in the same folder directory
var jsFilesDirectives = {
    "resizable": 1,
    "slider": 1
};
function createTask(taskName) {
    gulp.task(taskName, function () {
        return gulp.src("workspace/shared/directives/" + taskName + "/*.directive.js")
            .pipe(concat(taskName + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('workspace/shared/directives/' + taskName));
    });
}
var defaultTasksDirectives = [];
for (var key in jsFilesDirectives) {
    createTask(key);
    defaultTasksDirectives.push(key);
}
gulp.task('each-directive', defaultTasksDirectives, function () {
});

// Minify the controllers and place the minified file in the same directory
var jsFilesControllers = {
    "Performance_p2pInvnonPoBasicDetails.controller": "workspace/p2p/inv/controllers"
};
function createTaskCntrl(taskName) {
    gulp.task(taskName, function () {
        return gulp.src(jsFilesControllers[taskName] + '/' + taskName + ".js")
            .pipe(concat(taskName + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(jsFilesControllers[taskName]));
    });
}
var defaultTasksControllers = [];
for (var key in jsFilesControllers) {
    createTaskCntrl(key);
    defaultTasksControllers.push(key);
}
gulp.task('each-controllers', defaultTasksControllers, function () {
});


// To minify the services
gulp.task('services', function () {
    return gulp.src('workspace/**/*.service.js')
        .pipe(concat('performanceServices.js'))
        .pipe(gulp.dest('distribution/workspace.dist/performanceServices'));
});

gulp.task('libraries', function () {
    return gulp.src([
        'workspace/shared/resources/js/dataInspector.js',
        'workspace/shared/resources/js/ResizeMultipleTool.js',
        'workspace/shared/resources/js/slick.js'
    ])
        .pipe(concat('ext_lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('workspace/shared/resources/js'));
});

// Cache the templates for invoice
var htmlInvoiceConfig = {
    srcTemplates: [
        'workspace/p2p/inv/views/*.html'
    ],
    destPartials: 'workspace/p2p/'
};
gulp.task('invoice-templates', ['popup-templates'], function () {
    return gulp.src(htmlInvoiceConfig.srcTemplates)
        .pipe(templateCache('invoiceTemplateCache.js', {
            module: 'SMART2', standalone: false,
            transformUrl: function (arg1) {
                //var pathArr = (folderFound.pathTarget).split(pathLibrary.sep);
                //pathArr = pathArr.splice(2);
                //var pathStr = pathArr.join("/");
                return 'p2p/inv/views/' + arg1;//pathLibrary.join(pathStr, arg1);
            }
        })
        ).pipe(gulp.dest(htmlInvoiceConfig.destPartials));
});

// Cache the templates for pop up pages
var htmlPopupConfig = {
    srcTemplates: [
        'workspace/shared/popup/views/*.html'
    ],
    destPartials: 'workspace/shared/popup/'
};

gulp.task('popup-templates', function () {
    return gulp.src(htmlPopupConfig.srcTemplates)
        .pipe(templateCache('popupTemplateCache.js', {
            module: 'SMART2', standalone: false,
            transformUrl: function (arg1) {
                //var pathArr = (folderFound.pathTarget).split(pathLibrary.sep);
                //pathArr = pathArr.splice(2);
                //var pathStr = pathArr.join("/");
                return 'shared/popup/views/' + arg1;//pathLibrary.join(pathStr, arg1);
            }
        })
        ).pipe(gulp.dest(htmlPopupConfig.destPartials));
});


gulp.task('sass', ['checkout'], function () {
    gulp.src('workspace/shared/resources/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('./workspace/shared/resources/css/'));

    gulp.watch('workspace/shared/resources/sass/**/*.scss', ['sass']);
});

gulp.task('checkout', function () {
    return gulp.src([
        'workspace/shared/resources/css/*',
    ])
        .pipe(tfs());
});


//var dashboardTasks = require('./customGulp/analytics/dashboard/tasks');
//dashboardTasks.register(gulp, options);
