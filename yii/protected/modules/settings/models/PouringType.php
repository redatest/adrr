<?php
	class PouringType extends ArModel
	{
		const VR_HOR = 'hor';
		const VR_VER = 'ver';
		
		const PRIORITY_NOR = 'normal';
		const PRIORITY_MID = 'medium';
		
		public function tableName()
		{
			return '{{pouring_type}}';
		}
		
		public function rules()
		{
			return array
			(
				array('name, state, v_r, priority', 'required'),
				array('state', 'numerical', 'integerOnly' => true),
				array('name', 'length', 'max' => 255),
				array('id, name, state, v_r, priority', 'safe', 'on' => 'search'),
			);
		}
		
		public function getVrAlias()
		{
			return array
			(
				self::VR_HOR => Yii::t('en', 'Horizontal'),
				self::VR_VER => Yii::t('en', 'Vertical')
			);
		}
		
		public function getPriorityAlias()
		{
			return array
			(
				self::PRIORITY_NOR => Yii::t('en', 'Normal'),
				self::PRIORITY_MID => Yii::t('en', 'Medium')
			);
		}
		
		public function getMap()
		{
			$map = parent::getMap();
			
			$map['cols']['v_r']['values'] = $this->vrAlias;
			$map['cols']['priority']['values'] = $this->priorityAlias;
			
			return $map;
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
				'name' => 'Name',
				'state' => 'Active',
				'v_r' => 'V/R',
				'priority' => 'Priority'
			);
		}
		
		public function search()
		{
			$criteria = new CDbCriteria;

			$criteria->compare('id', $this->id);
			$criteria->compare('name', $this->name, true);
			$criteria->compare('state', $this->state);
			$criteria->compare('state', $this->v_r, true);
			$criteria->compare('state', $this->priority, true);

			return new CActiveDataProvider($this, array('criteria' => $criteria));
		}
		
		public static function model($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>