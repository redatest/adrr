(function () {
    var adrrInitial = angular.module('adrrServices.initial', [], null)

        .provider
    (
        'adrrInitial', function () {

            /**
             * @var {private} _url
             */
            var _url = '';

            /**
             * @function setUrl sets the url for data source
             * @param {String} url
             */
            this.setUrl = function (url) {

                _url = url;

            }

            // The service factory function
            this.$get = ['$http', function ($http) {

                return {

                }

            }];

        }
    )
})();