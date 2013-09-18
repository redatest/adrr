<?php
	class Zone extends ArModel
	{
		public function tableName()
		{
			return '{{zone}}';
		}
		
		public function rules()
		{
			return array
			(
				array('name', 'required'),
				array('state', 'numerical', 'integerOnly' => true),
				array('name', 'length', 'max' => 255),
				array('id, name, state, description', 'safe', 'on' => 'search'),
			);
		}
		
		public function relations()
		{
			return array();
		}
		
		public function attributeLabels()
		{
			return array
			(
				'id' => 'ID',
				'name' => 'Name',
				'state' => 'Active',
				'description' => 'Description',
			);
		}
		
		public function getMap()
		{
			$map = parent::getMap();
			
			unset($map['cols']['state']);
			
			return $map;
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('name', $this->name, true);
			$criteria->compare('state', $this->state);
			$criteria->compare('description', $this->description, true);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
