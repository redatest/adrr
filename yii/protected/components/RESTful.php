<?php
	class RESTful extends AdrrController
	{
		protected $_model;
		protected $_relationship;
		
		public function actionIndex()
		{
			$models = $this->_setPagination();
			if (empty($models)) $this->_sendResponse(200, sprintf('No items were found.'),'text');
			else $this->_sendResponse(200, $models,'json');
		}

		public function actionView()
		{
			$this->_checkParams();
			
			$model = $this->_model->findByPk($_GET['id']);
			
			if (is_null($model)) $this->_sendResponse(404, 'No Item found with id '.$_GET['id']);
			else $this->_sendResponse(200, $model,'json');
		}
		
		public function actionCreate()
		{
			$json = file_get_contents('php://input');

			$put_vars = CJSON::decode($json, true);
			
			$model = new $this->_model;
			
			foreach ($put_vars as $var => $value)
			{
				if ($model->hasAttribute($var)) $model->$var = $value;
				else $this->_sendResponse(500, sprintf('Parameter <b>%s</b> is not allowed', $var));
			}
			
			if ($model->save()) $this->_sendResponse(200, $model,'json');
			else
			{
				$msg = "<h1>Error</h1>";
				$msg .= sprintf("Couldn't create");
				$msg .= "<ul>";
				
				foreach($model->errors as $attribute => $attr_errors)
				{
					$msg .= "<li>Attribute: $attribute</li>";
					$msg .= "<ul>";
					
					foreach($attr_errors as $attr_error) $msg .= "<li>$attr_error</li>";
					
					$msg .= "</ul>";
				}
				
				$msg .= "</ul>";
				
				$this->_sendResponse(500, $msg);
			}
		}
		
		public function actionUpdate()
		{
			$this->_checkParams();
			
			$json = file_get_contents('php://input');
			
			$put_vars = CJSON::decode($json, true);
			
			$model = $this->_model->findByPk($_GET['id']);
			
			if ($model === null) $this->_sendResponse(400, sprintf("Error: Didn't find any record with ID <b>%s</b>.", $_GET['id']) );
			
			foreach($put_vars as $var => $value)
			{
				if ($model->hasAttribute($var)) $model->$var = $value;
				else $this->_sendResponse(500, sprintf('Parameter <b>%s</b> is not allowed', $var));
			}
			
			if ($model->save()) $this->_sendResponse(200, $model,'json');
			else
			{
				$msg = "<h1>Error</h1>";
				$msg .= sprintf("Couldn't update");
				$msg .= "<ul>";
				
				foreach($model->errors as $attribute => $attr_errors)
				{
					$msg .= "<li>Attribute: $attribute</li>";
					$msg .= "<ul>";
					
					foreach($attr_errors as $attr_error) $msg .= "<li>$attr_error</li>";
					
					$msg .= "</ul>";
				}
				
				$msg .= "</ul>";
				
				$this->_sendResponse(500, $msg);
			}
		}
		
		public function actionDelete()
		{
			$this->_checkParams();
			
			$model = $this->_model->findByPk($_GET['id']);
			
			if ($model === null) $this->_sendResponse(400, sprintf("Error: Didn't find with ID <b>%s</b>.",	$_GET['id']));
			
			$num = $model->delete();
			
			if ($num > 0) $this->_sendResponse(200, $num);
			else $this->_sendResponse(500, sprintf("Error: Couldn't delete with ID <b>%s</b>.", $_GET['id']));
		}
		
		public function actionNumRows()
		{
			$result['numRows'] = $this->_model->count();
			
			$this->_sendResponse(200, $result,'json');
		}
		
		public function actionGetRelatedList()
		{
			$this->_checkParams(array('id', 'related'));
			
			$this->_checkRelationship();
			
			$models = $this->_setPagination();
			
			if (empty($models)) $this->_sendResponse(200, sprintf('No items were found.'));
			else $this->_sendResponse(200, $models,'json');
		}
		
		public function actionGetRelated()
		{
			$this->_checkParams(array('id', 'related', 'related_id'));
			
			$this->_checkRelationship();
			
			$model = $this->_getRelated();
			
			if ($model === null) $this->_sendResponse(200, sprintf('No items were found.'));
			else $this->_sendResponse(200, $model,'json');
		}
		
		public function actionUpdateRelated()
		{
			$this->_checkParams(array('id', 'related', 'related_id'));
			
			$this->_checkRelationship();
			
			$json = file_get_contents('php://input');
			
			$put_vars = CJSON::decode($json, true);
			
			$model = $this->_getRelated();
			
			if ($model === null) $this->_sendResponse(400, sprintf("Error: Didn't find any record with ID <b>%s</b>.", $_GET['id']) );
			
			foreach($put_vars as $var => $value)
			{
				if ($model->hasAttribute($var)) $model->$var = $value;
				else $this->_sendResponse(500, sprintf('Parameter <b>%s</b> is not allowed', $var));
			}
			
			if ($model->save()) $this->_sendResponse(200, $model,'json');
			else
			{
				$msg = "<h1>Error</h1>";
				$msg .= sprintf("Couldn't update");
				$msg .= "<ul>";
				
				foreach($model->errors as $attribute => $attr_errors)
				{
					$msg .= "<li>Attribute: $attribute</li>";
					$msg .= "<ul>";
					
					foreach($attr_errors as $attr_error) $msg .= "<li>$attr_error</li>";
					
					$msg .= "</ul>";
				}
				
				$msg .= "</ul>";
				
				$this->_sendResponse(500, $msg);
			}
		}
		
		public function actionCreateRelated()
		{
			$this->_checkParams(array('id', 'related'));
			
			$this->_checkRelationship();
			
			$json = file_get_contents('php://input');
			
			$put_vars = CJSON::decode($json, true);
			
			$model = new $this->_relationship->className;
			
			foreach ($put_vars as $var => $value)
			{
				if ($model->hasAttribute($var)) $model->$var = $value;
				else $this->_sendResponse(500, sprintf('Parameter <b>%s</b> is not allowed', $var));
			}
			
			$foreignKey = $this->_relationship->foreignKey;
			
			$model->$foreignKey = $_GET['id'];
			
			if ($model->save()) $this->_sendResponse(200, $model,'json');
			else
			{
				$msg = "<h1>Error</h1>";
				$msg .= sprintf("Couldn't create");
				$msg .= "<ul>";
				
				foreach($model->errors as $attribute => $attr_errors)
				{
					$msg .= "<li>Attribute: $attribute</li>";
					$msg .= "<ul>";
					
					foreach($attr_errors as $attr_error) $msg .= "<li>$attr_error</li>";
					
					$msg .= "</ul>";
				}
				
				$msg .= "</ul>";
				
				$this->_sendResponse(500, $msg);
			}
		}
		
		public function actionDeleteRelated()
		{
			$this->_checkParams(array('id', 'related', 'related_id'));
			
			$this->_checkRelationship();
			
			$model = $this->_getRelated();
			
			if ($model === null) $this->_sendResponse(400, sprintf("Error: Didn't find with ID <b>%s</b>.",	$_GET['id']));
			
			$num = $model->delete();
			
			if ($num > 0) $this->_sendResponse(200, $num);
			else $this->_sendResponse(500, sprintf("Error: Couldn't delete with ID <b>%s</b>.", $_GET['id']));
		}
		
		public function actionMetaData()
		{
			// $this->_sendResponse(200, CJSON::encode($this->_model->metaData->columns));
			$meta = $this->_model->metaData->columns;
			
			$labels = $this->_model->attributeLabels();
			
			foreach ($meta as $key => &$value)
			{
				$value = (array) $value;
				$value['label'] = $labels[$key];
			}
			
			$this->_sendResponse(200, $meta,'json');
		}
		
		protected function _setPagination()
		{
			$criteria = new CDbCriteria();
			
			if ($this->_checkParams(array('offset'), false) && $this->_checkParams(array('limit'), false))
			{
				$criteria->limit = intval($_GET['limit']);
				$criteria->offset = intval($_GET['offset']);
			}
			
			if ($this->_checkParams(array('related'), false))
			{
				$model = $this->_relationship->className;
				
				$criteria->condition = $this->_relationship->foreignKey . '=' . $_GET['id'];
				
				return $model::model()->findAll($criteria);
			}
			else return $this->_model->findAll($criteria);
		}
		
		protected function _checkParams($params = array('id'), $isImportant = true)
		{
			if ($isImportant)
			{
				foreach ($params as $param) if (!isset($_GET[$param])) $this->_sendResponse(500, 'Error: Parameter <b>' . $param . '</b> is missing' );
			}
			else
			{
				foreach ($params as $param)
				{
					if (isset($_GET[$param])) return true;
					else return false;
				}
			}
		}

		protected function _sendResponse($status = 200, $body = '', $content_type = 'text/html')
		{


			if (isset($_REQUEST['content_type']))
				$content_type = $_REQUEST['content_type'];

			if($content_type == 'xlsx'){
				parent::_sendXlsxResponse();
				Yii::app()->end();
			}

			if($content_type == 'json'){
				$content_type = Yii::app()->params['content_types']['json'];
				$body = CJSON::encode($body);
			}

			$status_header = 'HTTP/1.1 ' . $status . ' ' . $this->_getStatusCodeMessage($status);
			
			header($status_header);
			header('Content-type: ' . $content_type);
			
			if ($body != '') echo $body;
			else
			{
				$this->_sendErrorMessage($status);
			}
			
			Yii::app()->end();
		}
		
		protected function _getStatusCodeMessage($status)
		{
			$codes = Array
			(
				200 => 'OK',
				400 => 'Bad Request',
				401 => 'Unauthorized',
				402 => 'Payment Required',
				403 => 'Forbidden',
				404 => 'Not Found',
				500 => 'Internal Server Error',
				501 => 'Not Implemented',
			);
			
			return (isset($codes[$status])) ? $codes[$status] : '';
		}
		
		protected function _checkRelationship()
		{
			$this->_relationship = $this->_model->getActiveRelation($_GET['related']);
			
			if ($this->_relationship === null) $this->_sendResponse(200, sprintf('No relations were found.'));
		}
		
		protected function _getRelated()
		{
			$relatedClass = $this->_relationship->className;
			
			return $relatedClass::model()->findByAttributes(array('id' => $_GET['related_id'], $this->_relationship->foreignKey => $_GET['id']));
		}

		/**
		 * @param $status
		 * @param $body
		 */
		protected function _sendErrorMessage($status)
		{
			$message = '';

			switch ($status) {
				case 401:
					$message = 'You must be authorized to view this page.';
					break;

				case 404:
					$message = 'The requested URL ' . $_SERVER['REQUEST_URI'] . ' was not found.';
					break;

				case 500:
					$message = 'The server encountered an error processing your request.';
					break;

				case 501:
					$message = 'The requested method is not implemented.';
					break;
			}

			$signature = ($_SERVER['SERVER_SIGNATURE'] == '') ? $_SERVER['SERVER_SOFTWARE'] . ' Server at ' . $_SERVER['SERVER_NAME'] . ' Port ' . $_SERVER['SERVER_PORT'] : $_SERVER['SERVER_SIGNATURE'];

			$body =
				'
					<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
					<html>
					<head>
						<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
						<title>' . $status . ' ' . $this->_getStatusCodeMessage($status) . '</title>
					</head>
					<body>
						<h1>' . $this->_getStatusCodeMessage($status) . '</h1>
						<p>' . $message . '</p>
						<hr />
						<address>' . $signature . '</address>
					</body>
					</html>
				';

			echo $body;
		}
	}
?>