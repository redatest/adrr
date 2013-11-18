<?php
	class LabCommentController extends RESTful
	{
		public function __construct()
		{
			$this->_model = LabComment::model();
		}
	}
?>