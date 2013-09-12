angular.module
(
	'adrrApp.wrapper', []
)

.config
(
	function config	($stateProvider)
	{
		$stateProvider.state
		(
			'wrapper',
			{
				abstract: true,
				views:
				{
					'@':
					{
						controller: 'WrapperCtrl',
						templateUrl: 'wrapper/wrapper.tpl.html'
					}
				}
			}
		)
	}
)

.controller
(
	'WrapperCtrl', function ($scope)
	{
		$scope.isCollapsed = false;
	}
);