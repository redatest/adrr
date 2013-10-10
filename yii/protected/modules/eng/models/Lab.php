<?php
	class Lab extends ArModel
	{
		public function tableName()
		{
			return '{{lab}}';
		}
		
		public function rules()
		{
			return array
			(
				array('date, shift_id, supplier_id, conc_type_id, plant, truck, ticket, dept_time, arriv_time, temp', 'required'),
				array('shift_id, supplier_id, conc_type_id, plant, truck, truck_load, temp, slump, flow, accepted', 'numerical', 'integerOnly' => true),
				array('ticket', 'length', 'max' => 255),
			);
		}
		
		public function relations()
		{
			return array
			(
				'comments' => array(self::HAS_MANY, 'LabComment', 'lab_id')
			);
		}
		
		public function attributeLabels()
		{
			return array
			(
				'id'		   => 'ID',
				'date'		   => 'Date',
				'shift_id'	   => 'Shift',
				'supplier_id'  => 'Supplier',
				'conc_type_id' => 'Conc Type',
				'plant'		   => 'Plant',
				'truck'		   => 'Truck',
				'ticket'	   => 'Ticket',
				'dept_time'	   => 'Dept Time',
				'arriv_time'   => 'Arriv Time',
				'truck_load'   => 'Truck Load',
				'temp'		   => 'Temperature',
				'slump'		   => 'Slump',
				'flow'		   => 'Flow',
				'accepted'	   => 'Accepted',
				'red'		   => 'Red Alert',
				'yellow'	   => 'Yellow Alert',
				'create_time'  => 'Create Time'
			);
		}
		
		public function getMap()
		{
			$map = parent::getMap();
			
			unset($map['cols']['create_time']);
			
			return $map;
		}
		
		protected function beforeSave()
		{
			if ($this->isNewRecord)
			{
				date_default_timezone_set('Asia/Riyadh');
			
				$this->create_time = date('Y:m:d H:i:s');
			}
			
			return true;
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>