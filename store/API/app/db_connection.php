<?php
header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set("Asia/Bangkok");
//Create Database


// Get Database Connection
function DB_Connection() {	
	$dbhost = "localhost";   
	
    $dbport = "3306";
    $dbuser = "memorys1_pachara";
    $dbpass = "224422";
    $dbname = "memorys1_pachara";      
    

	$dbh = new PDO("mysql:host=$dbhost;port=$dbport;dbname=$dbname", $dbuser, $dbpass);	
	$dbh -> exec("set names 'utf8' COLLATE 'utf8_general_ci' ");	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

function findPrepare($sql){	
	//set_time_limit(0);
	try {
		$db = DB_Connection();
        $stmt = $db->prepare($sql);        
        $stmt->execute();
    	$str = $stmt->fetchObject();
    	$db = null;
    	return json_encode($str);        
	} catch(PDOException $e) {		
		return '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findAll($table){
	//set_time_limit(0);
	$sql = "select * FROM ".$table;
	try {
		$db = DB_Connection();
		$stmt = $db->query($sql);  
		$list = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		return json_encode($list);
	} catch(PDOException $e) {		
		return '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function finds($sql){	
	//set_time_limit(0);
	try {
		$db = DB_Connection();
		$stmt = $db->query($sql);  
		$list = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		return json_encode($list);
	} catch(PDOException $e) {		
		return '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByALL($table,$con,$param,$order){
	//set_time_limit(0);
	$sql = "SELECT ".$con." FROM ".$table;
	if(!empty($param)){
		$sql .= "  WHERE ".$param;	
	}

	if(!empty($order)){
		$sql .= "  order by ".$order;	
	}
	try {
		$db = DB_Connection();
		$stmt = $db->query($sql);  
		$list = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		return json_encode($list);
	} catch(PDOException $e) {		
		return '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($table,$param,$order){
	//set_time_limit(0);
	$sql = "SELECT * FROM ".$table;
	if(!empty($param)){
		$sql .= "  WHERE ".$param;	
	}

	if(!empty($order)){
		$sql .= "  order by ".$order;	
	}
	try {
		$db = DB_Connection();
		$stmt = $db->query($sql);  
		$list = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		return json_encode($list);
	} catch(PDOException $e) {		
		return '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function insertTable($table,$data){
	//set_time_limit(0);
	$fields=""; $values="";
	$i=1;
	foreach($data as $key=>$val)
	{
		if($i!=1) { $fields.=", "; $values.=", "; }
		$fields.="$key";
		$values.="'$val'";
		$i++;
	}
	$sql = "INSERT INTO $table ($fields) VALUES ($values)";
    try {
        $db = DB_Connection();
        $stmt = $db->prepare($sql);        
        $stmt->execute();
        $db = null;
        return '200';
    } catch(PDOException $e) {
        return '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateTable($table,$data,$where)
{			
	//set_time_limit(0);
	$modifs="";
	$i=1;
	foreach($data as $key=>$val)
	{
		if($i!=1){ $modifs.=", "; }
		if(is_numeric($val)) { $modifs.=$key.'='.$val; }
		else { $modifs.=$key.' = "'.$val.'"'; }
		$i++;
	}
	$sql = ("UPDATE $table SET $modifs WHERE $where");
    try {
        $db = DB_Connection();
        $stmt = $db->prepare($sql);        
        $stmt->execute();
        $db = null;
        return '200';
    } catch(PDOException $e) {
    	return '{"error":{"text":'. $e->getMessage() .'}}';      
    }
}

function deleteTable($table,$where){
	//set_time_limit(0);
	if($where!= '-'){
		$sql = "DELETE FROM $table WHERE $where";
	} else {
		$sql = "DELETE FROM $table ";
	}
    
    try {
        $db = DB_Connection();
        $stmt = $db->prepare($sql);        
        $stmt->execute();
        $db = null;
        return '200';
    } catch(PDOException $e) {
    	return '{"error":{"text":'. $e->getMessage() .'}}';      
    }
}


function createtable($sql){
	//set_time_limit(0);
	try {
		$db = DB_Connection();
		$db->exec($sql);		
		$db = null;
		return 'OK';
	} catch(PDOException $e) {		
		return '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}



function expdate($startdate,$datenum){
 $startdatec=strtotime($startdate); 
 $tod=$datenum*86400; 
 $ndate=$startdatec+$tod; 
 return $ndate; 
}

function diff_date($str_start, $str_end)
{
	$str_start = strtotime($str_start); 
	$str_end = strtotime($str_end); 
	$nseconds = $str_end - $str_start; 
	$ndays = round($nseconds / 86400);
	return $ndays;
}
