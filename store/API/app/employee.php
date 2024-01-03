<?php
function getEmployee($id){
	$sql  = "SELECT * FROM employee WHERE id='$id' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}
function getEmployees($typ,$status){

	if($typ != 'E' && $typ != 'D' && $typ != 'ALL'){
		$sql  = "SELECT a.* FROM employee a, employee_location b WHERE a.id = b.emp_id AND b.cn='$typ' ";
		$sql .= "AND a.status='Y'  AND typ='$status' ";
	} else {
		$sql  = "SELECT * FROM employee  ";
		$wt = 'N';
		if($status != 'ALL'){
			$sql .= "WHERE status='$status'  ";	
			$wt = 'Y';
		}
		if($typ != 'ALL'){
			if($wt == 'N'){
				$sql .= "WHERE typ='$typ'  ";					
			} else {
				$sql .= "AND typ='$typ'  ";	
			}		
		}			
	}
	$sql .= "ORDER BY name ASC  ";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj,'sql'=>$sql );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content','sql'=>$sql);
	}	
	echo json_encode($result);	
}

function serchEmployees($typ,$status,$page,$perpage,$txt){
	$start = ($page - 1) * $perpage;	
	$wt = 'N';
	$sql  = "SELECT * FROM employee ";
	if($status!='ALL'){			
		$sql .= "WHERE status='$status'  ";
		$wt = 'Y';				
	}
	if($typ != 'ALL'){
		if($wt == 'N'){
			$sql .= "WHERE typ='$typ'  ";					
		} else {
			$sql .= "AND typ='$typ'  ";	
		}		
	}
	if($txt!='-'){
		if($wt=='Y'){
			$sql .= "AND (id LIKE '%$txt%'  OR name LIKE '%$txt%' ) ";
		} else {
			$sql .= "WHERE (id LIKE '%$txt%'  OR name LIKE '%$txt%' ) ";
		}
	}

	$str = finds($sql);	
	$obj = json_decode($str);
	$total = count($obj); 

	$sql .= " ORDER BY name ASC  LIMIT $start,$perpage ";
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

function createEmployee(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	//$data = json_decode($param);
	$status = insertTable("employee",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
}

function updateEmployee(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$id = $param ->id;	
	$status = updateTable("employee",$data,"id='$id'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
	
}

function deleteEmployee(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$id = $param->id;
	$status = deleteTable("employee","id='$id'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
}

/*** Employee Location ***/

function getEmployeeLocationID($emp_id){
	$sql  = "SELECT * FROM employee_location WHERE emp_id='$emp_id' ";	
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

function getEmployeeLocation($cn){
	$sql  = "SELECT * FROM employee_location WHERE cn='$cn' ORDER BY emp_name ASC ";	
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


function createEmployeeLocation(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$status = insertTable("employee_location",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
}

function deleteEmployeeLocation(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$cn = $param->cn;
	$emp_id = $param->emp_id;
	$status = deleteTable("employee_location","cn='$cn' and emp_id='$emp_id'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
	
}



function getEmpImgs($eid){
	$sql  = "SELECT * FROM employee_image WHERE emp_id = '$eid' ORDER BY dat ASC ";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content','sql'=>$sql);
	}	
	echo json_encode($result);	
}

function createEmpImg(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$status = insertTable("employee_image",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteEmpImg(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$cn = $param->cn;
	$emp_id = $param->emp_id;
	$status = deleteTable("employee_image","cn='$cn' and emp_id='$emp_id'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}
