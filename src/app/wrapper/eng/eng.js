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
		
		$scope.red	  = '';
		$scope.yellow = '';
		
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
				temp:		  $scope.temp,
				slump:		  $scope.slump,
				flow:		  $scope.flow,
				red:		  $scope.red,
				yellow:		  $scope.yellow
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
					$scope.temp		   = '';
					$scope.slump	   = '';
					$scope.flow		   = '';
					$scope.red		   = '';
					$scope.yellow	   = '';
					
					$rootScope.showAlert = true;
					$rootScope.alert = true;
				},
				
				function ()
				{
					$rootScope.showAlert = true;
					$rootScope.alert = false;
				}
			);
		}
		
		function checkRed (from, to, prop, type)
		{
			var concType = $scope.getItemById($scope.concreteTypes, $scope.concTypeId);
			
			var isRed = !angular.isUndefined(concType) && (concType[from] > prop || concType[to] < prop);
			
			var pattern = new RegExp("(" + type + "|," + type + ")", "ig");
			
			if (isRed)
			{
				if ($scope.red === '')
				{
					$scope.red = type;
				}
				else if (!pattern.test($scope.red))
				{
					$scope.red += ',' + type
				}
			}
			else
			{
				$scope.red = $scope.red.replace(pattern, ''); 
			}
			
			$scope.red = $scope.red.replace(/^,/ig, '');
			
			return isRed;
		}
		
		function checkYellow (from, to, prop, type)
		{
			var concType = $scope.getItemById($scope.concreteTypes, $scope.concTypeId);
			
			var isYellow = !angular.isUndefined(concType) && (concType[from] > prop || concType[to] < prop);
			
			var pattern = new RegExp("(" + type + "|," + type + ")", "ig");
			
			if (isYellow)
			{
				if ($scope.yellow === '')
				{
					$scope.yellow = type;
				}
				else if (!pattern.test($scope.yellow))
				{
					$scope.yellow += ',' + type
				}
			}
			else
			{
				$scope.yellow = $scope.yellow.replace(pattern, ''); 
			}
			
			$scope.yellow = $scope.yellow.replace(/^,/ig, '');
			
			return isYellow;
		}
		
		$scope.checkFlowRed = function ()
		{
			return checkRed ('flow_acpt_from', 'flow_acpt_to', $scope.flow, 'flow');
		}
		
		$scope.checkFlowYellow = function ()
		{
			return checkYellow ('flow_norm_from', 'flow_norm_to', $scope.flow, 'flow');
		}
		
		$scope.checkSlumpRed = function ()
		{
			return checkRed ('slump_acpt_from', 'slump_acpt_to', $scope.slump, 'slump');
		}
		
		$scope.checkSlumpYellow = function ()
		{
			return checkYellow ('slump_norm_from', 'slump_norm_to', $scope.slump, 'slump');
		}
		
		$scope.checkTempRed = function ()
		{
			return checkRed ('temp_from', 'temp_to', $scope.temp, 'temp');
		}
		
		$scope.setToday = function ()
		{
			$scope.date = $.datepicker.formatDate('yy-mm-dd', new Date()).toString();
		}
	}
);