var adrrDataFetcher = angular.module('adrrDataFetcher', [], null).factory
    (
        'adrrDataFetcher',
        [
            '$http', '$timeout', function ($http, $timeout) {

            var targets = [];

            var times = [];

            var lookups = [];

            var truckers = [];

            var getData = function (sourceUrl, target, time, updateTrucker, method, args) {

                var index = _.indexOf(targets, target, 0);

                if (index !== -1) {

                    if (truckers[index] !== null) {

                        args['trucker'] = truckers[index];

                    }

                    $http
                    ({
                        method: method !== undefined ? method : 'GET',
                        url: sourceUrl,
                        params: method !== 'POST' ? (typeof args !== 'undefined' ? args : null) : null,
                        data: method === 'POST' ? (typeof args !== 'undefined' ? $.param(args) : null) : null,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                    })
                        .success
                    (
                        function (data) {

                            if (angular.isArray(data)) {

                                var dataLength = data.length;

                                var newest = dataLength > 0 ? data[0][updateTrucker] : null;

                                for (var i = 0; i < dataLength; i++) {

                                    newest = data[i][updateTrucker] > newest ? data[i][updateTrucker] : newest;

                                    var itemId = parseInt(data[i]['id'], 10);

                                    if (typeof lookups[index][itemId] === 'undefined' || lookups[index][itemId] === null) {

                                        lookups[index][itemId] = target.length;

                                    }

                                    target[lookups[index][itemId]] = data[i];
                                }

                                truckers[index] = newest;
                            }

                            $timeout
                            (
                                function () {

                                    getData(sourceUrl, target, time, updateTrucker, method, args);

                                }, time
                            );
                        }
                    )
                }
            };

            var set = function (sourceUrl, time, updateTrucker, method, args) {

                var target = [];

                targets.push(target);

                lookups.push([]);

                truckers.push(null);

                times.push(time);

                args = typeof args === 'undefined' ? {} : args;

                if (typeof updateTrucker !== 'undefined' && updateTrucker !== null) {

                    args['updateTrucker'] = updateTrucker;
                }

                getData(sourceUrl, target, time, updateTrucker, method, args);

                return target;
            };

            var unset = function (target) {

                var index = _.indexOf(targets, target, 0);

                if (index !== -1) {

                    times.splice(index, 1);

                    targets.splice(index, 1);

                    lookups.splice(index, 1);

                    truckers.splice(index, 1)
                }
            };

            var get = function (sourceUrl, method, args) {

                var target = [];

                $http
                ({
                    method: method !== undefined ? method : 'GET',
                    url: sourceUrl,
                    params: method !== 'POST' ? (typeof args !== 'undefined' ? args : null) : null,
                    data: method === 'POST' ? (typeof args !== 'undefined' ? $.param(args) : null) : null,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                })
                    .success
                (
                    function (data) {

                        target.splice(0, target.length);

                        if (angular.isArray(data)) {

                            var numRecords = data.length;

                            for (var i = 0; i < numRecords; i++) {

                                target.push(data[i]);

                            }

                        }

                    }
                );

                return target;

            }

            var updateTime = function (target, time) {

                var index = _.indexOf(targets, target, 0);

                if (index !== -1) {

                    times[index] = time;
                }
            };

            return {

                set: set,

                unset: unset,

                get: get,

                updateTime: updateTime

            };
        }
        ]
    );