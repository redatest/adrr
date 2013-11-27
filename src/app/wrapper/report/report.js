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
        )

            .state
        (
            'wrapper.rep.endShift',
            {
                url: '^/report/end-shift',

                title: 'End Shift Report',

                breadcrumb: ['Home', 'Report & Statistics', 'End Shift Report'],

                views: {

                    "@wrapper.rep": {

                        controller: 'RepEndShiftCtrl',

                        templateUrl: 'wrapper/report/endShift.tpl.html'

                    }
                }
            }
        )

            .state
        (
            'wrapper.rep.endDay',
            {
                url: '^/report/end-day',

                title: 'End Day Report',

                breadcrumb: ['Home', 'Report & Statistics', 'End Day Report'],

                views: {

                    "@wrapper.rep": {

                        controller: 'RepEndDayCtrl',

                        templateUrl: 'wrapper/report/endDay.tpl.html'

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

        var columnDefs = [

            {
                field: 'date',
                displayName: 'Date',
                filters: 'stringDate:"dd-MM-yyyy"'
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
                filters: 'stringDate:"HH:mm"'
            },
            {
                field: 'arriv_time',
                displayName: 'Arrival Time',
                filters: 'stringDate:"HH:mm"'
            },
            {
                field: 'accepted',
                displayName: 'Accepted',
                filters: 'yesNo'
            }
        ];

        $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/lab/getArchived', 5000, 'update');

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
    'RepPouringCtrl', function ($rootScope, $scope, $state, Restangular, adrrDataFetcher) {

        $scope.selectedItems = [];

        var columnDefs = [

            {
                field: 'date',
                displayName: 'Date',
                filters: 'stringDate:"dd-MM-yyyy"'
            },
            {
                field: 'shift_id',
                displayName: 'Shift',
                filters: 'fetchValue: yii["ShiftType"]'
            },
//            {
//                field: 'supplier_id',
//                displayName: 'Supplier',
//                filters: 'fetchValue: yii["Supplier"]'
//            },
            {
                field: 'pouring_type_id',
                displayName: 'Pouring',
                filters: 'fetchValue: yii["PouringType"]'
            },
            {
                field: 'ir',
                displayName: 'IR'
            },
            {
                field: 'zone_id',
                displayName: 'Zone',
                filters: 'fetchValue: yii["Zone"]'
            },
            {
                field: 'area',
                displayName: 'Area'
            },
//            {
//                field: 'axis',
//                displayName: 'Axis'
//            },
//            {
//                field: 'level',
//                displayName: 'Level'
//            },
            {
                field: 'est_vol',
                displayName: 'Est Vol'
            },
            {
                field: 'ticket',
                displayName: 'Ticket'
            },
            {
                field: 'truck',
                displayName: 'Truck'
            },
            {
                field: 'conc_type_id',
                displayName: 'Concrete',
                filters: 'fetchValue: yii["ConcreteType"]'
            },
//            {
//                field: 'truck_load',
//                displayName: 'Truck Load'
//            },
            {
                field: 'poured_qty',
                displayName: 'QTY'
            },
            {
                field: 'dept_time',
                displayName: 'Dept Time',
                filters: 'stringDate:"HH:mm"'
            },
//            {
//                field: 'slump_b',
//                displayName: 'Slump B'
//            },
//            {
//                field: 'hrwr',
//                displayName: 'HRWR'
//            },
//            {
//                field: 'water',
//                displayName: 'Water'
//            },
//            {
//                field: 'slump_a',
//                displayName: 'Slump A'
//            },
            {
                field: 'start_time',
                displayName: 'Start',
                filters: 'stringDate:"HH:mm"'
            },
            {
                field: 'end_time',
                displayName: 'End',
                filters: 'stringDate:"HH:mm"'
            }

        ];

        if ($rootScope.loginData['role'] == 3) {

            columnDefs.splice(1, 0, { field: 'user_id', displayName: 'User', filters: 'fetchValue: yii["User"]:"username"' });

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/pouring/getArchived', 5000, 'update');

        } else {

            $scope.records = adrrDataFetcher.get(appConfig.yiiUrl + '/api/eng/pouring/getArchived');

        }

        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            rowTemplate: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows | orderBy:\'update\':true">' +
                '<td ng-show="multiSelect && showSelectionCheckbox" ng-click="rowClickHandler(i)">' +
                '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                '</td>' +
                '<td ng-repeat="col in cols" adrr-grid-cell ng-click="rowClickHandler(i)"></td>' +
                '<td class="actions">' +
                '<a title="Comments" class="btn btn-default btn-xs" onclick="return false;" href="#" ng-click="loadComments(row)" data-toggle="modal" data-target="#commentModal">' +
                '<i class="fa fa-comments-o fa-lg orng"></i>' +
                '</a>' +
                '</td>' +
                '</tr>',

            headerTemplate: '<tr id="headerCells">' +
                '<th ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="rows.length === selectedItems.length" ng-click="programaticallySelect()" />' +
                '</th>' +
                '<th ng-repeat="col in cols">' +
                '{{col.displayName}}' +
                '</th>' +
                '<th>Actions</th>' +
                '</tr>',

            showSelectionCheckbox: true,

            multiSelect: false

        };

        $scope.createClickHandler = function () {

            $state.go('wrapper.eng.pouring.create');

        };

        $scope.loadComments = function (row) {

            $scope.curRec = row;

            $scope.comments = [];

            Restangular.one('eng/pouring', row.id).all('comments').getList().then
            (

                function (data) {

                    $scope.comments = angular.isArray(data) ? data : [];

                }

            )

        };

        $rootScope.showControls = $rootScope.loginData['role'] == 4;

        $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['role'] == 4
            }

        ];

        $scope.$on
        (
            '$destroy', function () {
                adrrDataFetcher.unset($scope.records);
            }
        );
    }
)

    .controller
