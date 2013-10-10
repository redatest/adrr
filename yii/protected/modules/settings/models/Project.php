<?php
	class Project extends ArModel
	{
		public function tableName()
		{
			return '{{project}}';
		}
		
		public function rules()
		{
			return array
			(
				array('name', 'required'),
				array('name', 'length', 'max' => 255)
			);
		}
		
		public function relations()
		{
			return array ();
		}
		
		public function attributeLabels()
		{
			return array
			(
				'id'		  => 'ID',
				'name'		  => 'Name',
				'description' => 'Description'
			);
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>