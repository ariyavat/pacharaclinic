import React from 'react'
import Router from 'next/router'
import moment from 'moment';

import UploadImg from './UploadImg'

import { updateOrder, uploadImgimage } from '../../utils/OrderAPI'

import * as config from '../../config';
const imgURL = `${config.init.web_url}api/images/slip/`;


import { updateCustomer } from '../../utils/CustomerAPI'
export default class Member extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false, pay_date: '', pay_time: '', pay_total: '', 
	  uploadedFile: {
	    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
	  },
      member: [
        {id:'S', name:'SILVER MEMBER', discount: 5, free: 1, img: '../static/img/mem01.jpg', txt1: 'ทันทีที่เปิดสมาชิก SILVER MEMBER', txt2:'NONE' },
        {id:'G', name:'GOLD MEMBER', discount: 10, free: 2, img: '../static/img/mem02.jpg', txt1:'สะสมยอดซื้อครบ 50,000 บาท', txt2:'ในปีถัดไปจะยกระดับของท่านเป็น GOLD MEMBER' },
        {id:'D', name:'DIAMOND MEMBER', discount: 10, free: 2, img: '../static/img/mem04.jpg', txt1:'สะสมยอดซื้อครบ 150,000 บาท', txt2:'ในปีถัดไปจะยกระดับของท่านเป็น DIAMOND MEMBER' }
      ]
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {  
    let data = JSON.parse(localStorage.getItem('ms_profile'));
  	this.setState({data: data, pay_date: moment().format('DD-MM-YYYY')})
  }

  handlePayment(e){
  	e.preventDefault()
  	const item = this.state

  	if(item.pay_total !== ''){
  	if(item.pay_date !== ''){  
  	if(item.pay_time !== ''){
  	if(item.uploadedFile.file !== null){

  		let file = item.uploadedFile
		let _this = this; 
		let slip = 'no'; 
	    let txt = file.img.split(".");
	    let imgName = 'P'+item.data.uid+'.'+txt[1];
	    slip = imgName;

	    let imgdata = {
	      img: file.imagePreviewUrl,
	      name: file.img,
	      mode: 'slip',
	      newImg: imgName,
	      edit_img: false,
	    };
	    
	    uploadImgimage(imgdata)
	    .then(function(response) {


	  		let temp = { member: 'PAYMENT', mem_paydate: item.pay_date, mem_paytime: item.pay_time, mem_payment: item.pay_total, slip:slip   }
	  		let data = { data: temp, uid: item.data.uid  }
			updateCustomer(data)
		  	.then(function(results) {  
		  		if (results.data.status === '200') {   
					Router.push({
					    pathname: '/profile',
					    query: { member: 'payment' }
					})
		  		} else {
		  			show_err('warning',results.data.msg); 	
		  		}
		  	});	



	    })


	} else { show_err('warning','ยังไม่ได้อัพโหลดสลิปการโอน!')  }  
	} else { show_err('warning','ยังไม่ได้กรอกเวลาที่โอน!')  }  
  	} else { show_err('warning','ยังไม่ได้กรอกวันที่โอน!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกจำนวนเงินโอน!')  }

  }

  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }

  render () {
    const item = this.state

	return(
	<section className="bg-White sectionTop" >
		<h3>ชำระเงินค่าสมัครสมาชิก</h3>
        <div className="row">   
        	<div className="col-md-6">
				<div className="row"> 
					<div className="col-md-12 bg-cart-gray min-200">
		        	    <br/>
		        		<h3>โอน / ชำระผ่านช่องทางธนาคาร</h3>
						<div className="row font-30"> 
							<div className="col-sm-5 text-right">ธนาคาร : </div>
							<div className="col-sm-7">กรุงไทย</div>
						</div>
						<div className="row font-30"> 
							<div className="col-sm-5 text-right">เลขบัญชี : </div>
							<div className="col-sm-7">989-8-7855772</div>
						</div>
						<div className="row font-30"> 
							<div className="col-sm-5 text-right">ชื่อบัญชี : </div>
							<div className="col-sm-7">บจ.พชรคลินิก</div>
						</div>
						<br/><br/>
						<h3>แจ้งชำระเงิน</h3>
		  	        	<div className="row">            
			  	        	<div className="col-sm-12 bg-cart-gray min-400">	 	  
					            <form role="form">

									<div className="row "> 
										<div className="col-md-6">
							                <div className="form-group mgt-30">
							                  <label>จำนวนเงินที่โอน</label>
							                  <input type="text" className="form-control reg_inp" id="paytotal" autoComplete="off" 
							                  	value={item.pay_total}                  
		                  						onChange={(e) => this.setState({pay_total: e.target.value})}/>
							                </div>
										</div>						
									</div>
									<div className="row "> 
										<div className="col-md-6">
							                <div className="form-group mgt-30">
							                  <label>วันที่โอน</label>
							                  <input type="text" className="form-control reg_inp" id="paydate" autoComplete="off" 
							                  	value={item.pay_date}                  
		                  						onChange={(e) => this.setState({pay_date: e.target.value})}/>
							                </div>
										</div>
										<div className="col-md-6">
							                <div className="form-group mgt-30">
							                  <label>เวลาโอน</label>
							                  <input type="text" className="form-control reg_inp" id="pay_time" autoComplete="off"  
							                  	value={item.pay_time}                  
		                  						onChange={(e) => this.setState({pay_time: e.target.value})}/>
							                </div>	
										</div>
									</div>



									<UploadImg 
										imgURL={imgURL}
				                        isEdit={false}
				                        data={this.state.uploadedFile}
				                        onImgChage={this.handleImageChange.bind(this)} />
					        

					            </form>	
					            <br/>
			  	        	</div>
			  	        </div>  




					</div>
				</div>
	  	        <div className="row">            
	  	        	<div className="col-sm-12 bg-red text-center">
	  	        		<button className="btn-buy" onClick={this.handlePayment.bind(this)}>
							แจ้งชำระเงินค่าสมัครสมาชิก
	  	        		</button>
	  	        		
	  	        	</div>
	  	        </div>


  	        </div>    
        	<div className="col-md-5 offset-md-1">
				<div className="row"> 
					<div className="col-md-12 bg-cart-gray ">
		        	    <br/>		        		
						<div className="row"> 
							<div className="col-sm-12"><h5>ข้อมูลสมาชิก</h5></div>
						</div>
					
						<hr/>
			            <div className="row">   
			              <div className="col-md-12 mgt-10">
			                <p>Silver member ทันทีที่เปิดบัตรสมาชิก Silver member รับส่วนลดทันที 5% สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก รับสิทธิ์เพิ่มทรีทเมนท์ ฟรีอีก 1 ครั้ง สำหรับการซื้อคอร์ส</p>
			                <p>Gold member ท่านสมาชิกสะสมยอดซื้อครบ 50,000 บาท จะยกระดับสมาชิกของท่านเป็น Gold member ทันที รับส่วนลดทันที 10% สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก รับสิทธิ์เพิ่มทรีทเมนท์ ฟรีอีก 2 ครั้ง สำหรับการซื้อคอร์ส</p>
			                <p>Diamond member ท่านสมาชิกสะสมยอดซื้อครบ 150,000 บาท จะยกระดับสมาชิกของท่านเป็น Diamond member ทันที รับส่วนลดทันที 10% สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก รับสิทธิ์เพิ่มทรีทเมนท์ ฟรีอีก 2 ครั้ง สำหรับการซื้อคอร์ส รับสทธิ์ทรีทเมนท์ฟรี 1 ครั้ง ในเดือนเกิด</p>
			                <br/><h4>ค่าสมัครสมาชิก  <span className="txt-red">100</span> บาท</h4>
			       

			              </div> 
			            </div>
						<br/>	
				
					
					</div>
				</div>



	

  	        </div> 


        </div>  
		<br/><br/>
	</section>
	)   
  }

 //
  getDatas(){
  	/*
    const _this = this
    getPromotions('WEB','-','-')
    .then(function(response) {         
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
    */
  }



}