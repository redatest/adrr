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
    'BeforeCastingCtrl', function ( $rootScope ) {
        $rootScope.createUrl = '#/beforeCasting/create';
    }
)

    .controller
(
    'BeforeCastingListCtrl', function ($rootScope, $scope, adrrDataFetcher, $state) {

        $scope.selectedItems = [];

        $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/eng/beforeCasting', 5000, 'date_time');

        var columnDefs = [


            {
                field: 'date_time',
                displayName: 'Date',
                filters: 'stringDate:"dd-MM-yyyy"'
            },

            {
                field: 'shift_type_id',
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

            multiSelect: false,

            selectedItems: $scope.selectedItems

        };

        $rootScope.showControls = $rootScope.loginData['senior'] !== '1';

        $scope.createClickHandler = function () {

            $state.transitionTo('wrapper.beforeCasting.create');

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



) // end controller

    .controller
(
    'BeforeCastingFormCtrl', function ($rootScope, $scope, yii, Restangular) {

        //$scope.metaData = yii['beforeCasting'];

        /*$scope.submit = function () {

            var post = { time: $scope.time, temp: $scope.temp };

            Restangular.all('eng/beforeCasting').post(post).then
            (
                function () {

                    $scope.temp = '';

                    $scope.time = '';

                }
            );
        };*/

        $scope.controls = $rootScope.controls = [

            {
                title: 'Save and add',

                clickHandler: $scope.submit,

                visibility: $rootScope.loginData['senior'] == 0
            },
            {
                title: 'Save and back to list',

                clickHandler: $scope.submit,

                visibility: $rootScope.loginData['senior'] == 0
            }

        ];

    }
);
