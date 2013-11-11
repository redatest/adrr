<?php

class IrController extends RESTful
{
    public function __construct()
    {
        $this->_model = Ir::model();
    }

    public function actionGetIr()
    {
        if (isset($_GET['ir'])) {

            $model = $this->_model->findByAttributes(array('ir' => $_GET['ir']));

            if ($model !== null) $this->_sendResponse(200, CJSON::encode($model));

        }

        $this->_sendResponse(404, 'Ir was not found');
    }
}

?>