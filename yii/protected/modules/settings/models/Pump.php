<?php
	class Pump extends ArModel
	{
		public function tableName()
		{
			return '{{pump}}';
		}
		
		public function rules()
		{
			return array
			(
				array('name, state', 'required'),
				array('state', 'numerical', 'integerOnly' => true),
				array('name', 'length', 'max' => 255),
				array('id, name, state', 'safe', 'on' => 'search'),
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
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('name', $this->name, true);
			$criteria->compare('state', $this->state);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
