<?php

/**
 * @property mixed isNewRecord
 * @property mixed user_id
 */
class BeforeCasting extends ArModel
{
    public function tableName()
    {
        return '{{before_casting}}';
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

            'lre' => 'State',
            'lre_comment' => 'Comment',
            'cte' => 'State',
            'cte_comment' => 'Comment',
            'lte' => 'State',
            'lte_comment' => 'Comment',
            'cpp' => 'State',
            'cpp_comment' => 'Comment',
            'frs' => 'State',
            'frs_comment' => 'Comment',
            'cdd' => 'State',
            'cdd_comment' => 'Comment',
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