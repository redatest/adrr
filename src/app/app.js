angular.module
(
	'adrrApp',
	[
		'templates-app',
		'templates-common',
		'ngGrid',
		'ui.router',
		'restangular',
		'adrrAuth',
		'adrrApp.login',
		'adrrApp.wrapper',
		'adrrApp.wrapper.dashboard',
		'adrrApp.wrapper.settings'
	]
)

.config
(
	function adrrAppConfig ($stateProvider, $urlRouterProvider, RestangularProvider)
	{
		$urlRouterProvider.otherwise(appConfig.loginRoute);
		
		RestangularProvider.setBaseUrl(appConfig.restfulApiBaseUrl + '/api');
		RestangularProvider.setMethodOverriders(["put"]);
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