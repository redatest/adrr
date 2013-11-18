//---------------------------------------------------------
// Module Initialization
//---------------------------------------------------------
angular.module('adrrApp.wrapper.settings', [], null)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Module Configurations
//---------------------------------------------------------
    .config
(
    function config($stateProvider) {
        $stateProvider.state
        (
            'wrapper.settings',
            {
                abstract: true,

                views: {
                    "@wrapper": {
                        controller: 'SettingsCtrl',
                        templateUrl: 'wrapper/settings/settings.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.pouringType',
            {
                abstract: true,

                views: {
                    "@wrapper.settings": {
                        controller: 'PouringTypeCtrl',
                        templateUrl: 'wrapper/settings/pouringType.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.pouringType.create',
            {
                url: '^/settings/pouring-type/create',

                title: 'Create a Pouring Type',

                views: {
                    "@wrapper.settings.pouringType": {
                        templateUrl: 'wrapper/settings/pouringTypeForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.pouringType.update',
            {
                url: '^/settings/pouring-type/update/:id',
                title: 'Update a Pouring Type',
                views: {
                    "@wrapper.settings.pouringType": {
                        templateUrl: 'wrapper/settings/pouringTypeForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.ir',
            {
                abstract: true,
                views: {
                    "@wrapper.settings": {
                        controller: 'IrCtrl',
                        templateUrl: 'wrapper/settings/ir.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.ir.create',
            {
                url: '^/settings/ir/create',
                title: 'Create an IR',
                views: {
                    "@wrapper.settings.ir": {
                        templateUrl: 'wrapper/settings/irForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.ir.update',
            {
                url: '^/settings/ir/update/:id',
                title: 'Update an IR',
                views: {
                    "@wrapper.settings.ir": {
                        templateUrl: 'wrapper/settings/irForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.concreteType',
            {
                abstract: true,
                views: {
                    "@wrapper.settings": {
                        controller: 'ConcreteTypeCtrl',
                        templateUrl: 'wrapper/settings/concreteType.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.concreteType.create',
            {
                url: '^/settings/concrete-type/create',
                title: 'Create a Concrete Type',
                views: {
                    "@wrapper.settings.concreteType": {
                        templateUrl: 'wrapper/settings/concreteTypeForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.concreteType.update',
            {
                url: '^/settings/concrete-type/update/:id',
                title: 'Update a Concrete Type',
                views: {
                    "@wrapper.settings.concreteType": {
                        templateUrl: 'wrapper/settings/concreteTypeForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.zone',
            {
                abstract: true,
                views: {
                    "@wrapper.settings": {
                        controller: 'ZoneCtrl',
                        templateUrl: 'wrapper/settings/zone.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.zone.create',
            {
                url: '^/settings/zone/create',
                title: 'Create a Zone',
                views: {
                    "@wrapper.settings.zone": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.zone.update',
            {
                url: '^/settings/zone/update/:id',
                title: 'Update a Zone',
                views: {
                    "@wrapper.settings.zone": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.project',
            {
                abstract: true,
                views: {
                    "@wrapper.settings": {
                        controller: 'ProjectCtrl',
                        templateUrl: 'wrapper/settings/project.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.project.create',
            {
                url: '^/settings/project/create',
                title: 'Create a Project',
                views: {
                    "@wrapper.settings.project": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.project.update',
            {
                url: '^/settings/project/update/:id',
                title: 'Update a Project',
                views: {
                    "@wrapper.settings.project": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.supplier',
            {
                abstract: true,
                views: {
                    "@wrapper.settings": {
                        controller: 'SupplierCtrl',
                        templateUrl: 'wrapper/settings/supplier.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.supplier.create',
            {
                url: '^/settings/supplier/create',
                title: 'Create a Supplier',
                views: {
                    "@wrapper.settings.supplier": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.supplier.update',
            {
                url: '^/settings/supplier/update/:id',
                title: 'Update a Supplier',
                views: {
                    "@wrapper.settings.supplier": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.shiftType',
            {
                abstract: true,
                views: {
                    "@wrapper.settings": {
                        controller: 'ShiftTypeCtrl',
                        templateUrl: 'wrapper/settings/shiftType.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.shiftType.create',
            {
                url: '^/settings/shift-type/create',
                title: 'Create a Shift Type',
                views: {
                    "@wrapper.settings.shiftType": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.shiftType.update',
            {
                url: '^/settings/shift-type/update/:id',
                title: 'Update a Shift Type',
                views: {
                    "@wrapper.settings.shiftType": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.shiftList',
            {
                abstract: true,
                views: {
                    "@wrapper.settings": {
                        controller: 'ShiftListCtrl',
                        templateUrl: 'wrapper/settings/shiftList.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.shiftList.create',
            {
                url: '^/settings/shift-list/create',
                title: 'Create a Shift List',
                views: {
                    "@wrapper.settings.shiftList": {
                        templateUrl: 'wrapper/settings/shiftListForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.shiftList.update',
            {
                url: '^/settings/shift-list/update/:id',
                title: 'Update a Shift List',
                views: {
                    "@wrapper.settings.shiftList": {
                        templateUrl: 'wrapper/settings/shiftListForm.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.pump',
            {
                abstract: true,
                views: {
                    "@wrapper.settings": {
                        controller: 'PumpCtrl',
                        templateUrl: 'wrapper/settings/pump.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.pump.create',
            {
                url: '^/settings/pump/create',
                title: 'Create a Pump',
                views: {
                    "@wrapper.settings.pump": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        )

            .state
        (
            'wrapper.settings.pump.update',
            {
                url: '^/settings/pump/update/:id',
                title: 'Update a Pump',
                views: {
                    "@wrapper.settings.pump": {
                        templateUrl: 'wrapper/settings/form.tpl.html'
                    }
                }
            }
        );
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Module 'Settings' Controller
//---------------------------------------------------------
    .controller
(
    'SettingsCtrl', function SettingsCtrl($rootScope, $scope, yii, Restangular, $location) {
        // watch state ----------------------------------------------
        $scope.isCreate = true;

        $scope.headTitle = 'Create';

        $rootScope.showControls = false;

        $scope.$on
        (
            '$stateChangeStart', function (event, state) {
                var name = state['name'].split('.');
                name = name[name.length - 1];

                $scope.isCreate = (name === 'create');

                $scope.headTitle = $scope.isCreate ? 'Create' : 'Update';
            }
        );
        // ----------------------------------------------------------

        // Must be set in sub Controller ----------------------------
        $scope.route = '';
        $scope.model = {};
        $scope.className = '';
        // End ------------------------------------------------------

        $scope.isAutoColumns = true;
        $scope.formsv = [];
        $scope.gridData = [];
        $scope.formData = {};
        $scope.columnDefs = [];
        $scope.totalServerItems = 0;
        $scope.selectedItem = 0;
        $scope.pagingOptions = { pageSizes: [10, 20, 30], pageSize: 10, currentPage: 1 };

        $(document).on
        (
            'hide.bs.modal', '#formModal, #myModal', function () {
                $scope.deselectItem();

                $scope.$apply();
            }
        );

        $scope.onSelectRow = function (rowItem) {
            if (rowItem.config.selectedItems.length) {
                angular.forEach
                (
                    $scope.formData, function (value, key) {
                        switch (typeof $scope.formData[key]) {
                            case 'boolean':
                                $scope.formData[key] = (rowItem.entity[key] === '1');
                                break;

                            case 'number':
                                $scope.formData[key] = parseInt(rowItem.entity[key], 10);
                                break;

                            default:
                                $scope.formData[key] = rowItem.entity[key];
                                break;
                        }
                    }
                );

                $scope.selectedItem = rowItem.rowIndex;

                $location.path($scope.route + '/update/' + rowItem.entity.id);
            }
            else {
                $scope.rest();

                $location.path($scope.route + '/create');
            }
        };

        $scope.deselectItem = function () {
            $scope.rest();

            $scope.gridOptions.selectItem($scope.selectedItem, false);

            $location.path($scope.route + '/create');
        };

        $scope.updateTotalServerItems = function (pagNum, pagSiz, val) {
            if (typeof val === 'undefined') {
                $scope.model.one('numRows').get().then
                (
                    function (data) {
                        $scope.totalServerItems = parseInt(data['numRows'], 10);
                    }
                );
            }
            else {
                $scope.totalServerItems = val;
            }

            var lastPage = Math.ceil(val / $scope.pagingOptions.pageSize);

            if (!lastPage) {
                lastPage = 1;
            }

            if (lastPage < $scope.pagingOptions.currentPage) {
                $scope.pagingOptions.currentPage = lastPage;

                return;
            }

            $scope.getList(pagNum, pagSiz);
        };

        $scope.getList = function (pagNum, pagSiz) {
            var offset = (pagNum - 1) * pagSiz;

            $scope.model.getList
            (
                {
                    offset: offset < 0 ? 0 : offset,
                    limit: pagSiz
                }
            )
                .then
            (
                function (data) {
                    $scope.gridData = angular.isArray(data) ? data : [];
                }
            );
        };

        $scope.rest = function () {
            angular.forEach
            (
                $scope.metaData.cols, function (value, key) {
                    if (value.type == 'integer') {
                        switch (value.size) {
                            case 1:
                                $scope.formData[key] = ((value.defaultValue === null) ? false : (value['defaultValue'] === 1));
                                break;

                            default:
                                $scope.formData[key] = (value.defaultValue === null ? NaN : parseFloat(value.defaultValue));
                                break;
                        }
                    } else {
                        $scope.formData[key] = (value.defaultValue === null ? '' : value.defaultValue);
                    }
                }
            );
        };

        $scope.gridOptions =
        {
            data: 'gridData',
            columnDefs: 'columnDefs',
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            afterSelectionChange: $scope.onSelectRow,
            enablePaging: true,
            showFooter: true,
            multiSelect: false,
            keepLastSelected: false,
            plugins: [new ngGridFlexibleHeightPlugin({ minHeight: 150 })],
            rowTemplate: '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="(i, col) in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><a style="text-decoration: none; cursor: pointer;" data-toggle="modal" href="#formModal" onclick="return false;"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell ng-show="i !== renderedColumns.length - 1"></div></a><div ng-cell ng-show="i === renderedColumns.length - 1"></div></div>'
        };

        $scope.$watch
        (
            'pagingOptions', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.deselectItem();

                    if (newVal['currentPage'] !== oldVal['currentPage']) {
                        $scope.getList(newVal['currentPage'], newVal['pageSize']);
                    }
                    else {
                        $scope.updateTotalServerItems(newVal['currentPage'], newVal['pageSize'], $scope.totalServerItems);
                    }
                }
            }, true
        );

        $scope.deleteItem = function () {
            $scope.gridData[$scope.selectedItem].options().then
            (
                function () {
                    $scope.deselectItem();

                    $scope.updateTotalServerItems($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.totalServerItems - 1);
                }
            );
        };

        $scope.$watch
        (
            'model', function () {
                $scope.formsv = [];
                $scope.gridData = [];
                $scope.formData = {};
                $scope.columnDefs = [];
                $scope.totalServerItems = 0;
                $scope.selectedItem = 0;

                $scope.metaData = yii[$scope.className];

                if ($scope.isAutoColumns) {
                    angular.forEach
                    (
                        $scope.metaData.cols, function (value, key) {
                            if (!value['autoIncrement']) {
                                $scope.columnDefs.push
                                ({
                                    field: key,
                                    displayName: value.label
                                });
                            }
                            else {
                                delete $scope.metaData.cols[key];
                            }
                        }
                    );
                }

                $scope.columnDefs.push
                ({
                    field: '',
                    cellTemplate: "<a ng-click=\"configModal('delete', 'Are you sure?', 'btn-primary', deleteItem, deselectItem)\" data-toggle=\"modal\" href=\"#myModal\" onclick=\"return false;\" style=\"line-height: 30px; margin-left: 5px;\" class=\"red\">delete</i></a>"
                });

                $scope.rest();

                $scope.updateTotalServerItems($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
            }
        );

        $scope.submit = function (data) {
            if ($scope.isCreate) {
                var post = angular.copy(data);

                angular.forEach
                (
                    post, function (val, key) {
                        if (typeof val === 'boolean') {
                            post[key] = val ? 1 : 0;
                        }
                    }
                );

                $scope.model.post(post).then
                (
                    function () {
                        $scope.rest();

                        $rootScope.showAlert = true;
                        $rootScope.alert = true;

                        $scope.updateTotalServerItems($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.totalServerItems + 1);
                    },

                    function () {
                        $rootScope.showAlert = true;
                        $rootScope.alert = false;
                    }
                );
            }
            else {
                var item = Restangular.copy($scope.gridData[$scope.selectedItem]);

                angular.forEach
                (
                    data, function (val, key) {
                        switch (typeof val) {
                            case 'boolean':
                                item[key] = val ? '1' : '0';
                                break;

                            default:
                                item[key] = val;
                                break;
                        }
                    }
                );

                item.put().then
                (
                    function () {
                        angular.copy(item, $scope.gridData[$scope.selectedItem]);

                        $rootScope.showAlert = true;
                        $rootScope.alert = true;

                        $scope.deselectItem();
                    },

                    function () {
                        $rootScope.showAlert = true;
                        $rootScope.alert = false;
                    }
                );
            }
        };
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Pouring Type Controller
//---------------------------------------------------------
    .controller
(
    'PouringTypeCtrl', function PouringTypeCtrl($rootScope, $scope, Restangular) {

        $rootScope.breadcrumbItems = ['Home', 'Settings', 'Pouring Types'];

        $scope.$parent.className = 'PouringType';
        $scope.$parent.route = '/settings/pouring-type';
        $scope.$parent.model = Restangular.all('settings/PouringType');

        $scope.gridOptions.afterSelectionChange = $scope.$parent.onSelectRow;
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Zone Controller
//---------------------------------------------------------
    .controller
(
    'ZoneCtrl', function ZoneCtrl($rootScope, $scope, Restangular) {
        $rootScope.breadcrumbItems = ['Home', 'Settings', 'Zones'];

        $scope.$parent.className = 'Zone';
        $scope.$parent.route = '/settings/zone';
        $scope.$parent.model = Restangular.all('settings/zone');

        $scope.gridOptions.afterSelectionChange = $scope.$parent.onSelectRow;
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Supplier Controller
//---------------------------------------------------------
    .controller
(
    'SupplierCtrl', function SupplierCtrl($rootScope, $scope, Restangular) {
        $rootScope.breadcrumbItems = ['Home', 'Settings', 'Suppliers'];

        $scope.$parent.className = 'Supplier';
        $scope.$parent.route = '/settings/supplier';
        $scope.$parent.model = Restangular.all('settings/supplier');

        $scope.gridOptions.afterSelectionChange = $scope.$parent.onSelectRow;
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Pump Controller
//---------------------------------------------------------
    .controller
(
    'PumpCtrl', function PumpCtrl($rootScope, $scope, Restangular) {
        $rootScope.breadcrumbItems = ['Home', 'Settings', 'Pumps'];

        $scope.$parent.className = 'Pump';
        $scope.$parent.route = '/settings/pump';
        $scope.$parent.model = Restangular.all('settings/pump');

        $scope.gridOptions.afterSelectionChange = $scope.$parent.onSelectRow;
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Concrete Type Controller
//---------------------------------------------------------
    .controller
(
    'ConcreteTypeCtrl', function ConcreteTypeCtrl($rootScope, $scope, Restangular) {
        $rootScope.breadcrumbItems = ['Home', 'Settings', 'Concrete Types'];

        // $scope.$parent.isAutoColumns = false;

        $scope.$parent.className = 'ConcreteType';
        $scope.$parent.route = '/settings/concrete-type';
        $scope.$parent.model = Restangular.all('settings/concreteType');

        $scope.gridOptions.afterSelectionChange = $scope.$parent.onSelectRow;

        $scope.restValues = function () {
            $scope.formData['flow_norm_from'] = NaN;
            $scope.formData['flow_norm_to'] = NaN;
            $scope.formData['flow_acpt_from'] = NaN;
            $scope.formData['flow_acpt_to'] = NaN;
            $scope.formData['slump_norm_from'] = NaN;
            $scope.formData['slump_norm_to'] = NaN;
            $scope.formData['slump_acpt_from'] = NaN;
            $scope.formData['slump_acpt_to'] = NaN;
        };

        // $scope.columnDefs =
        // [
        // { field: 'name',	 displayName: 'Name' },
        // { field: 'category', displayName: 'Category' },
        // { field: '', cellTemplate: '<a style="line-height: 32px; margin-left: 5px;" class="red" ng-click="deleteItem(row)">delete</i></a>' }
        // ];

        $rootScope.modalMessage = 'Raeef';
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Shift Types Controller
//---------------------------------------------------------
    .controller
(
    'ShiftTypeCtrl', function ShiftTypeCtrl($rootScope, $scope, Restangular) {
        $rootScope.breadcrumbItems = ['Home', 'Settings', 'Shift Types'];

        $scope.$parent.className = 'ShiftType';
        $scope.$parent.route = '/settings/shift-type';
        $scope.$parent.model = Restangular.all('settings/shiftType');

        $scope.gridOptions.afterSelectionChange = $scope.$parent.onSelectRow;
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------


//---------------------------------------------------------
// Shift Lists Controller
//---------------------------------------------------------
    .controller
(
    'ShiftListCtrl', function ShiftListCtrl($rootScope, $scope, Restangular, $http) {
        $rootScope.breadcrumbItems = ['Home', 'Settings', 'Shift Lists'];

        $scope.$parent.className = 'ShiftList';
        $scope.$parent.route = '/settings/shift-list';
        $scope.$parent.model = Restangular.all('settings/shiftList');

        $scope.gridOptions.afterSelectionChange = $scope.$parent.onSelectRow;

        Restangular.all('settings/shiftType').getList().then
        (
            function (data) {
                $scope.shiftTypes = angular.isArray(data) ? data : [];
            }
        );

        $scope.$watch
        (
            'formData["list"]', function (newVal, oldVal) {
                if (typeof newVal !== 'undefined' && newVal !== oldVal && newVal !== '') {

                    var list = newVal;

                    list = list.replace(/[^0-9,]+/g, '');
                    list = list.replace(/,,+/g, ',');

                    if (list[0] === ',') list = list.slice(1, list.length);

                    var listLength = list.length - 1;

                    $scope.formData['list'] = list;

                    if (list[listLength] === ',') list = list.slice(0, listLength);

                    if (list !== '') {
                        $http
                        ({
                            method: 'GET',
                            url: appConfig.yiiUrl + '/user/user/list',
                            params: { list: list }
                        })
                            .success
                        (
                            function (data) {
                                $scope.usersList = data;
                            }
                        )
                    }
                } else if (typeof newVal === 'undefined' || newVal === '') {

                    $scope.usersList = [];

                }
            }
        );
    }
)
//---------------------------------------------------------
// End
//---------------------------------------------------------

    .controller
(
    'ProjectCtrl', function ProjectCtrl($rootScope, $scope, Restangular, $state) {
        $rootScope.breadcrumbItems = ['Home', 'Settings', 'Projects'];

        $scope.$parent.className = 'Project';
        $scope.$parent.route = '/settings/project';
        $scope.$parent.model = Restangular.all('settings/project');

        $scope.gridOptions.afterSelectionChange = $scope.$parent.onSelectRow;
    }
)

    .controller
(
    'IrCtrl', function IrCtrl($rootScope, $scope, Restangular, $q) {

        $rootScope.breadcrumbItems = ['Home', 'Settings', 'IRs'];

        $scope.$parent.className = 'Ir';
        $scope.$parent.route = '/settings/ir';
        $scope.$parent.model = Restangular.all('settings/ir');

        $scope.al = [];
        $scope.pt = [];

        Restangular.all('settings/zone').getList().then
        (
            function (data) {
                $scope.zones = angular.isArray(data) ? data : [];
            }
        );

        Restangular.all('settings/project').getList().then
        (
            function (data) {
                $scope.projects = angular.isArray(data) ? data : [];
            }
        );

        Restangular.all('settings/pouringType').getList().then
        (
            function (data) {
                $scope.pouringTypes = angular.isArray(data) ? data : [];
            }
        );

        $scope.onSelectRow = function (rowItem) {
            $scope.al = [];
            $scope.pt = [];

            $scope.$parent.onSelectRow(rowItem);

            if (rowItem.config.selectedItems.length) {
                $scope.model.one(rowItem.entity.id).getList('als').then
                (
                    function (data) {
                        if (angular.isArray(data)) {
                            angular.forEach
                            (
                                data, function (obj) {
                                    $scope.al.push(obj);
                                }
                            );
                        }
                    }
                );

                $scope.model.one(rowItem.entity.id).getList('pouringTypes').then
                (
                    function (data) {
                        if (angular.isArray(data)) {
                            angular.forEach
                            (
                                data, function (obj) {
                                    var pouringType = _.find
                                    (
                                        $scope.pouringTypes, function (pt) {
                                            return pt.id === obj.pouring_type_id;
                                        }
                                    );

                                    obj.name = pouringType.name;

                                    $scope.pt.push(obj);
                                }
                            );
                        }
                    }
                );
            }
        };

        $scope.gridOptions.afterSelectionChange = $scope.onSelectRow;

        $scope.addAl = function (axis, level, isCreate) {
            var post = { axis: axis, level: level };

            if (isCreate) {
                $scope.al.push(post);

                $scope.axis = '';
                $scope.level = '';
            }
            else {
                var item = Restangular.copy($scope.gridData[$scope.selectedItem]);

                item.all('als').post(post).then
                (
                    function (addedItem) {
                        $scope.al.push(addedItem);

                        $scope.axis = '';
                        $scope.level = '';
                    }
                )
            }
        };

        $scope.deleteAl = function (obj, isCreate) {
            if (isCreate) {
                $scope.al.splice($scope.al.indexOf(obj), 1);
            }
            else {
                obj.options().then
                (
                    function () {
                        delete $scope.al.splice($scope.al.indexOf(obj), 1);
                    }
                );
            }
        };

        $scope.addPt = function (pt, isCreate) {
            var post = { pouring_type_id: pt };

            if (isCreate) {
                var pouringType = _.find
                (
                    $scope.pouringTypes, function (pt) {
                        return pt.id === post.pouring_type_id;
                    }
                );

                post.name = pouringType.name;

                $scope.pt.push(post);
            }
            else {
                var item = Restangular.copy($scope.gridData[$scope.selectedItem]);

                item.all('pouringTypes').post(post).then
                (
                    function (addedItem) {
                        var pouringType = _.find
                        (
                            $scope.pouringTypes, function (pt) {
                                return pt.id === addedItem.pouring_type_id;
                            }
                        );

                        addedItem.name = pouringType.name;

                        $scope.pt.push(addedItem);
                    }
                )
            }
        };

        $scope.deletePt = function (obj, isCreate) {
            if (isCreate) {
                $scope.pt.splice($scope.pt.indexOf(obj), 1);
            }
            else {
                obj.options().then
                (
                    function () {
                        delete $scope.pt.splice($scope.pt.indexOf(obj), 1);
                    }
                );
            }
        };

        $scope.submit = function (data) {
            if ($scope.isCreate) {
                var post = angular.copy(data);

                if (isNaN(post['project_id'])) delete post['project_id'];

                $scope.model.post(post).then
                (
                    function (obj) {
                        var requests = [];

                        angular.forEach
                        (
                            $scope.al, function (al) {
                                requests.push(obj.all('als').post(al));
                            }
                        );

                        angular.forEach
                        (
                            $scope.pt, function (pt) {
                                delete pt.name;

                                requests.push(obj.all('pouringTypes').post(pt));
                            }
                        );

                        $q.all(requests).then
                        (
                            function () {
                                $scope.al = [];
                                $scope.pt = [];

                                $scope.rest();

                                $rootScope.showAlert = true;
                                $rootScope.alert = true;

                                $scope.updateTotalServerItems($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.totalServerItems + 1);
                            },

                            function () {
                                $rootScope.showAlert = true;
                                $rootScope.alert = false;
                            }
                        );
                    }
                );
            }
            else {
                // var item = Restangular.copy($scope.gridData[$scope.selectedItem]);

                // angular.forEach
                // (
                // data, function (val, key)
                // {
                // if (!isNaN(val)) item[key] = val;
                // }
                // );

                // item.put().then
                // (
                // function ()
                // {

                // angular.copy(item, $scope.gridData[$scope.selectedItem]);

                // $scope.deselectItem();
                // }
                // );

                $scope.$parent.submit(data);
            }
        };
    }
);