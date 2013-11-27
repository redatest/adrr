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

            if ($model !== null) {

                $data = array();
                $data['model'] = $model;
                $data['pts'] = $model->pouringTypes;
                $data['als'] = $model->als;

                $this->_sendResponse(200, $data,'json');
            }

        }

        $this->_sendResponse(404, 'Ir was not found');
    }
}

?>