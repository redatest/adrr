var adrrApp = angular.module
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
            'adrrDirectives',
            'adrrAuth',
            'adrrDataGetter',
            'adrrApp.login',
            'adrrApp.wrapper',
            'adrrApp.wrapper.dashboard',
            'adrrApp.wrapper.settings',
            'adrrApp.wrapper.eng'
        ],
        null
    )


    .config
(
    function adrrAppConfig($stateProvider, $urlRouterProvider, RestangularProvider) {

        $urlRouterProvider.otherwise(appConfig.loginRoute);

        RestangularProvider.setBaseUrl(appConfig.restfulApiBaseUrl + '/api');
        RestangularProvider.setMethodOverriders(["put"]);
    }
)

    .run
(
    function run(adrrAuth, $rootScope) {

        adrrAuth.check().then
        (
            function (data) {
                $rootScope.isSenior = data.isSenior;
                $rootScope.isEng = data.isEng;
                $rootScope.userName = data.name;
                $rootScope.userID = data.id;
            }
        );
    }
)

    .controller
(
    'AdrrAppCtrl', function AdrrAppCtrl($scope, $state, $rootScope) {

        $scope.state = $state.current.name;

        $scope.$on
        (
            '$stateChangeStart', function (a, b) {
                $scope.state = b['name'];

                $rootScope.pageTitle = b['title'];

                $rootScope.showAlert = false;
            }
        );
    }
);