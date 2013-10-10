<?php
	class LabPlant extends ArModel
	{
		public function tableName()
		{
			return 'view_lab_plant';
		}
		
		public function rules()
		{
			return array
			(
				array('plant', 'required'),
				array('plant', 'numerical', 'integerOnly' => true),
				
				array('plant', 'safe', 'on' => 'search'),
			);
		}
		
		public function relations()
		{
			return array();
		}
		
		public function attributeLabels()
		{
			return array('plant' => 'Plant');
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('plant', $this->plant);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>