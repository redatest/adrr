<?php
	class MetaDataController extends CController
	{
		public function actionIndex()
		{
			$models = array
			(
				Zone::model(),
				Pump::model(),
				Project::model(),
				Supplier::model(),
				ShiftType::model(),
				ShiftList::model(),
				PouringType::model(),
				ConcreteType::model()
			);
			
			foreach ($models as $model)
			{
				$data[$model->class] = $model->map;
			}
			
			echo CJSON::encode($data);
		}
	}
?>