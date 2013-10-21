angular.module
(
	'adrrDirectives',
	[
		'ui.select2'
	]
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
			
			link: function (scope, element, attrs, ctrl)
			{
				ctrl.$render = function ()
				{
					check (ctrl.$modelValue);
				};
				
				element.on
				(
					'keyup change blur', function (evt)
					{
						check (element.val());
						
						if (!scope.$$phase)
						{
							scope.$apply();
						}
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
					
					ctrl.$setViewValue (val);
					
					element.val (val);
				}
			}
		};
	}
);