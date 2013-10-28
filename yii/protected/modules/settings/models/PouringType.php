<?php
class PouringType extends ArModel
{
    const VR_HOR = 'hor';
    const VR_VER = 'ver';

    const PRIORITY_NOR = 'normal';
    const PRIORITY_MID = 'medium';
    const PRIORITY_HIG = 'high';
    const PRIORITY_URG = 'urgent';

    public function tableName()
    {
        return '{{pouring_type}}';
    }

    public function rules()
    {
        return array
        (
            array('name, v_r, priority', 'required'),
            array('state, very_frequent', 'numerical', 'integerOnly' => true),
            array('name', 'length', 'max' => 255)
        );
    }

    public function getVrAlias()
    {
        return array
        (
            self::VR_HOR => Yii::t('en', 'Horizontal'),
            self::VR_VER => Yii::t('en', 'Vertical')
        );
    }

    public function getPriorityAlias()
    {
        return array
        (
            self::PRIORITY_NOR => Yii::t('en', 'Normal'),
            self::PRIORITY_MID => Yii::t('en', 'Medium'),
            self::PRIORITY_HIG => Yii::t('en', 'High'),
            self::PRIORITY_URG => Yii::t('en', 'Urgent')
        );
    }

    public function getMap($getList = false)
    {
        $map = parent::getMap(true);

        unset($map['cols']['state']);

        $map['cols']['v_r']['values'] = $this->vrAlias;
        $map['cols']['priority']['values'] = $this->priorityAlias;

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
            'very_frequent' => 'Very Frequent',
            'state' => 'Active',
            'v_r' => 'V/R',
            'priority' => 'Priority'
        );
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>