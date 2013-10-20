<?php
    class DefaultController extends CController
    {
        public function actionIndex ()
        {
//            self::register('fucklinks', 'here is the message', array('ids'=>array(1, 4, 900)), 'Lab', 600, 'Yellow', 1);
            self::markAsRead('Lab', 10, 'Yellow');
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

        public static function markAsRead ($model, $recordId, $type = null)
        {
            $cond = array('model' => $model, 'record_id' => $recordId, 'unregistered' => 0);

            if (isset($type)) $cond['type'] = $type;

            $nms = NotificationMessage::model()->findAllByAttributes($cond);

            if ($nms !== null)
            {
                foreach ($nms as $nm)
                {
                    if ($nm->one_response)
                    {
                        $nm->read = 1;
                        $nm->save();
                    }
                    else
                    {
                        $n = $nm->unread;
                        $n->read = 1;
                        $n->save();
                    }
                }
            }
        }

        public static function getNotifications ()
        {
            $criteria = new CDbCriteria();
            $criteria->join = 'INNER JOIN tbl_notification_message as nm on nm.id = t.message_id';
            $criteria->addCondition('t.read = 0 AND nm.unregistered = 0 AND nm.read = 0');

            return Notification::model ()->findAll ($criteria);
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
            $notMes->one_response = intval($oneResponse);
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