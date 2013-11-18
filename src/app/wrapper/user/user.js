angular.module('adrrApp.wrapper.user', [], null)

    .config
(
    function ($stateProvider) {

        $stateProvider.state
        (
            'wrapper.user',
            {
                abstract: true,

                views: {

                    '@wrapper': {

                        controller: 'UserCtrl',
                        templateUrl: 'wrapper/user/user.tpl.html'

                    }
                }
            }
        )

            .state
        (
            'wrapper.user.list',
            {
                url: '^/user/list',

                title: 'User List',

                showControls: true,

                breadcrumb: ['Home', 'User', 'List'],

                views: {

                    '@wrapper.user': {

                        controller: 'UserListCtrl',
                        templateUrl: 'wrapper/user/userList.tpl.html'

                    }
                }
            }
        )

            .state
        (
            'wrapper.user.create',
            {
                url: '^/user/new',

                title: 'New User',

                showControls: true,

                breadcrumb: ['Home', 'User', 'New'],

                views: {

                    '@wrapper.user': {

                        controller: 'UserNewCtrl',
                        templateUrl: 'wrapper/user/userForm.tpl.html'

                    }
                }
            }
        )

            .state
        (
            'wrapper.user.edit',
            {
                url: '^/user/edit/:id',

                title: 'Edit User',

                showControls: true,

                breadcrumb: ['Home', 'User', 'Edit'],

                views: {

                    '@wrapper.user': {

                        controller: 'UserEditCtrl',
                        templateUrl: 'wrapper/user/userForm.tpl.html'

                    }
                }
            }
        );

    }
)

    .filter
(
    'role', function () {

        return function (role) {

            return _.find(appConfig.roles, {role: parseInt(role, 10)}).name;

        };

    }
)

    .controller
(
    'UserCtrl', function () {

    }
)

    .controller
(
    'UserListCtrl', function ($rootScope, $scope, $state, adrrDataFetcher) {

        $scope.records = adrrDataFetcher.set(appConfig.yiiUrl + '/api/user/adrrUser');

        var columnDefs = [
            {
                field: 'emp_num',
                displayName: 'No.'
            },
            {
                field: 'username',
                displayName: 'Username'
            },
            {
                field: 'email',
                displayName: 'Email'
            },
            {
                field: 'name',
                displayName: 'First Name'
            },
            {
                field: 'last_name',
                displayName: 'Last Name'
            },
            {
                field: 'role',
                displayName: 'Role',
                filters: 'role'
            }
        ];

        $scope.adrrGridOptions = {

            data: 'records',

            columnDefs: columnDefs,

            rowTemplate: '<tr class="adrrGridRow" ng-repeat="(i, row) in rows | orderBy:\'update\':true">' +
                '<td ng-show="multiSelect && showSelectionCheckbox" ng-click="rowClickHandler(i)">' +
                '<input type="checkbox" ng-checked="selectedItems.indexOf(i) !== -1" />' +
                '</td>' +
                '<td ng-repeat="col in cols" adrr-grid-cell ng-click="rowClickHandler(i)"></td>' +
                '<td class="actions">' +
                '<a title="Edit" class="btn btn-default btn-xs" href="#/user/edit/{{row.id}}">' +
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
                '</tr>'

        };

        $scope.new = function () {

            $state.go('wrapper.user.create');

        };

        $rootScope.controls = [

            {
                title: 'New user',
                clickHandler: $scope.new,
                visibility: true
            }

        ];

    }
)

    .controller
(
    'UserNewCtrl', function ($rootScope, $scope, Restangular, $state) {

        $scope.reset = function () {

            $scope.formData = {};
            $scope.roles = appConfig.roles;

        };

        $scope.reset();

        $scope.$watch
        (
            'formData.emp_num', function (newVal) {

                if (typeof newVal !== 'undefined' && newVal !== '') {

                    Restangular.one('user/adrrUser/getNo').get({emp_num: newVal}).then
                    (
                        function () {

                            $scope.noUsed = true;

                        },

                        function () {

                            $scope.noUsed = false;

                        }
                    );

                }

            }
        );

        $scope.$watch
        (
            'formData.username', function (newVal) {

                if (typeof newVal !== 'undefined' && newVal !== '') {

                    Restangular.one('user/adrrUser/getUsername').get({username: newVal}).then
                    (
                        function () {
                            $scope.usernameUsed = true;
                        },

                        function () {
                            $scope.usernameUsed = false;
                        }
                    );

                }

            }
        );

        $scope.$watch
        (
            'formData.email', function (newVal) {

                if (typeof newVal !== 'undefined' && newVal !== '') {

                    Restangular.one('user/adrrUser/getEmail').get({email: newVal}).then
                    (
                        function () {

                            $scope.emailUsed = true;

                        },

                        function () {

                            $scope.emailUsed = false;

                        }
                    );

                }

            }
        );

        $scope.submit = function () {

            Restangular.all('user/adrrUser').post($scope.formData).then
            (
                function () {

                    $state.go('wrapper.user.list');

                }
            )

        };

        $scope.controls = $rootScope.controls = [

            {
                title: 'Save & back to list',
                clickHandler: $scope.submit,
                visibility: true
            }

        ];
    }
)

    .controller
(
    'UserEditCtrl', function ($rootScope, $scope, Restangular, $state) {

        $scope.reset = function () {

            $scope.formData = {};

            $scope.roles = appConfig.roles;

        };

        $scope.reset();

        Restangular.one('user/adrrUser', $state.params.id).get().then
        (
            function (data) {

                $scope.formData = data;

                $scope.formData.emp_num = parseInt(data['emp_num'], 10);

                $scope.$watch
                (
                    'formData.emp_num', function (newVal) {

                        if (typeof newVal !== 'undefined' && newVal !== '') {

                            Restangular.one('user/adrrUser/getNo').get({id: data['id'], emp_num: newVal}).then
                            (
                                function () {

                                    $scope.noUsed = true;

                                },

                                function () {

                                    $scope.noUsed = false;

                                }
                            );

                        }

                    }
                );

                $scope.$watch
                (
                    'formData.username', function (newVal) {

                        if (typeof newVal !== 'undefined' && newVal !== '') {

                            Restangular.one('user/adrrUser/getUsername').get({id: data['id'], username: newVal}).then
                            (
                                function () {
                                    $scope.usernameUsed = true;
                                },

                                function () {
                                    $scope.usernameUsed = false;
                                }
                            );

                        }

                    }
                );

                $scope.$watch
                (
                    'formData.email', function (newVal) {

                        if (typeof newVal !== 'undefined' && newVal !== '') {

                            Restangular.one('user/adrrUser/getEmail').get({id: data['id'], email: newVal}).then
                            (
                                function () {

                                    $scope.emailUsed = true;

                                },

                                function () {

                                    $scope.emailUsed = false;

                                }
                            );

                        }

                    }
                );

            }
        );

        $scope.submit = function () {

            $scope.formData.put().then
            (
                function () {

                    $state.go('wrapper.user.list');

                }
            )

        };

        $scope.controls = $rootScope.controls = [

            {
                title: 'Save & back to list',
                clickHandler: $scope.submit,
                visibility: true
            }

        ];

    }
);