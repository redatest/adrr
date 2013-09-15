<?php
	class JsonUserController extends RESTful
	{
		public function __construct()
		{
			$this->_model = User::model();
		}
	}
?>