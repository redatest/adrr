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
	'WrapperCtrl', function ($scope, $rootScope, $state)
	{
		$rootScope.configModal = function (title, message, btnClass, func)
		{
			$rootScope.modalTitle = title;
			$rootScope.modalMessage = message;
			$rootScope.modalBtnClass = btnClass;
			$rootScope.modalFunc = func;
		}
	}
);