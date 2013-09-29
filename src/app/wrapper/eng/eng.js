angular.module
(
	'adrrApp.wrapper.eng', []
)

.config
(
	function config ($stateProvider)
	{
		$stateProvider.state
		(
			'wrapper.eng',
			{
				abstract: true,
				
				views:
				{
					"@wrapper":
					{
						controller: 'EngCtrl',
						templateUrl: 'wrapper/eng/eng.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.eng.lab',
			{
				url: '^/labs',
				title: 'Labs',
				views:
				{
					"@wrapper.eng":
					{
						controller: 'LabCtrl',
						templateUrl: 'wrapper/eng/lab.tpl.html'
					}
				}
			}
		);
	}
)

.controller
(
	'EngCtrl', function ()
	{
		
	}
)

.controller
(
	'LabCtrl', function ($rootScope, $scope, yii, Restangular, $q)
	{
		$rootScope.pageHeader = 'Labs';
		
		$rootScope.breadcrumbItems = ['Home', 'Labs'];
		
		$scope.metaData = yii['Lab'];
		
		$q.all([Restangular.all('settings/shiftType').getList(), Restangular.all('settings/supplier').getList(), Restangular.all('settings/concreteType').getList(), Restangular.all('eng/labPlant').getList(), Restangular.all('eng/labTruck').getList()]).then
		(
			function (dataArr)
			{
				$scope.plants		 = angular.isArray(dataArr[3]) ? dataArr[3] : [];
				
				$scope.trucks		 = angular.isArray(dataArr[4]) ? dataArr[4] : [];
				
				$scope.suppliers	 = angular.isArray(dataArr[1]) ? dataArr[1] : [];
				
				$scope.shiftTypes	 = angular.isArray(dataArr[0]) ? dataArr[0] : [];
				
				$scope.concreteTypes = angular.isArray(dataArr[2]) ? dataArr[2] : [];
			}
		);
	}
);