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
    'DashboardCtrl', function DashboardCtrl($scope, $rootScope) {

        $rootScope.breadcrumbItems = ['Dashboard'];

        $rootScope.showControls = false;

        $scope.conc = '1';
        $scope.pour = '1';

    }
);