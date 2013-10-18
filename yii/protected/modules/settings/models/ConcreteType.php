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
				array('note', 'safe')
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
			return array ();
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
				'note'			  => 'Note'
			);
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>