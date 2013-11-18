var adrrGrid = angular.module('adrrDirectives.grid', [], null)

    .directive(

    'adrrGridCell', function ($compile) {

        return {

            scope: false,

            restrict: 'A',

            template: '{{row[col.field]}}',

            compile: function () {

                return {

                    pre: function (scope, element) {

                        if (typeof scope.col.filters !== 'undefined') {

                            element.html($compile('<span>{{row[col.field]' + ' | ' + scope.col.filters + '}}</span>')(scope));

                        }
                    }
                };
            }
        };
    }
)

    .directive(

    'adrrGridRow', function ($compile) {

        return {

            scope: false,

            restrict: 'AE',

            compile: function () {

                return {

                    pre: function (scope, element) {

                        var template = typeof scope.options.rowTemplate !== 'undefined' ? scope.options.rowTemplate : '<tr class="adrrGridRow" ng-repeat="(i, row) in rows" ng-click="rowClickHandler(i)">' +
                            '<td ng-show="multiSelect && showSelectionCheckbox">' +
                            '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                            '</td>' +
                            '<td ng-repeat="col in cols" adrr-grid-cell></td>' +
                            '</tr>';

                        $(element).html($compile(template)(scope));
                    }
                };
            }
        };
    }
)

    .directive(

    'adrrGrid', function ($compile) {

        return {

            restrict: 'AE',

            scope: true,

            compile: function () {
                return {
                    pre: function (scope, element, attrs) {

                        // Check if the directive used as element or attribute then define the options
                        scope.options = typeof attrs['adrrGrid'] !== 'undefined' ? scope.$eval(attrs['adrrGrid']) : scope.$eval(attrs['adrrOptions']);

                        // check selectedItems in options
                        scope.selectedItems = typeof scope.options.selectedItems !== 'undefined' ? scope.options.selectedItems : [];

                        // check multiSelect
                        scope.multiSelect = typeof scope.options.multiSelect !== 'undefined' ? scope.options.multiSelect : true;

                        // check showSelectionCheckbox
                        scope.showSelectionCheckbox = typeof scope.options.showSelectionCheckbox !== 'undefined' ? scope.options.showSelectionCheckbox : false;

                        // assign column definitions to a scope variable
                        scope.cols = scope.options.columnDefs;

                        var template = typeof scope.options.template !== 'undefined' ? scope.options.template : '<table class="table table-hover table-bordered">' +
                            '<thead>' +
                            (typeof scope.options.headerTemplate !== 'undefined' ? scope.options.headerTemplate :
                                '<tr id="headerCells">' +
                                    '<th ng-show="multiSelect && showSelectionCheckbox">' +
                                    '<input type="checkbox" ng-checked="rows.length === selectedItems.length" ng-click="programaticallySelect()" />' +
                                    '</th>' +
                                    '<th ng-repeat="col in cols">' +
                                    '{{col.displayName}}' +
                                    '</th>' +
                                    '</tr>') +
                            '</thead>' +
                            '<tbody adrr-grid-row>' +

                            '</tbody>' +
                            '</table>';

                        // check template and compile it
                        element.html($compile(template)(scope));

                        // watch any change of the data
                        scope.$parent.$watch(

                            scope.options.data, function (newVal, oldVal) {

                                if (newVal !== oldVal) {

                                    scope.selectedItems.splice(0, scope.selectedItems.length);

                                    scope.rows = newVal;

                                }
                            }, true

                        );

                        // @function programaticallySelect perform selections without any interactions from the user
                        // @param {optional Array} indexes - indexes of rows for being selected or unselected
                        // @param {optional Boolean} state - to define the selection state
                        scope.programaticallySelect = function (indexes, state) {

                            if (typeof scope.options['onBeforeSelectionChangeHandler'] !== 'undefined') {

                                scope.options['onBeforeSelectionChangeHandler'].call();

                            }

                            if (typeof indexes === 'undefined' || indexes === null) {

                                var numSelected = scope.selectedItems.length;

                                var numRows = scope.rows.length;

                                var rows = $(element).find('.adrrGridRow');

                                rows.removeClass('active');

                                scope.selectedItems.splice(0, numSelected);

                                var stateIsDefined = typeof state !== 'undefined';

                                if ((numSelected < numRows && !stateIsDefined) || (stateIsDefined && state)) {

                                    rows.addClass('active');

                                    for (var i = 0; i < numRows; i++) {

                                        scope.selectedItems.push(i);

                                    }

                                }

                            } else {
                                // here we'll check for user programaticlly selection
                            }

                            if (typeof scope.options['onAfterSelectionChangeHandler'] !== 'undefined') {

                                scope.options['onAfterSelectionChangeHandler'].call();

                            }

                        };

                        // manage selecting
                        scope.rowClickHandler = function (index) {

                            if (typeof scope.options['onBeforeSelectionChangeHandler'] !== 'undefined') {

                                scope.options['onBeforeSelectionChangeHandler'].call();

                            }

                            var curIndex = scope.selectedItems.indexOf(index);

                            var rows = $(element).find('.adrrGridRow');

                            if (curIndex !== -1) {

                                $(rows[index]).removeClass('active');

                                scope.selectedItems.splice(curIndex, 1);

                            } else {

                                if (!scope.multiSelect) {

                                    $(rows[scope.options.selectedItems[0]]).removeClass('active');

                                    scope.selectedItems.splice(0, 1);

                                }

                                $(rows[index]).addClass('active');

                                scope.selectedItems.push(index);
                            }

                            if (typeof scope.options['onAfterSelectionChangeHandler'] !== 'undefined') {

                                scope.options['onAfterSelectionChangeHandler'].call();

                            }
                        };
                    }
                };
            }
        };
    }
);