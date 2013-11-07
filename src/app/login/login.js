var adrrLogin = angular.module('adrrApp.login', [], null)

    .config
(
    function config($stateProvider) {
        $stateProvider.state
        (
            'login',
            {
                url: '/login',
                title: 'Login to Concrete App',
                views: {
                    "login": {
                        controller: 'LoginCtrl',
                        templateUrl: 'login/login.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'logout',
            {
                url: '/logout',
                views: {
                    "login": {
                        controller: 'LogoutCtrl'
                    }
                }
            }
        );
    }
)

    .controller
(
    'LoginCtrl', function LoginCtrl($scope, adrrAuth, $state) {
        $scope.login = function () {

            adrrAuth.check($scope.username, $scope.password);
        };
    }
)

    .controller
(
    'LogoutCtrl', function LogoutCtrl(adrrAuth) {
        adrrAuth.logout();
    }
);

adrrLogin.directive
(
    'backstretch',

    function () {

        return {

            restrict: 'A',

            link: function (scope, element, attr) {

                element.backstretch
                (
                    [
                        attr.bg1,
                        attr.bg2,
                        attr.bg3
//                        attr.bg4,
//                        attr.bg5,
//                        attr.bg6,
//                        attr.bg7,
//                        attr.bg8
                    ],

                    {
                        duration: 5000,
                        fade: 750
                    }
                );
            }
        };
    }
);