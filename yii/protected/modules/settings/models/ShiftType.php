<?php
	class ShiftType extends ArModel
	{
		public function tableName()
		{
			return '{{shift_type}}';
		}
		
		public function rules()
		{
			return array
			(
				array('name, start_time, end_time', 'required'),
				array('start_time, end_time, create_user_id, update_user_id', 'numerical', 'integerOnly' => true),
				array('name', 'length', 'max' => 255),
				array('name_ar', 'length', 'max' => 11),
				array('description, description_ar, create_time, update_time', 'safe')
			);
		}
		
		public function relations()
		{
			return array ();
		}
		
		public function getMap()
		{
			$map = parent::getMap();
			
			unset($map['cols']['name_ar']);
			unset($map['cols']['description_ar']);
			unset($map['cols']['create_time']);
			unset($map['cols']['create_user_id']);
			unset($map['cols']['update_time']);
			unset($map['cols']['update_user_id']);
			
			return $map;
		}
		
		public function attributeLabels()
		{
			return array
			(
				'id'			 => 'ID',
				'name'			 => 'Name',
				'name_ar'		 => 'Name Ar',
				'description'	 => 'Description',
				'description_ar' => 'Description Ar',
				'start_time'	 => 'Start Time',
				'end_time'		 => 'End Time',
				'create_time'	 => 'Create Time',
				'create_user_id' => 'Create User',
				'update_time'	 => 'Update Time',
				'update_user_id' => 'Update User',
			);
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>