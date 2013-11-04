var adrrNotifications = angular.module('adrrDirectives.notifications', ['adrrDataFetcher'], null)

    .directive
(
    'adrrNotifications', function ($compile, adrrDataFetcher) {

        return {

            restrict: 'AE',

            scope: true,

            template: '<ul class="list-group"><li class="list-group-item" ng-repeat="item in items">{{item.message}}</li></ul>',

            link: function (scope, element, attrs) {

                var isFirst = true;

                scope.items = [];

                scope.$watch
                (
                    attrs.adrrOptions, function (newVal, oldVal) {

                        if (newVal.template !== oldVal.template || isFirst) {

                            element.html($compile(newVal.template)(scope));

                        }

                        if (newVal.time !== oldVal.time || isFirst) {

                            adrrDataFetcher.set(newVal.sourceUrl, scope.items, parseInt(newVal.time, 10), newVal.updateTrucker);

                        }
                        else if (newVal.time !== oldVal.time) {

                            adrrDataFetcher.updateTime(scope.items, newVal.time);

                        }

                        isFirst = false;
                    }
                );

                scope.$on
                (
                    '$destroy', function () {

                        adrrDataFetcher.unset(scope.items);

                    }
                );
            }
        }
    }
);