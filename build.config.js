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
			'vendor/angular/angular.min.js',
			'vendor/angular-ui-router/release/angular-ui-router.min.js'
		],
		css:
		[
			'vendor/bootstrap/dist/css/bootstrap.min.css'
		]
	}
};