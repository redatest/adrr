<?php
	class IrPt extends ArModel
	{
		public function tableName()
		{
			return '{{ir_pt}}';
		}
		
		public function rules()
		{
			return array
			(
				array('ir_id, pouring_type_id', 'required'),
				array('ir_id, pouring_type_id', 'numerical', 'integerOnly' => true),
				array('id, ir_id, pouring_type_id', 'safe', 'on' => 'search'),
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
				'ir_id' => 'Ir',
				'pouring_type_id' => 'Pouring Type',
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('ir_id', $this->ir_id);
			$criteria->compare('pouring_type_id', $this->pouring_type_id);

			return new CActiveDataProvider($this, array('criteria'=>$criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>