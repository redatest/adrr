<?php
/**
 * Created by PhpStorm.
 * User: Aladdin
 * Date: 11/24/13
 * Time: 12:12 PM
 */

class AdrrController extends CController{
	protected function _sendXlsxResponse(){
		$content_type_header = Yii::app()->params['content_types']['xlsx'];

		$mimeType = array(
			'Content-type'=>$content_type_header,
			'extension'=>'xlsx'
		);
		$libPath = 'ext.phpexcel.PHPExcel'; //the path to the PHP excel lib

		spl_autoload_unregister(array('YiiBase','autoload'));
		Yii::import($libPath, true);
		$objPHPExcel = new PHPExcel();
		spl_autoload_register(array('YiiBase','autoload'));

		$objPHPExcel->getProperties()->setCreator('0000000');
		$objPHPExcel->getProperties()->setTitle('ooooooooooo');
		$objPHPExcel->getProperties()->setSubject('ssssssssssss');
		$objPHPExcel->getProperties()->setDescription('mmmmmmmmm');
		$objPHPExcel->getProperties()->setCategory('aaaaaaaaaa');
		$objPHPExcel->getActiveSheet()->setCellValue('A1','Aladdin Mhaimeed');
		$objPHPExcel->getActiveSheet()->setCellValue('A2','Reda Mouhammad');
		// add the content to the excel file



		// after finishing adding and editing content to excel file, we create a writer object to send the generated file
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$this->cleanOutput();
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		header('Content-type: '.$mimeType['Content-type']);
		header('Content-Disposition: attachment; filename="'.'oioio'.'.'.$mimeType['extension'].'"');
		header('Cache-Control: max-age=0');
		$objWriter->save('php://output');
		ob_start();
		Yii::app()->end();
		ob_end_clean();


	}
	private static function cleanOutput()
	{
		for($level=ob_get_level();$level>0;--$level)
		{
			@ob_end_clean();
		}
	}
} 