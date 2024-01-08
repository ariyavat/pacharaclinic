import React from 'react'
import Router from 'next/router'
export default class ProfileMember extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false,
      member: [
        {id:'S', name:'SILVER MEMBER', discount: 5, free: 1, img: '../static/img/mem01.jpg', txt1: 'ทันทีที่เปิดสมาชิก SILVER MEMBER', txt2:'NONE' },
        {id:'G', name:'GOLD MEMBER', discount: 10, free: 2, img: '../static/img/mem02.jpg', txt1:'สะสมยอดซื้อครบ 50,000 บาท', txt2:'ในปีถัดไปจะยกระดับของท่านเป็น GOLD MEMBER' },
        {id:'P', name:'PLATINUM MEMBER', discount: 15, free: 3, img: '../static/img/mem03.jpg', txt1:'สะสมยอดซื้อครบ 150,000 บาท', txt2:'ในปีถัดไปจะยกระดับของท่านเป็น PLATINUM MEMBER' }
      ]
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
  	//
  }


  handleSubmit(e){
  	e.preventDefault()

  }


  render () {
    const item = this.state
  
	return(
	<div>		
        <div className="row">   
        	<div className="col-md-12">
            <h4 className="txt-gn">เลขสมาชิก HN 123213123  Silver Member</h4>
            <h4>ยอดการซื้อสะสม  40,000.00 บาท</h4>
          </div> 
        </div>  
        <div className="row">   
          <div className="col-md-4"><img className="d-block w-100" src={item.member[0].img} /></div> 
        </div> 
        <div className="row">   
          <div className="col-md-12 mgt-20 font-17">
            <span className="20"><b>ปัจจุบันท่านเป็นสมาชิก  {item.member[0].name}</b></span><br/>
            <span>รับส่วนลดทันที {item.member[0].discount}% สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก</span><br/>
            <span>รับสิทธิ์เพิ่มทรีทเมนท์ ฟรี อีก {item.member[0].free} ครั้ง สำหรับการซื้อคอร์ส</span>
          </div> 
        </div> 
        <br/><br/>
        <div className="row">   
          <div className="col-md-12 mgt-10">
            <b>เงื่อนไขและเอกสิทธิ์พิเศษสำหรับคุณโดยเฉพาะ</b><br/>
            โดยกำหนดตัดยอดการสะสม 1 ปีหลังจากที่ถือบัตร
          </div> 
        </div> 

        <div className="row">   
          <div className="col-md-4">
            <div className="row">   
              <div className="col-md-12"><img className="d-block w-100" src={item.member[0].img} /></div> 
            </div> 
            <div className="row">   
              <div className="col-md-12 font-13">
                <b>{item.member[0].name}</b><br/>
                <small>
                {item.member[1].txt1}<br/>                             
                <b>รับส่วน {item.member[0].discount}%</b> สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก<br/>
                <b>รับสิทธิ์เพิ่มทรีทเมนท์ ฟรี อีก {item.member[0].free} ครั้ง สำหรับการซื้อคอร์ส </b>    
                </small>           
              </div> 
            </div> 
          </div> 
          <div className="col-md-4">
            <div className="row">   
              <div className="col-md-12"><img className="d-block w-100" src={item.member[1].img} /></div> 
            </div> 
            <div className="row">   
              <div className="col-md-12 font-13">
                <b>{item.member[1].name}</b><br/>
                <small>
                {item.member[1].txt1}<br/>
                {item.member[1].txt2}<br/>
                <b>รับส่วน {item.member[1].discount}%</b> สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก<br/>
                <b>รับสิทธิ์เพิ่มทรีทเมนท์ ฟรี อีก {item.member[1].free} ครั้ง สำหรับการซื้อคอร์ส </b>    
                </small>                  
              </div> 
            </div> 
          </div>  
          <div className="col-md-4">
            <div className="row">   
              <div className="col-md-12"><img className="d-block w-100" src={item.member[2].img} /></div> 
            </div> 
            <div className="row">   
              <div className="col-md-12 font-13">
                <b>{item.member[2].name}</b><br/>
                <small>
                {item.member[2].txt1}<br/>
                {item.member[2].txt2} <br/>               
                <b>รับส่วน {item.member[2].discount}%</b> สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก<br/>
                <b>รับสิทธิ์เพิ่มทรีทเมนท์ ฟรี อีก {item.member[2].free} ครั้ง สำหรับการซื้อคอร์ส </b>    
                </small>                  
              </div> 
            </div> 
          </div> 
        </div> 
		    <br/>
	</div>
	)   
  }

}