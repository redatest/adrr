angular.module('adrrApp.wrapper.report', [], null)

    .config
(
    function config($stateProvider) {

        $stateProvider.state
        (
            'wrapper.rep',
            {
                abstract: true,

                views: {

                    "@wrapper": {

                        controller: 'RepCtrl',

                        templateUrl: 'wrapper/report/report.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.rep.conc',
            {
                url: '^/report/conc',

                title: 'Reports & statistics for Concrete',

                breadcrumb: ['Home', 'Report & Statistics', 'Concrete'],

                views: {

                    "@wrapper.rep": {

                        controller: 'RepConcCtrl',

                        templateUrl: 'wrapper/report/conc.tpl.html'

                    }
                }
            }
        )

            .state
        (
            'wrapper.rep.pouring',
            {
                url: '^/report/pouring',

                title: 'Reports & statistics for Pouring',

                breadcrumb: ['Home', 'Report & Statistics', 'Pouring'],

                views: {

                    "@wrapper.rep": {

                        controller: 'RepPouringCtrl',

                        templateUrl: 'wrapper/report/pouring.tpl.html'

                    }
                }
            }
        );

    }
)

    .controller
(
    'RepCtrl', function RepCtrl($rootScope) {

        $rootScope.showControls = false;

    }
)

    .controller
(
    'RepConcCtrl', function RepConcCtrl($rootScope, $scope, yii, adrrDataFetcher, Restangular) {

        $scope.yii = yii;
        $scope.metaData = yii['Lab'].cols;

        $scope.records = [];

        var columnDefs = [

            {
                field: 'date',
                displayName: 'Date'
            },
            {
                field: 'shift_id',
                displayName: 'Shift',
                filters: 'fetchValue: yii["ShiftType"]'
            },
            {
                field: 'supplier_id',
                displayName: 'Supplier',
                filters: 'fetchValue: yii["Supplier"]'
            },
            {
                field: 'conc_type_id',
                displayName: 'Concrete',
                filters: 'fetchValue: yii["ConcreteType"]'
            },
            {
                field: 'temp',
                displayName: 'Temp'
            },
            {
                field: 'slump',
                displayName: 'Slump'
            },
            {
                field: 'flow',
                displayName: 'Flow'
            },
            {
                field: 'plant',
                displayName: 'Plant'
            },
            {
                field: 'truck',
                displayName: 'Truck'
            },
            {
                field: 'truck_load',
                displayName: 'Truck Load'
            },
            {
                field: 'ticket',
                displayName: 'Ticket'
            },
            {
                field: 'dept_time',
                displayName: 'Dept Time',
                filters: 'removeDateAndSeconds'
            },
            {
                field: 'arriv_time',
                displayName: 'Arrival Time',
                filters: 'removeDateAndSeconds'
            },
            {
                field: 'accepted',
                displayName: 'Accepted',
                filters: 'yesNo'
            }
        ];

        adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/lab/getArchived', $scope.records, 5000, 'update');

        $scope.loadComments = function (row) {

            $scope.curRec = row;

            $scope.comments = [];

            Restangular.one('eng/lab', row.id).all('comments').getList().then
            (

                function (data) {

                    $scope.comments = angular.isArray(data) ? data : [];

                }

            )

        };

        $scope.adrrGridOptions = {
            data: 'records',

            columnDefs: columnDefs,

            rowTemplate: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows | orderBy:\'update\':true" ng-class="{\'danger\': row.red !== null, \'warning\': row.yellow !== null && row.red === null}">' +
                '<a href="#" onclick="return false;" ng-click="rowClickHandler(i)"><td ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                '</td>' +
                '<td ng-repeat="col in cols" adrr-grid-cell></td></a>' +
                '<td><button ng-click="loadComments(row)" class="btn btn-default btn-xs" data-toggle="modal" data-target="#commentModal">history</button></td>' +
                '</tr>',

            headerTemplate: '<tr id="headerCells">' +
                '<th ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="rows.length === selectedItems.length" ng-click="programaticallySelect()" />' +
                '</th>' +
                '<th ng-repeat="col in cols">' +
                '{{col.displayName}}' +
                '</th>' +
                '<th>Comments</th>' +
                '</tr>',

            multiSelect: true
        };

        $scope.$on
        (
            '$destroy', function () {
                adrrDataFetcher.unset($scope.records);
            }
        )

    }
)

    .controller
(
    'RepPouringCtrl', function ($state) {
    }
);