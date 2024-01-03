<?php
/*** Temp Recive ***/
function getTempRecives(){
	$sql  = "SELECT * FROM store_temp_recive  ORDER BY no desc";
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
function createTempRecive(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_temp_recive",$param);
	if($status == '200'){		
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateTempRecive(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->product_id;
	$status = updateTable("store_temp_recive",$data,"product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteTempRecive(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$pid = $param->product_id;
	$status = deleteTable("store_temp_recive","product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteTempRecives(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = deleteTable("store_temp_recive","-");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Recive ***/
function getRecive($ino){
	$sql  = "SELECT * FROM store_recive WHERE ino='$ino' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getReciveDetail($ino){
	
	$sql  = "SELECT * FROM store_recive_list WHERE ino='$ino' ORDER BY product_name asc";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj );
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 	
}


function getReciveProduct($id){
	
	$sql  = "SELECT a.*, b.qty,b.unit,b.price,b.total FROM store_recive a, store_recive_list b WHERE a.ino=b.ino and b.product_id='$id'   ORDER BY a.dat desc LIMIT 20";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj );
	} else {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql);
	}
	echo json_encode($result); 	
}



function getRecives($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT * FROM store_recive WHERE dat BETWEEN '$sdat' AND '$end_date'    ORDER BY dat asc";
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
function createRecive(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_recive",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}

function createReciveList(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_recive_list",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}


function updateReciveList(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->id;
	$ino = $param->ino;

	$status = updateTable("store_recive_list",$data,"ino='$ino' and product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}


function getReciveListDetail($pid){	
	$sql  = "SELECT * FROM store_recive_list WHERE product_id='$pid'   and total > 0 ORDER BY ino asc";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj );
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getReciveList($pid){	
	$sql  = "SELECT * FROM store_recive_list WHERE product_id='$pid' ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}



/*** Temp Out ***/
function getTempOuts(){
	$sql  = "SELECT * FROM store_temp_out   ORDER BY no desc";
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
function createTempOut(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_temp_out",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateTempOut(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->product_id;
	$status = updateTable("store_temp_out",$data," product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteTempOut(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$pid = $param->product_id;
	$status = deleteTable("store_temp_out","product_id='$pid' ");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteTempOuts(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());

	$status = deleteTable("store_temp_out","-");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Out ***/
function getOut($ino){
	$sql  = "SELECT * FROM store_outstock WHERE ino='$ino' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}
function getOutDetail($ino){
	
	$sql  = "SELECT * FROM store_outstock_list WHERE ino='$ino' ORDER BY product_name asc ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
	
}
function getOuts($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT * FROM store_outstock WHERE  (dat BETWEEN '$sdat' AND '$end_date')     ORDER BY dat asc";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj,'sql'=>$sql);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content' );
	}	
	echo json_encode($result);		
}
function createOut(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_outstock",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}

function createOutList(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_outstock_list",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}


/*** Temp Adjust ***/
function getTempAdjusts(){
	$sql  = "SELECT * FROM store_temp_adjust  ORDER BY no desc";
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
function createTempAdjust(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_temp_adjust",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateTempAdjust(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->product_id;	
	$status = updateTable("store_temp_adjust",$data,"product_id='$pid' ");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteTempAdjust(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$pid = $param->product_id;	
	$status = deleteTable("store_temp_adjust","product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteTempAdjusts(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	
	$status = deleteTable("store_temp_adjust","-");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Adjust ***/
function getAdjust($ino){
	$sql  = "SELECT * FROM store_adjust WHERE ino='$ino' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}
function getAdjustDetail($ino){
	
	$sql  = "SELECT * FROM store_adjust_list WHERE ino='$ino' ORDER BY product_name asc ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
	
}
function getAdjusts($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT * FROM store_adjust WHERE   (dat BETWEEN '$sdat' AND '$end_date')    ORDER BY dat asc";
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
function createAdjust(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_adjust",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}

function createAdjustList(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_adjust_list",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}



/*** Stock Card ***/

function createStockCard(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_stock_card",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}


function getStockCards($id,$year,$month) {
	if($month==='ALL'){
		$dat = $year;
	} else {
		$dat = $year.'-'.$month;
	}
	
	$sql  = "SELECT * FROM store_stock_card WHERE (product_id='$id')  and ( dat like '%$dat%' ) ORDER BY dat asc";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj, 'sql'=>$sql );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql);
	}	
	echo json_encode($result);	
}

/***************************************************************************************************/

/*** Temp BRecive ***/
function getTempBRecives(){
	$sql  = "SELECT * FROM storeb_temp_recive  ORDER BY no desc";
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
function createTempBRecive(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_temp_recive",$param);
	if($status == '200'){		
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateTempBRecive(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->product_id;
	$status = updateTable("storeb_temp_recive",$data,"product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteTempBRecive(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$pid = $param->product_id;
	$status = deleteTable("storeb_temp_recive","product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteTempBRecives(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
 
	$status = deleteTable("storeb_temp_recive","-");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Recive ***/
function getBRecive($ino){
	$sql  = "SELECT * FROM storeb_recive WHERE ino='$ino' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getBReciveDetail($ino){
	
	$sql  = "SELECT * FROM storeb_recive_list WHERE ino='$ino' ORDER BY product_name asc";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj );
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 	
}


function getBReciveProduct($id){
	
	$sql  = "SELECT a.*, b.qty,b.unit,b.price,b.total FROM storeb_recive a, storeb_recive_list b WHERE a.ino=b.ino and b.product_id='$id'   ORDER BY a.dat desc LIMIT 20";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj );
	} else {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql);
	}
	echo json_encode($result); 	
}



function getBRecives($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT * FROM storeb_recive WHERE dat BETWEEN '$sdat' AND '$end_date'    ORDER BY dat asc";
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
function createBRecive(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_recive",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}

function createBReciveList(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_recive_list",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}


function updateBReciveList(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->id;
	$ino = $param->ino;

	$status = updateTable("storeb_recive_list",$data,"ino='$ino' and product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}


function getBReciveListDetail($pid){	
	$sql  = "SELECT * FROM storeb_recive_list WHERE product_id='$pid'   and total > 0 ORDER BY ino asc";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj );
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getBReciveList($pid){	
	$sql  = "SELECT * FROM storeb_recive_list WHERE product_id='$pid' ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}



/*** Temp Out ***/
function getTempBOuts(){
	$sql  = "SELECT * FROM storeb_temp_out   ORDER BY no desc";
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
function createTempBOut(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_temp_out",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateTempBOut(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->product_id;
	$status = updateTable("storeb_temp_out",$data," product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteTempBOut(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$pid = $param->product_id;
	$status = deleteTable("storeb_temp_out","product_id='$pid' ");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteTempBOuts(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());

	$status = deleteTable("storeb_temp_out","-");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Out ***/
function getBOut($ino){
	$sql  = "SELECT * FROM storeb_outstock WHERE ino='$ino' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}
function getBOutDetail($ino){
	
	$sql  = "SELECT * FROM storeb_outstock_list WHERE ino='$ino' ORDER BY product_name asc ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
	
}
function getBOuts($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT * FROM storeb_outstock WHERE  (dat BETWEEN '$sdat' AND '$end_date')     ORDER BY dat asc";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content' );
	}	
	echo json_encode($result);		
}
function createBOut(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_outstock",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}

function createBOutList(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_outstock_list",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}


/*** Temp Adjust ***/
function getTempBAdjusts(){
	$sql  = "SELECT * FROM storeb_temp_adjust  ORDER BY no desc";
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
function createTempBAdjust(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_temp_adjust",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateTempBAdjust(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->product_id;	
	$status = updateTable("storeb_temp_adjust",$data,"product_id='$pid' ");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteTempBAdjust(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$pid = $param->product_id;	
	$status = deleteTable("storeb_temp_adjust","product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteTempBAdjusts(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	
	$status = deleteTable("storeb_temp_adjust","-");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Adjust ***/
function getBAdjust($ino){
	$sql  = "SELECT * FROM storeb_adjust WHERE ino='$ino' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}
function getBAdjustDetail($ino){
	
	$sql  = "SELECT * FROM storeb_adjust_list WHERE ino='$ino' ORDER BY product_name asc ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
	
}
function getBAdjusts($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT * FROM storeb_adjust WHERE   (dat BETWEEN '$sdat' AND '$end_date')    ORDER BY dat asc";
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
function createBAdjust(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_adjust",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}

function createBAdjustList(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_adjust_list",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}


/*** Stock Card ***/

function createBStockCard(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("storeb_stock_card",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}


function getBStockCards($id,$year,$month) {
	if($month==='ALL'){
		$dat = $year;
	} else {
		$dat = $year.'-'.$month;
	}
	
	$sql  = "SELECT * FROM storeb_stock_card WHERE (product_id='$id')  and ( dat like '%$dat%' ) ORDER BY dat asc";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj, 'sql'=>$sql );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql);
	}	
	echo json_encode($result);	
}


/**** Pickup ****/

function getPickupProducts($cn){
	$sql  = "SELECT a.product_id, a.product_name, a.unit, a.detail, sum(a.qty) as total   ";
	$sql .= "FROM store_pickup_list a, store_pickup b  WHERE a.ino = b.ino AND b.status = 'C' AND a.status='N' ";
	if($cn != 'ALL'){
		$sql .=	 " and b.cn='$cn'  ";
	}
	$sql .= "GROUP BY a.product_id   ORDER BY a.product_name asc ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 
		$list = null;
		foreach($obj as $k => $rs)
		{	
			$detail = null;
			$data = $rs;
			$id= $rs->product_id;
	
			$sql1  = "SELECT * FROM store_products_list WHERE id='$id' ORDER BY pname asc ";	
			$str1 = finds($sql1);
			$obj1 = json_decode($str1);
			$n1 = count($obj1);
			
			if($n1 > 0){ 
				$detail = $obj1;
			}			
			$data->detail = $detail;
			$list[] = $data;
		}

		$result = array('status'=>'200','data'=>$list);
	} else {
		$result = array('status'=>'204','message'=>'No Content','sql'=>$sql);
	}
	echo json_encode($result); 
}

function getPickupDetail($ino){
	
	$sql  = "SELECT * FROM store_pickup_list WHERE ino='$ino' AND status <> 'Y' ORDER BY product_name asc ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql);
	}
	echo json_encode($result); 	
}

function getPickupDetailHis($ino){
	
	$sql  = "SELECT * FROM store_pickup_list WHERE ino='$ino'  ORDER BY product_name asc ";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 
		$result = array('status'=>'200','data'=>$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 	
}

function getPickups($mode,$sdat,$edat){
	
	$sql  = "SELECT * FROM store_pickup ";
	switch($mode){
		case 'WAIT' :
			$sql .= " WHERE status = 'N'  ORDER BY dat asc   ";
		break;
		case 'CONFIRM' :
			$sql .= " WHERE status = 'C'  ORDER BY dat asc   ";
		break;
		case 'SEND' :
			$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
			$sql .= " WHERE status = 'Y' AND (sdat BETWEEN '$sdat' AND '$end_date')  ORDER BY sdat asc   ";
		break;

	}

	//$sql .= "WHERE (cn='$cn')  and  (dat BETWEEN '$sdat' AND '$end_date')     ORDER BY dat asc ";

	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj,'sql'=>$sql);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql );
	}	
	echo json_encode($result);		
}


function updatePickup(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$cn = $param->cn;
	$ino = $param->ino;	
	$status = updateTable("store_pickup",$data," cn='$cn' and ino='$ino' ");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}	
	echo json_encode($result);	
}


function updatePickupList(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$cn = $param->cn;
	$ino = $param->ino;	
	$id = $param->id;	
	$status = updateTable("store_pickup_list",$data," cn='$cn' and ino='$ino' and product_id='$id' ");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}	
	echo json_encode($result);	
}


/*** Temp PO ***/
function getTempPo(){
	$sql  = "SELECT * FROM store_temp_po  ORDER BY no desc";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj );	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content', 'sql'=>$sql);
	}	
	echo json_encode($result);		
}

function createTempPo(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_temp_po",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function updateTempPo(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->product_id;
	$status = updateTable("store_temp_po",$data,"product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteTempPo(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$pid = $param->product_id;
	$status = deleteTable("store_temp_po","product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteTempPos(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());
	
	$status = deleteTable("store_temp_po","-");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Po ***/
function getPo($ino){
	$sql  = "SELECT * FROM store_po WHERE ino='$ino' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){
		$result = array('status'=>'200',$obj);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}

function getPoDetail($ino){
	
	$sql  = "SELECT * FROM store_po_list WHERE ino='$ino' ORDER BY product_name asc";	
	$str = finds($sql);
	$obj = json_decode($str);	
	$n = count($obj);
	if($n > 0){ 		
		$result = array('status'=>'200','data'=>$obj );
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 	
}



function getPos($mode,$sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  

	$list = null;

	$sql  = "SELECT * FROM store_po WHERE status IN('N')   ORDER BY dat asc";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		foreach($obj as $k => $rs)
		{		
			$list[] = $rs;
		}
	}

	$sql  = "SELECT * FROM store_po WHERE dat BETWEEN '$sdat' AND '$end_date' AND status NOT IN('N')   ORDER BY dat asc";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		foreach($obj as $k => $rs)
		{		
			$list[] = $rs;
		}
	} 

	if($list != null){
		$result = array('status'=>'200','data'=>$list );	
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}


	echo json_encode($result);		
}
function createPo(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_po",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}

function updatePo(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$ino = $param->ino;
	$status = updateTable("store_po",$data,"ino='$ino'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}


function createPoList(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$status = insertTable("store_po_list",$param);
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Created' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}


/*** Temp Tranfer ***/
function getTempTranfers($cn){
	$sql  = "SELECT * FROM store_temp_tranfer WHERE cn='$cn'  ORDER BY no desc";
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
function createTempTranfer(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	
	$pid = $param->product_id;
	$qty = $param->qty;

	$sql  = "SELECT * FROM store_products_list WHERE id='$pid' ORDER BY pname ASC";
	$str = finds($sql);	

	$txt = $sql;
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){

			$con = 'Y';
			$list = null;
			foreach($obj as $k => $val)
			{
				$dpid = $val->pid;
				$tqty = $val->qty * $qty;

				$data = array('product_id'=>$pid,'pid'=>$val->pid, 'pname'=>$val->pname, 'qty'=>$tqty,'unit'=>$val->unit,'total'=>0 );	
				$list[] = $data;

				$sql  = "SELECT total FROM store_product WHERE id='$dpid' ";	
				$str = findPrepare($sql);
				$obj = json_decode($str);	
				if(is_object($obj)){
					$ptotal = $obj->total;
					if($ptotal < $tqty){
						$con = 'N';
					}					
				} else {
					$con = 'N';
				} 
			}		

			if($con == 'Y'){
				$status = insertTable("store_temp_tranfer",$param);
				if($status == '200'){
					$result = array('status'=>'201','message'=>'Created', 'dList'=>$list );	
				} else {
					$result = array('status'=>'203','message'=>$status);	
				}
			} else {
				$result = array('status'=>'203','txt'=>$txt,'message'=>'มีวัตุดิบไม่พอจ่าย ตรวจสอบคลังวัตถุดิบด้วย!!!');
			}
			

	} else {  
		$result = array('status'=>'203','message'=>'ไม่พบรายการวัตถุดิบในสินค้านี้!!!');
	}
	echo json_encode($result);	

}

function updateTempTranfer(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$data = $param ->data;
	$pid = $param->product_id;
	$status = updateTable("store_temp_tranfer",$data," product_id='$pid'");
	if($status == '200'){
		$result = array('status'=>'200','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);	
}

function deleteTempTranfer(){
	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	
	$pid = $param->product_id;
	$status = deleteTable("store_temp_tranfer","product_id='$pid' ");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}

function deleteTempTranfers(){	
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());

	$status = deleteTable("store_temp_tranfer","-");
	if($status == '200'){
		$result = array('status'=>'201','message'=>'Success' );	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);		
}


/*** Tranfer ***/
function getTranfer($ino){
	$sql  = "SELECT * FROM store_trn WHERE ino='$ino' ";	
	$str = findPrepare($sql);
	$obj = json_decode($str);	
	if(is_object($obj)){

		$list = null;
		$plist = null;
		$sql  = "SELECT * FROM store_trn_list WHERE ino='$ino' ORDER BY product_name asc ";	
		$str = finds($sql);
		$obj = json_decode($str);	
		$n = count($obj);
		if($n > 0){ 
			$list = $obj;
		}

		$sql  = "SELECT * FROM store_trn_product WHERE ino='$ino' ORDER BY pname asc ";	
		$str = finds($sql);
		$obj = json_decode($str);	
		$n = count($obj);
		if($n > 0){ 
			$plist = $obj;
		}


		$result = array('status'=>'200','data'=>$obj, 'dList'=>$list, 'pList'=>$plist);
	} else {
		$result = array('status'=>'204','message'=>'No Content');
	}
	echo json_encode($result); 
}


function getTranfers($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT * FROM store_trn WHERE  (dat BETWEEN '$sdat' AND '$end_date')     ORDER BY dat asc";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$result = array('status'=>'200','data'=>$obj, 'sql'=>$sql);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content' );
	}	
	echo json_encode($result);		
}

function getTranfersProduct($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT a.product_id,a.product_name,sum(a.qty) as total,a.unit  ";
	$sql .= "FROM store_trn_list a,store_trn b WHERE a.ino=b.ino  AND (b.dat BETWEEN '$sdat' AND '$end_date')        ";
	$sql .= "GROUP BY a.product_id ORDER BY a.product_name ASC";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$list =  null;	
		foreach($obj as $k => $val)
		{
			$data = array('id'=>$val->product_id,'name'=>$val->product_name,'qty'=>$val->total,'unit'=>$val->unit);

			$list[] = $data;
		}
		$result = array('status'=>'200','data'=>$list);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content','sql'=>$sql );
	}	
	echo json_encode($result);		
}


function getTranfersBProduct($sdat,$edat){
	$end_date = date ("Y-m-d", strtotime("+1 day", strtotime($edat)));  
	$sql  = "SELECT a.pid,a.pname,sum(a.qty) as total,a.unit  ";
	$sql .= "FROM store_trn_product a,store_trn b WHERE a.ino=b.ino  AND (b.dat BETWEEN '$sdat' AND '$end_date')        ";
	$sql .= "GROUP BY a.pid ORDER BY a.pname ASC";
	$str = finds($sql);	
	$obj = json_decode($str);	
	$n = count($obj); 
	if($n > 0){
		$list =  null;	
		foreach($obj as $k => $val)
		{
			$data = array('id'=>$val->pid,'name'=>$val->pname,'qty'=>$val->total,'unit'=>$val->unit);

			$list[] = $data;
		}
		$result = array('status'=>'200','data'=>$list);	
	} else if($n == 0) {
		$result = array('status'=>'204','message'=>'No Content','sql'=>$sql );
	}	
	echo json_encode($result);		
}


function createTranfer(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());	

	$dList = $param->dList;
	$pList = $param->pList;
	$pino = $param->pino;
	$pcn = $param->pcn;

	$data = array(
		'ino' => $param->ino,
		'dat' => $param->dat,
		'sup_id' => $param->sup_id,
		'sup_name' => $param->sup_name,
		'emp_id' => $param->emp_id,
		'emp_name' => $param->emp_name,
		'con_id' => $param->con_id,
		'con_name' => $param->con_name,
		'mem' => $param->mem,
		'status' => $param->status,
	);
	$status = insertTable("store_trn",$data);
	if($status == '200'){
		$cn = $param->sup_id;
		$ino = $param->ino;
		$dat = $param->dat;

		$rdata = array(
			'ino' => $ino,
			'rno' => $ino,
			'dat' => $dat,
			'cn' => $cn,
			'location_name' => $param->sup_name,
			'typ_id' => 'T',
			'typ_name' => 'รับโอนจากโรงงาน',
			'sup_id' => 'STORE',
			'sup_name' => 'โรงงาน',
			'emp_id' => $param->emp_id,
			'emp_name' => $param->emp_name,
			'con_id' => $param->con_id,
			'con_name' => $param->con_name,
		);
		insertTable("recive",$rdata);
	
		foreach($dList as $k => $val)
		{
			$did = $val->product_id;
			
			$temp = array(
				'ino' => $ino,
				'barcode' => $val->barcode,
				'product_id' => $val->product_id,
				'product_name' => $val->product_name,
				'qty' => $val->qty,		
				'unit' => $val->unit,
				'no' => $val->no,
			);
			insertTable("store_trn_list",$temp);

			$ssqty = 0;
			$rsqty = 0;
			$sql1  = "SELECT qty,rqty FROM store_pickup_list WHERE ino='$pino' and  cn='$pcn' and product_id='$did' ";	
			$str1 = findPrepare($sql1);
			$obj1 = json_decode($str1);
			if(is_object($obj1)){
				$ssqty = $obj1->qty;
				$rsqty = $obj1->rqty + $val->qty;
			}	

			//if($val->qty == $ssqty){
			$sstatus = 'N';
			if($rsqty >= $ssqty){
				$sstatus = 'Y';
			}

			$updata = array('status'=>$sstatus, 'rqty'=>$rsqty);
			updateTable("store_pickup_list",$updata,"ino='$pino' and  cn='$pcn' and product_id='$did' ");
			//}

			$tempR = array(
				'ino' => $ino,
				'cn' => $cn,
				'barcode' => $val->barcode,
				'product_id' => $val->product_id,
				'product_name' => $val->product_name,
				'qty' => $val->qty,
				'total' => $val->qty,
				'price' => 0,
				'unit' => $val->unit,
				'no' => $val->no,
			);
			insertTable("recive_list",$tempR);
			
			$dtotal = 0;
			$sql1  = "SELECT * FROM product_total WHERE id='$did' and cn='$cn' ";	
			$str1 = findPrepare($sql1);
			$obj1 = json_decode($str1);
			if(is_object($obj1)){
				$dtotal = $obj1->total;
			}	
			$dtotal = $dtotal + $val->qty;
			$upP = array('total'=>$dtotal);
			updateTable("product_total",$upP,"cn='$cn' and id='$did'");           
	        $sdata = array(
	          'cn' => $cn,
	          'ino'=> $ino,
	          'rno' => $ino,
	          'dat' => $dat,
	          'product_id' =>  $val->product_id,
	          'product_name' => $val->product_name,
	          'typ' => 'I',
	          'qty' => $val->qty,
	          'unit' => $val->unit,
	          'total' => $dtotal,
	          'total_price' => 0,
	          'note' => 'โอนจากโรงงาน',
	        );
		 	insertTable("stock_card",$sdata);
		}
		$ino = 'NO';
		foreach($pList as $k => $val)
		{
			$temp = array(
				'ino' => $param->ino,
				'pid' => $val->pid,
				'pname' => $val->pname,
				'qty' => $val->qty,
				'unit' => $val->unit,
			);
			insertTable("store_trn_product",$temp);

			$id = $val->pid; $total = 0; $ptotal = 0; $qty = $val->qty; 
			$sql  = "SELECT total FROM store_product WHERE id='$id' ";	
			$str = findPrepare($sql);
			$obj = json_decode($str);	
			if(is_object($obj)){ $total = $obj->total; $ptotal = $obj->total;  }
			$total = $total - $val->qty;
			$udata = array('total'=>$total);
			updateTable("store_product",$udata,"id='$id' ");
			$sql  = "SELECT * FROM store_recive_list WHERE product_id='$id'   and total > 0 ORDER BY ino asc";	
			$str = finds($sql);
			$obj = json_decode($str);	
			$n = count($obj);
			if($n > 0){
				foreach($obj as $k => $vl)
				{
					$ino = $vl->ino;
					if($qty > 0){

						if($qty > $vl->total){
								$udata = array('total'=>0); 
								$rt =  updateTable("store_recive_list",$udata,"product_id='$id' and ino='$ino' ");
								$ptotal = $ptotal - $vl->total;					
								$sdata = array(
									'ino'=>$param->ino,
									'rno'=>$ino,
									'dat'=>$param->dat,
									'product_id'=>$id,
									'product_name'=>$val->pname,
									'typ'=>'P',
									'qty'=>$vl->total,
									'unit'=>$val->unit,
									'total'=>$ptotal,
									'total_price'=>0,
									'note'=>'โอนสินค้าให้สาขา '.$param->sup_name,
								); 
								insertTable("store_stock_card",$sdata);
								$qty = $qty - $vl->total;
							} else {
								$qtotal = $vl->total - $qty;
								$udata = array('total' => $qtotal);
								updateTable("store_recive_list",$udata,"product_id='$id' and ino='$ino' ");
								$ptotal = $ptotal - $qty;
								$sdata = array(
									'ino'=>$param->ino,
									'rno'=>$ino,
									'dat'=>$param->dat,
									'product_id'=>$id,
									'product_name'=>$val->pname,
									'typ'=>'P',
									'qty'=>$qty,
									'unit'=>$val->unit,
									'total'=>$ptotal,
									'total_price'=>0,
									'note'=>'โอนสินค้าให้สาขา '.$param->sup_name,
								); 
								insertTable("store_stock_card",$sdata);
								$qty = 0;
							}
						
					}
	
				}
			}
		}
		deleteTable("store_temp_tranfer","-");		

		$sql  = "SELECT * FROM store_pickup_list WHERE ino='$pino' and cn ='$pcn' and status='N' ";	
		$str = finds($sql);
		$obj = json_decode($str);	
		$n = count($obj);
		$pstatus = 'Y';
		if($n > 0){  $pstatus = 'C';  }

		$result = array('status'=>'201','message'=>'Created', 'ino'=>$ino, 'pstatus'=>$pstatus);	
	} else {
		$result = array('status'=>'203','message'=>$status);	
	}
	echo json_encode($result);
}