<?php
	class ZoneController extends RESTful
	{
		public function __construct()
		{
			$this->_model = Zone::model();
		}
	}
?>