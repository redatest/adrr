<?php
class ArModel extends CActiveRecord
{
	public function getValuesConsideringRelations(){
		$values = array();
		foreach ($this->attributes as $attribute=>$value){
			$values[$attribute] = $value;
			if (preg_match("/_id$/",$attribute)){
				$relation = explode('_id',$attribute)[0];
				$snakeName = AdrrHelpers::_snakeToCamel($relation);
				$relation = lcfirst($snakeName);
				if (isset($this->relations()[$relation])){
					if (isset($this->$relation->name)){
						$values[$attribute] = $this->$relation->name;
					}
				}
				if($relation == 'user'){
					$values[$attribute] = $this->user->profile->name;
				}
			}
		}
		return $values;
	}
	public function getMap($getList = false, $indexAttr = 'id')
	{
		$columns = $this->metaData->columns;

		$labels = $this->attributeLabels();

		foreach ($columns as $column => &$val) {
			$val = (array)$val;
			$val['label'] = $labels[$column];
		}

		$map['cols'] = $columns;

		if ($getList) {

			$map['list'] = array();

			$list = $this->findAll();

			foreach ($list as $item) {

				if (isset($item->id)) {

					$map['list'][$item[$indexAttr]] = $item;

				} else {

					$map['list'][] = $item;

				}
			}
		}

		return $map;
	}

	public function getClass()
	{
		return get_class($this);
	}
}

?>