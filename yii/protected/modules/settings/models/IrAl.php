<?php
	class IrAl extends ArModel
	{
		public function tableName()
		{
			return '{{ir_al}}';
		}
		
		public function rules()
		{
			return array
			(
				array('ir_id, axis, level', 'required'),
				array('ir_id', 'numerical', 'integerOnly' => true)
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
				'id'	=> 'ID',
				'ir_id' => 'Ir',
				'axis'	=> 'Axis',
				'level' => 'Level'
			);
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>