<?php
	class ShiftTypeController extends RESTful
	{
		public function __construct()
		{
			$this->_model = ShiftType::model();
		}
	}
?>