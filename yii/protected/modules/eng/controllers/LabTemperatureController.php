<?php

class LabTemperatureController extends RESTful
{
    public function __construct()
    {
        $this->_model = LabTemperature::model();
    }
}

?>