<?php
	class LabTruck extends ArModel
	{
		public function tableName()
		{
			return 'view_lab_truck';
		}
		
		public function rules()
		{
			return array
			(
				array('truck', 'required'),
				array('truck', 'numerical', 'integerOnly' => true),
				
				array('truck', 'safe', 'on' => 'search'),
			);
		}
		
		public function relations()
		{
			return array ();
		}
		
		public function attributeLabels()
		{
			return array ('truck' => 'Truck');
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('truck', $this->truck);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>