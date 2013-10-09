<?php
	class JsonLoginController extends RESTful
	{
		public function actionCreate()
		{
			$result["logged"] = true;
			
			$result["isEng"] = Yii::app()->user->isEng;
			$result["isSenior"] = Yii::app()->user->isSenior;
			$result["name"] = Yii::app()->user->name;
			$result["id"] = Yii::app()->user->id;
			
			if (Yii::app()->user->isGuest)
			{
				$model = new UserLogin;
				
				if (isset($_POST['username']) && isset($_POST['password']))
				{
					$model->username = $_POST['username'];
					$model->password = $_POST['password'];
					
					if ($model->validate())
					{
						$this->lastViset();
						
						$result["isEng"] = Yii::app()->user->isEng;
						$result["isSenior"] = Yii::app()->user->isSenior;
						$result["name"] = Yii::app()->user->name;
						$result["id"] = Yii::app()->user->id;
						
						$this->_sendResponse(200, CJSON::encode($result));
					}
				}
				
				$result["logged"] = false;
			}
			
			$this->_sendResponse(200, CJSON::encode($result));
		}
		
		private function lastViset()
		{
			$lastVisit = User::model()->notsafe()->findByPk(Yii::app()->user->id);
			
			$lastVisit->lastvisit = time();
			
			$lastVisit->save();
		}
	}
?>