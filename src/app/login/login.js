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
	'LoginCtrl', function LoginCtrl ($scope)
	{
	}
)

.controller
(
	'LogoutCtrl', function LogoutCtrl ()
	{
	}
);