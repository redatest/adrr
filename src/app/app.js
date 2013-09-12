angular.module
(
	'adrrApp',
	[
		'templates-app',
		'templates-common',
		'ui.router',
		'adrrAuth',
		'adrrApp.login',
		'adrrApp.wrapper',
		'adrrApp.wrapper.dashboard'
	]
)

.config
(
	function adrrAppConfig ($stateProvider, $urlRouterProvider)
	{
		$urlRouterProvider.otherwise(appConfig.loginRoute);
	}
)

.run
(
	function run (adrrAuth)
	{
		adrrAuth.check();
	}
)

.controller
(
	'AdrrAppCtrl', function AdrrAppCtrl ()
	{
	}
);