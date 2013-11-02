<?php

class StatsController extends CController
{
    public function actionMenu()
    {
        $userId = Yii::app()->user->id;

        $inbox = 'archived = 0 AND returned = 0 AND approved = 0';

        $returned = 'archived = 0';

        if (Yii::app()->user->isSenior) {

            $returned .= ' AND approved = 1 AND returned = 0';

        } else {

            $returned .= ' AND approved = 0 AND returned = 1 AND user_id = ' . $userId;

            $inbox .= ' AND user_id = ' . $userId;
        }

        $labInbox = Lab::model()->count($inbox);

        $labReturned = Lab::model()->count($returned);

        $stats = array();

        $stats['lab'] = array('inbox' => $labInbox, 'returned' => $labReturned);

        echo CJSON::encode(array($stats));
    }
}

?>