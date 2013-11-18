<?php
class ConcreteType extends ArModel
{
    const CAT_slump = 'flow';
    const CAT_FLOW = 'slump';

    public function tableName()
    {
        return '{{concrete_type}}';
    }

    public function getCatAlias()
    {
        return array
        (
            self::CAT_slump => Yii::t('en', 'Flow'),
            self::CAT_FLOW => Yii::t('en', 'slump')
        );
    }

    public function getMap($getList = false, $indexAttr = 'id')
    {
        $map = parent::getMap(true);

        $map['cols']['category']['values'] = $this->catAlias;

        return $map;
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
            'category' => 'Category',
            'flow_norm_from' => 'From',
            'flow_norm_to' => 'To',
            'flow_acpt_from' => 'From',
            'flow_acpt_to' => 'To',
            'slump_norm_from' => 'From',
            'slump_norm_to' => 'To',
            'slump_acpt_from' => 'From',
            'slump_acpt_to' => 'To',
            'temp_from' => 'From',
            'temp_to' => 'To',
            'dept_start' => 'Dept to start',
            'dept_end' => 'Dept to end',
            'very_frequent' => 'Very Frequent',
            'sample_counter' => 'Sample Counter',
            'note' => 'Note'
        );
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>