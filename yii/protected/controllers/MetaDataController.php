<?php
	class MetaDataController extends CController
	{
		public function actionIndex()
		{
			$models = array
			(
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b
=======
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b
				Zone::model(),
				Pump::model(),
				Project::model(),
				Supplier::model(),
				ShiftType::model(),
				ShiftList::model(),
				PouringType::model(),
				ConcreteType::model()
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b
=======
				ShiftType::model(),
				ShiftList::model(),
				ConcreteType::model(),
				PouringType::model(),
				Zone::model(),
				Pump::model(),
				Supplier::model()
>>>>>>> cbb2b8ac391e3f642f9bab8520d5cb8f9eeab910
<<<<<<< HEAD
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b
=======
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b
			);
			
			foreach ($models as $model)
			{
				$data[$model->class] = $model->map;
			}
			
			echo CJSON::encode($data);
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
			// var_dump($data['PouringType']);
>>>>>>> cbb2b8ac391e3f642f9bab8520d5cb8f9eeab910
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b
=======
			// var_dump($data['PouringType']);
>>>>>>> cbb2b8ac391e3f642f9bab8520d5cb8f9eeab910
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b
		}
	}
?>