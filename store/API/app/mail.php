<?php

function sendMail(){	
 	//require_once('mail/class.phpmailer.php');  
	//$request = Slim::getInstance()->request();
	//$param = json_decode($request->getBody()); 

  	
    $From = "ariyavatboonsang@gmail.com";       
    $FromName = "ผิวดีคลินิก"; 
    $Subject = 'ทดสอบ'; //$param->title; 
    $body = promotion_tpl('53453454');
    $tomail = "info@memorysoftthailand.com";

    $status =  send_mail($From,$FromName,$Subject,$body,$tomail);
        
    $json['status'] = $status;
    $json['message'] = 'Complete';   
    echo json_encode($json); 
      
}


function send_mail($From,$FromName,$Subject,$body,$tomail){
		require_once('mail/class.phpmailer.php'); 
         // สร้าง object class ครับ
        $mail = new PHPMailer();
  		$mail->CharSet = "utf-8";
  		$mail->IsHTML(true);  
      	$mail->IsSMTP(); // กำหนดว่าเป็น SMTP นะ

		$mail->SMTPAuth = true; // enable SMTP authentication 
		$mail->Host = "mail.pewdeelaser.com"; // sets GMAIL as the SMTP server 
		/*
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 465; 
		*/
      	$mail->Username = 'mkt@pewdeelaser.com'; // ต้องมีเมล์ของ gmail ที่สมัครไว้ด้วยนะครับ
      	$mail->Password = '1234567890'; // ใส่ password ที่เราจะใช้เข้าไปเช็คเมล์ที่ gmail ล่ะครับ
      	$mail->From = $From; // ใครเป็นผู้ส่ง
      	$mail->FromName = $FromName; // ชื่อผู้ส่งสักนิดครับ
      	$mail->Subject  = $Subject; // กำหนด subject ครับ
      	$mail->Body     =  $body; // ใส่ข้อความเข้าไปครับ
      	//$mail->AltBody =  $body;
      	$mail->AddAddress($tomail); // ส่งไปที่ใครดีครับ
      	
		if(!$mail->Send()) {		
			return 'NO';
		} else {			
			return 'OK';
		}
}


function promotion_tpl($img){

$txt = 
	'<div style="font-family:HelveticaNeue-Light,Arial,sans-serif;background-color:#eeeeee; padding:40px;">
	<table align="center" width="60%" border="0" cellspacing="0" cellpadding="0" bgcolor="#eeeeee">

		<tr>
			<td align="left"><h3>เรียน ลูกค้าผิวดีคลินิก</h3><br/></td>
		</tr>
		<tr>
			<td align="center">
				<img src="http://gfx.bloggar.aftonbladet-cdn.se/wp-content/blogs.dir/518/files/2015/12/jordan-1024x800.jpg" width="100%"/>
			</td>
		</tr>
		<tr>
			<td align="left">ขอแสดงความนับถือ<br/></td>
		</tr>
		<tr>
			<td align="left">ผิวดีคลินิก<br/></td>
		</tr>

	</table>
	</div>';


return $txt;
}