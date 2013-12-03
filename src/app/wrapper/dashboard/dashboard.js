angular.module('adrrApp.wrapper.dashboard', [], null)

    .config
(
    function config($stateProvider) {

        $stateProvider.state
        (
            'wrapper.dashboard',
            {
                url: '^/dashboard',

                title: 'Dashboard',

                breadcrumb: ['Dashboard'],

                showControls: false,

                controller: 'DashboardCtrl',

                templateUrl: 'wrapper/dashboard/dashboard.tpl.html'
            }
        );
    }
)

    .controller
(
    'DashboardCtrl', function DashboardCtrl($scope, $timeout) {

        $scope.conc = '1';
        $scope.pour = '1';

        $scope.datas = [
            {   "id": "id1",
                "name": "the name 1",
                "values": [
                    { "age": "Normal", "population": 12 },
                    { "age": "Acceptable", "population": 13 },
                    { "age": "Out", "population": 6 }
                ]
            }
        ];

        $scope.changeDatas = function (val) {

            if (val == 1) {

                $('svg').remove();

                $scope.datas = [
                    {   "id": "id1",
                        "name": "the name 1",
                        "values": [
                            { "age": "Normal", "population": 12 },
                            { "age": "Acceptable", "population": 13 },
                            { "age": "Out", "population": 6 }
                        ]
                    }
                ];

            } else {

                $('svg').remove();

                $scope.datas = [
                    {   "id": "id1",
                        "name": "the name 1",
                        "values": [
                            { "age": "Normal", "population": 64 },
                            { "age": "Acceptable", "population": 35 },
                            { "age": "Out", "population": 22 }
                        ]
                    }
                ];

            }
        }

//        var give_data = function () {
//
//            // generate random numbers for the chart
//            var a = Math.floor(Math.random() * 10);
//            var b = Math.floor(Math.random() * 10);
//            var c = Math.floor(Math.random() * 10);
//
//            $('svg').remove();
//
//            $scope.datas =
//                [
//                    {
//                        "id": "id1",
//                        "name": "the name 1",
//                        "values": [
//                            { "age": "East", "population": a },
//                            { "age": "West", "population": b },
//                            { "age": "North", "population": c }
//                        ]
//                    }
//                ];
//
//            timeoutId = $timeout(give_data, 5000);
//        }
//
//        var timeoutId = $timeout(give_data, 5000);

        $scope.$on
        (
            '$destroy', function () {

//                $timeout.cancel(timeoutId);

            }
        );
    }
);