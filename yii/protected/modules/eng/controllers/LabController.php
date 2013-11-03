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

    public function actionGetUnarchived()
    {
        $condition = 'archived = 0 AND returned = 0 AND approved = 0';

        if (isset($_GET['trucker'])) {

            $condition .= ' AND t.update > "' . $_GET['trucker'] . '"';

        }

        if (!Yii::app()->user->isSenior) $condition .= ' AND t.user_id = ' . Yii::app()->user->id;

        $criteria = new CDbCriteria();
        $criteria->condition = $condition;

        $this->_sendResponse(200, CJSON::encode($this->_model->findAll($criteria)));
    }

    public function actionGetArchived()
    {
        $condition = 'archived = 1 AND returned = 0 AND approved = 0';

        if (isset($_GET['trucker'])) {

            $condition .= ' AND t.update > "' . $_GET['trucker'] . '"';

        }

//        if (!Yii::app()->user->isSenior) $condition .= ' AND t.user_id = ' . Yii::app()->user->id;

        $criteria = new CDbCriteria();
        $criteria->condition = $condition;

        $this->_sendResponse(200, CJSON::encode($this->_model->findAll($criteria)));
    }

    public function actionGetReturned()
    {
        $condition = 'archived = 0';

        if (isset($_GET['trucker'])) {

            $condition .= ' AND t.update > "' . $_GET['trucker'] . '"';

        }

        if (Yii::app()->user->isSenior) {

            $condition .= ' AND returned = 0 AND approved = 1';

        } else {

            $condition .= ' AND returned = 1 AND approved = 0 AND user_id = ' . Yii::app()->user->id;

        }

        $criteria = new CDbCriteria();
        $criteria->condition = $condition;

        $this->_sendResponse(200, CJSON::encode($this->_model->findAll($criteria)));
    }

    public function actionArchive()
    {
        if (isset($_GET['id'])) {

            $model = $this->_model->findByPk($_GET['id']);

            if ($model !== null) {

                $model->archived = 1;
                $model->returned = 0;
                $model->approved = 0;

                if ($model->save()) die;
            }
        }

        throw new CHttpException(400, 'Couldn\'t archive this record');
    }

    public function actionReturn()
    {
        if (isset($_GET['id'])) {

            $model = $this->_model->findByPk($_GET['id']);

            if ($model !== null) {

                if (Yii::app()->user->isSenior) {

                    $model->returned = 1;
                    $model->approved = 0;

                } else {

                    $model->returned = 0;
                    $model->approved = 1;

                }

                if ($model->save()) die;
            }
        }

        throw new CHttpException(400, 'Couldn\'t return this record');
    }
}

?>