<?php
class Supplier extends ArModel
{
    public function tableName()
    {
        return '{{supplier}}';
    }

    public function rules()
    {
        return array
        (
            array('name, prefix, very_frequent', 'required'),
            array('state, very_frequent', 'numerical', 'integerOnly' => true),
            array('name, prefix', 'length', 'max' => 255)
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
            'prefix' => 'Prefix',
            'state' => 'Active',
            'very_frequent' => 'Very Frequent',
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
