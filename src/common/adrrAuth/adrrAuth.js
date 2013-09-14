angular.module('adrrAuth', []).factory
(
	'adrrAuth', function ($state, $http, $rootScope)
	{
		$rootScope.wrongCredentials = false;
		
		function check (username, password)
		{
			var credentials = (!angular.isUndefined(username) && !angular.isUndefined(password)) ? $.param ({ username: username, password: password }) : null;
			
			$http
			({
				method: 'POST',
				url: adrrAuthConfig.loginUrl,
				data: credentials,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success
			(
				function (data, status, headers)
				{
					if (data.logged === true)
					{
						if ($state.current.name == 'login')
						{
							$state.transitionTo(adrrAuthConfig.defaultState);
						}
					}
					else
					{
						$state.transitionTo(adrrAuthConfig.loginState);
						
						if (credentials !== null)
						{
							$rootScope.wrongCredentials = true;
						}
					}
				}
			)
			.error
			(
				function ()
				{
					$state.transitionTo(adrrAuthConfig.loginState);
				}
			);
		}
		
		function logout()
		{
			$http
			({
				method: 'POST',
				url: adrrAuthConfig.logoutUrl
			})
			.success
			(
				function (data, status, headers)
				{
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