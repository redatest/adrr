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
            'vendor/jquery-file-upload/js/jquery.iframe-transport.js',
            'vendor/jquery-file-upload/js/jquery.fileupload.js',
            'vendor/jquery-file-upload/js/jquery.fileupload-process.js',
            'vendor/jquery-file-upload/js/jquery.fileupload-image.js',
            'vendor/jquery-file-upload/js/jquery.fileupload-audio.js',
            'vendor/jquery-file-upload/js/jquery.fileupload-video.js',
            'vendor/jquery-file-upload/js/jquery.fileupload-jquery-ui.js',
            'vendor/jquery-file-upload/js/fileupload-validate.js',
            'vendor/jquery-file-upload/js/jquery.fileupload-ui.js',

            'vendor/select2/select2.js',

            'vendor/bootstrap/dist/js/bootstrap.min.js',

            'vendor/angular/angular.min.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'vendor/angular-ui-router/release/angular-ui-router.min.js',
            'vendor/ng-grid/plugins/ng-grid-flexible-height.js',
            'vendor/ng-grid/build/ng-grid.min.js',
            'vendor/angular-ui-date/src/date.js',
            'vendor/angular-ui-select2/src/select2.js',
            'vendor/jquery-file-upload/js/jquery.fileupload-angular.js',

            'vendor/restangular/dist/restangular.js',
            'vendor/jquery-backstretch/jquery.backstretch.min.js',

            'vendor/jquery.slimScroll/jquery.slimscroll.min.js',

            'vendor/d3/d3.min.js'
        ],

        css: [
            'vendor/bootstrap/dist/css/bootstrap.min.css',
            'vendor/ng-grid/ng-grid.min.css',
            'vendor/jquery-ui/themes/flick/jquery-ui.min.css',
            'vendor/select2/select2.css'
        ]
    }
};