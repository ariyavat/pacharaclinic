<?php

/*** Product ***/
function getProduct($id){
	$sql  = "SELECT * FROM store_product WHERE id='$id' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getProducts($typ,$status){
	$wt = 'N';
	$sql  = "SELECT * FROM store_product  ";
	if($status!='ALL'){
		$sql .= "WHERE status='$status'  ";	
		$wt = 'Y';
	}
	if($typ!='ALL'){	
		if($wt === 'N'){
			$sql .= "WHERE typ='$typ'  ";
			$wt = 'Y';	
		} else {
			$sql .= " and typ='$typ'  ";	
		}
	}

	$sql .= "ORDER BY typ,name ASC";
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


function serchProducts($typ,$status,$page,$perpage,$txt){
	$start = ($page - 1) * $perpage;	
	$wt = 'N';
	$sql  = "SELECT * FROM store_product ";

	if($status!='ALL'){
		if($status=='SALE'){	
			$sql .= "WHERE status='Y' AND st='Y'  ";					
		} else {
			$sql .= "WHERE status='$status'  ";		
		}		
		$wt = 'Y';				
	}

	if($typ!='ALL'){
		if($wt=='Y'){
			$sql .= "AND typ='$typ'  ";	
		} else {
			$sql .= "WHERE typ='$typ'  ";	
			$wt = 'Y';
		}
	}
	if($txt!='-'){
		if($wt=='Y'){
			$sql .= "AND (id LIKE '%$txt%'  OR name LIKE '%$txt%' )  ";
		} else {
			$sql .= "WHERE (id LIKE '%$txt%'  OR name LIKE '%$txt%')  ";
		}
	}

	$str = finds($sql);	
	$obj = json_decode($str);
	$total = count($obj); 

	$sql .= " ORDER BY typ,name ASC  LIMIT $start,$perpage ";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj, 'total'=>$total );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql);
	}	
	echo json_encode($result);		
}


function createProduct(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_product",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}

	echo json_encode($result);
}

function updateProduct(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param->data;
	$id = $param->id;	
	$status = updateTable("store_product",$data,"id='$id' ");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteProduct(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$id = $param->id;	
	$typ = $param ->typ;
	$status = deleteTable("store_product","id='$id' and typ='$typ'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

/*** Product Set ***/
function getProductSet($id){
	$sql  = "SELECT * FROM store_products WHERE id='$id' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$list =  'NO';	
		$data =  $obj;
		/*
		$sql0  = "SELECT * FROM store_products_list WHERE id='$id' ";
		$str0 = finds($sql0);
		$obj0 = json_decode($str0);				
		foreach($obj0 as $k => $val)
		{
			$list[] = $val;
		}
		$data->detail = $list;
		*/

		$result = array('status'=>'200','data'=>$data);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getProductSets(){

	$sql  = "SELECT * FROM store_products  ORDER BY name ASC";
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


function serchProductSets($page,$perpage,$txt){
	$start = ($page - 1) * $perpage;	
	$wt = 'N';
	$sql  = "SELECT * FROM store_products ";
	if($txt!='-'){	
		$sql .= "WHERE (id LIKE '%$txt%'  OR name LIKE '%$txt%')  ";
	}

	$str = finds($sql);	
	$obj = json_decode($str);
	$total = count($obj); 

	$sql .= " ORDER BY  name ASC  LIMIT $start,$perpage ";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){




		$result = array('status'=>'200','data'=>$obj, 'total'=>$total );


	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql);
	}	
	echo json_encode($result);		
}


function createProductSet(){

	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	

	$data = array(
		'id' => $param->id,
		'name' => $param->name,
		'total' => 0,
		'unit' => $param->unit,
	);

	$dList = $param->dList;
	$status = insertTable("store_products",$data);
	if($status == '200'){

		
		foreach($dList as $k => $val)
		{
			$temp = array('id'=>$val->id,'pid'=>$val->pid,'pname'=>$val->pname,'qty'=>$val->qty,'unit'=>$val->unit);
			$st = insertTable("store_products_list",$temp);
		}			

		$result = array('status'=>'201','message'=>'Created');	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}

	echo json_encode($result);
	
}

function updateProductSet(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param->data;
	$id = $param->id;	
	$mode = $param->mode;
	$status = updateTable("store_products",$data,"id='$id' ");
	if($status == '200'){
		if($mode === 'NOT'){
			$dList = $param->dList;
			deleteTable("store_products_list","id='$id'");
			foreach($dList as $k => $val)
			{
				$temp = array('id'=>$val->id,'pid'=>$val->pid,'pname'=>$val->pname,'qty'=>$val->qty,'unit'=>$val->unit);
				$st = insertTable("store_products_list",$temp);
			}				
		}
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteProductSet(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$id = $param->id;	
	
	$status = deleteTable("store_products","id='$id'");
	if($status == '200'){
		deleteTable("store_products_list","id='$id'");
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Product Set List ***/


function getProductSetList($id){

	$sql  = "SELECT * FROM store_products_list WHERE id='$id'  ORDER BY pname ASC";
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