(
    'RepEndShiftCtrl', function ($rootScope, $scope, $state, Restangular, adrrDataFetcher) {
        $scope.selectedItems = [];

        var columnDefs = [

            {
                field: 'date',
                displayName: 'Date',
                filters: 'stringDate:"dd-MM-yyyy"'
            },
            {
                field: 'shift_id',
                displayName: 'Shift',
                filters: 'fetchValue: yii["ShiftType"]'
            },
//            {
//                field: 'supplier_id',
//                displayName: 'Supplier',
//                filters: 'fetchValue: yii["Supplier"]'
//            },
            {
                field: 'pouring_type_id',
                displayName: 'Pouring',
                filters: 'fetchValue: yii["PouringType"]'
            },
            {
                field: 'ir',
                displayName: 'IR'
            },
            {
                field: 'zone_id',
                displayName: 'Zone',
                filters: 'fetchValue: yii["Zone"]'
            },
            {
                field: 'area',
                displayName: 'Area'
            },
//            {
//                field: 'axis',
//                displayName: 'Axis'
//            },
//            {
//                field: 'level',
//                displayName: 'Level'
//            },
            {
                field: 'est_vol',
                displayName: 'Est Vol'
            },
            {
                field: 'ticket',
                displayName: 'Ticket'
            },
            {
                field: 'truck',
                displayName: 'Truck'
            },
            {
                field: 'conc_type_id',
                displayName: 'Concrete',
                filters: 'fetchValue: yii["ConcreteType"]'
            },
//            {
//                field: 'truck_load',
//                displayName: 'Truck Load'
//            },
            {
                field: 'poured_qty',
                displayName: 'QTY'
            },
            {
                field: 'dept_time',
                displayName: 'Dept Time',
                filters: 'stringDate:"HH:mm"'
            },
//            {
//                field: 'slump_b',
//                displayName: 'Slump B'
//            },
//            {
//                field: 'hrwr',
//                displayName: 'HRWR'
//            },
//            {
//                field: 'water',
//                displayName: 'Water'
//            },
//            {
//                field: 'slump_a',
//                displayName: 'Slump A'
//            },
            {
                field: 'start_time',
                displayName: 'Start',
                filters: 'stringDate:"HH:mm"'
            },
            {
                field: 'end_time',
                displayName: 'End',
                filters: 'stringDate:"HH:mm"'
            }

        ];

        if ($rootScope.loginData['role'] == 3) {

            columnDefs.splice(1, 0, { field: 'user_id', displayName: 'User', filters: 'fetchValue: yii["User"]:"username"' });

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/pouring/getArchived', 5000, 'update');

        } else {

            $scope.records = adrrDataFetcher.get(appConfig.yiiUrl + '/api/eng/pouring/getArchived');

        }

        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            rowTemplate: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows | orderBy:\'update\':true">' +
                '<td ng-show="multiSelect && showSelectionCheckbox" ng-click="rowClickHandler(i)">' +
                '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                '</td>' +
                '<td ng-repeat="col in cols" adrr-grid-cell ng-click="rowClickHandler(i)"></td>' +
                '<td class="actions">' +
                '<a title="Comments" class="btn btn-default btn-xs" onclick="return false;" href="#" ng-click="loadComments(row)" data-toggle="modal" data-target="#commentModal">' +
                '<i class="fa fa-comments-o fa-lg orng"></i>' +
                '</a>' +
                '</td>' +
                '</tr>',

            headerTemplate: '<tr id="headerCells">' +
                '<th ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="rows.length === selectedItems.length" ng-click="programaticallySelect()" />' +
                '</th>' +
                '<th ng-repeat="col in cols">' +
                '{{col.displayName}}' +
                '</th>' +
                '<th>Actions</th>' +
                '</tr>',

            showSelectionCheckbox: true,

            multiSelect: false

        };

        $scope.createClickHandler = function () {

            $state.go('wrapper.eng.pouring.create');

        };

        $scope.loadComments = function (row) {

            $scope.curRec = row;

            $scope.comments = [];

            Restangular.one('eng/pouring', row.id).all('comments').getList().then
            (

                function (data) {

                    $scope.comments = angular.isArray(data) ? data : [];

                }

            )

        };

        $rootScope.showControls = $rootScope.loginData['role'] == 4;

        $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['role'] == 4
            }

        ];

        $scope.$on
        (
            '$destroy', function () {
                adrrDataFetcher.unset($scope.records);
            }
        );
    }
)

    .controller
