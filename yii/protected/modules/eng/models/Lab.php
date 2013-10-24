<?php

/**
 * @property mixed create_time
 * @property mixed user_id
 * @property mixed red
 * @property mixed id
 * @property mixed yellow
 */
class Lab extends ArModel
{
    public function tableName()
    {
        return '{{lab}}';
    }

    public function relations()
    {
        return array
        (
            'comments' => array(self::HAS_MANY, 'LabComment', 'lab_id')
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
            'conc_type_id' => 'Conc Type',
            'plant' => 'Plant',
            'truck' => 'Truck',
            'ticket' => 'Ticket',
            'dept_time' => 'Departure Time',
            'arriv_time' => 'Arrival Time',
            'truck_load' => 'Truck Load',
            'temp' => 'Temperature',
            'slump' => 'Slump',
            'flow' => 'Flow',
            'accepted' => 'Accepted',
            'red' => 'Red Alert',
            'yellow' => 'Yellow Alert',
            'create_time' => 'Create Time',
            'returned' => 'Returend',
            'approved' => 'Approved',
            'archived' => 'Archived'
        );
    }

    public function getMap()
    {
        $map = parent::getMap();

        unset($map['cols']['create_time']);

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

    protected function afterSave()
    {
        if ($this->red !== null) {

            AdrrNotificationPump::register('the link goes here', '@Lab in ' . $this->red, array('roles' => array('senior')), 'Lab', $this->id, 'red', true);

        } else if ($this->yellow !== null) {

            AdrrNotificationPump::register('the link goes here', '@Lab in ' . $this->yellow, array('roles' => array('senior')), 'Lab', $this->id, 'yellow', true);

        }
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>