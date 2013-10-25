angular.module('adrrApp.wrapper', [], null)

    .factory
(
    'yii', function ($q, $http) {
        var deferred = $q.defer();

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

        return deferred.promise;
    }
)

    .config
(
    function config($stateProvider) {
        $stateProvider.state
        (
            'wrapper',
            {
                abstract: true,

                resolve: {
                    yii: 'yii'
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
    'WrapperCtrl', function ($scope, $rootScope, adrrAuth, $http) {

        $rootScope.configModal = function (title, message, btnClass, func, closeFunc) {
            $rootScope.modalTitle = title;
            $rootScope.modalMessage = message;
            $rootScope.modalBtnClass = btnClass;
            $rootScope.modalFunc = func;
            $rootScope.modalCloseFunc = closeFunc;
        };

        $scope.notsOpts = {

            template: '<ul class="list-group" adrr-jslimscroll>' +
                '<li class="list-group-item" ng-class="{\'yellowBg\': item.type === \'yellow\', \'redBg\': item.type === \'red\'}" ng-repeat="(i, item) in items">' +
                '{{item.message}}' +
                '<input type="checkbox" ng-model="item.checked" class="pull-right" ng-click="itemCheck(items, item)" />' +
                '</li>' +
                '</ul>',

            sourceUrl: '../yii/notifications',

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

            setTimeout
            (
                function () {

                    var index = _.indexOf(items, item, 0);

                    if (items[index].checked || typeof items[index].checked === 'undefined') {

                        $http.get
                        (
                            '../yii/notifications/markAsRead',
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

                }, 2000
            )

        }
    }
);