(
    'RepEndDayCtrl', function ($rootScope, $scope, $state, Restangular, adrrDataFetcher) {
        $scope.selectedItems = [];

        var columnDefs = [

            {
                field: 'date',
                displayName: 'Date',
                filters: 'stringDate:"dd-MM-yyyy"'
            },
            {
                field: 'shift_id',
                displayName: 'Shift',
                filters: 'fetchValue: yii["ShiftType"]'
            },
//            {
//                field: 'supplier_id',
//                displayName: 'Supplier',
//                filters: 'fetchValue: yii["Supplier"]'
//            },
            {
                field: 'pouring_type_id',
                displayName: 'Pouring',
                filters: 'fetchValue: yii["PouringType"]'
            },
            {
                field: 'ir',
                displayName: 'IR'
            },
            {
                field: 'zone_id',
                displayName: 'Zone',
                filters: 'fetchValue: yii["Zone"]'
            },
            {
                field: 'area',
                displayName: 'Area'
            },
//            {
//                field: 'axis',
//                displayName: 'Axis'
//            },
//            {
//                field: 'level',
//                displayName: 'Level'
//            },
            {
                field: 'est_vol',
                displayName: 'Est Vol'
            },
            {
                field: 'ticket',
                displayName: 'Ticket'
            },
            {
                field: 'truck',
                displayName: 'Truck'
            },
            {
                field: 'conc_type_id',
                displayName: 'Concrete',
                filters: 'fetchValue: yii["ConcreteType"]'
            },
//            {
//                field: 'truck_load',
//                displayName: 'Truck Load'
//            },
            {
                field: 'poured_qty',
                displayName: 'QTY'
            },
            {
                field: 'dept_time',
                displayName: 'Dept Time',
                filters: 'stringDate:"HH:mm"'
            },
//            {
//                field: 'slump_b',
//                displayName: 'Slump B'
//            },
//            {
//                field: 'hrwr',
//                displayName: 'HRWR'
//            },
//            {
//                field: 'water',
//                displayName: 'Water'
//            },
//            {
//                field: 'slump_a',
//                displayName: 'Slump A'
//            },
            {
                field: 'start_time',
                displayName: 'Start',
                filters: 'stringDate:"HH:mm"'
            },
            {
                field: 'end_time',
                displayName: 'End',
                filters: 'stringDate:"HH:mm"'
            }

        ];

        if ($rootScope.loginData['role'] == 3) {

            columnDefs.splice(1, 0, { field: 'user_id', displayName: 'User', filters: 'fetchValue: yii["User"]:"username"' });

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/pouring/getArchived', 5000, 'update');

        } else {

            $scope.records = adrrDataFetcher.get(appConfig.yiiUrl + '/api/eng/pouring/getArchived');

        }

        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            rowTemplate: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows | orderBy:\'update\':true">' +
                '<td ng-show="multiSelect && showSelectionCheckbox" ng-click="rowClickHandler(i)">' +
                '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                '</td>' +
                '<td ng-repeat="col in cols" adrr-grid-cell ng-click="rowClickHandler(i)"></td>' +
                '<td class="actions">' +
                '<a title="Comments" class="btn btn-default btn-xs" onclick="return false;" href="#" ng-click="loadComments(row)" data-toggle="modal" data-target="#commentModal">' +
                '<i class="fa fa-comments-o fa-lg orng"></i>' +
                '</a>' +
                '</td>' +
                '</tr>',

            headerTemplate: '<tr id="headerCells">' +
                '<th ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="rows.length === selectedItems.length" ng-click="programaticallySelect()" />' +
                '</th>' +
                '<th ng-repeat="col in cols">' +
                '{{col.displayName}}' +
                '</th>' +
                '<th>Actions</th>' +
                '</tr>',

            showSelectionCheckbox: true,

            multiSelect: false

        };

        $scope.createClickHandler = function () {

            $state.go('wrapper.eng.pouring.create');

        };

        $scope.loadComments = function (row) {

            $scope.curRec = row;

            $scope.comments = [];

            Restangular.one('eng/pouring', row.id).all('comments').getList().then
            (

                function (data) {

                    $scope.comments = angular.isArray(data) ? data : [];

                }

            )

        };

        $rootScope.showControls = $rootScope.loginData['role'] == 4;

        $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['role'] == 4
            }

        ];

        $scope.$on
        (
            '$destroy', function () {
                adrrDataFetcher.unset($scope.records);
            }
        );
    }
);