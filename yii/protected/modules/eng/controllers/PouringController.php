<?php
class PouringController extends RESTful
{
    public function __construct()
    {
        $this->_model = Pouring::model();
    }

    protected function filterCondition()
    {
        $condition = '';

        foreach ($_POST as $name => $param) {

            if ($name !== 'updateTrucker' && $name !== 'trucker') {

                if (is_array($param)) {

                    $condition .= ' AND ' . $name . ' BETWEEN "' . $param[0] . '" AND "' . $param[1] . '"';

                } else {

                    if (preg_match('/^\d{2}:\d{2}:\d{2}$/', $param)) {

                        $condition .= ' AND ' . $name . '>="' . (strtotime($param) - strtotime('00:00:00')) . '"';

                    } else {

                        $condition .= ' AND ' . $name . '="' . $param . '"';

                    }

                }
            } elseif ($name == 'trucker') {

                $condition .= ' AND t.update > "' . $_POST['trucker'] . '"';

            }
        }

        return $condition;
    }

    public function actionGetUnarchived()
    {
        $condition = 'archived = 0 AND returned = 0 AND approved = 0 AND draft = 0';

        $condition .= $this->filterCondition();

        if (!Yii::app()->user->role == 3) $condition .= ' AND t.user_id = ' . Yii::app()->user->id;

        $criteria = new CDbCriteria();
        $criteria->condition = $condition;

        $this->_sendResponse(200, $this->_model->findAll($criteria), 'json');
    }

    public function actionGetDrafts()
    {
        $condition = 'archived = 0 AND returned = 0 AND approved = 0 AND draft = 1';

        $condition .= $this->filterCondition();

        if (!Yii::app()->user->role == 3) $condition .= ' AND t.user_id = ' . Yii::app()->user->id;

        $criteria = new CDbCriteria();
        $criteria->condition = $condition;

        $this->_sendResponse(200, $this->_model->findAll($criteria), 'json');
    }

    public function actionGetArchived()
    {
        $condition = 'archived = 1 AND returned = 0 AND approved = 0 AND draft = 0';

        $condition .= $this->filterCondition();

        $criteria = new CDbCriteria();
        $criteria->condition = $condition;

        $this->_sendResponse(200, $this->_model->findAll($criteria), 'json');
    }

    public function actionGetReturned()
    {
        $condition = 'archived = 0';

        if (Yii::app()->user->role == 3) $condition .= ' AND returned = 0 AND approved = 1';
        else $condition .= ' AND returned = 1 AND draft = 0 AND approved = 0 AND user_id = ' . Yii::app()->user->id;

        $condition .= $this->filterCondition();

        $criteria = new CDbCriteria();
        $criteria->condition = $condition;

        $this->_sendResponse(200, $this->_model->findAll($criteria), 'json');
    }

    public function actionArchive()
    {
        $json = file_get_contents('php://input');

        $put_vars = CJSON::decode($json, true);

        if ($put_vars !== null) {

            $back = array();

            foreach ($put_vars['toArchive'] as $id) {

                $model = $this->_model->findByPk($id);

                if ($model !== null) {

                    $model->archived = 1;
                    $model->returned = 0;
                    $model->approved = 0;

                    if ($model->save()) $back[] = $model->id;
                }
            }

            $this->_sendResponse(200, $back, 'json');
        }

        if (isset($_GET['id'])) {

            $model = $this->_model->findByPk($_GET['id']);

            if ($model !== null) {

                $model->archived = 1;
                $model->returned = 0;
                $model->approved = 0;

                if ($model->save()) die;
            }
        }

        throw new CHttpException(404, 'Could not archive this record');
    }

    public function actionReturn()
    {
        if (isset($_GET['id'])) {

            $model = $this->_model->findByPk($_GET['id']);

            if ($model !== null) {

                if (Yii::app()->user->role == 3) {

                    $model->returned = 1;
                    $model->approved = 0;

                } else {

                    $model->returned = 0;
                    $model->approved = 1;

                }

                if ($model->save()) die;
            }
        }

        throw new CHttpException(404, 'Could not return this record');
    }

    public function actionGetTicket()
    {
        if (isset($_GET['ticket']) && isset($_GET['supplier'])) {

            $model = $this->_model->findByAttributes(array('ticket' => $_GET['ticket'], 'supplier_id' => $_GET['supplier']));

            if ($model !== null) $this->_sendResponse(200, $model, 'json');

        }

        $this->_sendResponse(404, 'Ticket was not found');
    }

    public function actionGetPouredQTY()
    {
        error_reporting(E_ALL);

        ini_set('display_errors', 1);

        if (isset($_GET['ticket']) && isset($_GET['supplier_id'])) {

            $models = $this->_model->findAllByAttributes(array('supplier_id' => $_GET['supplier_id'], 'ticket' => $_GET['ticket']));

            $stat = array();

            $stat['total'] = count($models) ? $models[0]->truck_load : 0;
            $stat['used'] = 0;

            foreach ($models as $model) {

                $stat['used'] = intval($stat['used']) + intval($model['poured_qty']);

            }

            echo CJSON::encode($stat);

        }
    }

    public function actionGetIr()
    {

        if (isset($_GET['ir'])) {

            $model = $this->_model->findByAttributes(array('ir' => $_GET['ir']), array('order' => 'id DESC'));

            if ($model !== null) $this->_sendResponse(200, $model, 'json');

            $this->_sendResponse(404, 'No records were found.');

        }

    }
}

?>