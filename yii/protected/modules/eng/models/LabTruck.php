<?php
class LabTruck extends ArModel
{
    public function tableName()
    {
        return 'view_lab_truck';
    }

    public function rules()
    {
        return array
        (
            array('truck', 'required'),
            array('truck', 'numerical', 'integerOnly' => true)
        );
    }

    public function relations()
    {
        return array();
    }

    public function attributeLabels()
    {
        return array('truck' => 'Truck');
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function getMap($getList = false, $indexAttr = 'id')
    {
        return parent::getMap(true);
    }
}

?>