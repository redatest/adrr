<?php
	class ConcreteTypeController extends RESTful
	{
		public function __construct()
		{
			$this->_model = ConcreteType::model();
		}
	}
?>