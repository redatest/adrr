<?php
	class IrController extends RESTful
	{
		public function __construct()
		{
			$this->_model = Ir::model();
		}
	}
?>