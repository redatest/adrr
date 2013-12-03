<?php

class Pouring extends ArModel
{
    public function tableName()
    {
        return '{{pouring}}';
    }

    public function relations()
    {
        return array
        (
            'comments' => array(self::HAS_MANY, 'PouringComment', 'pouring_id')
        );
    }

    public function attributeLabels()
    {
        return array
        (
            'id' => 'ID',
            'user_id' => 'User ID',
            'date' => 'Date',
            'shift_id' => 'Shift',
            'supplier_id' => 'Supplier',
            'pouring_type_id' => 'Pouring Type',
            'ir' => 'IR',
            'zone_id' => 'Zone',
            'area' => 'Area',
            'axis' => 'Axis',
            'level' => 'Level',
            'est_vol' => 'Estimated Volume',
            'ticket' => 'Ticket',
            'truck' => 'Truck',
            'conc_type_id' => 'Concrete Type',
            'truck_load' => 'Truck Load',
            'poured_qty' => 'Poured QTY',
            'dept_time' => 'Departure Time',
            'slump_b' => 'Slump B',
            'hrwr' => 'HRWR',
            'water' => 'Water',
            'slump_a' => 'Slump A',
            'accepted' => 'Accepted',
            'pump_id' => 'Pump',
            'start_time' => 'Start Time',
            'end_time' => 'End Time',
            'red' => 'Red',
            'yellow' => 'Yellow',
            'returned' => 'Returned',
            'approved' => 'Approved',
            'archived' => 'Archived',
            'draft' => 'Draft',
            'create_time' => 'Create Time',
            'update' => 'Update',
            'dept_start' => 'Dept. to Start',
            'dept_end' => 'Dept. to End',
            'start_end' => 'Start to end'
        );
    }

    public function getMap($getList = false, $indexAttr = 'id')
    {
        $map = parent::getMap();

        unset($map['cols']['create_time']);
        unset($map['cols']['update']);
        unset($map['cols']['user_id']);

        return $map;
    }

    protected function beforeSave()
    {
        if ($this->isNewRecord) {

            date_default_timezone_set('Asia/Riyadh');

            $this->create_time = date('Y:m:d H:i:s');

            $this->user_id = Yii::app()->user->id;
        }

        return true;
    }

    public function save($runValidation = true, $attributes = null)
    {
        date_default_timezone_set('Asia/Riyadh');

        $this->update = date('Y:m:d H:i:s');

        if ($this->dept_time !== '' && $this->dept_time !== null) {

            $this->dept_start = ($this->start_time !== null && $this->start_time !== '') ? strtotime($this->start_time) - strtotime($this->dept_time) : 0;

            $this->dept_end = ($this->end_time !== null && $this->end_time !== '') ? strtotime($this->end_time) - strtotime($this->dept_time) : 0;

        }

        $this->start_end = ($this->end_time !== null && $this->end_time !== '' && $this->start_time !== null && $this->start_time !== '') ? strtotime($this->end_time) - strtotime($this->start_time) : 0;

        return parent::save($runValidation, $attributes);
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>