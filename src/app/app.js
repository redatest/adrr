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
			
			require: '^ngModel',
			
			scope:
			{
				ngModel: '=',
				adrrData: '&'
			},
			
			template: '<div><button ng-repeat="frequent in frequents" class="btn btn-default" ng-click="programmaticallySelect(frequent)">{{format(frequent)}}</button><div class="s2w"></div></div>',
			
			controller: function ($scope, $element, $attrs)
			{
				$scope.format = function (item)
				{
					if ($attrs.textProp)
					{
						return item[$attrs.textProp];
					}
					else
					{
						return item.name;
					}
				};
				
				$scope.programmaticallySelect = function (frequent)
				{
					var $div = $element.find('.s2w');
					
					$div.select2('data', frequent);
					
					$scope.ngModel = frequent;
				};
			},
			
			link: function (scope, iElement, iAttrs, ctrl)
			{
				function findById(id)
				{
					id = parseInt(id, 10);
					
					var source = scope.adrrData();
					
					for (var i = 0; i < source.length; i++)
					{
						if (parseInt(source[i].id, 10) === id)
						{
							return source[i];
						}
					}
					
					throw "Couldn't find object with id: " + id;
				}

				var attrs = iAttrs;
				
				var $div = iElement.find('.s2w');
				
				if (scope.ngModel)
				{
					$div.select2('data', findById(scope.ngModel.id));
				}
				
				$div.on
				(
					"change", function (e)
					{
						scope.$apply
						(
							function ()
							{
								scope.ngModel = findById(e.val);
							}
						);
					}
				);
				
				scope.$watch
				(
					'adrrData()', function ()
					{
						$div.select2
						({
							data: { results: scope.adrrData(), text: 'name' },
							formatSelection: scope.format,
							formatResult: scope.format,
							width: '100%'
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
			}
		};
	}
)

.directive
(
	'adrrJtimepicker', function ()
	{
		return {
			restrict: 'E',
			
			require: '^ngModel',
			
			template: '<div class="input-group"><input class="wow {{adrrClass}}" type="text" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div>',
			
			scope:
			{
				ngModel: '='
			},
			
			link: function (scope, iElement, iAttrs, ctrl)
			{
				scope.adrrClass = iAttrs.adrrClass;
				
				iElement.find('.wow').timepicker
				({
					timeFormat: 'HH:mm:ss',
					hourMin: 0,
					hourMax: 23,
					sliderAccessArgs: { touchonly: false }
				});
			}
		}
	}
)

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
					check(ngModel.$modelValue);
				}
				
				element.on
				(
					'blur keyup change', function ()
					{
						scope.$apply(check(element.val()));
					}
				);
				
				function check(val)
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
						
						val = isNaN(val) ? attrs.min : val;
						
						element.val(val);
						
						ngModel.$setViewValue(val);
					}
				}
			}
		};
	}
)

.directive
(
	'adrrTimepicker', function ()
	{
		return {
			restrict: 'E',
			
			require: 'ngModel',
			
			scope: { ngModel: '=' },
			
			template: '<div class="well well-small">' +
						'<table class="col-xs-12">' +
							'<tr>' +
								'<td class="text-center"><button class="btn btn-default" ng-click="addHour()" ng-disabled="hour > 22"><span class="glyphicon glyphicon-chevron-up"></span></button></td>' +
								'<td class="text-center"><button class="btn btn-default" ng-click="addMin()" ng-disabled="min > 58"><span class="glyphicon glyphicon-chevron-up"></span></button></td>' +
							'</tr>' +
							'<tr>' +
								'<td>' +
									'<input ng-model="hour" ng-change="formatTime()" adrr-num-range max="23" min="0" class="form-control text-center" />' +
								'</td>' +
								'<td>' +
									'<input ng-model="min" ng-change="formatTime()" adrr-num-range max="59" min="0" class="form-control text-center" />' +
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
			
			link: function (scope, element, attrs)
			{
				scope.hour = 0;
				scope.min = 0;
				
				if (angular.isUndefined(scope.ngModel))
				{
					scope.ngModel = '00:00:00';
				}
				
				scope.$watch
				(
					'ngModel', function (newVal, oldVal)
					{
						var timeArr = newVal.split(':');
						console.log(newVal, oldVal);
						scope.hour = timeArr[0];
						
						scope.min = timeArr[1];
						
					}, true
				);
				
				scope.formatTime = function ()
				{
					var time = (String(scope.hour).length < 2 ? '0' + scope.hour : scope.hour) + ':';
					
					time += (String(scope.min).length < 2 ? '0' + scope.min : scope.min) + ':00';
					
					scope.ngModel = time;
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
	function run (adrrAuth)
	{
		adrrAuth.check();
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
			}
		);
	}
);