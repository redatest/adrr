<?php
	$yii = dirname(__FILE__) . '/framework/yii.php';

	//Aladdin
	$remote = strpos(dirname(__FILE__),'public_html') !== false;
	$mrc = $remote?'remote_mrc.php':'local_mrc.php';
	$mrc = require_once(dirname(__FILE__) . '/protected/config/'.$mrc);
	$config=require_once(dirname(__FILE__) . '/protected/config/main.php');
	///Aladdin

	// remove the following lines when in production mode
	// defined('YII_DEBUG') or define('YII_DEBUG',true);
	// specify how many levels of call stack should be shown in each log message
	// defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);

	error_reporting(E_ALL);

	ini_set('display_errors', 1);

	require_once($yii);
	//Aladdin
	$config = CMap::mergeArray($config,$mrc);
	///Aladdin
	Yii::createWebApplication($config)->run();
?>