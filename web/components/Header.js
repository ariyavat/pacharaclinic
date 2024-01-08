import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = 'คลินิกเวชกรรมพชร เป็นคลินิกรักษาโรคผิวหนัง และศัลยกรรมตกแต่ง ให้บริการด้านเสริมความงาม โบทอกซ์ ปรับรูปหน้า โดยไม่ต้องศัลยกรรม ฟิลเลอร์เติมความงามใบหน้าให้สมส่วน ลบรอยเหี่ยวย่น รักษาสิว หน้าขาวกระจ่างใส กระชับรูขุมขน ลดรอยดำ-แดง ลดฝ้า จุดด่างดำ เลเซอร์ บำรุงผิวพรรณ หน้าเนียนนุ่ม ศัลยกรรมจมูก ปาก เสริมคาง กระพุ้งแก้ม ลดริ้วรอยหน้าผาก หางตา ปรับรูปหน้า วีเชฟ กระชับช่องคลอดร้อยไหม เวชสำอาง เป็นคลินิกศัลยกรรมความงาม มาตรฐานของเชียงใหม่'
const defaultOGURL = ''
const defaultOGImage = ''
const defaultTitle = 'พชรคลินิก Pachara Clinic คลินิกเวชกรรมพชร ศัลยกรรมเชียงใหม่ ปลูกผม เสริมจมูก ทำตา ยกหน้าแก้ไขหูกลาง เสริมคาง ผ่าตัดตกแต่งริมฝีปาก หน้าขาว สิว ฝ้า กระ'
const Header = (props) => (
  <NextHead>
    <meta charset="UTF-8" />
    <title>{props.title || defaultTitle}</title>
    <meta property="og:title" content="พชรคลินิก Pachara Clinic คลินิกเวชกรรมพชร ศัลยกรรมเชียงใหม่ ปลูกผม เสริมจมูก ทำตา ยกหน้าแก้ไขหูกลาง เสริมคาง ผ่าตัดตกแต่งริมฝีปาก หน้าขาว สิว ฝ้า กระ"/>
    <meta content="รักษาสิว,หน้าขาว,ลบริ้วรอย,ลดฝ้า,จุดด่างดำ,โบทอกซ์,หน้าผาก,หางตา,ตาสองชั้น,ศัลยกรรม.ปาก.จมูก,เสริมคาง,กระพุ้งแก้ม,กระชับช่องคลอด,โรคผิวหนั" name="keywords" />
    <meta name="description" content={props.description || defaultDescription} />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />

 
    <link href="/static/img/favicon.ico" rel="shortcut icon" />
    <link href="/static/img/apple-touch-icon.png" rel="apple-touch-icon" />  

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway%3A100%2C200%2C300%2C400%2C500%2C600%2C700%2C800%2C900%2C100italic%2C200italic%2C300italic%2C400italic%2C500italic%2C600italic%2C700italic%2C800italic%2C900italic%7CDroid%20Serif%3A400%2C700%2C400italic%2C700italic%7CLora%3A400%2C700%2C400italic%2C700italic%7CPrompt%3A400%7CPrompt%3A%7CPrompt%3Aregular&subset=" />
    <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet" />

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700" rel="stylesheet" />    
    <link href="/static/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/static/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="/static/lib/animate/animate.min.css" rel="stylesheet" />
    <link href="/static/lib/ionicons/css/ionicons.min.css" rel="stylesheet" />
    <link href="/static/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
    <link href="/static/lib/lightbox/css/lightbox.min.css" rel="stylesheet" />
    <link href="/static/lib/slider/build/horizontal.css" rel="stylesheet" />      
    <link href="/static/lib/react-alice-carousel/lib/alice-carousel.css" rel="stylesheet" /> 
    <link href="/static/lib/react-alice-carousel/lib/scss/alice-carousel.scss" rel="stylesheet" /> 
    <link href="/static/lib/zip/styles.css" rel="stylesheet" /> 
    <link href="/static/lib/video-react/video-react.css" rel="stylesheet" />
    <link href="/static/lib/date/react-datepicker.css" rel="stylesheet" /> 
    <link href="/static/lib/big-calendar/css/react-big-calendar.css" rel="stylesheet" /> 
    <link href="/static/css/style.css" rel="stylesheet" />


      <script src="/static/lib/jquery/jquery.min.js"></script>
      <script src="/static/lib/jquery/jquery-migrate.min.js"></script>
      <script src="/static/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/static/lib/easing/easing.min.js"></script>
      <script src="/static/lib/bootstrap-notify.min.js"></script>
      <script src="/static/lib/wow/wow.min.js"></script>
      <script src="/static/lib/waypoints/waypoints.min.js"></script>
      <script src="/static/lib/counterup/counterup.min.js"></script>
      <script src="/static/lib/owlcarousel/owl.carousel.min.js"></script>
      <script src="/static/lib/isotope/isotope.pkgd.min.js"></script>
      <script src="/static/lib/lightbox/js/lightbox.min.js"></script> 
      <script src="https://cdn.tiny.cloud/1/mxcpl55a7werymttd1geg83aimd57hwdiymw0dq0bxrg1qhi/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>


      <script src="/static/js/main.js"></script>

  <React.Fragment>
    <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '361256128915317');
      fbq('track', 'PageView');` }}
    />
    <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=361256128915317&ev=PageView&noscript=1" />` }}
    />
  </React.Fragment>


  </NextHead>
)

Header.propTypes = {
  title: string,
  description: string,
}

export default Header
