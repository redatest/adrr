<?php
	class Ir extends ArModel
	{
		public function tableName()
		{
			return '{{ir}}';
		}
		
		public function rules()
		{
			return array
			(
				array('ir, zone_id, area, val', 'required'),
				array('ir, zone_id, val, project_id', 'numerical', 'integerOnly' => true),
				array('id, ir, zone_id, area, val, project_id', 'safe', 'on' => 'search'),
			);
		}
		
		public function relations()
		{
			return array
			(
				'als' => array(self::HAS_MANY, 'IrAl', 'ir_id'),
				'pouringTypes' => array(self::HAS_MANY, 'IrPt', 'ir_id')
			);
		}
		
		public function attributeLabels()
		{
			return array
			(
				'id' => 'ID',
				'ir' => 'Ir',
				'zone_id' => 'Zone',
				'area' => 'Area',
				'val' => 'Val',
				'project_id' => 'Project',
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('ir', $this->ir);
			$criteria->compare('zone_id', $this->zone_id);
			$criteria->compare('area', $this->area, true);
			$criteria->compare('val', $this->val);
			$criteria->compare('project_id', $this->project_id);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>