<?php
	class ShiftList extends ArModel
	{
		public function tableName()
		{
			return '{{shift_list}}';
		}
		
		public function rules()
		{
			return array
			(
				array('list, date, time, shift_id, status', 'required'),
				array('time, shift_id, status', 'numerical', 'integerOnly' => true),
				array('id, list, date, time, shift_id, status', 'safe', 'on' => 'search'),
			);
		}
		
		public function relations()
		{
			return array();
		}
		
		public function getMap()
		{
			$map = parent::getMap();
			
			unset($map['cols']['time']);
			
			return $map;
		}
		
		public function attributeLabels()
		{
			return array
			(
				'id' => 'ID',
				'list' => 'List',
				'date' => 'Date',
				'time' => 'Time',
				'shift_id' => 'Shift',
				'status' => 'Status',
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('list', $this->list,true);
			$criteria->compare('date', $this->date,true);
			$criteria->compare('time', $this->time);
			$criteria->compare('shift_id', $this->shift_id);
			$criteria->compare('status', $this->status);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>