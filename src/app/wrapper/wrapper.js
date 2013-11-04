angular.module('adrrApp.wrapper', [], null)

    .config
(
    function config($stateProvider) {

        $stateProvider.state
        (
            'wrapper',
            {
                abstract: true,

                resolve: {
                    yii: [
                        'adrrAuth', '$q', '$http', function (adrrAuth, $q, $http) {

                            var deferred = $q.defer();

                            var getYii = function () {
                                $http
                                ({
                                    method: 'GET',
                                    url: appConfig.restfulApiBaseUrl + '/metaData'
                                })
                                    .success
                                (
                                    function (data) {
                                        deferred.resolve(data);
                                    }
                                );
                            };

                            if (!adrrAuth.hasLogged) {

                                adrrAuth.check().then
                                (
                                    function () {

                                        getYii();

                                    }
                                );
                            } else {

                                getYii();

                            }

                            return deferred.promise;

                        }
                    ]
                },

                views: {
                    '@': {
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
    'WrapperCtrl', function ($scope, $rootScope, adrrAuth, $http, adrrDataFetcher, yii) {

        $rootScope.configModal = function (title, message, btnClass, func, closeFunc) {
            $rootScope.modalTitle = title;
            $rootScope.modalMessage = message;
            $rootScope.modalBtnClass = btnClass;
            $rootScope.modalFunc = func;
            $rootScope.modalCloseFunc = closeFunc;
        };

        $scope.menuStats = [];

        $scope.yii = yii;

        adrrDataFetcher.set(appConfig.yiiUrl + '/stats/menu', $scope.menuStats, 1000);

        $scope.notsOpts = {

            template: '<ul class="list-group" adrr-jslimscroll>' +
                '<li class="list-group-item" ng-class="{\'yellowBg\': item.type === \'yellow\', \'redBg\': item.type === \'red\'}" ng-repeat="(i, item) in items">' +
                '{{item.message}}' +
                '<button class="pull-right btn btn-default btn-xs" ng-click="itemCheck(items, item)">hide</button>' +
                '</li>' +
                '</ul>',

            sourceUrl: appConfig.yiiUrl + '/notifications',

            time: 5000,

            updateTrucker: 'id'

        };

        $scope.logout = function () {

            $("#logoutModal").on
            (
                'hidden.bs.modal', function () {
                    adrrAuth.logout();

                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            )

        };

        $scope.itemCheck = function (items, item) {

            var index = _.indexOf(items, item, 0);

            if (items[index].checked || typeof items[index].checked === 'undefined') {

                $http.get
                (
                    appConfig.yiiUrl + '/notifications/markAsRead',
                    {
                        params: {

                            id: items[index].id

                        }
                    }
                ).success
                (
                    function () {

                        delete items.splice(index, 1);

                        if (!$scope.$$phase) {

                            $scope.$apply();

                        }
                    }
                );
            }
        };

        $scope.$on
        (
            '$destroy', function () {

                adrrDataFetcher.unset($scope.menuStats);

            }
        );
    }
);