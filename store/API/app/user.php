<?php
function getUserName($username){
	$sql  = "SELECT * FROM userst WHERE username='$username' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getUser($uid){
	$sql  = "SELECT * FROM userst WHERE uid='$uid' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getUsers(){
	$sql  = "SELECT * FROM userst ";
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

function serchUsers($page,$perpage,$txt){
	$start = ($page - 1) * $perpage;	
	$sql  = "SELECT * FROM userst ";
	if($txt!='-'){	
		$sql .= " WHERE (email LIKE '%$txt%'  OR emp_name LIKE '%$txt%' OR emp_id LIKE '%$txt%')  "; 
	}
	$str = finds($sql);	
	$obj = json_decode($str);
	$total = count($obj); 

	$sql .= " LIMIT $start,$perpage ";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj, 'total'=>$total );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content');
	}	
	echo json_encode($result);		
}

function createUser(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("userst",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}	
	echo json_encode($result);	
}

function updateUser(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$uid = $param ->uid;	
	$status = updateTable("userst",$data,"uid='$uid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteUser(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$uid = $param->uid;
	$status = deleteTable("userst","uid='$uid'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}