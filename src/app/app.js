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
		'adrrApp.wrapper.settings'
	]
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
			
			template: "<div><div ng-repeat='frequent in frequents'><a href='#' ng-click='programmaticallySelect(frequent)'>{{format(frequent)}}</a></div><div class='s2w'></div></div>",
			
			controller:
			[
				'$scope', '$element', '$attrs', function (scope, element, attrs)
				{
					scope.format = function (item)
					{
						if (attrs.textProp)
						{
							return item[attrs.textProp];
						}
						else
						{
							return item.name;
						}
					};

					scope.programmaticallySelect = function (frequent)
					{
						var $div = element.find('.s2w');
						
						$div.select2('data', frequent);
						
						scope.ngModel = frequent;
					};
				}
			],
			
			link: function (scope, iElement, iAttrs, ctrl)
			{
				function findById(id)
				{
					id = parseInt(id, 10);
					
					var source = scope.adrrData();
					
					for (var i = 0; i < source.length; i++)
					{
						if (source[i].id === id)
						{
							return source[i];
						}
					}
					
					throw "Couldn't find object with id: " + id;
				}

				var attrs = iAttrs;
				
				scope.$watch
				(
					scope.adrrData(), function ()
					{
						console.log(scope.adrrData());
						
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
					}
				);
				
				var $div = iElement.find('.s2w');
				
				$div.select2
				({
					data: { results: scope.adrrData(), text: 'name' },
					formatSelection: scope.format,
					formatResult: scope.format,
					width:'resolve'
				});
				
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
			}
		};
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