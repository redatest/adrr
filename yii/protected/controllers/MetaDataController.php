<?php
	class MetaDataController extends CController
	{
		public function actionIndex()
		{
			$models = array
			(
				Ir::model(),
				IrAl::model(),
				IrPt::model(),
				Zone::model(),
				Pump::model(),
				Project::model(),
				Supplier::model(),
				ShiftType::model(),
				ShiftList::model(),
				PouringType::model(),
				ConcreteType::model(),
				
				Lab::model(),
				LabPlant::model(),
				LabTruck::model()
			);
			
			foreach ($models as $model)
			{
				$data[$model->class] = $model->map;
			}
			
			echo CJSON::encode($data);
		}
	}
?>