angular.module('adrrApp.wrapper.beforeCasting', [], null)

    .config
(
    function ($stateProvider) {

        $stateProvider.state
        (
            'wrapper.beforeCasting',
            {
                abstract: true,

                views: {

                    "@wrapper": {

                        controller: 'BeforeCastingCtrl',

                        templateUrl: 'wrapper/eng/beforeCasting.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.beforeCasting.list',
            {
                url: '^/before-casting',
                title: 'Before Casting',
                breadcrumb: ['Home', 'Before Casting', 'List'],
                showControls: true,

                views: {

                    "@wrapper.beforeCasting": {

                        controller: 'BeforeCastingListCtrl',

                        templateUrl: 'wrapper/eng/beforeCastingList.tpl.html'
                    }
                }

            }
        )

            .state
        (
            'wrapper.beforeCasting.create',
            {
                url: '^/before-casting/create',
                title: 'New before casting',
                breadcrumb: ['Home', 'Before Casting', 'New'],
                showControls: true,

                views: {

                    "@wrapper.beforeCasting": {

                        controller: 'BeforeCastingFormCtrl',

                        templateUrl: 'wrapper/eng/beforeCastingForm.tpl.html'
                    }
                }
            }
        )
    }
)

    .controller
(
    'BeforeCastingCtrl', function ($rootScope) {

        $rootScope.createUrl = '#/beforeCasting/create';

    }
)

    .controller
(
    'BeforeCastingListCtrl', function ($rootScope, $scope, adrrDataFetcher, $state) {

        $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/eng/beforeCasting', 5000, 'date_time');

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
                field: 'lre',
                displayName: 'state'
            },
            {
                field: 'lre_comment',
                displayName: 'remark'
            },
            {
                field: 'cte',
                displayName: 'state'
            },
            {
                field: 'cte_comment',
                displayName: 'remark'
            },
            {
                field: 'lte',
                displayName: 'state'
            },
            {
                field: 'lte_comment',
                displayName: 'remark'
            },
            {
                field: 'cpp',
                displayName: 'state'
            },
            {
                field: 'cpp_comment',
                displayName: 'remark'
            },
            {
                field: 'frs',
                displayName: 'state'
            },
            {
                field: 'frs_comment',
                displayName: 'remark'
            },
            {
                field: 'cdd',
                displayName: 'state'
            },
            {
                field: 'cdd_comment',
                displayName: 'remark'
            }

        ];


        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            multiSelect: false

        };

        $rootScope.showControls = $rootScope.loginData['role'] == 4;

        $scope.createClickHandler = function () {

            $state.transitionTo('wrapper.beforeCasting.create');

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
    'BeforeCastingFormCtrl', function ($rootScope, $scope, yii, Restangular, $q, $state) {

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

                    Restangular.one('settings/ir/getIr').get({ir: newVal}).then
                    (
                        function (data) {

                            $scope.zone = yii['Zone']['list'][data['model']['zone_id']].name;

                            $scope.area = data['model']['area'];

                            if (data['als'].length > 0) {

                                $scope.axis = data['als'][0]['axis'];
                                $scope.level = data['als'][0]['level'];

                            }

                            $scope.pouring_type = yii['PouringType']['list'][data['pts'][0]['pouring_type_id']].name;

                        }
                    );

                }

            }
        );

        $scope.submit = function () {

            var deferred = $q.defer();

            Restangular.all('eng/beforeCasting').post($scope.formData).then
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

                            $state.go('wrapper.beforeCasting.list');

                        }, 100
                    );

                }
            );

        }

        $scope.controls = $rootScope.controls = [

            {
                title: 'Save and add',

                clickHandler: $scope.submit,

                visibility: $rootScope.loginData['role'] == 4,

                disabled: true
            },
            {
                title: 'Save and back to list',

                clickHandler: $scope.saveAndBackToList,

                visibility: $rootScope.loginData['role'] == 4,

                disabled: true
            }

        ];

    }
);