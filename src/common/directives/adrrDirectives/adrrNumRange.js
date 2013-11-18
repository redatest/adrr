var adrrNumRange = angular.module('adrrDirectives.numRange', [], null)

    .directive
(
    'adrrNumRange', function () {
        return {
            restrict: 'A',

            require: 'ngModel',

            scope: false,

            link: function (scope, element, attrs, ctrl) {

                ctrl.$render = function () {

                    check(ctrl.$viewValue);

                }

                element.on
                (
                    'keyup change blur', function () {

                        check(element.val());

                    }
                );

                var check = function (val) {

                    if (typeof val !== 'undefined' && val !== null && val !== '') {

                        var regexp = /\D/g;

                        if (regexp.test(val)) {

                            val = val.replace(regexp, '');

                        }

                        if (typeof attrs.min !== 'undefined') {

                            if (parseInt(val, 10) < parseInt(attrs.min, 10)) {

                                val = '';

                            }
                        }

                        if (typeof attrs.max !== 'undefined') {

                            if (parseInt(val, 10) > parseInt(attrs.max, 10)) {

                                val = '';

                            }
                        }

                        element.val(val);

                        ctrl.$setViewValue(val);

                    } else if (val === '') {

                        element.val(val);

                        ctrl.$setViewValue(val);

                    }
                };

//                ctrl.$render = function () {
//
//                    check(ctrl.$modelValue);
//
//                };
//
//                element.on
//                (
//                    'keyup change blur', function () {
//
//                        check(element.val());
//
//                        if (!scope.$$phase) {
//                            scope.$apply();
//                        }
//                    }
//                );
//
//                function check(val) {
//
//                    if (val !== '' && val !== '-' && !angular.isUndefined(val)) {
//
//                        val = parseInt(val, 10);
//
//                        if (!angular.isUndefined(attrs.min)) {
//
//                            var minVal = parseInt(attrs.min, 10);
//
//                            if (val < minVal) val = '';
//                        }
//
//                        if (!angular.isUndefined(attrs.max)) {
//                            var maxVal = parseInt(attrs.max, 10);
//
//                            if (val > maxVal) val = '';
//                        }
//
//                        val = isNaN(val) ? (angular.isUndefined(attrs.value) ? attrs.min : attrs.value) : val;
//
//                        if (!angular.isUndefined(attrs.length)) {
//                            var valStr = val.toString();
//
//                            var isMin = valStr.charAt(0) === '-';
//
//                            var valLength = parseInt(attrs.length, 10) - valStr.length - (isMin ? 1 : 0);
//
//                            if (isMin) {
//                                for (var i = 0; i < valLength; i++) {
//                                    valStr = valStr.substr(0, 1) + '0' + valStr.substr(1);
//                                }
//                            }
//                            else {
//                                for (i = 0; i < valLength; i++) {
//                                    valStr = '0' + valStr;
//                                }
//                            }
//
//                            val = valStr;
//                        }
//                    }
//
//                    ctrl.$setViewValue(val);
//
//                    element.val(val);
//                }
            }
        };
    }
);