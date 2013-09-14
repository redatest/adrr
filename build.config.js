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
			'vendor/jquery/jquery.min.js',
			'vendor/jquery-ui/ui/jquery-ui.js',
			'vendor/angular/angular.min.js',
			'vendor/angular-ui-router/release/angular-ui-router.min.js',
			'vendor/ng-grid/build/ng-grid.min.js',
			'vendor/angular-ui-date/src/date.js',
			'vendor/bootstrap/dist/js/bootstrap.min.js',
			'vendor/lodash/lodash.js',
			'vendor/restangular/dist/restangular.js'
		],
		css:
		[
			'vendor/bootstrap/dist/css/bootstrap.min.css',
			'vendor/ng-grid/ng-grid.min.css'
		]
	}
};
