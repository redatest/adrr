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
            'adrrDirectives.grid',
            'adrrDirectives.popover',
            'adrrDirectives.numRange',
            'adrrDirectives.ssNgGrid',
            'adrrDirectives.jslimscroll',
            'adrrDirectives.notifications',
            'adrrAuth',
            'adrrDataFetcher',
            'adrrApp.login',
            'adrrApp.wrapper',
            'adrrApp.wrapper.dashboard',
            'adrrApp.wrapper.settings',
            'adrrApp.wrapper.eng',
            'adrrApp.wrapper.report'
        ],
        null
    )

    .filter
(
    'keepOriginal', function () {

        return function (items) {

            var sorted = {};

            var i = 0;

            angular.forEach
            (
                items, function (val) {

                    sorted[i] = val;

                    i++;
                }
            );

            return sorted;
        }
    }
)

    .config
(
    function adrrAppConfig($stateProvider, $urlRouterProvider, RestangularProvider, adrrAuthProvider) {

        $urlRouterProvider.otherwise(appConfig.loginRoute);

        adrrAuthProvider.init(appConfig.yiiUrl + '/auth/login', appConfig.yiiUrl + '/auth/logout', 'login');

        RestangularProvider.setBaseUrl(appConfig.restfulApiBaseUrl + '/api');
        RestangularProvider.setMethodOverriders(["put"]);
    }
)

    .run
(
    function run(adrrAuth, $rootScope, $state) {

        $rootScope.loginData = adrrAuth.loginData;

        $rootScope.state = $state.current.name;

        $rootScope.$on
        (
            '$stateChangeStart', function (a, b) {

                $rootScope.loginData = adrrAuth.loginData;

                $rootScope.state = b['name'];

                $rootScope.pageTitle = b['title'];

                $rootScope.breadcrumbItems = b['breadcrumb'];

                $rootScope.showAlert = false;

                $rootScope.showControls = b['showControls'];
            }
        );

    }
)

    .controller
(
    'AdrrAppCtrl', function AdrrAppCtrl() {


    }
);