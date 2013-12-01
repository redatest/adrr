var adrrDataFetcher = angular.module('adrrDataFetcher', [], null).factory
        (
            'adrrDataFetcher',
            [
                '$http', '$timeout', function ($http, $timeout) {

                var _chain = [];

                var getData = function (item) {

                    if (item.trucker !== null) {

                        item.args['trucker'] = item.trucker;

                    }

                    if (item.updateTrucker !== null) {

                        item.args['updateTrucker'] = item.updateTrucker;

                    }

                    $http
                    ({
                        method: item.method !== undefined ? item.method : 'GET',
                        url: item.sourceUrl,
                        params: item.method !== 'POST' ? (typeof item.args !== 'undefined' ? item.args : null) : null,
                        data: item.method === 'POST' ? (typeof item.args !== 'undefined' ? $.param(item.args) : null) : null,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                    })
                        .success
                    (
                        function (data) {

                            if (!angular.equals({}, item)) {

                                if (angular.isArray(data)) {

                                    var dataLength = data.length;

                                    var newest = dataLength > 0 ? data[0][item.updateTrucker] : null;

                                    for (var i = 0; i < dataLength; i++) {

                                        newest = data[i][item.updateTrucker] > newest ? data[i][item.updateTrucker] : newest;

                                        var itemId = parseInt(data[i]['id'], 10);

                                        if (typeof item.lookup[itemId] === 'undefined' || item.lookup[itemId] === null) {

                                            item.lookup[itemId] = item.target.length;

                                        }

                                        item.target[item.lookup[itemId]] = data[i];
                                    }

                                    item.trucker = newest;
                                }

                                item.timer = $timeout
                                (
                                    function () {

                                        getData(item);

                                    }, item.time
                                );
                            }
                        }
                    )
                };

                var set = function (sourceUrl, time, updateTrucker, method, args) {

                    var index = _chain.push
                    ({
                        time: time,
                        timer: null,
                        target: [],
                        lookup: [],
                        method: method,
                        trucker: null,
                        args: typeof args === 'undefined' ? {} : args,
                        sourceUrl: sourceUrl,
                        updateTrucker: updateTrucker
                    }) - 1;

                    if (typeof updateTrucker !== 'undefined' && updateTrucker !== null) {

                        _chain[index].args['updateTrucker'] = updateTrucker;
                    }

                    getData(_chain[index]);

                    return _chain[index].target;
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

                            target = angular.isArray(data) ? angular.copy(data, target) : [];

                        }
                    );

                    return target;

                };

                var updateTime = function (target, time) {

                    var index = _.findIndex
                    (
                        _chain, function (item) {

                            return item.target == target;

                        }
                    );

                    if (index !== -1) {

                        _chain[index].time = time;

                    }
                };

                var updateArgs = function (target, args) {

                    var _item = {};

                    var index = _.findIndex
                    (
                        _chain, function (item) {

                            if (angular.equals(item.target, target)) {

                                _item = angular.copy(item, _item);

                                return true;

                            } else {

                                return false;

                            }

                        }
                    );

                    if (index !== -1) {

                        _chain[index].target.splice(0, target.length);
                        _chain[index].lookup.splice(0, target.length);

                        unset(target);

                        return set(_item.sourceUrl, _item.time, _item.updateTrucker, _item.method, angular.copy(args));
                    }

                };

                var unset = function (target) {

                    var index = _.findIndex
                    (
                        _chain, function (item) {

                            return angular.equals(item.target, target);
                        }
                    );

                    if (index !== -1) {

                        $timeout.cancel(_chain[index].timer);

                        _chain[index] = angular.copy({}, _chain[index]);

                        _chain.splice(index, 1);
                    }
                };

                return {

                    set: set,

                    unset: unset,

                    get: get,

                    updateTime: updateTime,

                    updateArgs: updateArgs

                };
            }
            ]
        )
    ;