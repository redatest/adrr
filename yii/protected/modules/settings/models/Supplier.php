<?php
	class Supplier extends ArModel
	{
		public function tableName()
		{
			return '{{supplier}}';
		}
		
		public function rules()
		{
			return array
			(
				array('name, prefix', 'required'),
				array('state', 'numerical', 'integerOnly' => true),
				array('name, prefix', 'length', 'max' => 255),
				array('id, name, prefix, state, description', 'safe', 'on' => 'search'),
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
				'prefix' => 'Prefix',
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
			$criteria->compare('prefix', $this->prefix, true);
			$criteria->compare('state', $this->state);
			$criteria->compare('Description', $this->description, true);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
