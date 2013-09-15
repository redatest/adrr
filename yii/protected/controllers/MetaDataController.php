<?php
	class MetaDataController extends CController
	{
		public function actionIndex()
		{
			$models = array
			(
				ShiftType::model(),
				ShiftList::model(),
				ConcreteType::model(),
				PouringType::model(),
				Zone::model(),
				Pump::model(),
				Supplier::model()
			);
			
			foreach ($models as $model)
			{
				$data[$model->class] = $model->map;
			}
			
			echo CJSON::encode($data);
			// var_dump($data['PouringType']);
		}
	}
?>