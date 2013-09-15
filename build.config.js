module.exports =
{
	compile_dir: 'bin',
	
	app_files:
	{
		js: ['src/**/*.js'],
		atpl: ['src/app/**/*.tpl.html'],
		ctpl: ['src/common/**/*.tpl.html'],
		less: 'src/less/main.less'
	},
	
	vendor_files:
	{
		js:
		[
			'vendor/lodash/lodash.js',
			
			'vendor/jquery/jquery.min.js',
<<<<<<< HEAD
			'vendor/jquery-ui/ui/minified/jquery-ui.min.js',
			
			'vendor/bootstrap/dist/js/bootstrap.min.js',
			
=======
			'vendor/jquery-ui/ui/minified/i18n/jquery-ui.min.js',
			'vendor/bootstrap/dist/js/bootstrap.min.js',
>>>>>>> cbb2b8ac391e3f642f9bab8520d5cb8f9eeab910
			'vendor/angular/angular.min.js',
			'vendor/angular-ui-router/release/angular-ui-router.min.js',
			'vendor/ng-grid/build/ng-grid.min.js',
			'vendor/angular-ui-date/src/date.js',
<<<<<<< HEAD
			
			'vendor/restangular/dist/restangular.js',
=======

			'vendor/lodash/lodash.js',
			'vendor/restangular/dist/restangular.js'
>>>>>>> cbb2b8ac391e3f642f9bab8520d5cb8f9eeab910
		],
		css:
		[
			'vendor/bootstrap/dist/css/bootstrap.min.css',
			'vendor/ng-grid/ng-grid.min.css',
			'vendor/jquery-ui/themes/flick/jquery-ui.min.css'
		]
	}
};
