var adrrPopover = angular.module('adrrDirectives.popover', [], null)

    .directive
(
    'adrrPopover', function ($compile) {

        return {

            restrict: 'A',

            scope: false,

            link: function (scope, element, attrs) {

                var options = typeof attrs.adrrPopover !== 'undefined' && attrs.adrrPopover !== '' ? scope[attrs.adrrPopover] : {};

                if (typeof options.content !== 'undefined') {

                    var newOptions = angular.copy(options);

                    newOptions.content = $compile(options.content)(scope);

                }

                element.popover(newOptions);
            }

        }

    }
);