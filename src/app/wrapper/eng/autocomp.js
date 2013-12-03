angular.module('adrr.directives.autocomplete', [], null)

    .directive(
        'adrrAutocomplete', ['$http',

            function ($http) {

                return {

                    restrict: 'A',

                    require: 'ngModel',

                    link: function (scope, element, attrs, ctrl) {

                        var _list = [];

                        if (typeof attrs['adrrDataSrc'] !== 'undefined') {

                            $http.get(attrs['adrrDataSrc']).success(

                                function (data) {

                                    _list = data;

                                }

                            );

                        } else {

                            _list = scope.$eval(attrs['adrrData']);

                        }

                        element.autocomplete({

                            source: function (request, response) {

                                var matcher = new RegExp('(' + $.ui.autocomplete.escapeRegex(request.term) + ')', 'gi');

                                var numItems = _list.length;

                                if (typeof attrs['adrrKey'] !== 'undefined') {

                                    var filteredList = [];

                                    for (var i = 0; i < numItems; i++) {

                                        if (matcher.test(_list[i][attrs['adrrKey']])) {

                                            filteredList.push(_list[i][attrs['adrrKey']]);

                                        }
                                    }

                                    response(filteredList);

                                } else {

                                    response(_list);

                                }
                            },

                            select: function (event, ui) {

                                ctrl.$setViewValue(typeof attrs['type'] === 'undefined' && attrs['type'] === 'number' ? parseInt(ui.item.label) : ui.item.label);

                                if (!scope.$$phase) {

                                    scope.$apply();

                                }

                            }

                        });
                    }
                }
            }
        ]);