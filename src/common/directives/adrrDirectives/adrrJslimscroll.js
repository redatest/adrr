var adrrJslimscroll = angular.module('adrrDirectives.jslimscroll', [], null)

    .directive
(
    'adrrJslimscroll', function () {

        return {

            restrict: 'A',

            scope: false,

            link: function (scope, element) {

                var height = element.height();

                var set = function () {

                    element.slimScroll
                    ({
                        height: '200px'
                    });

                };

                set();

                window.setInterval
                (
                    function () {

                        var nh = element.height();

                        if (nh !== height) {

                            height = nh;

                            set();

                        }

                    }, 500
                );
            }

        }

    }
);