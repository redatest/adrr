<?php
	// uncomment the following to define a path alias
	// Yii::setPathOfAlias('local','path/to/local-folder');

	return array
	(
		'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
		'name' => 'Concrete',

		'preload' => array('log'),
		
		'import' => array
		(
			'application.models.*',

			'application.components.*',
			'application.components.AdrrNotificationPump.*',
			'application.components.AdrrNotificationPump.models.*',

			'application.modules.user.models.*',
			'application.modules.user.components.*',
			'application.modules.eng.models.*',
			'application.modules.settings.models.*'
		),

		'modules' => array
		(
			'gii' => array
			(
				'class' => 'system.gii.GiiModule',
				'password' => 'admin',
				'ipFilters' => array('127.0.0.1', '::1')
			),
			
			'user' => array
			(
				'hash' => 'md5',
				'sendActivationMail' => true,
				'loginNotActiv' => false,
				'activeAfterRegister' => false,
				'autoLogin' => true,
				'registrationUrl' => array('/user/registration'),
				'recoveryUrl' => array('/user/recovery'),
				'loginUrl' => array('/user/login'),
				'returnUrl' => array('/user/profile'),
				'returnLogoutUrl' => array('/user/login')
			),
			
			'settings',
			
			'eng',

            'notification'
		),
		'components' => array
		(
			'user' => array
			(
				'allowAutoLogin' => true,
				'class' => 'WebUser'
			),
			
			'urlManager' => array
			(
				'urlFormat' => 'path',
				'showScriptName' => false,
				'rules' => array
				(
					// '<controller:\w+>/<id:\d+>' => '<controller>/view',
					// '<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
					// '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
					array('<module>/<controller>/index',		  'pattern' => 'api/<module\w+>/<controller:\w+>', 'verb' => 'GET'),
					array('<module>/<controller>/view',			  'pattern' => 'api/<module\w+>/<controller:\w+>/<id:\d+>', 'verb' => 'GET'),
					array('<module>/<controller>/update',		  'pattern' => 'api/<module\w+>/<controller:\w+>/<id:\d+>', 'verb' => 'POST'),
					array('<module>/<controller>/delete',		  'pattern' => 'api/<module\w+>/<controller:\w+>/<id:\d+>', 'verb' => 'OPTIONS'),
					array('<module>/<controller>/create',		  'pattern' => 'api/<module\w+>/<controller:\w+>', 'verb' => 'POST'),
					array('<module>/<controller>/<action>',		  'pattern' => 'api/<module\w+>/<controller:\w+>/<action:\w+>', 'verb' => 'GET'),
					array('<module>/<controller>/getRelatedList', 'pattern' => 'api/<module\w+>/<controller:\w+>/<id:\d+>/<related:\w+>', 'verb' => 'GET'),
					array('<module>/<controller>/getRelated',	  'pattern' => 'api/<module\w+>/<controller:\w+>/<id:\d+>/<related:\w+>/<related_id:\d+>', 'verb' => 'GET'),
					array('<module>/<controller>/updateRelated',  'pattern' => 'api/<module\w+>/<controller:\w+>/<id:\d+>/<related:\w+>/<related_id:\d+>', 'verb' => 'POST'),
					array('<module>/<controller>/deleteRelated',  'pattern' => 'api/<module\w+>/<controller:\w+>/<id:\d+>/<related:\w+>/<related_id:\d+>', 'verb' => 'OPTIONS'),
					array('<module>/<controller>/createRelated',  'pattern' => 'api/<module\w+>/<controller:\w+>/<id:\d+>/<related:\w+>', 'verb' => 'POST'),
				),
			),


			'errorHandler' => array('errorAction' => 'site/error'),
			
			'log' => array
			(
				'class' => 'CLogRouter',
				'routes' => array
				(
					array
					(
						'class' => 'CFileLogRoute',
						'levels' => 'error, warning',
					),
					
					// uncomment the following to show log messages on web pages
					// array('class' => 'CWebLogRoute')
				)
			)
		),
		
		'params' => array('adminEmail' => 'webmaster@example.com')
	);
?>