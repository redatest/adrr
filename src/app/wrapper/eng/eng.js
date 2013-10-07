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
		
		$scope.adrrTimepickerOptions =
		{
			template: '<table class="col-xs-12"><tr>' +
						  '<td><input ng-model="hour" type="number" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="23" min="0" class="form-control text-center" /></td>' +
						  '<td><input ng-model="min" type="number" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="59" min="0" class="form-control text-center" /></td>' +
					  '</tr></table>'
		};
		
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
					$scope.ticket = $scope.getItemById($scope.suppliers, newVal).prefix;
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
				truck_load:	  $scope.truckLoad,
				temperature:  $scope.temperature,
				slump:		  $scope.slump,
				flow:		  $scope.flow
			}).then
			(
				function ()
				{
					$scope.date		   = null;
					$scope.shiftId	   = '';
					$scope.supplierId  = '';
					$scope.concTypeId  = '';
					$scope.plant	   = '';
					$scope.truck	   = '';
					$scope.ticket	   = '';
					$scope.deptTime	   = '00:00:00';
					$scope.arrivTime   = '00:00:00';
					$scope.truckLoad   = '';
					$scope.temperature = '';
					$scope.slump	   = '';
					$scope.flow		   = '';
					
					$scope.showAlert = true;
					$scope.alert = true;
				},
				
				function ()
				{
					$scope.showAlert = true;
					$scope.alert = false;
				}
			);
		}
		
		$scope.checkFlowRed = function ()
		{
			var concType = $scope.getItemById($scope.concreteTypes, $scope.concTypeId);
			
			return (!angular.isUndefined(concType) && (concType.flow_acpt_from > $scope.flow || concType.flow_acpt_to < $scope.flow)) ? true : false;
		}
		
		$scope.checkFlowYellow = function ()
		{
			var concType = $scope.getItemById($scope.concreteTypes, $scope.concTypeId);
			
			return (!angular.isUndefined(concType) && (concType.flow_norm_from > $scope.flow || concType.flow_norm_to < $scope.flow)) ? true : false;
		}
		
		$scope.checkSlumpRed = function ()
		{
			var concType = $scope.getItemById($scope.concreteTypes, $scope.concTypeId);
			
			return (!angular.isUndefined(concType) && (concType.slump_acpt_from > $scope.slump || concType.slump_acpt_to < $scope.slump)) ? true : false;
		}
		
		$scope.checkSlumpYellow = function ()
		{
			var concType = $scope.getItemById($scope.concreteTypes, $scope.concTypeId);
			
			return (!angular.isUndefined(concType) && (concType.slump_norm_from > $scope.slump || concType.slump_norm_to < $scope.slump)) ? true : false;
		}
	}
);