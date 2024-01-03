<?php
function getCustomer($id){
	$sql  = "SELECT * FROM customer WHERE id='$id' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$data = $obj;
		$con = 'N'; $exp = 'N'; $total = 0;
		$today = strtotime(date("Y-m-d"));	
		$sdat = $data->add_date;
		$s_dat = '2018-01-01 00:00:00';

		if($data->startdate != '2018-01-01'){ 			
			$sdat =  $data->startdate; 

			$s_dat =  $data->startdate.' 00:00:00';
		}
		$dat = substr($sdat,8,2).'-'.substr($sdat,5,2).'-'.substr($sdat,0,4); 		
		$date_expire = date("Y-m-d", strtotime("+1 year", strtotime($dat)));		
		$data->enddate = $date_expire;
		$e_dat = $date_expire.' 23:59:00';
		$expire = strtotime($date_expire);

		if($today <= $expire){
			if($data->level != 'P'){
				$con = 'Y';
			}
		} else {
			$con = 'Y'; $exp = 'Y';
		}

		if($con == 'Y'){
			
			$sql1  = "SELECT sum(total) as total FROM payments WHERE (customer_id='$id') AND (dat BETWEEN '$s_dat' AND '$e_dat' ) AND status='COMPLETE' GROUP BY customer_id ";		
			$str1 = findPrepare($sql1);
			$obj1 = json_decode($str1);			
			if(is_object($obj1)){
				$total = $obj1->total;
			} 
			
			$lv = $data->level; $up = 'N'; $str_dat = date("Y-m-d");
			switch($data->level){
				case 'W' :  
				
					if($total >= 150000){
						$lv = 'P';	$up = 'Y';					
					} else if($total >= 50000){
						$lv = 'G';	$up = 'Y';					
					} 
				break;
				case 'S' :  
				
					if($total >= 150000){
						$lv = 'P';	$up = 'Y';					
					} else if($total >= 50000){
						$lv = 'G';	$up = 'Y';					
					} 
				break;
				case 'G' :  
					
					if($total >= 150000){
						$lv = 'P';	$up = 'Y';					
					}
				break;
				case 'P' :  
					if($exp == 'Y'){
						$up = 'Y';	
						
						if($total >= 150000){
							$lv = 'P';					
						} else if($total >= 50000){
							$lv = 'G';					
						} else { 
							$lv = 'W';	
						}						
					}
				break;			
			}

			if($up == 'Y'){
				$updata = array('level'=>$lv, 'startdate'=>$str_dat);
				$st = updateTable("customer",$updata," id='$id' "); 
				$total = 0;

				$sql  = "SELECT * FROM customer WHERE id='$id' ";	
				$str = findPrepare($sql);
				$obj = json_decode($str);	
				if(is_object($obj)){
					$data = $obj;
					$result = array('status'=>'200',$data, 'totalprice'=>$total, 'up'=>'UP');
				}
					

			}	
			$result = array('status'=>'200',$data, 'totalprice'=>$total, 'up'=>'NO');	

		} else {
			$result = array('status'=>'200',$data, 'totalprice'=>$total, 'up'=>'NO');		
		}

		
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getCustomerTotal($mode){
	$sql  = "SELECT * FROM customer ";
	if($mode=='ACTIVE'){
		$sql .= " WHERE  status='Y'  ";
	}
	$sql .= " ORDER BY id ASC ";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','total'=>$n);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content');
	}	
	echo json_encode($result);		
}

function getCustomerDOB($mn){	

	$sql  = "SELECT * FROM customer WHERE dob Like '%$mn%' ";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	$list = null;
	if($n > 0){
	
		foreach($obj as $k => $rs)
		{	
			if($rs->dob != ''){
				$dob = explode("/",$rs->dob); 
				$n = count($dob);
				if($n > 1){
					if((int)$mn == (int)$dob[1]){
						$list[] = $rs;	
					}									
				}								
			}
	    }
		$result = array('status'=>'200','data'=>$list );	

	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content');
	}	
	echo json_encode($result);		
	
}


function getCustomers($mode){
	$sql  = "SELECT * FROM customer ";
	if($mode=='ACTIVE'){
		$sql .= " WHERE  status='Y'  ";
	}
	$sql .= " ORDER BY id ASC ";
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

function serchCustomers($mode,$page,$perpage,$txt){
	$start = ($page - 1) * $perpage;	
	$sql  = "SELECT * FROM customer ";
	if($mode=='ACTIVE'){
		$sql .= " WHERE  status='Y'  ";
	}
	if($txt!='-'){
		if($mode=='ACTIVE'){
			$sql .= "AND (id LIKE '%$txt%'  OR fullname LIKE '%$txt%' OR tel LIKE '%$txt%' OR province LIKE '%$txt%')  ";
		} else {
			$sql .= "WHERE (id LIKE '%$txt%'  OR fullname LIKE '%$txt%' OR tel LIKE '%$txt%' OR province LIKE '%$txt%')  ";
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

		$list = '';
		foreach($obj as $k => $rs)
		{	
			$id = $rs->id; 
			$data = $rs;
			$data->ar= 'N';
			$sql1 = " select customer_id from orders where customer_id='$id' and status='WAIT' ";
			$str1 = finds($sql1);	
			$obj1 = json_decode($str1);	
			$n1 = count($obj1); 
			if($n1>0){
				$data->ar = 'Y';
			}
			$list[] = $data;

	    }
		$result = array('status'=>'200','data'=>$list, 'total'=>$total );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content');
	}	
	echo json_encode($result);		
}

function createCustomer(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$sql  = "SELECT id FROM customer WHERE id='$param->id' ";	
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n == 0) {
		$sql  = "SELECT fname FROM customer WHERE fname='$param->fname' AND lname='$param->lname' ";	
		$str = finds($sql);	
		$obj = json_decode($str);	
		$n = count($obj); 
		if($n == 0) {

			$status = insertTable("customer",$param);
			if($status == '200'){			
				$result = array('status'=>'201','message'=>'Created' );	
			} else {
				$result = array('status'=>'203','message'=>$status);	
			}	

		} else { $result = array('status'=>'203','message'=>'ชื่อ : '.$param->fname.'   '.$param->lname.' มีในระบบแล้ว' );  }
	} else { $result = array('status'=>'203','message'=>'รหัส: '.$param->id.' มีในระบบแล้ว' ); }
	echo json_encode($result);
}

function updateCustomer(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$id = $param ->id;	
	$status = updateTable("customer",$data,"id='$id'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteCustomer(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	$id = $param->id;
	$status = deleteTable("customer","id='$id'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}