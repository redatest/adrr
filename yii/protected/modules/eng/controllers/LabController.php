<?php
class LabController extends RESTful
{
    public function __construct()
    {
        $this->_model = Lab::model();
    }

    public function actionTodayRecords()
    {
        date_default_timezone_set('Asia/Riyadh');

        $date = date('Y-m-d');

        $criteria = new CDbCriteria();
        $criteria->condition = "date = '" . $date . "' and user_id=" . Yii::app()->user->id;

        $this->_sendResponse(200, CJSON::encode($this->_model->findAll($criteria)));
    }

    public function actionNumTodayRecords()
    {
        date_default_timezone_set('Asia/Riyadh');

        $date = date('Y-m-d');

        $result['numRows'] = $this->_model->count("date = '" . $date . "' and user_id=" . Yii::app()->user->id);

        $this->_sendResponse(200, CJSON::encode($result));
    }

    public function actionUnarchived()
    {
        $condition = 'archived = 0';

        if (isset($_GET['trucker'])) {
//                var_dump($_GET['trucker']);die;
            $condition .= ' AND t.update > "' . $_GET['trucker'] . '"';
//                var_dump($condition);die;
        }

        $criteria = new CDbCriteria();
        $criteria->condition = $condition;

        $this->_sendResponse(200, CJSON::encode($this->_model->findAll($criteria)));
    }
}

?>