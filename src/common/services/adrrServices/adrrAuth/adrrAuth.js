angular.module('adrrAuth', [], null)

    .provider
(
    'adrrAuth', function () {

        // ------------------------------------------
        var _loginApiUrl = null;

        var _logoutApiUrl = null;

        var _loginState = null;

        var _defaultState = null;

        this.init = function (loginApiUrl, logoutApiUrl, loginState, defaultState) {

            _loginApiUrl = loginApiUrl;

            _logoutApiUrl = logoutApiUrl;

            _loginState = loginState;

            _defaultState = defaultState;
        };
        // ------------------------------------------

        // ------------------------------------------
        var _service = { hasLogged: false, loginData: {} };

        var _lastState = '';

        var _checkedOnce = false;
        // ------------------------------------------

        this.$get = [
            '$rootScope', '$http', '$q', '$state', function ($rootScope, $http, $q, $state) {

                _service.check = function (username, password) {

                    _checkedOnce = true;

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

                            _service.loginData = angular.copy(data, _service.loginData);

                            _service.hasLogged = true;

                            if (_lastState !== '') {

                                window.location.href = $state.href(_lastState);

                                $state.go(_lastState);

                                _lastState = '';

                            } else {

                                window.location.href = $state.href(_defaultState);

                                $state.go(_defaultState);

                            }

                            deferred.resolve(data);
                        }
                    )
                        .error
                    (
                        function (data) {

                            window.location.href = $state.href(_loginState);

                            $state.go(_loginState);

                            deferred.reject(data);
                        }
                    );

                    return deferred.promise;
                };

                _service.logout = function () {

                    var deferred = $q.defer();

                    $http
                    ({
                        method: 'POST',
                        url: _logoutApiUrl
                    })
                        .success
                    (
                        function (data) {

                            _service.loginData = {};

                            _service.hasLogged = false;

                            window.location.href = $state.href(_loginState);

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

                $rootScope.$on
                (
                    '$stateChangeStart', function (event, toState) {

                        if (_service.hasLogged && toState.name === _loginState) {

                            event.preventDefault();

                            window.location.href = $state.href(_defaultState);

                        } else if (!_service.hasLogged) {

                            if (toState.name !== _loginState) {

                                _lastState = toState.name;

                            }

                            if (toState.name !== _loginState || !_checkedOnce) {

                                event.preventDefault();

                                _service.check();

                            }

                        }
                    }
                );

                return _service;

            }
        ];
    }
);