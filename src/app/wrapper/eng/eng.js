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
		
		$scope.getItemById = function (arr, id)
		{
			if (!angular.isUndefined(arr))
			{
				var arrLength = arr.length;
				
				for (var i = 0; i < arrLength; i++)
				{
					if (arr[i].id === id)
					{
						return arr[i];
					}
				}
			}
		}
		
		$scope.$watch
		(
			'supplierId', function (newVal)
			{
				if (!angular.isUndefined(newVal) && newVal !== '')
				{
					$scope.ticket = $scope.getItemById($scope.suppliers, newVal).prefix + '-';
				}
			}
		);
		
		$scope.model = Restangular.all('eng/lab');
		
		$scope.submit = function ()
		{
			$scope.model.post
			({
				date:		  $scope.date,
				shift_id:	  $scope.shiftId,
				supplier_id:  $scope.supplierId,
				conc_type_id: $scope.concTypeId,
				plant:		  $scope.plant,
				truck:		  $scope.truck,
				ticket:		  $scope.ticket,
				dept_time:	  $scope.deptTime,
				arriv_time:	  $scope.arrivTime,
				truck_load:	  $scope.truckLoad
			}).then
			(
				function ()
				{
					$scope.date = null;
					$scope.shiftId = '';
					$scope.supplierId = '';
					$scope.concTypeId = '';
					$scope.plant = '';
					$scope.truck = '';
					$scope.ticket = '';
					$scope.deptTime = '00:00:00';
					$scope.arrivTime = '00:00:00';
					$scope.truckLoad = 12;
					
					$scope.alert = true;
				},
				
				function ()
				{
					$scope.alert = false;
				}
			);
		}
	}
);