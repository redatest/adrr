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
<<<<<<< HEAD
			'vendor/angular-ui-router/release/angular-ui-router.min.js'
=======
			'vendor/angular-ui-router/release/angular-ui-router.min.js',
			'vendor/jquery/jquery.min.js',
			'vendor/angular-bootstrap/ui-bootstrap.min.js'
>>>>>>> 1b0e00eacf9676cd4cb621c544d4a4c83e5ea353
		],
		css:
		[
			'vendor/bootstrap/dist/css/bootstrap.min.css'
		]
	}
};