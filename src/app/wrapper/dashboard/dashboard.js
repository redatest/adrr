angular.module
(
	'adrrApp.wrapper.dashboard', []
)

.config
(
	function config ($stateProvider)
	{
		$stateProvider.state
		(
			'wrapper.dashboard',
			{
				url: '^/dashboard',
				title: 'Dashboard',
				controller: 'DashboardCtrl',
				templateUrl: 'wrapper/dashboard/dashboard.tpl.html'
			}
		);
	}
)

.controller
(
	'DashboardCtrl', function DashboardCtrl ($scope)
	{
	}
);