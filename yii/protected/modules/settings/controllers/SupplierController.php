<?php
	class SupplierController extends RESTful
	{
		public function __construct()
		{
			$this->_model = Supplier::model();
		}
	}
?>