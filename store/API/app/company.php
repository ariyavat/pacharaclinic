<?php
function getCompany(){
	$sql  = "SELECT * FROM company WHERE id='99' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function updateCompany(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());		
	$status = updateTable("company",$param,"id='99'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

/*** Wherehouse ***/

function getWherehouse($id){
	$sql  = "SELECT * FROM wherehouse WHERE id='$id' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getWherehouses($id){
	if($id=='ALL'){
		$sql  = "SELECT * FROM wherehouse  ORDER BY name ASC ";
	} else {
		$sql  = "SELECT * FROM wherehouse WHERE id <> '$id' ORDER BY name ASC ";
	}
	
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content');
	}	
	echo json_encode($result);		
}

function createWherehouse(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("wherehouse",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateWherehouse(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$id = $param ->id;	
	$status = updateTable("wherehouse",$data,"id='$id'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}


function deleteWherehouse(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$id = $param->id;
	$status = deleteTable("wherehouse","id='$id'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}



/*** Location ***/

function getLocation($id){
	$sql  = "SELECT * FROM location WHERE id='$id' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getLocations(){
	$sql  = "SELECT * FROM location  ORDER BY name ASC ";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content');
	}	
	echo json_encode($result);		
}

function createLocation(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("location",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateLocation(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$id = $param ->id;	
	$status = updateTable("location",$data,"id='$id'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteLocation(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$id = $param->id;
	$status = deleteTable("location","id='$id'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}