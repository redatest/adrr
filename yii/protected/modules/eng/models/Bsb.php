<?php

/**
 * @property mixed isNewRecord
 * @property mixed user_id
 */
class Bsb extends ArModel
{
    public function tableName()
    {
        return '{{bsb}}';
    }

    public function relations()
    {
        return array
        ();
    }

    public function attributeLabels()
    {
        return array
        (
            'id' => 'ID',
            'user_id' => 'User ID',
            'date' => 'Date',
            'concrete_class' => 'Concrete Class',
            'start_time' => 'Start',
            'end_time' => 'End',
            'num_set' => 'Num set',
            'num_cylinders' => 'num cylinders',
            'remark' => 'Remark'

        );
    }

    protected function beforeSave()
    {
        if ($this->isNewRecord) {

            $this->user_id = Yii::app()->user->id;
        }

        return true;
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>
