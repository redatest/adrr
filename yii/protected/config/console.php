<?php
	return array
	(
		'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
		
		'name' => 'Concrete Console',
		
		'preload' => array('log'),
		
		'components' => array
		(
			'db' => array
			(
				'connectionString' => 'mysql:host=localhost;dbname=conc',
				'emulatePrepare' => true,
				'username' => 'root',
				'password' => '',
				'charset' => 'utf8',
				'tablePrefix' => 'tbl_'
			),
			
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
				),
			),
		),
		
		'modules' => array
		(
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
				'returnLogoutUrl' => array('/user/login'),
			),
		)
	);
?>