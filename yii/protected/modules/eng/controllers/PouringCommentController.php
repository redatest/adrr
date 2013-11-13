<?php
class PouringCommentController extends RESTful
{
    public function __construct()
    {
        $this->_model = PouringComment::model();
    }
}

?>