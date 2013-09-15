<?php
	class PouringTypeController extends RESTful
	{
		public function __construct()
		{
			$this->_model = PouringType::model();
		}
	}
?>