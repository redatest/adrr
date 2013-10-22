angular.module('adrrAuth', []).factory
(
    'adrrAuth', function ($state, $http, $rootScope, $q) {
        $rootScope.wrongCredentials = false;

        var check = function (username, password, oldUrl) {
            var credentials = (!angular.isUndefined(username) && !angular.isUndefined(password)) ? $.param({ username: username, password: password }) : null;

            var deferred = $q.defer();

            $http
            ({
                method: 'POST',
                url: adrrAuthConfig.loginUrl,
                data: credentials,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success
            (
                function (data, status, headers) {
                    deferred.resolve(data);

                    if (data.logged === true) {
                        if ($state.current.name == 'login') {
                            if (!angular.isUndefined(oldUrl) && oldUrl !== 'login' && oldUrl !== 'logout') {
                                window.location.href = '#/' + oldUrl;
                            }
                            else {
                                $state.transitionTo(adrrAuthConfig.defaultState);
                            }
                        }
                    }
                    else {
                        $state.transitionTo(adrrAuthConfig.loginState);

                        if (credentials !== null) {
                            $rootScope.wrongCredentials = true;
                        }
                    }
                }
            )
                .error
            (
                function (data) {
                    deferred.reject(data);

                    $state.transitionTo(adrrAuthConfig.loginState);
                }
            );

            return deferred.promise;
        }

        function logout() {
            $http
            ({
                method: 'POST',
                url: adrrAuthConfig.logoutUrl
            })
                .success
            (
                function (data, status, headers) {
                    $state.transitionTo(adrrAuthConfig.loginState);
                }
            );
        }

        // -------------------------------------------------

        return {
            check: check,
            logout: logout
        };
    }
);