var adrrLogin = angular.module
(
	'adrrApp.login', []
)

.directive
(
	'backstretch',
	
    function()
	{
	    return {
		    restrict: 'A',
			
		    link: function (scope, element, attr)
			{
			    element.backstretch ([attr.bg1,attr.bg2,attr.bg3], {duration: 3000, fade: 750} );
		    }
	    };
    }
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
					$rootScope.userID	= data.id;
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