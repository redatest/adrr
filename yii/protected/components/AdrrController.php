<?php
/**
 * Created by PhpStorm.
 * User: Aladdin
 * Date: 11/24/13
 * Time: 12:12 PM
 */

class AdrrController extends CController{
	protected $_model;
	private $libPath  = 'ext.phpexcel.PHPExcel';


	protected function _sendXlsxResponse($content){
		$this->_sendUsingPHPExcel($content,'xlsx');
	}
	protected function _sendPdfResponse($content){
		$rendererName = 'tcPDF';
		$rendererLibraryPath = dirname(__FILE__).'/../extensions/phpexcel/PHPExcel/Writer/PDF/tcpdf';
		spl_autoload_unregister(array('YiiBase', 'autoload'));
		Yii::import($this->libPath, true);
		if (!PHPExcel_Settings::setPdfRenderer(
			$rendererName,
			$rendererLibraryPath
		)) {
			die(
				'Please set the $rendererName and $rendererLibraryPath values' .
				PHP_EOL .
				' as appropriate for your directory structure'
			);
		}
		spl_autoload_register(array('YiiBase', 'autoload'));
		$this->_sendUsingPHPExcel($content,'pdf');
	}

	private function drawHeader($objPHPExcel,$labels){
		$row = 1;
		$col = 0; //excel column number. first column index is 0.
		foreach($labels as $key=>$label){
			$value = $label;
			$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($col,$row,$value);
			$col++;
		}
		return $row + 1; // it is supposed to return the row number to start with after the header
	}
	private static function cleanOutput()
	{
		for($level=ob_get_level();$level>0;--$level)
		{
			@ob_end_clean();
		}
	}

	/**
	 * @param $content
	 * @param $type = pdf or xlsx
	 */
	private function _sendUsingPHPExcel($content,$type)
	{
		$writerType = array(
			'pdf'=>'PDF',
			'xlsx'=>'Excel2007'
		);
		$content_type_header = Yii::app()->params['content_types'][$type];
		$excelTemplatesPath = Yii::app()->params['excel_template_path'];
		$inputFileName = get_class($this->_model);
		$inputFile = null;//$inputFile will be used to indicate the existence of template
		if (count(glob($excelTemplatesPath.'/'.$inputFileName.'.*'))){
			$inputFile = glob($excelTemplatesPath.'/'.$inputFileName.'.*')[0];
		};
		spl_autoload_unregister(array('YiiBase', 'autoload'));
		Yii::import($this->libPath, true);
		$objPHPExcel = new PHPExcel();
		if ($inputFile){
			$objReader = PHPExcel_IOFactory::createReader('Excel2007');
			$objPHPExcel = $objReader->load($inputFile);
		}
		spl_autoload_register(array('YiiBase', 'autoload'));




		$objPHPExcel->getProperties()->setCreator('');
		$objPHPExcel->getProperties()->setTitle('');
		$objPHPExcel->getProperties()->setSubject('');
		$objPHPExcel->getProperties()->setDescription('');
		$objPHPExcel->getProperties()->setCategory('');

		// add the content to the excel file
		if (count($content)) { // if content is not an array, don't do anything. If content is an array, empty, don't do anything.
			$labels = $this->_model->attributeLabels(); //$content at least has one element.
			$row = 1;//initial value
			if (!$inputFile)//if a template exists, no need to draw header
				$row    = $this->drawHeader($objPHPExcel, $labels); // change initial value to fit after any header;
			else{//
				$row = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();
			}
			foreach ($content as $contentRow) { //use name contentRow, and save row name to the excel row number
				$col    = 0; //excel column number. first column index is 0.
				$values = $contentRow->getValuesConsideringRelations();
				foreach ($labels as $key => $label) {
					$value = $values[$key];
					$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($col, $row, $value);
					$col++;
				}
				$row++;
			}
		}
		// after finishing adding and editing content to excel file, we create a writer object to send the generated file
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $writerType[$type]);
		$this->cleanOutput();
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		header('Content-type: ' . $content_type_header);
		header('Content-Disposition: attachment; filename="' . $inputFileName . '.' . $type . '"');
		header('Cache-Control: max-age=0');
		$objWriter->save('php://output');
		ob_start();
		Yii::app()->end();
		ob_end_clean();
	}
} 