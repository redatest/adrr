<?php

class AuthController extends CController
{
    public function actionLogin()
    {
        if (Yii::app()->user->isGuest) {

            $model = new UserLogin;

            if (isset($_POST['username']) && isset($_POST['password'])) {

                $model->username = $_POST['username'];
                $model->password = $_POST['password'];

                if ($model->validate()) {

                    $user = User::model()->notsafe()->findByPk(Yii::app()->user->id);

                    $user->lastvisit = time();

                    $user->save();
                }
            }
        }

        $profile = Profile::model()->findByAttributes(array('user_id' => Yii::app()->user->id));

        if ($profile === null) throw new CHttpException(403, 'You could not login.');

        echo CJSON::encode($profile);
    }

    public function actionLogout()
    {
        Yii::app()->user->logout();
    }
}

?>