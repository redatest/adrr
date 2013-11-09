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
                abstract: true,

                views: {
                    "@wrapper": {
                        controller: 'LabCtrl',
                        templateUrl: 'wrapper/eng/lab.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.lab.inbox',
            {
                url: '^/labs/inbox',

                title: 'Inbox',

                showControls: true,

                breadcrumb: ['Home', 'Concrete Field', 'Inbox'],

                views: {
                    "@wrapper.eng.lab": {
                        controller: 'LabInboxCtrl',
                        templateUrl: 'wrapper/eng/labInbox.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.lab.returned',
            {
                url: '^/labs/returned',

                title: 'Archive',

                breadcrumb: ['Home', 'Concrete Field', 'Returned'],

                showControls: true,

                views: {
                    "@wrapper.eng.lab": {
                        controller: 'LabReturnedCtrl',
                        templateUrl: 'wrapper/eng/labReturned.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.lab.archive',
            {
                url: '^/labs/archive',

                title: 'Archive',

                breadcrumb: ['Home', 'Concrete Field', 'Archive'],

                showControls: true,

                views: {
                    "@wrapper.eng.lab": {
                        controller: 'LabArchiveCtrl',
                        templateUrl: 'wrapper/eng/labArchive.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.lab.create',
            {
                url: '^/labs/create',

                title: 'New concrete field record',

                breadcrumb: ['Home', 'Concrete Field', 'New record'],

                showControls: true,

                views: {
                    "@wrapper.eng.lab": {
                        controller: 'LabCreateCtrl',
                        templateUrl: 'wrapper/eng/labForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.lab.edit',
            {
                url: '^/labs/edit/:id',

                title: 'Edit Lab',

                breadcrumb: ['Home', 'Concrete Field', 'Edit'],

                showControls: true,

                views: {

                    "@wrapper.eng.lab": {

                        controller: 'LabEditCtrl',
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

                abstract: true,

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
            'wrapper.eng.pouring.inbox',
            {
                url: '^/pourings/inbox',

                title: 'Pourings Inbox',

                breadcrumb: ['Home', 'Pourings', 'Inbox'],

                showControls: true,

                views: {
                    '@wrapper.eng.pouring': {
                        controller: 'PouringInboxCtrl',
                        templateUrl: 'wrapper/eng/pouringInbox.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.pouring.create',
            {
                url: '^/pourings/create',

                title: 'New pouring record',

                breadcrumb: ['Home', 'Pourings', 'New record'],

                showControls: true,

                views: {
                    '@wrapper.eng': {
                        controller: 'PouringCreateCtrl',
                        templateUrl: 'wrapper/eng/pouringForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.temp',
            {
                abstract: true,

                views: {

                    "@wrapper.eng": {

                        controller: 'TempCtrl',

                        templateUrl: 'wrapper/eng/temp.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.eng.temp.inbox',
            {
                url: '^/lab-temp',

                title: 'Lab Temperature',

                breadcrumb: ['Home', 'Lab Temperature', 'Inbox'],

                showControls: true,

                views: {

                    '@wrapper.eng.temp': {

                        controller: 'TempInboxCtrl',

                        templateUrl: 'wrapper/eng/tempInbox.tpl.html'

                    }

                }
            }
        )

            .state
        (
            'wrapper.eng.temp.create',
            {
                url: '^/lab-temp/create',

                title: 'New lab temperature record',

                breadcrumb: ['Home', 'Lab Temperature', 'New record'],

                showControls: true,

                views: {

                    '@wrapper.eng.temp': {

                        controller: 'TempInboxCreateCtrl',

                        templateUrl: 'wrapper/eng/tempForm.tpl.html'

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

            if (typeof index !== 'undefined') {

                prop = typeof prop === 'undefined' ? 'name' : prop;

                return model['list'][index][prop];
            }

            return '';
        };

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

    .filter
(
    'validTime', function () {

        return function (dept, arriv, shift) {

//            if (typeof dept !== 'undefined' && typeof arriv !== 'undefined') {
//
//                if (typeof shift !== 'undefined') {
//
//                    if (dept > arriv && parseInt(shift['overlap'], 10)) {
//
//                        return (dept > shift['start_time'] || dept < shift['end_time']) && (arriv > shift['start_time'] || arriv < shift['end_time']);
//
//                    } else if (dept < arriv) {
//
//                        return dept > shift['start_time'] && dept < shift['end_time'] && arriv > shift['start_time'] && arriv < shift['end_time'];
//
//                    }
//
//                    false
//
//                }
//            }
//
//            return false;

            if (typeof dept !== 'undefined' && typeof arriv !== 'undefined') {

                var deptArr = dept.split(':');
                var arrivArr = arriv.split(':');

                var t1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), deptArr[0], deptArr[1], 0);
                var t2 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), arrivArr[0], arrivArr[1], 0);

                if (Math.abs(t1 - t2) / 1000 / 60 <= 120) {

                    if (typeof shift !== 'undefined' && dept > arriv && parseInt(shift['overlap'], 10)) {

                        return dept > shift['end_time'] && arriv < shift['start_time'];

                    }

                    return dept < arriv;
                }
            }

            return false;

        }

    }
)

    .filter
(
    'rangeClass', function () {

        return function (conc, type, val, data) {

            if (typeof val !== 'undefined' && val !== '' && val !== null) {

                var pattern = new RegExp("(" + type + "|," + type + ")", "ig");

                var setRed = function () {

                    if (typeof data.red === 'undefined' || data.red === '' || data.red === null) {
                        data.red = type;
                    }
                    else if (!pattern.test(data.red)) {
                        data.red += ',' + type
                    }

                };

                var unsetRed = function () {

                    if (typeof data.red !== 'undefined' && data.red !== null) {
                        data.red = data.red.replace(pattern, '');

                        if (data.red === '') {
                            data.red = null;
                        }
                    }
                };

                var setYellow = function () {

                    if (typeof data.yellow === 'undefined' || data.yellow === '' || data.yellow === null) {
                        data.yellow = type;
                    }
                    else if (!pattern.test(data.yellow)) {
                        data.yellow += ',' + type
                    }

                };

                var unsetYellow = function () {

                    if (typeof data.yellow !== 'undefined' && data.yellow !== null) {
                        data.yellow = data.yellow.replace(pattern, '');

                        if (data.yellow === '') {
                            data.yellow = null;
                        }
                    }
                };

                if (type === 'flow') {

                    if (val < conc['flow_acpt_from'] || val > conc['flow_acpt_to']) {

                        setRed();

                        unsetYellow();

                        return 'has-error';

                    } else if (val < conc['flow_norm_from'] || val > conc['flow_norm_to']) {

                        setYellow();

                        unsetRed();

                        return 'has-warning';

                    }

                    unsetRed();
                    unsetYellow();

                    return '';

                } else if (type === 'slump') {

                    if (val < conc['slump_acpt_from'] || val > conc['slump_acpt_to']) {

                        setRed();

                        unsetYellow();

                        return 'has-error';

                    } else if (val < conc['slump_norm_from'] || val > conc['slump_norm_to']) {

                        setYellow();

                        unsetRed();

                        return 'has-warning';

                    }

                    unsetRed();

                    unsetYellow();

                    return '';

                } else {

                    if (val < conc['temp_from'] || val > conc['temp_to']) {

                        setRed();

                        return 'has-error';
                    }

                    unsetRed();

                    return '';

                }
            }

            return 'has-error';
        }
    }
)

    .filter
(
    'tickPref', function () {
        return function (tick, model) {
            return model.prefix + tick;
        }
    }
)

    .controller
(
    'EngCtrl', function ($rootScope) {

    }
)

    .controller
(
    'LabCtrl', function ($rootScope) {

        $rootScope.showCreate = true;
        $rootScope.createUrl = '#/labs/create';

    }
)

    .controller
(
    'LabInboxCtrl', function ($rootScope, $scope, yii, adrrDataFetcher, Restangular, $state) {

//        if (parseInt($scope.loginData.eng, 10)) {
//
//            $scope.pagingOptions =
//            {
//                pageSizes: [10, 20, 30],
//
//                pageSize: 10,
//
//                currentPage: 1
//            };
//
//            $scope.gridOptions =
//            {
//                data: 'motherFucker',
//                enablePaging: true,
//                showFooter: true,
//                totalServerItems: 'totalServerItems',
//                pagingOptions: $scope.pagingOptions,
//                adrrPagingOptions: 'pagingOptions',
//                numRowsUrl: appConfig.yiiUrl + '/api/eng/lab/numTodayRecords',
//                dataSource: appConfig.yiiUrl + '/api/eng/lab/todayRecords',
//                multiSelect: false,
//                plugins: [new ngGridFlexibleHeightPlugin({ minHeight: 150 })],
//                columnDefs: [
//                    { field: 'date', displayName: 'Date' },
//                    { field: 'shift_id', displayName: 'Shift' },
//                    { field: 'supplier_id', displayName: 'Supplier' },
//                    { field: 'conc_type_id', displayName: 'concrete Type' },
//                    { field: 'plant', displayName: 'Plant' },
//                    { field: 'truck', displayName: 'Truck' },
//                    { field: 'ticket', displayName: 'Ticket' },
//                    { field: 'dept_time', displayName: 'Departure Time', cellFilter: 'removeDateAndSeconds' },
//                    { field: 'arriv_time', displayName: 'Arrival Time', cellFilter: 'removeDateAndSeconds' },
//                    { field: 'truck_load', displayName: 'Truck Load' },
//                    { field: 'temp', displayName: 'Temperature' },
//                    { field: 'slump', displayName: 'Slump' },
//                    { field: 'flow', displayName: 'Flow' },
//                    { field: 'accepted', displayName: 'Accepted' }
//                ],
//
//                rowTemplate: '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="{\'yellowBg\': row.getProperty(\'yellow\') !== null, \'redBg\': row.getProperty(\'red\') !== null}" class="ngCell {{col.cellClass}} {{col.colIndex()}}">' +
//                    '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">' +
//                    '&nbsp;' +
//                    '</div>' +
//                    '<div ng-cell></div>' +
//                    '</div>'
//            };
//
//        } else {

        $scope.yii = yii;

        $scope.metaData = yii['Lab'].cols;

        $scope.selectedItems = [];

        $scope.createClickHandler = function () {

            $state.transitionTo('wrapper.eng.lab.create');

        };

        $scope.archive = function (record) {

            Restangular.one('eng/lab/archive').get({id: record.id}).then
            (
                function () {

                    $scope.records.splice(_.indexOf($scope.records, record, 0), 1);

                }
            );
        };

        $scope.archiveSelected = function () {

            var ids = [];

            for (var i = 0; i < $scope.selectedItems.length; i++) {

                ids.push($scope.records[i]['id']);

            }

            Restangular.one('eng/lab').post('archive', {toArchive: ids}).then
            (
                function (data) {
                    for (i = 0; i < data.length; i++) {
                        $scope.records.splice(_.indexOf($scope.records, data[i], 0), 1);
                    }
                }
            );

        };

        $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['senior'] == 0
            },

            {
                title: 'Archive Selected',
                clickHandler: $scope.archiveSelected,
                visibility: $rootScope.loginData['senior'] == 1,
                disabled: true
            }

        ];

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
                displayName: 'Ticket',
                filters: 'tickPref:yii["Supplier"]["list"][row.supplier_id]'
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

        if ($rootScope.loginData['senior'] === '1') {

            columnDefs.splice(1, 0, { field: 'user_id', displayName: 'User', filters: 'fetchValue: yii["User"]:"username"' });

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/lab/getUnarchived', 5000, 'update');

        } else {

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/lab/getUnarchived');

        }

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

        $scope.submitComment = function () {

            Restangular.one('eng/lab', $scope.curRec.id).all('comments').post({user_id: $rootScope.loginData.user_id, comment: $scope.commentText}).then
            (
                function (data) {
                    $scope.comments.push(data);

                    $scope.commentText = '';

                    Restangular.one('eng/lab/return').get({id: $scope.curRec.id}).then
                    (
                        function () {

                            $scope.records.splice(_.indexOf($scope.records, $scope.curRec, 0), 1);

                            $('#commentModal').modal('hide');

                            if (!$scope.$$phase) {

                                $scope.$apply();

                            }
                        }
                    )
                }
            )

        };


        $scope.afterSelectionChangeHandler = function () {

            $scope.controls[1].disabled = !$scope.selectedItems.length;
        };

        $scope.adrrGridOptions = {
            data: 'records',

            columnDefs: columnDefs,

            rowTemplate: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows | orderBy:\'update\':true" ng-class="{\'danger\': row.red !== null, \'warning\': row.yellow !== null && row.red === null}">' +
                '<td ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                '</td>' +
                '<td ng-repeat="col in cols" adrr-grid-cell ng-click="rowClickHandler(i)"></td>' +
                '<td class="actions" ng-show="loginData.senior === \'1\'">' +
                '<a title="Comments" class="btn btn-default btn-xs" onclick="return false;" href="#" ng-click="loadComments(row)" data-toggle="modal" data-target="#commentModal">' +
                '<i class="fa fa-comments-o fa-lg orng"></i>' +
                '</a>' +
                '<a title="Archive" class="btn btn-default btn-xs" href="#" onclick="return false;" ng-click="archive(row)">' +
                '<i class="fa fa-download fa-lg blk"></i>' +
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
                '<th ng-show="loginData.senior === \'1\'">Actions</th>' +
                '</tr>',

            showSelectionCheckbox: true,

            multiSelect: ($rootScope.loginData['senior'] === '1'),

            selectedItems: $scope.selectedItems,

            onAfterSelectionChangeHandler: $scope.afterSelectionChangeHandler
        };
//        }

        $scope.$on
        (
            '$destroy', function () {
                adrrDataFetcher.unset($scope.records);
            }
        )
    }
)

    .
    controller
(
    'LabArchiveCtrl', function ($rootScope, $scope, yii, adrrDataFetcher, Restangular, $state) {

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
                displayName: 'Ticket',
                filters: 'tickPref:yii["Supplier"]["list"][row.supplier_id]'
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

        if ($rootScope.loginData['senior'] === '1') {

            columnDefs.splice(1, 0, { field: 'user_id', displayName: 'User', filters: 'fetchValue: yii["User"]:"username"' });

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/lab/getArchived', 5000, 'update');

        } else {

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/lab/getArchived');

        }

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
                '<td class="actions">' +
                '<a title="Comments" onclick="return false;" href="#" ng-click="loadComments(row)" class="btn btn-default btn-xs" data-toggle="modal" data-target="#commentModal">' +
                '<i class="fa fa-comments fa-lg orng"></i>' +
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

            multiSelect: true
        };

        $rootScope.showControls = $rootScope.loginData['eng'];

        $scope.createClickHandler = function () {

            $state.transitionTo('wrapper.eng.lab.create');

        };

        $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['senior'] == 0
            }

        ];

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
    'LabReturnedCtrl', function ($rootScope, $scope, yii, adrrDataFetcher, Restangular, $state) {

        $scope.yii = yii;
        $scope.metaData = yii['Lab'].cols;

        $scope.selectedItems = [];

        var columnDefs = [

            {
                field: 'date',
                displayName: 'Date',
                filters: 'date:"dd-MM-yyyy"'
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
                displayName: 'Ticket',
                filters: 'tickPref:yii["Supplier"]["list"][row.supplier_id]'
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

        if ($rootScope.loginData['senior'] === '1') {

            columnDefs.splice(1, 0, { field: 'user_id', displayName: 'User', filters: 'fetchValue: yii["User"]:"username"' });

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/lab/getReturned', 5000, 'update');

        } else {

            $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/eng/lab/getReturned');

        }

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

                    $scope.comments = angular.isArray(data) ? data : [];

                }

            )

        };

        $scope.submitComment = function () {

            Restangular.one('eng/lab', $scope.curRec.id).all('comments').post({user_id: $rootScope.loginData.user_id, comment: $scope.commentText}).then
            (
                function (data) {
                    $scope.comments.push(data);

                    $scope.commentText = '';

                    Restangular.one('eng/lab/return').get({id: $scope.curRec.id}).then
                    (
                        function () {

                            $scope.records.splice(_.indexOf($scope.records, $scope.curRec, 0), 1);

                            $('#commentModal').modal('hide');

                            if (!$scope.$$phase) {

                                $scope.$apply();

                            }
                        }
                    )
                }
            )

        };

        $scope.afterSelectionChangeHandler = function () {

            $scope.controls[1].disabled = !$scope.selectedItems.length;
        };

        $scope.adrrGridOptions = {
            data: 'records',

            columnDefs: columnDefs,

            rowTemplate: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows | orderBy:\'update\':true" ng-class="{\'danger\': row.red !== null, \'warning\': row.yellow !== null && row.red === null}">' +
                '<td ng-show="multiSelect && showSelectionCheckbox">' +
                '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                '</td>' +
                '<td ng-repeat="col in cols" adrr-grid-cell ng-click="rowClickHandler(i)"></td>' +
                '<td class="actions">' +
                '<a title="Comments" class="btn btn-default btn-xs" href="#" onclick="return false;" ng-click="loadComments(row)" data-toggle="modal" data-target="#commentModal">' +
                '<i class="fa fa-comments-o fa-lg orng"></i>' +
                '</a>' +
                '<a title="Archive" class="btn btn-default btn-xs" ng-show="loginData.senior === \'1\'" onclick="return false;" href="#" ng-click="archive(row)">' +
                '<i class="fa fa-download fa-lg blk"></i>' +
                '</a>' +
                '<a title="Edit" class="btn btn-default btn-xs" href="#/labs/edit/{{row.id}}">' +
                '<i class="fa fa-edit fa-lg blu"></i>' +
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

            multiSelect: ($rootScope.loginData['senior'] === '1'),

            selectedItems: $scope.selectedItems,

            onAfterSelectionChangeHandler: $scope.afterSelectionChangeHandler
        };

        $scope.createClickHandler = function () {

            $state.transitionTo('wrapper.eng.lab.create');

        };

        $scope.archiveSelected = function () {

            var ids = [];

            for (var i = 0; i < $scope.selectedItems.length; i++) {

                ids.push($scope.records[i]['id']);

            }

            Restangular.one('eng/lab').post('archive', {toArchive: ids}).then
            (
                function (data) {
                    for (i = 0; i < data.length; i++) {
                        $scope.records.splice(_.indexOf($scope.records, data[i], 0), 1);
                    }
                }
            );

        };

        $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['senior'] == 0
            },

            {
                title: 'Archive Selected',
                clickHandler: $scope.archiveSelected,
                visibility: $rootScope.loginData['senior'] == 1,
                disabled: true
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
    'LabCreateCtrl', function ($rootScope, $scope, yii, Restangular, $filter) {

        $scope.rest = function () {

            $scope.formData = {};

            $scope.comment = '';

        };

        $scope.rest();

        $scope.yii = yii;

        $scope.prefix = 'Select a supplier...';

        $scope.$watch
        (
            'formData.supplier_id', function (newVal) {

                if (!angular.isUndefined(newVal) && newVal !== '') {

                    $scope.prefix = yii['Supplier']['list'][newVal].prefix;
                }
            }
        );

        $scope.model = Restangular.all('eng/lab');

        $scope.setToday = function () {

            $scope.formData.date = $.datepicker.formatDate('yy-mm-dd', new Date());

        };

        $scope.setCurrentShift = function () {

            $scope.formData.date = yii['ShiftList']['list'][$scope.loginData['shift_type_id']]['date'];

            $scope.formData['shift_id'] = $scope.loginData['shift_type_id'];

        };

        $scope.min1Day = function () {
            var date = new Date();

            date.setDate(date.getDate() - 1);

            $scope.formData.date = $.datepicker.formatDate('yy-mm-dd', date);
        };

        $scope.min2Days = function () {
            var date = new Date();

            date.setDate(date.getDate() - 2);

            $scope.formData.date = $.datepicker.formatDate('yy-mm-dd', date);
        };

        $scope.min3Days = function () {
            var date = new Date();

            date.setDate(date.getDate() - 3);

            $scope.formData.date = $.datepicker.formatDate('yy-mm-dd', date);
        };

        $scope.validateTime = function () {

            return $filter('validTime')($scope.formData['dept_time'], $scope.formData['arriv_time'], yii['ShiftType']['list'][$scope.formData['shift_id']]);

        };

        $scope.submit = function () {

            var datePlusOne = function (val) {

                var date = new Date(val.split('-'));

                date.setDate(date.getDate() + 1);

                return $.datepicker.formatDate('yy-mm-dd', date);
            };

            var shift = yii['ShiftType']['list'][$scope.formData['shift_id']];

            var overlap = parseInt(shift['overlap']);

            if (overlap && $scope.formData['dept_time'] < shift['start_time']) {

                $scope.formData['dept_time'] = datePlusOne($scope.formData['date']) + ' ' + $scope.formData['dept_time'];

            } else {
                $scope.formData['dept_time'] = $scope.formData['date'] + ' ' + $scope.formData['dept_time'];
            }

            if (overlap && $scope.formData['arriv_time'] < shift['start_time']) {

                $scope.formData['arriv_time'] = datePlusOne($scope.formData['date']) + ' ' + $scope.formData['arriv_time'];

            } else {
                $scope.formData['arriv_time'] = $scope.formData['date'] + ' ' + $scope.formData['arriv_time'];
            }


            $scope.model.post($scope.formData).then
            (
                function (data) {

                    if ($scope.comment !== '') {

                        data.all('comments').post
                        ({
                            user_id: $rootScope.loginData.user_id,
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

        $scope.getRangeClass = function (type, val) {

            if (typeof $scope.formData['conc_type_id'] !== 'undefined') {

                return $filter('rangeClass')(yii['ConcreteType']['list'][$scope.formData['conc_type_id']], type, val, $scope.formData);

            }

            return 'has-error';

        };

        $scope.controls = $rootScope.controls = [
            {
                title: 'Save',
                clickHandler: $scope.submit,
                visibility: $rootScope.loginData['senior'] == '0',
                disabled: true
            }
        ];
    }
)

    .controller
(
    'LabEditCtrl', function ($rootScope, $scope, $state, Restangular, $q, yii, $filter) {

        $scope.formData = {};

        $scope.yii = yii;

        Restangular.one('eng/lab', $state.params.id).get().then
        (
            function (data) {
                $scope.formData = data;

                $scope.formData.plant = parseInt($scope.formData.plant, 10);
                $scope.formData.temp = parseInt($scope.formData.temp, 10);
                $scope.formData.slump = $scope.formData.slump !== null ? parseInt($scope.formData.slump, 10) : null;
                $scope.formData.flow = $scope.formData.flow !== null ? parseInt($scope.formData.flow, 10) : null;
                $scope.formData.truck = parseInt($scope.formData.truck, 10);
                $scope.formData.truck_load = parseInt($scope.formData.truck_load, 10);
                $scope.formData.ticket = parseInt($scope.formData.ticket, 10);
            }
        );

        $scope.$watch
        (
            'formData.supplier_id', function (newVal) {

                if (!angular.isUndefined(newVal) && newVal !== '') {

                    $scope.prefix = yii['Supplier']['list'][newVal].prefix;
                }
            }
        );

        $scope.validateTime = function () {

            if (typeof $scope.formData['dept_time'] !== 'undefined') {

                return $filter('validTime')($scope.formData['dept_time'], $scope.formData['arriv_time'], yii['ShiftType']['list'][$scope.formData['shift_id']]);
            }

            return false;

        };

        $scope.submit = function () {

            var datePlusOne = function (val) {

                var date = new Date(val.split('-'));

                date.setDate(date.getDate() + 1);

                return $.datepicker.formatDate('yy-mm-dd', date);
            };

            var shift = yii['ShiftType']['list'][$scope.formData['shift_id']];

            var overlap = parseInt(shift['overlap']);

            if (overlap && $scope.formData['dept_time'] < shift['start_time']) {

                $scope.formData['dept_time'] = datePlusOne($scope.formData['date']) + ' ' + $scope.formData['dept_time'];

            } else {
                $scope.formData['dept_time'] = $scope.formData['date'] + ' ' + $scope.formData['dept_time'];
            }

            if (overlap && $scope.formData['arriv_time'] < shift['start_time']) {

                $scope.formData['arriv_time'] = datePlusOne($scope.formData['date']) + ' ' + $scope.formData['arriv_time'];

            } else {
                $scope.formData['arriv_time'] = $scope.formData['date'] + ' ' + $scope.formData['arriv_time'];
            }


            $scope.formData.put().then
            (
                function () {

                    if ($scope.comment !== '') {

                        $state.go('wrapper.eng.lab.returned');
                    }
                },

                function () {
                    $rootScope.showAlert = true;
                    $rootScope.alert = false;
                }
            );
        };

        $scope.getRangeClass = function (type, val) {

            if (typeof $scope.formData['conc_type_id'] !== 'undefined') {

                return $filter('rangeClass')(yii['ConcreteType']['list'][$scope.formData['conc_type_id']], type, val, $scope.formData);

            }

            return 'has-error';

        };

        $scope.controls = $rootScope.controls = [
            {
                title: 'Save',
                clickHandler: $scope.submit,
                visibility: $rootScope.loginData['senior'] == '0',
                disabled: true
            }
        ];

    }
)

    .controller
(
    'PouringCtrl', function () {

    }
)

    .controller
(
    'PouringInboxCtrl', function ($rootScope, $scope, $state) {

        $scope.createClickHandler = function () {

            $state.go('wrapper.eng.pouring.create');

        };

        $scope.archiveSelected = function () {


        };

        $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['senior'] == 0
            }/*,

             {
             title: 'Archive Selected',
             clickHandler: $scope.archiveSelected,
             visibility: $rootScope.loginData['senior'] == 1,
             disabled: true
             }*/

        ];

    }
)

    .controller
(
    'PouringCreateCtrl', function () {
    }
)

    .controller
(
    'TempCtrl', function ($rootScope) {

        $rootScope.createUrl = '#/lab-temp/create';

    }
)

    .controller
(
    'TempInboxCtrl', function ($rootScope, $scope, adrrDataFetcher, $state) {

        $scope.selectedItems = [];

        $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/eng/labTemperature', 5000, 'date_time');

        var columnDefs = [

            {
                field: 'date_time',
                displayName: 'Date',
                filters: 'stringDate:"dd-MM-yyyy"'
            },
            {
                field: 'user_id',
                displayName: 'User',
                filters: 'fetchValue:yii["User"]:"username"'
            },
            {
                field: 'shift_type_id',
                displayName: 'Shift',
                filters: 'fetchValue: yii["ShiftType"]'
            },
            {
                field: 'time',
                displayName: 'Time',
                filters: 'stringDate:"HH:mm":true'
            },
            {
                field: 'temp',
                displayName: 'Temperature'
            }
        ];

        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            multiSelect: false,

            selectedItems: $scope.selectedItems

        };

        $rootScope.showControls = $rootScope.loginData['senior'] !== '1';

        $scope.createClickHandler = function () {

            $state.transitionTo('wrapper.eng.temp.create');

        };

        $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['senior'] == 0
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
    'TempInboxCreateCtrl', function ($rootScope, $scope, yii, Restangular) {

        $scope.metaData = yii['LabTemperature'];

        $scope.submit = function () {

            var post = { time: $scope.time, temp: $scope.temp };

            Restangular.all('eng/labTemperature').post(post).then
            (
                function () {

                    $scope.temp = '';

                    $scope.time = '';

                }
            );
        }

        $scope.controls = $rootScope.controls = [

            {
                title: 'New record',
                clickHandler: $scope.createClickHandler,
                visibility: $rootScope.loginData['senior'] == 0,
                disabled: true
            }

        ];

    }
);