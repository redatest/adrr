angular.module('adrr.directives.filtersDirective', [], null)

    .directive
(

    'adrrFilters', function () {

        return {

            restrict: 'E',

            scope: {

                filters: '=',

                adrrFiltersDef: '='

            },

            replace: true,

            template: '<div class="modal adrr-modal" id="{{adrrId}}" tabindex="-1" role="dialog" aria-labelledby="{{adrrId}}Label" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title" id="myModalLabel">{{adrrTitle}}</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<form class="form-horizontal" role="form">' +
                '<div class="form-group">' +
                '<label class="control-label col-xs-2">Filters</label>' +
                '<div class="col-xs-10">' +
                '<select class="form-control" ng-model="newFilter" ng-change="newHandler(newFilter)">' +
                '<option value="">Select...</option>' +
                '<option ng-repeat="(i, opt) in adrrFiltersDef" value="{{i}}">{{opt.displayName}}</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group" ng-repeat="filter in currentFilters">' +
                '<label class="control-label col-xs-2">{{filter.displayName}}</label>' +
                '<ng-switch on="filter[\'double\']">' +
                '<any ng-switch-when="true" ng-init="filters[filter.name] = []">' +
                '<div class="col-xs-4">' +
                '<input ng-model="filters[filter.name][0]" adrr-filters-attrs="filter.attrs" class="form-control" type="text" need-compile/>' +
                '</div>' +
                '<div class="col-xs-4">' +
                '<input ng-model="filters[filter.name][1]" adrr-filters-attrs="filter.attrs" class="form-control" type="text" need-compile/>' +
                '</div>' +
                '</any>' +
                '<div ng-switch-default class="col-xs-8">' +
                '<input ng-model="filters[filter.name]" adrr-filters-attrs="filter.attrs" class="form-control" type="text" need-compile/>' +
                '</div>' +
                '</ng-switch>' +
                '<div class="col-xs-2">' +
                '<button class="btn btn-link" ng-click="removeFilter(filter)">' +
                'clear' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</form>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',

            link: function (scope, element, attrs) {

                scope.adrrId = attrs.adrrId;
                scope.adrrTitle = attrs.adrrTitle;

                scope.currentFilters = [];

                if (typeof scope.filters === 'undefined') {

                    scope.filters = {};

                }

                scope.newHandler = function (newFilter) {

                    scope.currentFilters.push(scope.adrrFiltersDef.splice(newFilter, 1)[0]);

                    scope.newFilter = '';

                };

                scope.removeFilter = function (filter) {

                    var numCurrentFilters = scope.currentFilters.length;

                    for (var i = 0; i < numCurrentFilters; i++) {

                        if (angular.equals(filter, scope.currentFilters[i])) {

                            scope.adrrFiltersDef.push(scope.currentFilters.splice(i, 1)[0]);

                            delete scope.filters[filter.name];

                            break;

                        }

                    }

                };

            }

        };

    }

)

    .directive
    (

        'adrrFiltersAttrs', ['$compile', function ($compile) {

        return {

            restrict: 'A',

            scope: false,

            replace: true,

            link: function (scope, element, iAttrs) {

                var attrs = scope.$eval(iAttrs['adrrFiltersAttrs']);

                angular.forEach
                (
                    attrs, function (val, key) {

                        element.attr(key, val);

                    }
                );

                element.removeAttr('adrr-filters-attrs');

                if (typeof iAttrs['needCompile'] !== 'undefined') {
                    $compile(element)(scope);
                }
            }
        };
    }]

    );