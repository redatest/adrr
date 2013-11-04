var adrrDataFetcher = angular.module('adrrDataFetcher', [], null).factory
(
    'adrrDataFetcher', function ($http) {

        var targets = [];

        var timers = [];

        var lookup = [];

        var truckers = [];

        //  getData is the function that actually fetches data. It is used by function set.
        //  sourceUrl: the url to the requested data source
        //  target: is an array object. It has to be initialized as an empty array before calling getData.
        //  method: post or get.
        //  args: any additional paramitures to be passed with the request.
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
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
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

                                if (typeof lookup[index][itemId] === 'undefined' || lookup[index][itemId] === null) {

                                    lookup[index][itemId] = target.length;

                                }

                                target[lookup[index][itemId]] = data[i];
                            }

                            truckers[index] = newest;
                        }

                        setTimeout
                        (
                            function () {

                                getData(sourceUrl, target, time, updateTrucker, method, args);

                            }, time
                        );
                    }
                )
            }
        };

        var set = function (sourceUrl, target, time, updateTrucker, method, args) {

            if (typeof time !== 'undefined') {

                targets.push(target);

                lookup.push([]);

                truckers.push(null);

                args = typeof args === 'undefined' ? {} : args;

                if (typeof updateTrucker !== 'undefined' && updateTrucker !== null) {

                    args['updateTrucker'] = updateTrucker;
                }

                getData(sourceUrl, target, time, updateTrucker, method, args);

                timers.push(time);

            } else {

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
                )

            }
        };

        var unset = function (target) {

            var index = _.indexOf(targets, target, 0);

            if (index !== -1) {

                timers.splice(index, 1);

                targets.splice(index, 1);

                lookup.splice(index, 1);

                truckers.splice(index, 1)
            }
        };

        var updateTime = function (target, time) {

            var index = _.indexOf(targets, target, 0);

            if (index !== -1) {

                timers[index] = time;
            }
        };

        return {

            set: set,

            unset: unset,

            updateTime: updateTime

        };
    }
);