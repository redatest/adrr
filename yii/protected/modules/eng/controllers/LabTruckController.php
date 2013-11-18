<?php
	class LabTruckController extends RESTful
	{
		public function __construct()
		{
			$this->_model = LabTruck::model();
		}
	}
?>