<?php
class Zone extends ArModel
{
    public function tableName()
    {
        return '{{zone}}';
    }

    public function rules()
    {
        return array
        (
            array('name, very_frequent', 'required'),
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
            'state' => 'Active',
            'very_frequent' => 'Very Frequent',
            'description' => 'Description',
        );
    }

    public function getMap($getList = true)
    {
        $map = parent::getMap();

        unset($map['cols']['state']);

        return $map;
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>