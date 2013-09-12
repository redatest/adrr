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
				template: '<div ui-view></div>'
			}
		)
	}
);