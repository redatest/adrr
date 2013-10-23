angular.module('adrrDirectives.notifications', ['adrrDataGetter'], null)

    .directive
(
    'adrrNotifications', function ($compile, adrrDataGetter) {

        return {

            restrict: 'E',

            scope: { adrrOptions: '=' },

            template: '<ul><li>item</li></ul>',

            link: function (scope, element) {

                scope.items = [];

                if (typeof scope.adrrOptions.template !== 'undefined') {

                    element.html($compile(scope.adrrOptions.template)(scope));

                }

                if (typeof scope.adrrOptions.time !== 'undefined' && typeof scope.adrrOptions.sourceUrl !== 'undefined') {

                    adrrDataGetter.set(scope.adrrOptions.sourceUrl, scope.items, parseInt(scope.adrrOptions.time, 10));

                }
            }
        }
    }
);