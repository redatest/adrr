<?php
	class ConcreteType extends ArModel
	{
		const CAT_slump = 'flow';
		const CAT_FLOW	= 'slump';
		
		public function tableName()
		{
			return '{{concrete_type}}';
		}
		
		public function rules()
		{
			return array
			(
				array('name, category, temp_from, temp_to', 'required'),
				array('flow_norm_from, flow_norm_to, flow_acpt_from, flow_acpt_to, slump_norm_from, slump_norm_to, slump_acpt_from, slump_acpt_to, temp_from, temp_to, very_frequent, sample_counter', 'numerical', 'integerOnly' => true),
				array('name', 'length', 'max' => 255),
				array('category', 'length', 'max' => 5),
				array('note', 'safe'),
				array('id, name, category, flow_norm_from, flow_norm_to, flow_acpt_from, flow_acpt_to, slump_norm_from, slump_norm_to, slump_acpt_from, slump_acpt_to, temp_from, temp_to, very_frequent, sample_counter, note', 'safe', 'on' => 'search'),
			);
		}
		
		public function getCatAlias()
		{
			return array
			(
				self::CAT_slump => Yii::t('en', 'Flow'),
				self::CAT_FLOW	=> Yii::t('en', 'slump')
			);
		}
		
		public function getMap()
		{
			$map = parent::getMap();
			
			$map['cols']['category']['values'] = $this->catAlias;
			
			return $map;
		}
		
		public function relations()
		{
			return array
			(
			);
		}
		
		public function attributeLabels()
		{
			return array
			(
				'id'			  => 'ID',
				'name'			  => 'Name',
				'category'		  => 'Category',
				'flow_norm_from'  => 'From',
				'flow_norm_to'	  => 'To',
				'flow_acpt_from'  => 'From',
				'flow_acpt_to'	  => 'To',
				'slump_norm_from' => 'From',
				'slump_norm_to'	  => 'To',
				'slump_acpt_from' => 'From',
				'slump_acpt_to'	  => 'To',
				'temp_from'		  => 'From',
				'temp_to'		  => 'To',
				'very_frequent'	  => 'Very Frequent',
				'sample_counter'  => 'Sample Counter',
				'note'			  => 'Note',
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id',			  $this->id);
			$criteria->compare('name',			  $this->name, true);
			$criteria->compare('category',		  $this->category, true);
			$criteria->compare('flow_norm_from',  $this->flow_norm_from);
			$criteria->compare('flow_norm_to',	  $this->flow_norm_to);
			$criteria->compare('flow_acpt_from',  $this->flow_acpt_from);
			$criteria->compare('flow_acpt_to',	  $this->flow_acpt_to);
			$criteria->compare('slump_norm_from', $this->slump_norm_from);
			$criteria->compare('slump_norm_to',	  $this->slump_norm_to);
			$criteria->compare('slump_acpt_from', $this->slump_acpt_from);
			$criteria->compare('slump_acpt_to',	  $this->slump_acpt_to);
			$criteria->compare('temp_from',		  $this->temp_from);
			$criteria->compare('temp_to',		  $this->temp_to);
			$criteria->compare('very_frequent',	  $this->very_frequent);
			$criteria->compare('sample_counter',  $this->sample_counter);
			$criteria->compare('note',			  $this->note, true);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>