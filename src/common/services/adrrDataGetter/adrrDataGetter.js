angular.module('adrrDataGetter', []).factory
(
    'adrrDataGetter', function ($http) {
        var targets = [];

        var timers = [];

        var getData = function (sourceUrl, target, method, args) {
            $http
            ({
                method: (method !== undefined ? method : 'GET'),
                url: sourceUrl,
                data: (args !== undefined ? args : null)
            }).success
            (
                function (data) {
                    var targetIndex = _.indexOf(targets, target);

                    if (angular.isArray(data)) {
                        var dataLength = data.length;

                        for (var i = 0; i < dataLength; i++) {
                            var obj = _.find(targets[targetIndex], data[i]);

                            if (obj === undefined) {
                                targets[targetIndex].push(data[i]);
                            }
                        }

                        dataLength = targets[targetIndex].length;

                        for (i = 0; i < dataLength; i++) {
                            var obj = _.find(data, targets[targetIndex][i]);

                            if (obj === undefined) {
                                targets[targetIndex].splice(i, 1);
                            }
                        }
                    }
                }
            )
        }

        var set = function (sourceUrl, target, time, method, args) {
            if (time !== undefined) {
                var timer = setInterval(getData, time, sourceUrl, target, method, args);

                timers.push(timer);

                targets.push(target);
            }
        }

        var unset = function (target) {
            var targetIndex = _.indexOf(targets, target);

            clearInterval(timers[targetIndex]);

            targets.splice(targetIndex, 1);
        }

        // ------------------------------------------------------------------------

        return {
            set: set,
            unset: unset
        }
    }
);