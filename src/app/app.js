angular.module
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

.directive
(
	'adrrTimepicker', function ($compile)
	{
		return {
			restrict: 'E',
			
			require: 'ngModel',
			
			scope:
			{
				ngModel: '=',
				adrrOptions: '&'
			},
			
			template: '<table class="col-xs-12"><tr>' +
						  '<td><input ng-model="hour" type="number" length="2" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="23" min="0" class="form-control text-center" /></td>' +
						  '<td><input ng-model="min" type="number" length="2" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="59" min="0" class="form-control text-center" /></td>' +
					  '</tr></table>',
			
			link: function (scope, element, attrs, ctrl)
			{
				scope.$watch
				(
					'ngModel', function (newVal, oldVal)
					{
						if (!angular.isUndefined(newVal))
						{
							var timeArr = newVal.split(':');
							
							scope.hour = timeArr[0];
							
							scope.min = timeArr[1];
						}
					}, true
				);
				
				scope.formatTime = function ()
				{
					if (!angular.isUndefined(scope.hour) && scope.hour !== null && scope.hour !== '' && !angular.isUndefined(scope.min) && scope.min !== null && scope.min !== '')
					{
						var time = (String(scope.hour).length < 2 ? '0' + scope.hour : scope.hour) + ':';
							time += (String(scope.min).length < 2 ? '0' + scope.min : scope.min) + ':00';
						
						ctrl.$setViewValue (time);
						
						scope.ngModel = time;
					}
				};
				
				if (!angular.isUndefined(attrs.adrrOptions))
				{
					scope.$watch
					(
						'adrrOptions()', function (newVal)
						{
							if (!angular.isUndefined(newVal.template))
							{
								element.html($compile(newVal.template)(scope));
							}
						}
					);
				}
			}
		}
	}
)

.directive
(
	'adrrSsNgGrid', function ($http, $q)
	{
		return {
			restrict: 'A',
			
			scope: true,
			
			require: '?ngGrid',
			
			link: function (scope, element, attrs)
			{
				var parent = scope.$parent;
				
				var gridOptions = parent[attrs.ngGrid];
				
				function loadData (pageSize, page)
				{
					var deferred = $q.defer();
					
					var offset = (page - 1) * pageSize;
					
					$http.get(gridOptions.dataSource, { params: { offset: offset, limit: pageSize } } ).success
					(
						function (data)
						{
							deferred.resolve(data);
						}
					);
					
					return deferred.promise;
				}
				
				scope.getPagedDataAsync = function (pageSize, page)
				{
					loadData(pageSize, page).then
					(
						function (data)
						{
							parent[gridOptions.data] = angular.isArray(data) ? data : [];
						}
					);
				};
				
				function updateData ()
				{
					$http.get (gridOptions.numRowsUrl).success
					(
						function (data)
						{
							parent[gridOptions.totalServerItems] = parseInt(data.numRows, 10);
							
							scope.getPagedDataAsync(parent[gridOptions.adrrPagingOptions].pageSize, parent[gridOptions.adrrPagingOptions].currentPage);
						}
					);
				}
				
				updateData();
				
				scope.$watch
				(
					gridOptions.adrrPagingOptions, function (newVal, oldVal)
					{
						if (newVal !== oldVal)
						{
							var ops = parseInt(oldVal.pageSize, 10);
							var nps = parseInt(newVal.pageSize, 10);
							
							var mxp = Math.ceil(parent[gridOptions.totalServerItems] / nps);
							
							if (nps !== ops && mxp < newVal.currentPage)
							{
								parent[gridOptions.adrrPagingOptions].currentPage = mxp;
							}
							else
							{
								scope.getPagedDataAsync(newVal.pageSize, newVal.currentPage);
							}
						}
					}, true
				);
			}
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
	'AdrrAppCtrl', function AdrrAppCtrl ($scope, $state, $rootScope)
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