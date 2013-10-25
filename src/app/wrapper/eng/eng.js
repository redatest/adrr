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
        );
    }
)

    .controller
(
    'EngCtrl', function () {

    }
)

    .controller
(
    'LabCtrl', function ($rootScope, $scope) {
        // ------------------------------------------------
        $rootScope.pageHeader = 'Labs';

        $rootScope.breadcrumbItems = ['Home', 'Labs'];
        // ------------------------------------------------

        if ($scope.isEng) {

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
                    { field: 'dept_time', displayName: 'Departure Time' },
                    { field: 'arriv_time', displayName: 'Arrival Time' },
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

        }
        else {

        }
    }
)

    .controller
(
    'LabCreateCtrl', function ($rootScope, $scope, yii, Restangular, $q) {

        $rootScope.pageHeader = 'Labs';

        $rootScope.breadcrumbItems = ['Home', 'Labs', 'Create'];

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
);