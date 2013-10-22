<?php
class DefaultController extends CController
{
    public function actionIndex()
    {
        AdrrNotificationPump::unregister('Lab', 20);
    }
}

?>