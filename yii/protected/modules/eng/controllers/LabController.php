<?php
	class LabController extends RESTful
	{
		public function __construct()
		{
			$this->_model = Lab::model();
		}
		
		public function actionTodayRecords ()
		{
			date_default_timezone_set('Asia/Riyadh');
			
			$date = date('Y-m-d');
			
			$criteria = new CDbCriteria();
			$criteria->condition = "date = '" . $date . "' and user_id=" . Yii::app()->user->id;
			
			$this->_sendResponse(200, CJSON::encode($this->_model->findAll($criteria)));
		}
		
		public function actionNumTodayRecords ()
		{
			date_default_timezone_set('Asia/Riyadh');
			
			$date = date('Y-m-d');
			
			$result['numRows'] = $this->_model->count("date = '" . $date . "' and user_id=" . Yii::app()->user->id);
			
			$this->_sendResponse(200, CJSON::encode($result));
		}
	}
?>