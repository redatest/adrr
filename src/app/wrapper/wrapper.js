angular.module
(
	'adrrApp.wrapper', []
)

.factory
(
	'yii', function ($q, $http)
	{
		var deferred = $q.defer();

		$http
		({
			method: 'GET',
			url: appConfig.restfulApiBaseUrl + '/metaData'
		})
		.success
		(
			function (data)
			{
				deferred.resolve(data);
			}
		);
		
		return deferred.promise;
	}
)

.config
(
	function config	($stateProvider)
	{
		$stateProvider.state
		(
			'wrapper',
			{
				abstract: true,
				
				resolve:
				{
					yii: 'yii'
				},
				
				views:
				{
					'@':
					{
						controller: 'WrapperCtrl',
						templateUrl: 'wrapper/wrapper.tpl.html'
					}
				}
			}
		)
	}
)

.controller
(
	'WrapperCtrl', function ($scope, $state)
	{
		$scope.state = $state.current.name;
		
		$scope.$on
		(
			'$stateChangeStart', function (a, b)
			{
				$scope.state = b.name;
			}
		);
	}
);