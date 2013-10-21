var adrrApp = angular.module
(
	'adrrApp',
	[
		'templates-app',
		'templates-common',
		'ngGrid',
		'ui.router',
		'ui.bootstrap',
		'restangular',
		'ui.date',
		'adrrDirectives',
		'adrrAuth',
		'adrrApp.login',
		'adrrApp.wrapper',
		'adrrApp.wrapper.dashboard',
		'adrrApp.wrapper.settings',
		'adrrApp.wrapper.eng'
	]
)

.filter
(
	'keepOriginal', function ()
	{
		return function (items)
		{
			var sorted = {};

			var i = 0;

			angular.forEach
			(
				items, function (val, key)
				{
					sorted[i] = val;

					i++;
				}
			);

			return sorted;
		}
	}
)

.factory
(
    'adrrDataGetter', function ($http)
    {
        var targets = [];

        var timers  = [];

        function getData (sourceUrl, scope, target, method, args)
        {
            $http
            ({
                method: (method !== undefined ? method : 'GET'),
                url: sourceUrl,
                data: (args !== undefined ? args : null)
            }).success
            (
                function (data)
                {
                    scope[target] = angular.copy(data);
                }
            );
        }

        function set (sourceUrl, scope, target, time, method, args)
        {
            if (time !== undefined)
            {
                var timer = setInterval (getData, time, sourceUrl, scope, target, method, args);

                timers.push (timer);

                targets.push (target);
            }
        }

        return {
            set: set
        }
    }
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
	function run (adrrAuth, $rootScope)
	{
		adrrAuth.check().then
		(
			function (data)
			{
				$rootScope.isSenior = data.isSenior;
				$rootScope.isEng	= data.isEng;
				$rootScope.userName = data.name;
				$rootScope.userID	= data.id;
			}
		);
	}
)

.controller
(
	'AdrrAppCtrl', function AdrrAppCtrl ($scope, $state, $rootScope, adrrDataGetter)
	{
		$scope.state = $state.current.name;

		$scope.$on
		(
			'$stateChangeStart', function (a, b)
			{
				$scope.state = b.name;

				$rootScope.pageTitle = b.title;

				$rootScope.showAlert = false;
			}
		);
	}
);