/**
 * Created by Mohammed Reda & Raeef Refai on 21/18/13.
 */

angular.module('adrrApp.wrapper.bsb', [], null)

    .config
(
    function ($stateProvider) {

        $stateProvider.state
        (
            'wrapper.bsb',
            {
                abstract: true,

                views: {

                    "@wrapper": {

                        controller: 'BsbCtrl',

                        templateUrl: 'wrapper/eng/bsb.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.bsb.list',
            {
                url: '^/bsb',
                title: 'Blinding, Screed and Backfilling',
                breadcrumb: ['Home', 'Blinding, Screed and Backfilling', 'List'],
                showControls: true,

                views: {

                    "@wrapper.bsb": {

                        controller: 'BsbListCtrl',

                        templateUrl: 'wrapper/eng/bsbList.tpl.html'
                    }
                }

            }
        )

            .state
        (
            'wrapper.bsb.create',
            {
                url: '^/bsb/create',
                title: 'New Blinding, Screed and Backfilling',
                breadcrumb: ['Home', 'Blinding, Screed and Backfilling', 'New'],
                showControls: true,

                views: {

                    "@wrapper.bsb": {

                        controller: 'BsbFormCtrl',

                        templateUrl: 'wrapper/eng/bsbForm.tpl.html'
                    }
                }
            }
        )
    }
)

    .controller
(
    'BsbCtrl', function () {
    }
)

    .controller
(
    'BsbListCtrl', function ($rootScope, $scope, adrrDataFetcher, $state) {

        $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/eng/bsb', 5000, 'date_time');

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
                displayName: 'supplier',
                filters: 'fetchValue: yii["Supplier"]'
            },
            {
                field: 'conc_type_id',
                displayName: 'Concrete',
                filters: 'fetchValue: yii["ConcreteType"]'
            },
            {
                field: 'start_time',
                displayName: 'start_time',
                filters: 'stringDate:"HH:mm"'
            },
            {
                field: 'end_time',
                displayName: 'end time',
                filters: 'stringDate:"HH:mm"'
            },
            {
                field: 'num_set',
                displayName: 'No of sets'
            },
            {
                field: 'num_cylinders',
                displayName: 'num cylinders'
            }
        ];

        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            multiSelect: false

        };

        $rootScope.showControls = $rootScope.loginData['role'] == 4;

        $scope.createClickHandler = function () {

            $state.go('wrapper.bsb.create');

        };

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


) // end controller

    .controller
(
    'BsbFormCtrl', function ($rootScope, $scope, yii, Restangular, $state, $q) {

        $scope.reset = function () {

            $scope.formData = {};

            $scope.als = [];

            $scope.pts = [];

            $scope.pouringTypes = [];

        };

        $scope.reset();

        /* Frequent Date methods */

        $scope.setToday = function () {

            var date = new Date();

            date.setDate(date.getDate());

            $scope.formData.date = $.datepicker.formatDate('yy-mm-dd', date);

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

        /* End frequent Date methods */

        $scope.resetIr = function () {

            $scope.pouringTypes = angular.copy(yii['PouringType']['list']);

            $scope.als = [];

            $scope.formData['zone_id'] = '';
            $scope.formData['area'] = '';
            $scope.formData['est_vol'] = '';
            $scope.formData['pouring_type_id'] = '';
            $scope.formData['axis'] = '';
            $scope.formData['level'] = '';

            $scope.irFound = false;

            $scope.onePouringType = false;

            $scope.oneAl = false;
        };

        $scope.$watch
        (
            'formData.ir', function (newVal) {

                $scope.resetIr();

                if (typeof newVal !== 'undefined' && newVal !== '') {

                    Restangular.one('settings/ir/getIr').get({ir: newVal}).then
                    (
                        function (data) {

                            $scope.formData['zone_id'] = data['model']['zone_id'];
                            $scope.formData['area'] = data['model']['area'];
                            $scope.formData['est_vol'] = parseInt(data['model']['volume'], 10);

                            $scope.irFound = true;

                            if (data['pts'].length == 1) {

                                $scope.formData['pouring_type_id'] = data['pts'][0]['pouring_type_id'];

                                $scope.onePouringType = true;

                            } else if (data['pts'].length > 1) {

                                $scope.onePouringType = false;

                                var numPts = data['pts'].length;

                                angular.forEach
                                (
                                    $scope.pouringTypes, function (item, i) {

                                        var checker = false;

                                        for (var j = 0; j < numPts; j++) {

                                            checker = item.id == data['pts'][j]['pouring_type_id'];

                                            if (checker) {

                                                break;

                                            }
                                        }

                                        if (!checker) {

                                            delete $scope.pouringTypes[i];

                                        }

                                    }
                                );

                            }

                            if (data['als'].length == 1) {

                                $scope.formData['axis'] = data['als'][0]['axis'];
                                $scope.formData['level'] = data['als'][0]['level'];

                                $scope.oneAl = true;

                            } else if (data['als'].length > 1) {

                                $scope.formData.level = 1;
                                $scope.als = data['als'];

                            }
                        }
                    )

                }
            }
        );

        $scope.submit = function () {

            $scope.formData.start_time = '2013-01-01 ' + $scope.formData.start_time;
            $scope.formData.end_time = '2013-01-01 ' + $scope.formData.end_time;

            console.log($scope.formData.start_time);

            var deferred = $q.defer();

            Restangular.all('eng/bsb').post($scope.formData).then
            (
                function () {

                    $scope.formData = {};

                    deferred.resolve();

                }
            );

            return deferred.promise;
        };

        $scope.saveAndBackToList = function () {

            $scope.submit().then
            (
                function () {

                    setTimeout
                    (
                        function () {

                            $state.go('wrapper.bsb.list');

                        }, 100
                    );

                }
            );

        };

        $scope.controls = $rootScope.controls = [

            {
                title: 'Save and add',

                clickHandler: $scope.submit,

                visibility: $rootScope.loginData['role'] == 4
            },
            {
                title: 'Save and back to list',

                clickHandler: $scope.saveAndBackToList,

                visibility: $rootScope.loginData['role'] == 4
            }

        ];

    }
);