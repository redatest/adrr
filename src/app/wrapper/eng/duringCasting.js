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
        )
    }
)

    .controller
(
    'DuringCastingCtrl', function ($rootScope) {

        $rootScope.createUrl = '#/duringCasting/create';

    }
)

    .controller
(
    'DuringCastingListCtrl', function ($rootScope, $scope, adrrDataFetcher, $state) {

        $scope.selectedItems = [];

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
                displayName: 'location'
            },
            {
                field: 'location_cmt',
                displayName: 'remark'
            },
            {
                field: 'precaution',
                displayName: 'precaution'
            },
            {
                field: 'precaution_cmt',
                displayName: 'remark'
            },
            {
                field: 'formwork',
                displayName: 'formwork'
            },
            {
                field: 'formwork_cmt',
                displayName: 'remark'
            },
            {
                field: 'contractor',
                displayName: 'contractor'
            },
            {
                field: 'contractor_cmt',
                displayName: 'remark'
            },
            {
                field: 'consultant',
                displayName: 'consultant'
            },
            {
                field: 'consultant_cmt',
                displayName: 'remark'
            },
            {
                field: 'drop_height',
                displayName: 'drop_height'
            },
            {
                field: 'drop_height_cmt',
                displayName: 'remark'
            },
            {
                field: 'vibration',
                displayName: 'vibration'
            },
            {
                field: 'vibration_cmt',
                displayName: 'remark'
            },
            {
                field: 'finishing',
                displayName: 'finishing'
            },
            {
                field: 'finishing_cmt',
                displayName: 'remark'
            },
            {
                field: 'curing',
                displayName: 'curing'
            },
            {
                field: 'curing_cmt',
                displayName: 'remark'
            }
        ];


        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            multiSelect: false,

            selectedItems: $scope.selectedItems

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
    'DuringCastingFormCtrl', function ($rootScope, $scope, yii, Restangular) {

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

        console.log($scope.formData);
        $scope.submit = function () {


            Restangular.all('eng/duringCasting').post($scope.formData).then
            (
                function () {

                    $scope.formData = {};
                    console.log($scope.formData);

                }
            );

            console.log("button pressed");
        };

        $scope.controls = $rootScope.controls = [

            {
                title: 'Save and add',

                clickHandler: $scope.submit,

                visibility: $rootScope.loginData['role'] == 4
            },
            {
                title: 'Save and back to list',

                clickHandler: $scope.submit,

                visibility: $rootScope.loginData['role'] == 4
            }

        ];

    }
);