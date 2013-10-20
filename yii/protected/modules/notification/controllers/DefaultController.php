<?php
    class DefaultController extends CController
    {
        public function actionIndex ()
        {
//            self::register('fucklinks', 'here is the message', array('ids'=>array(1, 4, 900)), 'Lab', 600, 'Yellow', 1);
//            self::markAsRead('Lab', 10, 'Yellow');

            AdrrNotificationPump::register ('newlink', 'wow', array ('roles' => array('senior'), 'ids' => array(1, 2, 3)), 'Pouring', '1', 'red', true);
        }


    }
?>