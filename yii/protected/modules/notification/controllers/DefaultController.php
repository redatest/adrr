<?php
    class DefaultController extends CController
    {
        public function actionIndex ()
        {
            self::unregister ('Lab', 20);
        }

        public static function unregister ($model, $recordId)
        {
            $not = NotificationMessage::model()->findByAttributes(array ('model' => $model, 'record_id' => $recordId));

            if ($not !== null)
            {
                $not->unregistered = 1;

                if (!$not->save ()) throw new CHttpException (': Something went wrong with database.');
            }
            else
            {
                throw new CHttpException (': You do not have have such notification message.');
            }
        }

        public static function getNotifications ()
        {
            return Notification::model()->findAll();
        }

        public static function register ($link, $message, $target, $model, $recordId, $type, $oneResponse)
        {
            $usersIds = array ();

            if (isset ($target['roles']))
            {
                foreach ($target['roles'] as $role)
                {
                    $roleIds = Yii::app()->user->getUsersByRole ($role);

                    $usersIds = array_merge ($usersIds, $roleIds);
                }
            }

            if (isset ($target['ids']))
            {
                $usersIds = array_merge ($usersIds, $target['ids']);
            }

            $usersIds = array_unique ($usersIds);

            //----------------------------------------------------------------------------------------

            $ts = Yii::app()->db->beginTransaction ();

            $notMes               = new NotificationMessage ();
            $notMes->link         = $link;
            $notMes->message      = $message;
            $notMes->model        = $model;
            $notMes->record_id    = $recordId;
            $notMes->type         = $type;
            $notMes->one_response = $oneResponse;
            $notMes->target       = CJSON::encode ($target);

            try
            {
                $notMes->save ();

                foreach ($usersIds as $userId)
                {
                    $not             = new Notification ();
                    $not->message_id = $notMes->id;
                    $not->user_id    = $userId;
                    $not->save ();
                }

                $ts->commit ();
            }
            catch (Exception $e)
            {
                $ts->rollback ();

                throw $e;
            }
        }
    }
?>