angular.module('adrrApp.wrapper.eng', [], null)

    .config
(
    function config($stateProvider) {
        $stateProvider.state
        (
            'wrapper.eng',
            {
                abstract: true,

                views: {
                    "@wrapper": {
                        controller: 'EngCtrl',
                        templateUrl: 'wrapper/eng/eng.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.lab',
            {
                url: '^/labs',

                title: 'Labs',

                views: {
                    "@wrapper.eng": {
                        controller: 'LabCtrl',
                        templateUrl: 'wrapper/eng/lab.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.lab.create',
            {
                url: '^/labs/create',

                title: 'Create Lab',

                views: {
                    "@wrapper.eng": {
                        controller: 'LabCreateCtrl',
                        templateUrl: 'wrapper/eng/labForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.pouring',
            {
                url: '^/pourings',

                title: 'Pourings',

                views: {
                    '@wrapper.eng': {
                        controller: 'PouringCtrl',
                        templateUrl: 'wrapper/eng/pouring.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.pouring.create',
            {
                url: '^/pourings/create',

                title: 'Create Pouring',

                views: {
                    '@wrapper.eng': {
                        controller: 'PouringCreateCtrl',
                        templateUrl: 'wrapper/eng/pouringForm.tpl.html'
                    }
                }
            }
        );
    }
)

    .filter
(
    'fetchValue', function () {

        return function (index, model, prop) {

            prop = typeof prop === 'undefined' ? 'name' : prop;

            return model['list'][index][prop];

        };

    }
)

    .filter
(
    'removeDateAndSeconds', function () {

        return function (str) {

            var result = str.replace(/\d{4}-\d{2}-\d{2}/, '');

            return result.replace(/:00$/, '');
        }

    }
)
    .filter
(
    'yesNo', function () {

        return function (val) {

            return val === '1' ? 'Yes' : 'No';

        }
    }
)

    .controller
(
    'EngCtrl', function () {

    }
)

    .controller
(
    'LabCtrl', function ($rootScope, $scope, yii, adrrDataGetter, Restangular) {
        // ------------------------------------------------
        $rootScope.pageHeader = 'Labs';

        $rootScope.breadcrumbItems = ['Home', 'Labs'];
        // ------------------------------------------------

        $scope.yii = yii;
        $scope.metaData = yii['Lab'].cols;

        if (parseInt($scope.isEng, 10)) {

            $scope.pagingOptions =
            {
                pageSizes: [10, 20, 30],

                pageSize: 10,

                currentPage: 1
            };

            $scope.gridOptions =
            {
                data: 'motherFucker',
                enablePaging: true,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                adrrPagingOptions: 'pagingOptions',
                numRowsUrl: appConfig.yiiUrl + '/api/eng/lab/numTodayRecords',
                dataSource: appConfig.yiiUrl + '/api/eng/lab/todayRecords',
                multiSelect: false,
                plugins: [new ngGridFlexibleHeightPlugin({ minHeight: 150 })],
                columnDefs: [
                    { field: 'date', displayName: 'Date' },
                    { field: 'shift_id', displayName: 'Shift' },
                    { field: 'supplier_id', displayName: 'Supplier' },
                    { field: 'conc_type_id', displayName: 'concrete Type' },
                    { field: 'plant', displayName: 'Plant' },
                    { field: 'truck', displayName: 'Truck' },
                    { field: 'ticket', displayName: 'Ticket' },
                    { field: 'dept_time', displayName: 'Departure Time', cellFilter: 'removeDateAndSeconds' },
                    { field: 'arriv_time', displayName: 'Arrival Time', cellFilter: 'removeDateAndSeconds' },
                    { field: 'truck_load', displayName: 'Truck Load' },
                    { field: 'temp', displayName: 'Temperature' },
                    { field: 'slump', displayName: 'Slump' },
                    { field: 'flow', displayName: 'Flow' },
                    { field: 'accepted', displayName: 'Accepted' }
                ],

                rowTemplate: '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="{\'yellowBg\': row.getProperty(\'yellow\') !== null, \'redBg\': row.getProperty(\'red\') !== null}" class="ngCell {{col.cellClass}} {{col.colIndex()}}">' +
                    '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">' +
                    '&nbsp;' +
                    '</div>' +
                    '<div ng-cell></div>' +
                    '</div>'
            };

        } else {

            $scope.records = [];

            $scope.selectedEntries = [];

            adrrDataGetter.set(appConfig.yiiUrl + '/api/eng/lab/unarchived', $scope.records, 5000, 'update');

            $scope.archive = function (record) {

                Restangular.one('eng/lab/archive').get({id: record.id}).then
                (
                    function () {

                        $scope.records.splice(_.indexOf($scope.records, record, 0), 1);

                    }
                )
            };

            $scope.loadComments = function (row) {

                $scope.curRec = row;

                $scope.comments = [];

                Restangular.one('eng/lab', row.id).all('comments').getList().then
                (

                    function (data) {
                        $scope.comments = data;

                    }

                )

            };

            $scope.submitComment = function () {

                Restangular.one('eng/lab', $scope.curRec.id).all('comments').post({user_id: $rootScope.userID, comment: $scope.commentText}).then
                (
                    function (data) {
                        $scope.comments.push(data);
                    }
                )

            };

            $scope.adrrGridOptions = {
                data: 'records',

                columnDefs: [

                    {
                        field: 'date',
                        displayName: 'Date'
                    },
                    {
                        field: 'user_id',
                        displayName: 'User',
                        filters: 'fetchValue: yii["User"]:"username"'
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
                ],

                rowTemplate: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows | orderBy:\'update\':true" ng-class="{\'danger\': row.red !== null, \'warning\': row.yellow !== null && row.red === null}">' +
                    '<a href="#" onclick="return false;" ng-click="rowClickHandler(i)"><td ng-show="multiSelect && showSelectionCheckbox">' +
                    '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                    '</td>' +
                    '<td ng-repeat="col in cols" adrr-grid-cell></td></a>' +
                    '<td><button ng-click="loadComments(row)" class="btn btn-default btn-xs" data-toggle="modal" data-target="#commentModal">comment</button><button class="btn btn-default btn-xs" ng-click="archive(row)">archive</button></td>' +
                    '</tr>',

                showSelectionCheckbox: true,

                selectedItems: $scope.selectedEntries
            };
        }
    }
)

    .controller
(
    'LabCreateCtrl', function ($rootScope, $scope, yii, Restangular, $q) {
        // -------------------------------------------------------------
        $rootScope.pageHeader = 'Labs';

        $rootScope.breadcrumbItems = ['Home', 'Labs', 'Create'];
        // -------------------------------------------------------------

        $scope.metaData = yii['Lab'];

        $q.all
            (
                [
                    Restangular.all('settings/shiftType').getList(),
                    Restangular.all('settings/supplier').getList(),
                    Restangular.all('settings/concreteType').getList(),
                    Restangular.all('eng/labPlant').getList(),
                    Restangular.all('eng/labTruck').getList()
                ]
            ).then
        (
            function (dataArr) {
                $scope.plants = angular.isArray(dataArr[3]) ? dataArr[3] : [];

                $scope.trucks = angular.isArray(dataArr[4]) ? dataArr[4] : [];

                $scope.suppliers = angular.isArray(dataArr[1]) ? dataArr[1] : [];

                $scope.shiftTypes = angular.isArray(dataArr[0]) ? dataArr[0] : [];

                $scope.concreteTypes = angular.isArray(dataArr[2]) ? dataArr[2] : [];
            }
        );

        $scope.red = '';
        $scope.yellow = '';

        $scope.getItemById = function (arr, id) {

            if (!angular.isUndefined(arr)) {

                var arrLength = arr.length;

                for (var i = 0; i < arrLength; i++) {

                    if (arr[i].id === id) {

                        return arr[i];

                    }
                }
            }

            return false;
        };

        $scope.$watch
        (
            'supplierId', function (newVal) {

                if (!angular.isUndefined(newVal) && newVal !== '') {

                    $scope.ticket = $scope.getItemById($scope.suppliers, newVal).prefix;
                }
            }
        );

        $scope.model = Restangular.all('eng/lab');

        $scope.validateTime = function () {

            var overlap = 0;

            var shiftType = null;

            if (!angular.isUndefined($scope.shiftId) && $scope.shiftId !== '') {
                shiftType = $scope.getItemById($scope.shiftTypes, $scope.shiftId);

                overlap = parseInt(shiftType['overlap'], 10);
            }

            if (!angular.isUndefined($scope.deptTime) && !angular.isUndefined($scope.arrivTime)) {
                if (overlap) {
                    if ($scope.deptTime > $scope.arrivTime) {
                        return $scope.deptTime > shiftType['end_time'] && $scope.arrivTime < shiftType['start_time'];
                    }

                    return true;
                }
                else {
                    return $scope.deptTime < $scope.arrivTime;
                }
            }

            return false;
        };

        $scope.rest = function () {
            $scope.date = null;
            $scope.shiftId = '';
            $scope.supplierId = '';
            $scope.concTypeId = '';
            $scope.plant = '';
            $scope.truck = '';
            $scope.ticket = '';
            $scope.deptTime = '';
            $scope.arrivTime = '';
            $scope.truckLoad = '';
            $scope.temp = '';
            $scope.slump = '';
            $scope.flow = '';
            $scope.red = '';
            $scope.yellow = '';
            $scope.comment = '';
            $scope.accepted = '';
        };

        $scope.submit = function () {
            $scope.model.post
            ({
                date: $scope.date,
                shift_id: $scope.shiftId,
                supplier_id: $scope.supplierId,
                conc_type_id: $scope.concTypeId,
                plant: $scope.plant,
                truck: $scope.truck,
                ticket: $scope.ticket,
                dept_time: $scope.date + ' ' + $scope.deptTime,
                arriv_time: $scope.date + ' ' + $scope.arrivTime,
                truck_load: $scope.truckLoad,
                temp: $scope.temp,
                slump: $scope.slump,
                flow: $scope.flow,
                red: $scope.red !== '' ? $scope.red : null,
                yellow: $scope.yellow !== '' ? $scope.yellow : null,
                accepted: $scope.accepted
            }).then
            (
                function (data) {
                    if (!angular.isUndefined($scope.comment) && $scope.comment !== '') {
                        data.all('comments').post
                        ({
                            user_id: $rootScope.userID,
                            comment: $scope.comment
                        }).then
                        (
                            function () {
                                $scope.rest();

                                $rootScope.showAlert = true;
                                $rootScope.alert = true;
                            },

                            function () {
                                $rootScope.showAlert = true;
                                $rootScope.alert = false;
                            }
                        );
                    }
                    else {
                        $scope.rest();

                        $rootScope.showAlert = true;
                        $rootScope.alert = true;
                    }
                },

                function () {
                    $rootScope.showAlert = true;
                    $rootScope.alert = false;
                }
            );
        };

        function checkRed(from, to, prop, type) {
            var concType = $scope.getItemById($scope.concreteTypes, $scope.concTypeId);

            var isRed = !angular.isUndefined(concType) && (concType[from] > prop || concType[to] < prop);

            var pattern = new RegExp("(" + type + "|," + type + ")", "ig");

            if (isRed) {
                if ($scope.red === '') {
                    $scope.red = type;
                }
                else if (!pattern.test($scope.red)) {
                    $scope.red += ',' + type
                }
            }
            else {
                $scope.red = $scope.red.replace(pattern, '');
            }

            $scope.red = $scope.red.replace(/^,/ig, '');

            return isRed;
        }

        var checkYellow = function (from, to, prop, type) {
            var concType = $scope.getItemById($scope.concreteTypes, $scope.concTypeId);

            var isYellow = !angular.isUndefined(concType) && (concType[from] > prop || concType[to] < prop);

            var pattern = new RegExp("(" + type + "|," + type + ")", "ig");

            if (isYellow) {
                if ($scope.yellow === '') {
                    $scope.yellow = type;
                }
                else if (!pattern.test($scope.yellow)) {
                    $scope.yellow += ',' + type
                }
            }
            else {
                $scope.yellow = $scope.yellow.replace(pattern, '');
            }

            $scope.yellow = $scope.yellow.replace(/^,/ig, '');

            return isYellow;
        };

        $scope.checkFlowRed = function () {
            return checkRed('flow_acpt_from', 'flow_acpt_to', $scope.flow, 'flow');
        };

        $scope.checkFlowYellow = function () {
            return checkYellow('flow_norm_from', 'flow_norm_to', $scope.flow, 'flow');
        };

        $scope.checkSlumpRed = function () {
            return checkRed('slump_acpt_from', 'slump_acpt_to', $scope.slump, 'slump');
        };

        $scope.checkSlumpYellow = function () {
            return checkYellow('slump_norm_from', 'slump_norm_to', $scope.slump, 'slump');
        };

        $scope.checkTempRed = function () {
            return checkRed('temp_from', 'temp_to', $scope.temp, 'temp');
        };

        $scope.setToday = function () {
            $scope.date = $.datepicker.formatDate('yy-mm-dd', new Date()).toString();
        };
    }
)

    .controller
(
    'PouringCtrl', function ($rootScope) {
        // -------------------------------------------------------------
        $rootScope.pageHeader = 'Pourings';

        $rootScope.breadcrumbItems = ['Home', 'Pourings'];
        // -------------------------------------------------------------
    }
)

    .controller
(
    'PouringCreateCtrl', function ($rootScope) {
        // -------------------------------------------------------------
        $rootScope.pageHeader = 'Pourings';

        $rootScope.breadcrumbItems = ['Home', 'Pourings', 'Create'];
        // -------------------------------------------------------------
    }
);