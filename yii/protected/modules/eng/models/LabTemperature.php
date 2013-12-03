<?php

/**
 * @property mixed date_time
 * @property mixed shift_type_id
 * @property  user_id
 */
class LabTemperature extends ArModel
{
	public function tableName()
	{
		return '{{lab_temperature}}';
	}

	public function rules()
	{
		return array
		(
			array('time, temp', 'required'),
		);
	}

	public function relations()
	{
		return array(
			'user' => array(self::BELONGS_TO, 'User', 'user_id'),
			'shiftType' => array(self::BELONGS_TO,'ShiftType','shift_type_id')
		);
	}

	public function attributeLabels()
	{
		return array
		(
			'id' => 'ID',
			'user_id' => 'User',
			'shift_type_id' => 'Shift Type',
			'date_time' => 'Date Time',
			'time' => 'Time',
			'temp' => 'temp'
		);
	}

	public function save($runValidation = true, $attributes = null)
	{
		date_default_timezone_set('Asia/Riyadh');

		$this->date_time = date('Y:m:d H:i:s');

		$userId = Yii::app()->user->id;

		$profile = Profile::model()->findByAttributes(array('user_id' => $userId));

		$this->user_id = $userId;
		$this->shift_type_id = $profile->shift_type_id;

		return parent::save($runValidation, $attributes);
	}

	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}
}

?>