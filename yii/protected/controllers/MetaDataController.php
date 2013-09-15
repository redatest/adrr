<?php
	class MetaDataController extends CController
	{
		public function actionIndex()
		{
			$models = array
			(
<<<<<<< HEAD
				Zone::model(),
				Pump::model(),
				Project::model(),
				Supplier::model(),
				ShiftType::model(),
				ShiftList::model(),
				PouringType::model(),
				ConcreteType::model()
=======
				ShiftType::model(),
				ShiftList::model(),
				ConcreteType::model(),
				PouringType::model(),
				Zone::model(),
				Pump::model(),
				Supplier::model()
>>>>>>> cbb2b8ac391e3f642f9bab8520d5cb8f9eeab910
			);
			
			foreach ($models as $model)
			{
				$data[$model->class] = $model->map;
			}
			
			echo CJSON::encode($data);
<<<<<<< HEAD
=======
			// var_dump($data['PouringType']);
>>>>>>> cbb2b8ac391e3f642f9bab8520d5cb8f9eeab910
		}
	}
?>