<?php

class BsbController extends RESTful
{
    public function __construct()
    {
        $this->_model = Bsb::model();
    }
}

?>
