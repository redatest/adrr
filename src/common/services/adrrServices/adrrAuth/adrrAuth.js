angular.module('adrrAuth', [], null)

    .provider
(
    'adrrAuth', function () {

        // ------------------------------------------
        var _loginApiUrl = null;

        var _logoutApiUrl = null;

        var _loginState = null;

        var _oneHttp = true;

        this.init = function (loginApiUrl, logoutApiUrl, loginState, oneHttp) {

            _loginApiUrl = loginApiUrl;

            _logoutApiUrl = logoutApiUrl;

            _loginState = loginState;

            if (typeof oneHttp !== 'undefined') _oneHttp = oneHttp;
        };
        // ------------------------------------------

        this.$get = function ($rootScope, $http, $q, $state) {

            var Auth = {};

            Auth.hasLogged = false;

            Auth.loginData = {};

            var stateChangeHandler = {};

            var registerHandlers = function (deferred) {

                if (!Auth.hasLogged) {

                    var stateChangeSuccess = $rootScope.$on
                    (
                        '$stateChangeSuccess', function () {

                            stateChangeSuccess();

                            stateChangeHandler = $rootScope.$on
                            (
                                '$stateChangeStart', function () {

                                    if (_oneHttp) {

                                        deferred.resolve(Auth.loginData);

                                    } else {

                                        Auth.check();

                                    }
                                }
                            );
                        }
                    );
                }
            };

            var unregisterStateChangeHandler = function () {

                if (typeof stateChangeHandler === 'function') {

                    stateChangeHandler.call();

                    stateChangeHandler = {};

                }
            };

            Auth.check = function (username, password) {

                var credentials = typeof username !== 'undefined' && typeof password !== 'undefined' ? $.param({ username: username, password: password }) : null;

                var deferred = $q.defer();

                $http
                ({
                    method: 'POST',
                    url: _loginApiUrl,
                    data: credentials,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .success
                (
                    function (data) {

                        Auth.loginData = angular.copy(data, Auth.loginData);

                        registerHandlers(deferred);

                        Auth.hasLogged = true;

                        deferred.resolve(data);
                    }
                )
                    .error
                (
                    function (data) {

                        unregisterStateChangeHandler();

                        $state.go(_loginState);

                        deferred.reject(data);
                    }
                );

                return deferred.promise;
            };

            Auth.logout = function () {

                var deferred = $q.defer();

                $http
                ({
                    method: 'POST',
                    url: _logoutApiUrl
                })
                    .success
                (
                    function (data) {

                        Auth.loginData = {};

                        Auth.hasLogged = false;

                        unregisterStateChangeHandler();

                        $state.go(_loginState);

                        deferred.resolve(data);

                    }
                )
                    .error
                (
                    function (data) {

                        deferred.reject(data);

                    }
                );

                return deferred.promise;
            };

            return Auth;

        }

    }
);