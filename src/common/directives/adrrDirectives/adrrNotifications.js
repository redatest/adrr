angular.module('adrrDirectives.notifications', ['adrrDataGetter'], null)

    .directive
(
    'adrrNotifications', function ($compile) {

        return {

            restrict: 'E',

            scope: { adrrOptions: '=' },

            template: '<ul><li>item</li></ul>',

            link: function (scope, element) {

                scope.$watch
                (
                    'adrrOptions', function (newVal, oldVal) {

                        if (typeof newVal['template'] !== 'undefined') {

                            element.html($compile(newVal['template'])(scope));

                        }

                        if (typeof newVal['target'] !== 'undefined') {

                            if (typeof oldVal['target'] !== 'undefined') {

                                console.log(newVal['target']);

                            }
                        }
                    }
                )

            }
        }
    }
);