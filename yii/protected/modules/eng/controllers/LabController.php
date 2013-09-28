<?php
	class LabController extends RESTful
	{
		public function __construct()
		{
			$this->_model = Lab::model();
		}
	}
?>