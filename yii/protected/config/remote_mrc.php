<?php
/**
 * Created by JetBrains PhpStorm.
 * User: علاء الدين المحيميد
 * Date: 18/09/13
 * Time: 08:49 ص
 *
 */

// don't forget to add this file to .gitignore
return
	array(
		'components' =>
		array(
			'db'  =>
			array
			(
				'connectionString' => 'mysql:host=localhost;dbname=heptc1_conc',
				'emulatePrepare'   => true,
				'username'         => 'heptc1_raeef',
				'password'         => 'Hf%Ho5HV~{kH',
				'charset'          => 'utf8',
				'tablePrefix'      => 'tbl_'
			),
			'db2' =>
			array
			(
				'class'            => 'CDbConnection',
				'connectionString' => 'mysql:host=localhost;dbname=heptc1_conc',
				'emulatePrepare'   => true,
				'username'         => 'heptc1_raeef',
				'password'         => 'Hf%Ho5HV~{kH',
				'charset'          => 'utf8',
				'tablePrefix'      => 'tbl_'
			)
		)
	);
?>