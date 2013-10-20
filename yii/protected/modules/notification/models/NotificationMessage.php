<?php
    class NotificationMessage extends CActiveRecord
    {
        public function tableName ()
        {
            return '{{notification_message}}';
        }

        public function rules ()
        {
            return array
            (
                array ('message, link, target, model, record_id, type', 'required'),
                array ('record_id, one_response, unregistered', 'numerical', 'integerOnly' => true),
                array ('model, type', 'length', 'max' => 255),
            );
        }

        public function relations ()
        {
            return array ();
        }

        public function attributeLabels ()
        {
            return array
            (
                'id' => 'ID',
                'message' => 'Message',
                'link' => 'Link',
                'target' => 'Target',
                'model' => 'Model',
                'record_id' => 'Record',
                'type' => 'Type',
                'one_response' => 'One Response',
                'unregistered' => 'Unregistered',
            );
        }

        public static function model ($className = __CLASS__)
        {
            return parent::model ($className);
        }
    }
?>