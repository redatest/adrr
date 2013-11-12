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
    'BeforeCastingCtrl', function () {

    }
)

    .controller
(
    'BeforeCastingListCtrl', function () {

    }
)

    .controller
(
    'BeforeCastingFormCtrl', function () {

    }
);