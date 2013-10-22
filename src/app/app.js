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
            'adrrApp.login',
            'adrrApp.wrapper',
            'adrrApp.wrapper.dashboard',
            'adrrApp.wrapper.settings',
            'adrrApp.wrapper.eng'
        ]
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

    .factory
(
    'adrrDataGetter', function ($http) {
        var targets = [];

        var timers = [];

        var getData = function (sourceUrl, target, method, args) {
            $http
            ({
                method: (method !== undefined ? method : 'GET'),
                url: sourceUrl,
                data: (args !== undefined ? args : null)
            })
                .success
            (
                function (data) {
                    var targetIndex = _.indexOf(targets, target);

                    if (angular.isArray(data)) {
                        var dataLength = data.length;

                        for (var i = 0; i < dataLength; i++) {
                            var obj = _.find(targets[targetIndex], data[i]);

                            if (obj === undefined) {
                                targets[targetIndex].push(data[i]);
                            }
                        }

                        dataLength = targets[targetIndex].length;

                        for (i = 0; i < dataLength; i++) {
                            var obj = _.find(data, targets[targetIndex][i]);

                            if (obj === undefined) {
                                targets[targetIndex].splice(i, 1);
                            }
                        }
                    }
                }
            )
        }

        function set(sourceUrl, target, time, method, args) {
            if (time !== undefined) {
                var timer = setInterval(getData, time, sourceUrl, target, method, args);

                timers.push(timer);

                targets.push(target);
            }
        }

        function unset(target) {
            var targetIndex = _.indexOf(targets, target);

            clearInterval(timers[targetIndex]);

            targets.splice(targetIndex, 1);
        }

        return {
            set: set,
            unset: unset
        }
    }
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
                $scope.state = b.name;

                $rootScope.pageTitle = b.title;

                $rootScope.showAlert = false;
            }
        );
    }
);