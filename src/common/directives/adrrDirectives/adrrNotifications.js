var adrrNotifications = angular.module('adrrDirectives.notifications', ['adrrDataGetter'], null)

    .directive
(
    'adrrNotifications', function ($compile, adrrDataGetter) {

        return {

            restrict: 'AE',

            scope: true,

            template: '<ul class="list-group"><li class="list-group-item" ng-repeat="item in items">{{item.message}}</li></ul>',

            link: function (scope, element, attrs) {

                var isFirst = true;

                scope.items = [];

//                adrrDataGetter.set(attrs.adrrOptions.sourceUrl, scope.items, parseInt(attrs.adrrOptions.time, 10), attrs.adrrOptions.updateTrucker);

                scope.$watch
                (
                    attrs.adrrOptions, function (newVal, oldVal) {

                        if (newVal.template !== oldVal.template || isFirst) {

                            element.html($compile(newVal.template)(scope));

                        }

                        if (newVal.time !== oldVal.time || isFirst) {

                            adrrDataGetter.set(newVal.sourceUrl, scope.items, parseInt(newVal.time, 10), newVal.updateTrucker);

                        }
                        else if (newVal.time !== oldVal.time) {

                            adrrDataGetter.updateTime(scope.items, newVal.time);

                        }

                        isFirst = false;
                    }
                );
//
//                if (typeof scope.adrrOptions.time !== 'undefined' && typeof scope.adrrOptions.sourceUrl !== 'undefined' && typeof scope.adrrOptions.updateTrucker !== 'undefined') {
//
//
//
//                }
            }
        }
    }
);