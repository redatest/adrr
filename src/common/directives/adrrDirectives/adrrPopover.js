var adrrPopover = angular.module('adrrDirectives.popover', [], null)

    .directive
(
    'adrrPopover', function () {

        return {

            restrict: 'A',

            scope: false,

            compile: function () {
                return {
                    pre: function (scope, element, attrs) {

                        var options = typeof attrs.adrrPopover !== 'undefined' && attrs.adrrPopover !== '' ? scope.$eval(attrs.adrrPopover) : {};

                        element.popover(options);
                    }
                };
            }

        }

    }
);