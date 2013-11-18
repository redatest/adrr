<?php

class Notification extends CActiveRecord
{
    public function tableName()
    {
        return '{{notification}}';
    }

    public function defaultScope()
    {
        return array
        (
            'condition' => 'user_id = ' . Yii::app()->user->id
        );
    }

    public function rules()
    {
        return array
        (
            array('message_id, user_id', 'required'),
            array('message_id, user_id, read', 'numerical', 'integerOnly' => true),
        );
    }

    public function relations()
    {
        return array
        (
            'message' => array(self::BELONGS_TO, 'NotificationMessage', 'message_id')
        );
    }

    public function attributeLabels()
    {
        return array
        (
            'id' => 'ID',
            'message_id' => 'Message',
            'user_id' => 'User',
            'read' => 'Read',
        );
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>