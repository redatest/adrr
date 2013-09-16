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
				array('ir_id', 'numerical', 'integerOnly' => true),
				array('id, ir_id, axis, level', 'safe', 'on' => 'search'),
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
				'ir_id' => 'Ir',
				'axis' => 'Axis',
				'level' => 'Level',
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('ir_id', $this->ir_id);
			$criteria->compare('axis', $this->axis, true);
			$criteria->compare('level', $this->level, true);

			return new CActiveDataProvider($this, array('criteria'=>$criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>