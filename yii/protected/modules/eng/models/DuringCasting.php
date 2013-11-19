<?php

/**
 * @property mixed isNewRecord
 * @property mixed user_id
 */
class DuringCasting extends ArModel
{
    public function tableName()
    {
        return '{{during_casting}}';
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

            'location' => 'State',
            'location_cmt' => 'Comment',
            'precaution' => 'State',
            'precaution_cmt' => 'Comment',
            'formwork' => 'State',
            'formwork_cmt' => 'Comment',
            'contractor' => 'State',
            'contractor_cmt' => 'Comment',
            'consultant' => 'State',
            'consultant_cmt' => 'Comment',
            'drop_height' => 'State',
            'drop_height_cmt' => 'Comment',
            'vibration' => 'State',
            'vibration_cmt' => 'Comment',
            'finishing' => 'State',
            'finishing_cmt' => 'Comment',
            'curing' => 'State',
            'curing_cmt' => 'Comment',
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