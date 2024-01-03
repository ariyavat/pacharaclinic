<?php
function getGeneral($id,$typ){
	$sql  = "SELECT * FROM general WHERE id='$id' and typ='$typ' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}
function getGenerals($typ){
	$sql  = "SELECT * FROM general WHERE typ='$typ' ORDER BY name ASC";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content');
	}	
	echo json_encode($result);		
}
function createGeneral(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("general",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}
function updateGeneral(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$id = $param ->con ->id;	
	$typ = $param ->con ->typ;	
	$status = updateTable("general",$data,"id='$id' and typ='$typ' ");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteGeneral(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$id = $param->id;
	$typ = $param->typ;
	$status = deleteTable("general","id='$id' and typ='$typ'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}