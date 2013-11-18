<?php
class Ir extends ArModel
{
    public function tableName()
    {
        return '{{ir}}';
    }

    public function rules()
    {
        return array
        (
            array('ir, zone_id, area, volume', 'required'),
            array('ir, zone_id, volume, project_id', 'numerical', 'integerOnly' => true),
            array('area', 'length', 'max' => 255)
        );
    }

    public function relations()
    {
        return array
        (
            'als' => array(self::HAS_MANY, 'IrAl', 'ir_id'),
            'pouringTypes' => array(self::HAS_MANY, 'IrPt', 'ir_id')
        );
    }

    public function attributeLabels()
    {
        return array
        (
            'id' => 'ID',
            'ir' => 'IR',
            'zone_id' => 'Zone',
            'area' => 'Area',
            'volume' => 'Estimated Volume',
            'project_id' => 'Project'
        );
    }

    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}

?>