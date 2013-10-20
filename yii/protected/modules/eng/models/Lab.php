<?php
	class Lab extends ArModel
	{
		public function tableName()
		{
			return '{{lab}}';
		}
		
		// public function rules()
		// {
			// return array
			// (
				// array('date, shift_id, supplier_id, conc_type_id, plant, truck, ticket, dept_time, arriv_time, temp, returned, approved, archived', 'required'),
				// array('shift_id, supplier_id, conc_type_id, plant, truck, truck_load, temp, slump, flow, accepted, returned, approved, archived', 'numerical', 'integerOnly' => true),
				// array('ticket', 'length', 'max' => 255),
			// );
		// }
		
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
				'user_id'	   => 'User ID',
				'date'		   => 'Date',
				'shift_id'	   => 'Shift',
				'supplier_id'  => 'Supplier',
				'conc_type_id' => 'Conc Type',
				'plant'		   => 'Plant',
				'truck'		   => 'Truck',
				'ticket'	   => 'Ticket',
				'dept_time'	   => 'Departure Time',
				'arriv_time'   => 'Arrival Time',
				'truck_load'   => 'Truck Load',
				'temp'		   => 'Temperature',
				'slump'		   => 'Slump',
				'flow'		   => 'Flow',
				'accepted'	   => 'Accepted',
				'red'		   => 'Red Alert',
				'yellow'	   => 'Yellow Alert',
				'create_time'  => 'Create Time',
				'returned'	   => 'Returend',
				'approved'	   => 'Approved',
				'archived'	   => 'Archived'
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
				
				$this->user_id = Yii::app()->user->id;
			}
			
			return true;
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>