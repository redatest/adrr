<?php
	class ArModel extends CActiveRecord
	{

		public static function getNotifications(){
			echo 'mmmmmmmmmmmmmmmmm';
		}
		public function getMap()
		{
			$columns = $this->metaData->columns;
			$labels	 = $this->attributeLabels();
			
			foreach ($columns as $column => &$val)
			{
				$val = (array) $val;
				$val['label'] = $labels[$column];
			}
			
			$map['cols'] = $columns;
			
			return $map;
		}
		
		public function getClass()
		{
			return get_class($this);
		}
	}
?>