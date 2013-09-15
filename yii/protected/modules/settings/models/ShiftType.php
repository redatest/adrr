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
				array('description, description_ar, create_time, update_time', 'safe'),
				array('id, name, name_ar, description, description_ar, start_time, end_time, create_time, create_user_id, update_time, update_user_id', 'safe', 'on' => 'search'),
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
				'id' => 'ID',
				'name' => 'Name',
				'name_ar' => 'Name Ar',
				'description' => 'Description',
				'description_ar' => 'Description Ar',
				'start_time' => 'Start Time',
				'end_time' => 'End Time',
				'create_time' => 'Create Time',
				'create_user_id' => 'Create User',
				'update_time' => 'Update Time',
				'update_user_id' => 'Update User',
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('name', $this->name, true);
			$criteria->compare('name_ar', $this->name_ar, true);
			$criteria->compare('description', $this->description, true);
			$criteria->compare('description_ar', $this->description_ar, true);
			$criteria->compare('start_time', $this->start_time);
			$criteria->compare('end_time', $this->end_time);
			$criteria->compare('create_time', $this->create_time, true);
			$criteria->compare('create_user_id', $this->create_user_id);
			$criteria->compare('update_time', $this->update_time, true);
			$criteria->compare('update_user_id', $this->update_user_id);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>