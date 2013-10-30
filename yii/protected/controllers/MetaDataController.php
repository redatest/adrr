<?php

class MetaDataController extends CController
{
    public function actionIndex()
    {
        $models = array
        (
            User::model(),

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
            LabTruck::model(),
            LabComment::model()
        );

        $data = array();

        foreach ($models as $model) {
            $data[$model->class] = $model->map;
        }

        echo CJSON::encode($data);
    }
}

?>