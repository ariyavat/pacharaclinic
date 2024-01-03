<?php
function test(){

	$img = 'C:\fakepath\apple-desk-laptop-working (1).jpg';
	//$data = base64_decode($img);	
	//file_put_contents('images/apple-desk-laptop-working.jpg', $img);
}

function upload_images(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());

	$img  = $param->name;
	$data = $param->img;
	$mode = $param->mode;	
	$newImg = $param->newImg;

	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);				
	file_put_contents('images/'.$mode.'/'.$img, $data);	
	rename('images/'.$mode.'/'.$img, 'images/'.$mode.'/'.$newImg);	
	$json_data['status'] = 'OK';
	echo json_encode($json_data);
}

function delete_images(){
	$request = Slim::getInstance()->request();
	$param = json_decode($request->getBody());

	$img  = $param->name;
	$mode = $param->mode;

	$json_data['pp'] = $param;	

	if(file_exists('images/'.$mode.'/'.$img)){
		@unlink('images/'.$mode.'/'.$img);
		$json_data['result'] = 'ok';
	}  else {
		$json_data['result'] = 'no';	
	}
	
	echo json_encode($json_data); 
}