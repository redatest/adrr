var adrrNotifications = angular.module('adrrDirectives.notifications', ['adrrDataGetter'], null)

    .directive
(
    'adrrNotifications', function ($compile, adrrDataGetter) {

        return {

            restrict: 'AE',

            scope: { adrrOptions: '=' },

            template: '<ul class="list-group"><li class="list-group-item" ng-repeat="item in items">{{item.message}}</li></ul>',

            link: function (scope, element) {

                scope.items = [];

                if (typeof scope.adrrOptions.template !== 'undefined') {

                    element.html($compile(scope.adrrOptions.template)(scope));

                }

                if (typeof scope.adrrOptions.time !== 'undefined' && typeof scope.adrrOptions.sourceUrl !== 'undefined' && typeof scope.adrrOptions.updateTrucker !== 'undefined') {

                    adrrDataGetter.set(scope.adrrOptions.sourceUrl, scope.items, parseInt(scope.adrrOptions.time, 10), scope.adrrOptions.updateTrucker);

                }
            }
        }
    }
);