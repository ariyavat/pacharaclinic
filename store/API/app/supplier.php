<?php
function getSupplier($id){
	$sql  = "SELECT * FROM supplier WHERE id='$id' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}
function getSuppliers($mode){

	$sql  = "SELECT * FROM supplier ";
	if($mode==='ACTIVE'){
		$sql .= " WHERE  status='Y'  ";
	}
	$sql .= " ORDER BY id ASC ";
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

function serchSuppliers($mode,$page,$perpage,$txt){
	$start = ($page - 1) * $perpage;	
	$sql  = "SELECT * FROM supplier ";
	if($mode=='ACTIVE'){
		$sql .= " WHERE  status='Y'  ";
	}
	if($txt!=='-'){
		if($mode=='ACTIVE'){
			$sql .= "AND (id LIKE '%$txt%'  OR name LIKE '%$txt%' OR tel LIKE '%$txt%')  ";
		} else {
			$sql .= "WHERE (id LIKE '%$txt%'  OR name LIKE '%$txt%' OR tel LIKE '%$txt%')  ";
		}
	}
	$str = finds($sql);	
	$obj = json_decode($str);
	$total = count($obj); 

	$sql .= " ORDER BY id ASC  LIMIT $start,$perpage ";
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


function createSupplier(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	//$data = json_decode($param);
	$status = insertTable("supplier",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
}

function updateSupplier(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$id = $param ->id;	
	$status = updateTable("supplier",$data,"id='$id'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
	
}

function deleteSupplier(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$id = $param->id;
	$status = deleteTable("supplier","id='$id'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
}