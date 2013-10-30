<?php
class ArModel extends CActiveRecord
{
    public function getMap($getList = false)
    {
        $columns = $this->metaData->columns;
        $labels = $this->attributeLabels();

        foreach ($columns as $column => &$val) {
            $val = (array)$val;
            $val['label'] = $labels[$column];
        }

        $map['cols'] = $columns;

        if ($getList) {

            $map['list'] = array();

            $list = $this->findAll();

            foreach ($list as $item) {
                $map['list'][$item->id] = $item;
            }
        }

        return $map;
    }

    public function getClass()
    {
        return get_class($this);
    }
}

?>