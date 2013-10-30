var adrrGrid = angular.module('adrrDirectives.grid', [], null)

    .directive
(

    'adrrGridCell', function ($compile) {

        return {

            scope: false,

            restrict: 'A',

            template: '<td ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                '</td>' +
                '<td ng-repeat="col in cols">{{row[col.field]}}</td>',

            link: function (scope, element, attrs) {

//                if (typeof scope.col.filters !== 'undefined') {

//                    var html = $compile(scope.row[scope.col.field])(scope);

//                    element.html($compile('<td ng-repeat="col in cols">' + '{{row[col.field]' + ' | ' + scope.col.filters + '}}</td>')(scope));

//                }
            }
        };
    }
)

    .directive
(

    'adrrGridRow', function ($compile) {

        return {

            scope: false,

            restrict: 'A',

            template: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows" ng-click="rowClickHandler(i)" adrr-grid-cell></tr>',

            link: function (scope, element) {

                scope.$watch
                (
                    'options', function (newVal, oldVal) {

//                        if (!angular.equals(newVal, oldVal)) {

                        if (typeof newVal.rowTemplate !== 'undefined') {

                            element.html($compile(newVal.rowTemplate)(scope));

                        }
//                        }
                    }
                );
            }
        };
    }
)

    .directive
(

    'adrrGrid', function ($compile) {

        return {

            restrict: 'AE',

            scope: true,

            template: '<table class="table table-hover table-bordered">' +
                '<thead>' +
                '<tr id="headerCells">' +
                '<th ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="rows.length === selectedItems.length" ng-click="programaticallySelect()" />' +
                '</th>' +
                '<th ng-repeat="col in cols">' +
                '{{col.displayName}}' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody adrr-grid-row>' +
                '</tbody>' +
                '</table>',

            link: function (scope, element, attrs) {

                // Check if the directive used as element or attribute then define the options
                scope.options = typeof attrs.adrrGrid !== 'undefined' ? scope.$eval(attrs.adrrGrid) : scope.$eval(attrs.adrrOptions);

                // check selectedItems in options
                scope.selectedItems = typeof scope.options.selectedItems !== 'undefined' ? scope.options.selectedItems : [];

                // check multiSelect
                scope.multiSelect = typeof scope.options.multiSelect !== 'undefined' ? scope.options.multiSelect : true;

                // check showSelectionCheckbox
                scope.showSelectionCheckbox = typeof scope.options.showSelectionCheckbox !== 'undefined' ? scope.options.showSelectionCheckbox : false;

                // assign column definitions to a scope variable
                scope.cols = scope.options.columnDefs;

                // check template and compile it
                if (typeof scope.options.template !== 'undefined') {

                    element.html($compile(scope.options.template)(scope));

                }

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

                };

                // manage selecting
                scope.rowClickHandler = function (index) {

                    var curIndex = scope.selectedItems.indexOf(index);

                    var rows = $(element).find('.adrrGridRow');

                    if (curIndex !== -1) {

                        $(rows[index]).removeClass('active');

                        scope.selectedItems.splice(curIndex, 1);

                        if (typeof scope.options.onAfterDeselectRow !== 'undefined') {

                            scope.options.onAfterDeselectRow(scope.$parent.data[index]);

                        }

                    } else {

                        if (!scope.multiSelect) {

                            $(rows[scope.options.selectedItems[0]]).removeClass('active');

                            scope.selectedItems.splice(0, 1);

                        }

                        $(rows[index]).addClass('active');

                        scope.selectedItems.push(index);

                        if (typeof scope.options.onAfterSelectRow !== 'undefined') {

                            scope.options.onAfterSelectRow(scope.$parent.data[index]);

                        }
                    }
                };
            }
        };
    }
);