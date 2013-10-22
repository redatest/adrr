var adrrDataGetter = angular.module('adrrDataGetter', [], null).factory
(
    'adrrDataGetter', function ($http) {

        var targets = [];

        var timers = [];

        var lookup = [];

        var truckers = [];

        //  getData is the function that actually fetches data. It is used by function set.
        //  sourceUrl: the url to the requested data source
        //  target: is an array object. It has to be initialized as an empty array before calling getData.
        //  method: post or get.
        //  args: any additional paramitures to be passed with the request.
        var getData = function (sourceUrl, target, updateTrucker, method, args) {

            var index = _.indexOf(targets, target, 0);

            $http
            ({
                method: method !== undefined ? method : 'GET',
                url: sourceUrl,
                data: args !== undefined ? $.param(args) : null
            })
                .success
            (
                function (data) {

                    truckers[index] = true;

                    if (angular.isArray(data)) {

                        var dataLength = data.length;

                        for (var i = 0; i < dataLength; i++) {

                            var itemId = parseInt(data[i]['id'], 10);

                            if (typeof lookup[index][itemId] === 'undefined' || lookup[index][itemId] === null) {

                                lookup[index][itemId] = target.length;

                            }

                            target[lookup[index][itemId]] = data[i];
                        }

                    }
                }
            )
        };

        var set = function (sourceUrl, target, time, updateTrucker, method, args) {

            if (typeof time !== 'undefined') {

                targets.push(target);

                lookup.push([]);

                truckers.push(false);

                if (typeof updateTrucker !== 'undefined') {

                    args = typeof args === 'undefined' ? {} : args;

                    args['updateTrucker'] = updateTrucker;

                    args['trucker'] = truckers[timers.length];
                }

                //noinspection JSCheckFunctionSignatures
                var timer = window.setInterval(getData, time, sourceUrl, target, updateTrucker, method, args);

                timers.push(timer);
            }
        };

        var unset = function (target) {

            var targetIndex = _.indexOf(targets, target, 0);

            window.clearInterval(timers[targetIndex]);

            timers.splice(targetIndex, 1);

            targets.splice(targetIndex, 1);

            lookup.splice(targetIndex, 1);

            truckers.splice(targetIndex, 1);
        };

        return {

            set: set,

            unset: unset

        }
    }
);