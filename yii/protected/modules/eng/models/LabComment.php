<?php
/**
 * @property mixed date_time
 */
class LabComment extends ArModel
{
		public function tableName()
		{
			return '{{lab_comment}}';
		}
		
		public function rules()
		{
			return array
			(
				array('lab_id, user_id, comment', 'required'),
				array('lab_id, user_id', 'numerical', 'integerOnly' => true)
			);
		}
		
		public function relations()
		{
			return array ();
		}
		
		public function attributeLabels()
		{
			return array
			(
				'id'	  => 'ID',
				'lab_id'  => 'Lab',
				'user_id' => 'User',
				'comment' => 'Comment',
                'date_time' => 'Date & Time'
            );
		}

    public function save($runValidation = true, $attributes = null)
    {
        date_default_timezone_set('Asia/Riyadh');

        $this->date_time = date('Y:m:d H:i:s');

        return parent::save($runValidation, $attributes);
    }

    public static function model ($className = __CLASS__)
		{
			return parent::model($className);
		}
	}
?>