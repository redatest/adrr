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
				
				array('id, date, shift_id, supplier_id, conc_type_id, plant, truck, ticket, dept_time, arriv_time, truck_load, temp, slump, flow, accepted', 'safe', 'on' => 'search'),
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
				'yellow'	   => 'Yellow Alert'
			);
		}
		
		// public function search()
		// {
			// $criteria = new CDbCriteria;

			// $criteria->compare('id',		   $this->id);
			// $criteria->compare('date',		   $this->date,		  true);
			// $criteria->compare('shift_id',	   $this->shift_id);
			// $criteria->compare('supplier_id',  $this->supplier_id);
			// $criteria->compare('conc_type_id', $this->conc_type_id);
			// $criteria->compare('plant',		   $this->plant);
			// $criteria->compare('truck',		   $this->truck);
			// $criteria->compare('ticket',	   $this->ticket,	  true);
			// $criteria->compare('dept_time',	   $this->dept_time,  true);
			// $criteria->compare('arriv_time',   $this->arriv_time, true);
			// $criteria->compare('truck_load',   $this->truck_load);
			// $criteria->compare('accepted',	   $this->accepted);

			// return new CActiveDataProvider($this, array('criteria' => $criteria));
		// }
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>