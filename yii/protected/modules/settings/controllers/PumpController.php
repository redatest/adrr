<?php
	class PumpController extends RESTful
	{
		public function __construct()
		{
			$this->_model = Pump::model();
		}
	}
?>