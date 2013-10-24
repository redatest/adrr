<?php

class NotificationsController extends CController
{

    public function actionIndex()
    {
        $model = isset($_REQUEST['model']) ? $_REQUEST['model'] : null;
        $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : null;
        $last = isset($_REQUEST['trucker']) ? $_REQUEST['trucker'] : null;

        $nots = AdrrNotificationPump::getNotifications($model, $type, $last);

        echo CJSON::encode($nots);
    }

    public function actionRegisterNotification()
    {
//        AdrrNotificationPump::register('wow', 'lab', array('roles' => array('senior')), 'pouring', 2, 'red', true);

//        var_dump('yii/api/eng/lab', );
    }

}

?>