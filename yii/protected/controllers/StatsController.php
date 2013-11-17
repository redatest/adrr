<?php

class StatsController extends CController
{
    public function actionMenu()
    {
        $userId = Yii::app()->user->id;

        $inbox = 'archived = 0 AND returned = 0 AND approved = 0';

        $draft = $inbox . ' AND draft = 1';

        $returned = 'archived = 0';

        if (Yii::app()->user->role === 3) {

            $returned .= ' AND approved = 1 AND returned = 0';

        } else {

            $returned .= ' AND approved = 0 AND returned = 1 AND user_id = ' . $userId;

            $inbox .= ' AND user_id = ' . $userId;
        }

        $labInbox = Lab::model()->count($inbox);

        $labReturned = Lab::model()->count($returned);

        $pouringInbox = Pouring::model()->count($inbox);

        $pouringReturned = Pouring::model()->count($returned);

        $pouringDrafts = Pouring::model()->count($draft);

        $stats = array();

        $stats['lab'] = array('inbox' => $labInbox, 'returned' => $labReturned);
        $stats['pouring'] = array('inbox' => $pouringInbox, 'returned' => $pouringReturned, 'drafts' => $pouringDrafts);

        echo CJSON::encode(array($stats));
    }
}

?>