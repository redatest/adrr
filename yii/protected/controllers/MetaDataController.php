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
            LabComment::model(),
            LabTemperature::model()
        );

        $data = array();

        foreach ($models as $model) {

            $data[$model->class] = $model->map;

        }

        $labArchive = Lab::model()->count('archived = 1 AND approved = 0 AND returned = 0' . (Yii::app()->user->isSenior ? '' : ' AND user_id = ' . Yii::app()->user->id));
        $pouringArchive = Pouring::model()->count('archived = 1 AND approved = 0 AND returned = 0' . (Yii::app()->user->isSenior ? '' : ' AND user_id = ' . Yii::app()->user->id));

        $data['Gen'] = array
        (
            'stat' => array
            (
                'labArchive' => $labArchive,
                'pouringArchive' => $pouringArchive
            )
        );

        echo CJSON::encode($data);
    }
}

?>