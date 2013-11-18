<?php
class LabPlant extends ArModel
{
    public function tableName()
    {
        return 'view_lab_plant';
    }

    public function rules()
    {
        return array
        (
            array('plant', 'required'),
            array('plant', 'numerical', 'integerOnly' => true)
        );
    }

    public function relations()
    {
        return array();
    }

    public function attributeLabels()
    {
        return array('plant' => 'Plant');
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