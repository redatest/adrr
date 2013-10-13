angular.module
(
	'adrrDirectives',
	[
		'ui.select2',
	]
)

// .directive
// (
	// 'adrrSelect2Wrapper', function ()
	// {
		// return {
			// restrict: 'E',
			
			// require: 'ngModel',
			
			// scope:
			// {
				// ngModel: '=',
				// adrrData: '&'
			// },
			
			// template: '<div><button ng-repeat="frequent in frequents" class="btn btn-default" ng-click="programmaticallySelect(frequent.id)">{{frequent.name}}</button></div><div class="s2w"></div>',
			
			// link: function (scope, element, attrs, ctrl)
			// {
				// var data = [];
				
				// var $div = element.find('.s2w');
				
				// function format (item)
				// {
					// return item.name;
				// }
				
				// scope.programmaticallySelect = function (id)
				// {
					// ctrl.$setViewValue(id);
					
					// scope.ngModel = id;
					
					// if (!angular.isUndefined(id))
					// {
						// $div.select2('val', id.toString() );
					// }
				// };
				
				// scope.$watch
				// (
					// 'adrrData()', function (newVal)
					// {
						// data = newVal;
						
						// $div.select2
						// ({
							// data:
							// {
								// results: data,
								// text: 'name'
							// },
							
							// width: '100%',
							
							// formatSelection: format,
							
							// formatResult: format,
							
							// allowClear: true,
							
							// placeholder: 'Select...'
						// });
						
						// scope.frequents = _.filter
						// (
							// scope.adrrData(), function (item)
							// {
								// if (attrs.frequentProp)
								// {
									// return item[attrs.frequentProp];
								// }
								// else
								// {
									// return item.mostFrequent;
								// }
							// }
						// );
						
					// }, true
				// );
				
				// scope.$watch
				// (
					// 'ngModel', function (newVal)
					// {
						// scope.programmaticallySelect(newVal);
						
					// }, true
				// );
				
				// $div.on
				// (
					// 'change', function (evt)
					// {
						// scope.$apply
						// (
							// function ()
							// {
								// scope.ngModel = evt.val;
							// }
						// )
					// }
				// )
			// }
		// }
	// }
// )

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
			
			template: '<div>' + 
						'<button ng-repeat="frequent in frequents" class="btn btn-default" ng-click="programmaticallySelect(frequent.id)">{{frequent.name}}</button>' +
					  '</div>' +
					  '<select class="form-control s2w"><option value="">Select...</option><option ng-repeat="item in adrrData()" value="{{item.id}}" ng-selected="item.id == ngModel">{{item.name}}</option></select>',
			
			link: function (scope, element, attrs, ctrl)
			{
				var data = [];
				
				var $select = element.find('.s2w');
				
				scope.$watch
				(
					'adrrData()', function (newVal)
					{
						scope.frequents = _.filter
						(
							newVal, function (item)
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
					}
				);
				
				scope.programmaticallySelect = function (id)
				{
					scope.ngModel = id;
				}
				
				$select.on
				(
					'change', function (evt)
					{
						scope.ngModel = $select.val();
						
						if (!scope.$$phase)
						{
							scope.$apply();
						}
					}
				);
				
				scope.$watch
				(
					'ngModel', function (newVal)
					{
						ctrl.$setViewValue (newVal);
						
						$select.val (newVal);
					}, true
				);
			}
		}
	}
)

.directive
(
	'adrrB3radio', function ()
	{
		return {
			restrict: 'A',
			
			scope: false,
			
			require: 'ngModel',
			
			link: function (scope, element, attrs, ctrl)
			{
				element.on
				(
					'click', function (evt)
					{
						var input = $(evt.target).children('input');
						
						scope.$apply(ctrl.$setViewValue(input.val()));
					}
				);
				
				ctrl.$render = function ()
				{
					var da = element.find('input[value=' + ctrl.$viewValue + ']');
					
					if (!angular.isUndefined(da))
					{
						element.children().removeClass("active");
						
						da.parent().addClass('active');
					}
				}
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
			
			scope: false,
			
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
					if (val !== '' && val !== '-' && !angular.isUndefined(val))
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
						
						if (!angular.isUndefined(attrs.length))
						{
							var valStr = val.toString();
							
							var isMin = valStr.charAt(0) === '-';
							
							var valLength = parseInt(attrs.length, 10) - valStr.length - (isMin ? 1 : 0);
							
							if (isMin)
							{
								for (var i = 0; i < valLength; i++)
								{
									valStr = valStr.substr (0, 1) + '0' + valStr.substr(1);
								}
							}
							else
							{
								for (i = 0; i < valLength; i++)
								{
									valStr = '0' + valStr;
								}
							}
							
							val = valStr;
						}
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
									'<input ng-model="hour" type="number" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="23" min="0" length="2" class="form-control text-center" />' +
								'</td>' +
								'<td>' +
									'<input ng-model="min" type="number" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="59" min="0" length="2" class="form-control text-center" />' +
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
					var time = (String(scope.hour).length < 2 ? '0' + scope.hour : scope.hour) + ':';
						time += (String(scope.min).length < 2 ? '0' + scope.min : scope.min) + ':00';
					
					ctrl.$setViewValue (time);
					
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
			}
		}
	}
);