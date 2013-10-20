<?php
	class LabPlantController extends RESTful
	{
		public function __construct()
		{
			$this->_model = LabPlant::model();
		}
	}
?>