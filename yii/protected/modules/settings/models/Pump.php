<?php
class Pump extends ArModel
{
    public function tableName()
    {
        return '{{pump}}';
    }

    public function rules()
    {
        return array
        (
            array('name', 'required'),
            array('state, very_frequent', 'numerical', 'integerOnly' => true),
            array('name', 'length', 'max' => 255)
        );
    }

    public function relations()
    {
        return array();
    }

    public function attributeLabels()
    {
        return array
        (
            'id' => 'ID',
            'name' => 'Name',
            'very_frequent' => 'Very Frequent',
            'state' => 'Active',
            'description' => 'Description'
        );
    }

    public function getMap($getList = false, $indexAttr = 'id')
    {
        $map = parent::getMap(true);

        unset($map['cols']['state']);

        return $map;
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}
