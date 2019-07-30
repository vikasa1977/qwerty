'use strict';

var concat = require("gulp-concat"),
sourcemaps = require('gulp-sourcemaps');


module.exports = {
    register: function (gulp, options) {
        gulp.task('dashboardJSLibs', function () {
            return gulp.src([
                "workspace/shared/libraries/jquery-2.1.1.min.lib.js",
                "workspace/shared/libraries/jquery-ui.min.lib.js",
                "workspace/shared/libraries/underscore-min.lib.js",
                //"workspace/shared/libraries/highchart/highcharts.min.lib.js",
                //"workspace_ng5/shared/libraries/highchart/heatmap.min.lib.js",
                //"workspace_ng5/shared/libraries/highchart/treemap.min.lib.js",
                "workspace/shared/libraries/gridstack/gridstack.lib.js",
                "workspace/shared/libraries/gridstack/gridstack.jQueryUI.js",
                "workspace_ng5/shared/assets/svg/icons-svg.js",
                "workspace_ng5/shared/assets/svg/icons-svg-platform.service.js"
            ])
            .on('error', function () { })
            .pipe(sourcemaps.init())
            .pipe(concat('JSLibs.js'))
            .pipe(gulp.dest(options.analytics.dashboard.target))
        });
    }
};

