<?php
/**
 * @property mixed date_time
 */
class PouringComment extends ArModel
{
    public function tableName()
    {
        return '{{pouring_comment}}';
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
            'pouring_id' => 'Pouring',
            'user_id' => 'User',
            'comment' => 'Comment',
            'date_time' => 'Date & Time'
        );
    }

    protected function beforeSave()
    {
        $this->user_id = Yii::app()->user->id;

        return parent::beforeSave();
    }

    public function save($runValidation = true, $attributes = null)
    {
        date_default_timezone_set('Asia/Riyadh');

        $this->date_time = date('Y:m:d H:i:s');

        return parent::save($runValidation, $attributes);
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>