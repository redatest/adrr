<?php
	class ShiftListController extends RESTful
	{
		public function __construct()
		{
			$this->_model = ShiftList::model();
		}
	}
?>