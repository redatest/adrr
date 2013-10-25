var adrrSsNgGrid = angular.module('adrrDirectives.ssNgGrid', [], null)

    .directive
(
    'adrrSsNgGrid', function ($http, $q) {

        return {

            restrict: 'A',

            scope: true,

            require: '?ngGrid',

            link: function (scope, element, attrs) {

                var parent = scope.$parent;

                var gridOptions = parent[attrs.ngGrid];

                function loadData(pageSize, page) {

                    var deferred = $q.defer();

                    var offset = (page - 1) * pageSize;

                    $http.get(gridOptions.dataSource, { params: { offset: offset, limit: pageSize } }).success
                    (
                        function (data) {

                            deferred.resolve(data);
                        }
                    );

                    return deferred.promise;
                }

                scope.getPagedDataAsync = function (pageSize, page) {

                    loadData(pageSize, page).then
                    (
                        function (data) {

                            parent[gridOptions.data] = angular.isArray(data) ? data : [];
                        }
                    );
                };

                function updateData() {

                    $http.get(gridOptions.numRowsUrl).success
                    (
                        function (data) {

                            parent[gridOptions.totalServerItems] = parseInt(data['numRows'], 10);

                            scope.getPagedDataAsync(parent[gridOptions.adrrPagingOptions].pageSize, parent[gridOptions.adrrPagingOptions].currentPage);
                        }
                    );
                }

                updateData();

                scope.$watch
                (
                    gridOptions.adrrPagingOptions, function (newVal, oldVal) {

                        if (newVal !== oldVal) {

                            var ops = parseInt(oldVal.pageSize, 10);
                            var nps = parseInt(newVal.pageSize, 10);

                            var mxp = Math.ceil(parent[gridOptions.totalServerItems] / nps);

                            if (nps !== ops && mxp < newVal.currentPage) {

                                parent[gridOptions.adrrPagingOptions].currentPage = mxp;

                            }
                            else {

                                scope.getPagedDataAsync(newVal.pageSize, newVal.currentPage);

                            }
                        }
                    }, true
                );
            }
        }
    }
);
