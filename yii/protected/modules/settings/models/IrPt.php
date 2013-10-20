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
				array('ir_id, pouring_type_id', 'numerical', 'integerOnly' => true)
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
				'id'			  => 'ID',
				'ir_id'			  => 'Ir',
				'pouring_type_id' => 'Pouring Type',
			);
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>