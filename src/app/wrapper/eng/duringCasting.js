/**
 * Created by Mohammed Reda on 11/18/13.
 */

angular.module('adrrApp.wrapper.duringCasting', [], null)

    .config
(
    function ($stateProvider) {

        $stateProvider.state
        (
            'wrapper.duringCasting',
            {
                abstract: true,

                views: {

                    "@wrapper": {

                        controller: 'DuringCastingCtrl',

                        templateUrl: 'wrapper/eng/duringCasting.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.duringCasting.list',
            {
                url: '^/during-casting',
                title: 'During Casting',
                breadcrumb: ['Home', 'During Casting', 'List'],
                showControls: true,

                views: {

                    "@wrapper.duringCasting": {

                        controller: 'DuringCastingListCtrl',

                        templateUrl: 'wrapper/eng/duringCastingList.tpl.html'
                    }
                }

            }
        )

            .state
        (
            'wrapper.duringCasting.create',
            {
                url: '^/during-casting/create',
                title: 'New during casting',
                breadcrumb: ['Home', 'During Casting', 'New'],
                showControls: true,

                views: {

                    "@wrapper.duringCasting": {

                        controller: 'DuringCastingFormCtrl',

                        templateUrl: 'wrapper/eng/duringCastingForm.tpl.html'
                    }
                }
            }
        );

    }
)

    .controller
(
    'DuringCastingCtrl', function () {
    }
)

    .controller
(
    'DuringCastingListCtrl', function ($rootScope, $scope, adrrDataFetcher, $state) {

        $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/eng/duringCasting', 5000, 'date_time');

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
                field: 'location',
                displayName: 'Location'
            },
//            {
//                field: 'location_cmt',
//                displayName: 'remark'
//            },
            {
                field: 'precaution',
                displayName: 'Precaution'
            },
//            {
//                field: 'precaution_cmt',
//                displayName: 'remark'
//            },
            {
                field: 'formwork',
                displayName: 'Formwork'
            },
//            {
//                field: 'formwork_cmt',
//                displayName: 'remark'
//            },
            {
                field: 'contractor',
                displayName: 'Contractor'
            },
//            {
//                field: 'contractor_cmt',
//                displayName: 'remark'
//            },
            {
                field: 'consultant',
                displayName: 'Consultant'
            },
//            {
//                field: 'consultant_cmt',
//                displayName: 'remark'
//            },
            {
                field: 'drop_height',
                displayName: 'Drop Height'
            },
//            {
//                field: 'drop_height_cmt',
//                displayName: 'remark'
//            },
            {
                field: 'vibration',
                displayName: 'vibration'
            },
//            {
//                field: 'vibration_cmt',
//                displayName: 'remark'
//            },
            {
                field: 'finishing',
                displayName: 'Finishing'
            },
//            {
//                field: 'finishing_cmt',
//                displayName: 'remark'
//            },
            {
                field: 'curing',
                displayName: 'Curing'
            },
//            {
//                field: 'curing_cmt',
//                displayName: 'remark'
//            }
        ];

        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            multiSelect: false

        };

        $rootScope.showControls = $rootScope.loginData['role'] == 4;

        $scope.createClickHandler = function () {

            $state.transitionTo('wrapper.duringCasting.create');

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
    'DuringCastingFormCtrl', function ($rootScope, $scope, yii, Restangular, $state, $q) {

        $scope.formData = {};

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

        $scope.$watch
        (
            'formData.ir', function (newVal) {

                if (typeof newVal !== 'undefined' && newVal !== '') {

                    Restangular.one('eng/pouring/getIr').get({ir: newVal}).then
                    (
                        function (data) {

                            $scope.formData.pouring_record_id = data['id'];

                            $scope.axis = data['axis'];
                            $scope.level = data['level'];
                            $scope.zone = yii['Zone']['list'][data['zone_id']].name;
                            $scope.area = data['area'];
                            $scope.pt = yii['PouringType']['list'][data['pouring_type_id']].name;
                            $scope.start = data['start_time'];
                            $scope.end = data['end_time'];

                        }
                    )

                }

            }

        )

        $scope.submit = function () {

            var deferred = $q.defer();

            Restangular.all('eng/duringCasting').post($scope.formData).then
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

                            $state.go('wrapper.duringCasting.list');

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