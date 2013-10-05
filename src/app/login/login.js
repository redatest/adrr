angular.module
(
	'adrrApp.login', []
)

.config
(
	function config	($stateProvider)
	{
		$stateProvider.state
		(
			'login',
			{
				url: '/login',
				title: 'Login to Concrete App',
				views:
				{
					"login":
					{
						controller: 'LoginCtrl',
						templateUrl: 'login/login.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'logout',
			{
				url: '/logout',
				views:
				{
					"login":
					{
						controller: 'LogoutCtrl'
					}
				}
			}
		);
	}
)

.controller
(
	'LoginCtrl', function LoginCtrl ($scope, adrrAuth, $rootScope)
	{
		var beforeLoginUrl = String(window.location).split('/#/');
		
		$scope.login = function ()
		{
			adrrAuth.check($scope.username, $scope.password, beforeLoginUrl[1]).then
			(
				function (data)
				{
					$rootScope.isSenior = data.isSenior;
					$rootScope.isEng	= data.isEng;
					$rootScope.userName = data.name;
				}
			);
		};
	}
)

.controller
(
	'LogoutCtrl', function LogoutCtrl (adrrAuth)
	{
		adrrAuth.logout();
	}
);