<?php

class AdrrUserController extends RESTful
{
    public function __construct()
    {
        $this->_model = User::model();
    }

    public function actionIndex()
    {
        $models = Yii::app()->db->createCommand()
            ->select('u.id, u.username, u.email, p.name, p.last_name, p.emp_num, p.role, p.shift_type_id, p.mobile, p.bravo')
            ->from('tbl_users u')
            ->join('tbl_profiles p', 'u.id = p.user_id')
            ->where('u.status = 1')
            ->queryAll();

        $this->_sendResponse(200, $models,'json');
    }

    public function actionView()
    {
        $model = Yii::app()->db->createCommand()
            ->select('u.id, u.username, u.email, p.name, p.last_name, p.emp_num, p.role, p.shift_type_id, p.mobile, p.bravo')
            ->from('tbl_users u')
            ->join('tbl_profiles p', 'u.id = p.user_id')
            ->where('u.status = 1 AND u.id = ' . $_GET['id'])
            ->queryRow();

        $this->_sendResponse(200, $model,'json');
    }

    public function actionCreate()
    {
        $json = file_get_contents('php://input');

        $put_vars = CJSON::decode($json, true);

        $transaction = Yii::app()->db->beginTransaction();

        try {
            $model = new User();
            $model->username = $put_vars['username'];
            $model->password = md5($put_vars['password']);
            $model->email = $put_vars['email'];
            $model->activkey = uniqid();
            $model->superuser = $put_vars['role'] === '3' ? 1 : 0;
            $model->status = 1;

            if ($model->save()) {

                $profile = new Profile();
                $profile->user_id = $model->id;
                $profile->emp_num = $put_vars['emp_num'];
                $profile->bravo = $put_vars['bravo'];
                $profile->role = $put_vars['role'];
                $profile->name = $put_vars['name'];
                if (isset($put_vars['last_name'])) $profile->last_name = $put_vars['last_name'];
                if (isset($put_vars['mobile'])) $profile->mobile = $put_vars['mobile'];
                if (isset($put_vars['shift_type_id'])) $profile->shift_type_id = $put_vars['shift_type_id'];

                if ($profile->save()) {

                    $transaction->commit();

                }
            }
        } catch (Exception $e) {

            $transaction->rollback();

        }
    }

    public function actionUpdate()
    {
        $json = file_get_contents('php://input');

        $put_vars = CJSON::decode($json, true);

        $transaction = Yii::app()->db->beginTransaction();

        try {
            $model = $this->_model->findByPk($put_vars['id']);
            $profile = $model->profile;

            $model->username = $put_vars['username'];
            $model->password = md5($put_vars['password']);
            $model->email = $put_vars['email'];
            $model->superuser = $put_vars['role'] === '3' ? 1 : 0;
            $model->status = 1;

            $profile->emp_num = $put_vars['emp_num'];
            $profile->role = $put_vars['role'];
            $profile->bravo = $put_vars['bravo'];
            $profile->name = $put_vars['name'];

            if (isset($put_vars['last_name'])) $profile->last_name = $put_vars['last_name'];
            if (isset($put_vars['mobile'])) $profile->mobile = $put_vars['mobile'];
            if (isset($put_vars['shift_type_id'])) $profile->shift_type_id = $put_vars['shift_type_id'];

            if ($model->validate() && $profile->validate()) {

                if ($model->save() && $profile->save()) {

                    $transaction->commit();

                }

            }
        } catch (Exception $e) {

            $transaction->rollback();

        }
    }

    public function actionGetNo()
    {
        if (isset($_GET['emp_num'])) {

            $model = Profile::model()->find(array('condition' => 'emp_num = ' . $_GET['emp_num'] . (isset($_GET['id']) ? (' AND user_id != ' . $_GET['id']) : '')));

            if ($model !== null) $this->_sendResponse(200, $model,'json');
        }

        $this->_sendResponse(404, 'This no can be taken');
    }

    public function actionGetUsername()
    {
        if (isset($_GET['username'])) {

            $model = $this->_model->find(array('condition' => 'username = "' . $_GET['username'] . (isset($_GET['id']) ? ('" AND id != ' . $_GET['id']) : '')));

            if ($model !== null) $this->_sendResponse(200, $model,'json');
        }

        $this->_sendResponse(404, 'This username can be taken');
    }

    public function actionGetEmail()
    {
        if (isset($_GET['email'])) {

            $model = $this->_model->find(array('condition' => 'email = "' . $_GET['email'] . (isset($_GET['id']) ? ('" AND id != ' . $_GET['id']) : '')));

            if ($model !== null) $this->_sendResponse(200, $model,'json');
        }

        $this->_sendResponse(404, 'This email can be taken');
    }
}

?>