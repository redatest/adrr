<?php
class ShiftList extends ArModel
{
    public function tableName()
    {
        return '{{shift_list}}';
    }

    // public function rules()
    // {
    // return array
    // (
    // array('list, date, shift_id', 'required'),
    // array('time, shift_id, status', 'numerical', 'integerOnly' => true)
    // );
    // }

    public function relations()
    {
        return array();
    }

    public function getMap($getList = true, $indexAttr = 'id')
    {
        $map = parent::getMap(true, 'shift_id');

        unset($map['cols']['time']);
        unset($map['cols']['status']);

        return $map;
    }

    public function attributeLabels()
    {
        return array
        (
            'id' => 'ID',
            'list' => 'List',
            'date' => 'Date',
            'time' => 'Time',
            'shift_id' => 'Shift',
            'status' => 'Status',
        );
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>