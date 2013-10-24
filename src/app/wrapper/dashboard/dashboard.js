angular.module('adrrApp.wrapper.dashboard', [], null)

    .config
(
    function config($stateProvider) {
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
    'DashboardCtrl', function DashboardCtrl($rootScope) {

        $rootScope.pageHeader = 'Dashboard';

        $rootScope.breadcrumbItems = ['Dashboard'];

    }
);