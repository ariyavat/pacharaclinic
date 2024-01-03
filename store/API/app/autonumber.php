<?php
function aTest(){
		$id= 'SP';
		$sql  = "SELECT mode FROM autonumber WHERE id='$id' ";	
		$str = findPrepare($sql);
		$obj = json_decode($str);	
		$lastM = date('m');
		if($obj->mode=='Y'){ 
			$year =  date('Y');
			$lastM = substr( $year, -2);			
		}
		$data = array('lastM' => $lastM);
		$st = updateTable("autonumber",$data,"id='$id'");
		echo $st;

}

function getAutonumber($id,$cn){

	$sql  = "SELECT * FROM autonumber WHERE id='$id' and cn='$cn' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){

		$result = array('status'=>'200','data'=>$obj);

	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}


function createAutonumber(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("autonumber",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
}

function updateAutonumber(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$cn = $param ->cn;	
	$id = $param ->id;	
	if($id=='PT' || $id=='PD' || $id=='SP'){
		$status = updateTable("autonumber",$data,"id='$id'");	
	} else {
		$status = updateTable("autonumber",$data,"id='$id' and cn='$cn'");	
	}	
	if($status == '200'){
		$sql  = "SELECT mode FROM autonumber WHERE id='$id' ";	
		$str = findPrepare($sql);
		$obj = json_decode($str);	
		$lastM = date('m');
		if($obj->mode=='Y'){ 
			$year =  date('Y');
			$lastM = substr( $year, -2);			
		}
		$data = array('lastM' => $lastM);
		$st = updateTable("autonumber",$data,"id='$id'");
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
	
}
