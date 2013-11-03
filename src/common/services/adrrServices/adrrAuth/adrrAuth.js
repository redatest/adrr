angular.module('adrrAuth', [], null)

    .provider
(
    'adrrAuth', function () {

        // ------------------------------------------
        var _loginApiUrl = null;

        var _logoutApiUrl = null;

        var _loginState = null;

        this.init = function (loginApiUrl, logoutApiUrl, loginState) {

            _loginApiUrl = loginApiUrl;

            _logoutApiUrl = logoutApiUrl;

            _loginState = loginState;
        };
        // ------------------------------------------

        this.$get = function ($rootScope, $http, $q, $state) {

            var Auth = {};

            Auth.hasLogged = false;

            Auth.loginData = {};

            var stateChangeHandler = {};

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

                        if (!Auth.hasLogged) {

                            Auth.hasLogged = true;

                            var stateChangeSuccess = $rootScope.$on
                            (
                                '$stateChangeSuccess', function () {
                                    stateChangeSuccess();

                                    stateChangeHandler = $rootScope.$on
                                    (
                                        '$stateChangeStart', function () {

                                            Auth.check();

                                        }
                                    );
                                }
                            );

                        }

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