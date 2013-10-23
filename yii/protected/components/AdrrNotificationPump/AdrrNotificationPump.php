<?php

class AdrrNotificationPump extends CComponent
{
    public static function unregister($model, $recordId)
    {
        $not = NotificationMessage::model()->findByAttributes(array('model' => $model, 'record_id' => $recordId));

        if ($not !== null) {

            $not->unregistered = 1;

            if (!$not->save()) throw new CHttpException (': Something went wrong with database.');

        } else {

            throw new CHttpException (': You do not have have such notification message.');

        }
    }

    public static function markAsRead($id)
    {
        $arrts = array('id' => $id, 'unregistered' => 0);

        $n = Notification::model()->findByAttributes($arrts);

        $nm = $n->message;

        if ($nm->one_response) {

            $nm->read = 1;

            $nm->save();

        } else {

            $n->read = 1;

            $n->save();

        }
    }

    public static function getNotifications($model = null, $type = null, $afterThis = null)
    {
        $condition = 't.read = 0 AND nm.unregistered = 0 AND nm.read = 0' . ($model !== null ? ' AND t.model="' . $model . '"' : '') . ($type !== null ? ' AND t.type="' . $type . '"' : '') . ($afterThis !== null ? ' AND t.id > ' . $afterThis : '');

        return Yii::app()->db->createCommand()
            ->select('t.id, nm.link, nm.type, nm.message')
            ->from('tbl_notification t')
            ->join('tbl_notification_message nm', 'nm.id = t.message_id')
            ->where($condition)
            ->queryAll();
    }

    public static function register($link, $message, $target, $model, $recordId, $type, $oneResponse)
    {
        $usersIds = array();

        if (isset ($target['roles'])) {
            foreach ($target['roles'] as $role) {
                $roleIds = Yii::app()->user->getUsersByRole($role);

                $usersIds = array_merge($usersIds, $roleIds);
            }
        }

        if (isset ($target['ids'])) {
            $usersIds = array_merge($usersIds, $target['ids']);
        }

        $usersIds = array_unique($usersIds);

        //----------------------------------------------------------------------------------------

        $ts = Yii::app()->db->beginTransaction();

        $notMes = new NotificationMessage ();
        $notMes->link = $link;
        $notMes->message = $message;
        $notMes->model = $model;
        $notMes->record_id = $recordId;
        $notMes->type = $type;
        $notMes->one_response = intval($oneResponse);
        $notMes->target = CJSON::encode($target);

        try {
            $notMes->save();

            foreach ($usersIds as $userId) {
                $not = new Notification ();
                $not->message_id = $notMes->id;
                $not->user_id = $userId;
                $not->save();
            }

            $ts->commit();

        } catch (Exception $e) {

            $ts->rollback();

            throw $e;
        }
    }
}

?>