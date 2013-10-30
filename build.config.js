module.exports =
{
    compile_dir: 'bin',

    app_files: {
        js: ['src/**/*.js'],
        atpl: ['src/app/**/*.tpl.html'],
        ctpl: ['src/common/**/*.tpl.html'],
        less: ['src/less/main.less', 'src/less/login.less']
    },

    vendor_files: {
        js: [
            'vendor/lodash/lodash.js',

            'vendor/jquery/jquery.min.js',
            'vendor/jquery-ui/ui/minified/jquery-ui.min.js',
//            'vendor/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.js',

            'vendor/select2/select2.js',

            'vendor/bootstrap/dist/js/bootstrap.min.js',

            'vendor/angular/angular.min.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'vendor/angular-ui-router/release/angular-ui-router.min.js',
            'vendor/ng-grid/plugins/ng-grid-flexible-height.js',
            'vendor/ng-grid/build/ng-grid.min.js',
            'vendor/angular-ui-date/src/date.js',
            'vendor/angular-ui-select2/src/select2.js',

            'vendor/restangular/dist/restangular.js',
            'vendor/jquery-backstretch/jquery.backstretch.min.js',

            'vendor/angular-strap/angular-strap.min.js',

            'vendor/jquery.slimScroll/jquery.slimscroll.min.js'
        ],

        css: [
            'vendor/bootstrap/dist/css/bootstrap.min.css',
            'vendor/ng-grid/ng-grid.min.css',
            'vendor/jquery-ui/themes/flick/jquery-ui.min.css',
            'vendor/select2/select2.css'
//            'vendor/jQuery-Timepicker-Addon/jquery-ui-timepicker-addon.css'
        ]
    }
};