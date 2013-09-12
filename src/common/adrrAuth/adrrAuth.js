angular.module('adrrAuth', []).factory
(
	'adrrAuth', function ($state, $http)
	{
		function check (username, password)
		{
			var data = (typeof username !== undefined && typeof password !== undefined) ? $.param ({ username: username, password: password	}) : null;
			
			$http
			({
				method: 'POST',
				url: adrrAuthConfig.loginUrl,
				data: data,
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
				url: logoutUrl
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