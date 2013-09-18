<?php
	class ProjectController extends RESTful
	{
		public function __construct()
		{
			$this->_model = Project::model();
		}
	}
?>