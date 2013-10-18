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
		'ui.select2',
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
	'adrrSelect2Wrapper', function ()
	{
		return {
			restrict: 'E',
			
			require: 'ngModel',
			
			scope:
			{
				ngModel: '=',
				adrrData: '&'
			},
			
			template: '<div><button ng-repeat="frequent in frequents" class="btn btn-default" ng-click="programmaticallySelect(frequent.id)">{{frequent.name}}</button></div><div class="s2w"></div>',
			
			link: function (scope, element, attrs, ctrl)
			{
				var data = [];
				
				var $div = element.find('.s2w');
				
				function format (item)
				{
					return item.name;
				}
				
				scope.programmaticallySelect = function (id)
				{
					ctrl.$setViewValue(id);
					
					scope.ngModel = id;
					
					if (!angular.isUndefined(id))
					{
						$div.select2('val', id.toString() );
					}
				};
				
				scope.$watch
				(
					'adrrData()', function (newVal)
					{
						data = newVal;
						
						$div.select2
						({
							data:
							{
								results: data,
								text: 'name'
							},
							
							width: '100%',
							
							formatSelection: format,
							
							formatResult: format,
							
							allowClear: true,
							
							placeholder: 'Select...'
						});
						
						scope.frequents = _.filter
						(
							scope.adrrData(), function (item)
							{
								if (attrs.frequentProp)
								{
									return item[attrs.frequentProp];
								}
								else
								{
									return item.mostFrequent;
								}
							}
						);
						
					}, true
				);
				
				scope.$watch
				(
					'ngModel', function (newVal)
					{
						scope.programmaticallySelect(newVal);
						
					}, true
				);
				
				$div.on
				(
					'change', function (evt)
					{
						scope.$apply
						(
							function ()
							{
								scope.ngModel = evt.val;
							}
						)
					}
				)
			}
		}
	}
)

// .directive
// (
	// 'adrrJtimepicker', function ()
	// {
		// return {
			// restrict: 'E',
			
			// require: '^ngModel',
			
			// template: '<div class="input-group"><input class="wow {{adrrClass}}" type="text" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div>',
			
			// scope:
			// {
				// ngModel: '='
			// },
			
			// link: function (scope, iElement, iAttrs, ctrl)
			// {
				// scope.adrrClass = iAttrs.adrrClass;
				
				// iElement.find('.wow').timepicker
				// ({
					// timeFormat: 'HH:mm:ss',
					// hourMin: 0,
					// hourMax: 23,
					// sliderAccessArgs: { touchonly: false }
				// });
			// }
		// }
	// }
// )

.directive
(
	'adrrNumRange', function ()
	{
		return {
			restrict: 'A',
			
			require: 'ngModel',
			
			link: function (scope, element, attrs, ngModel)
			{
				ngModel.$render = function ()
				{
					check (ngModel.$modelValue);
				};
				
				element.on
				(
					'keyup change blur', function (evt)
					{
						scope.$apply (check(element.val()));
					}
				);
				
				function check (val)
				{
					if (val !== '' && val !== '-')
					{
						val = parseInt(val, 10);
						
						if (!angular.isUndefined(attrs.min))
						{
							var minVal = parseInt(attrs.min, 10);
							
							if (val < minVal) val = minVal;
						}
						
						if (!angular.isUndefined(attrs.max))
						{
							var maxVal = parseInt(attrs.max, 10);
							
							if (val > maxVal) val = maxVal;
						}
						
						val = isNaN(val) ? (angular.isUndefined(attrs.value) ? attrs.min : attrs.value) : val;
					}
					
					element.val(val);
					
					ngModel.$setViewValue(val);
				}
			}
		};
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
			
			template: '<div class="well well-small">' +
						'<table class="col-xs-12">' +
							'<tr>' +
								'<td class="text-center"><button class="btn btn-default" ng-click="addHour()" ng-disabled="hour > 22"><span class="glyphicon glyphicon-chevron-up"></span></button></td>' +
								'<td class="text-center"><button class="btn btn-default" ng-click="addMin()" ng-disabled="min > 58"><span class="glyphicon glyphicon-chevron-up"></span></button></td>' +
							'</tr>' +
							'<tr>' +
								'<td>' +
									'<input ng-model="hour" type="number" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="23" min="0" class="form-control text-center" />' +
								'</td>' +
								'<td>' +
									'<input ng-model="min" type="number" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="59" min="0" class="form-control text-center" />' +
								'</td>' +
							'</tr>' +
							'<tr>' +
								'<td class="text-center"><button class="btn btn-default" ng-click="minHour()" ng-disabled="hour < 1"><span class="glyphicon glyphicon-chevron-down"></span></button></td>' +
								'<td class="text-center"><button class="btn btn-default" ng-click="minMin()" ng-disabled="min < 1"><span class="glyphicon glyphicon-chevron-down"></span></button></td>' +
							'</tr>' +
						'</table>' +
					  '</div>',
			
			controller: function ($scope, $element, $attrs)
			{
				$scope.addHour = function ()
				{
					$scope.hour++;
					
					$scope.formatTime();
				}
				
				$scope.addMin = function ()
				{
					$scope.min++;
					
					$scope.formatTime();
				}
				
				$scope.minHour = function ()
				{
					$scope.hour--;
					
					$scope.formatTime();
				}
				
				$scope.minMin = function ()
				{
					$scope.min--;
					
					$scope.formatTime();
				}
				
				
			},
			
			link: function (scope, element, attrs, ctrl)
			{
				scope.$watch
				(
					'ngModel', function (newVal, oldVal)
					{
						var timeArr = newVal.split(':');
						
						scope.hour = timeArr[0];
						
						scope.min = timeArr[1];
						
					}, true
				);
				
				scope.formatTime = function ()
				{
					var time = (String(scope.hour).length < 2 ? '0' + scope.hour : scope.hour) + ':';
					
					time += (String(scope.min).length < 2 ? '0' + scope.min : scope.min) + ':00';
					
					scope.ngModel = time;
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
				
				if (angular.isUndefined(scope.ngModel))
				{
					scope.ngModel = '00:00:00';
				}
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