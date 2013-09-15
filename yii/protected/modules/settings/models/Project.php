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
				array('name, description', 'required'),
				array('name', 'length', 'max' => 255),
				array('id, name, description', 'safe', 'on' => 'search'),
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
				'id' => 'ID',
				'name' => 'Name',
				'description' => 'Description',
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('name', $this->name, true);
			$criteria->compare('description', $this->description, true);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>