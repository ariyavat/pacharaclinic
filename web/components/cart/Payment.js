import React from 'react'
import Router from 'next/router'
import moment from 'moment';

import UploadImg from './UploadImg'

import { updateOrder, uploadImgimage } from '../../utils/OrderAPI'


import * as config from '../../config';
const imgURL = `${config.init.web_url}api/images/slip/`;



export default class Payment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      order: [], order_list:[], loading: false, pay_date: '', pay_time: '', pay_total: '', 
	  uploadedFile: {
	    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
	  }
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
  	let order = JSON.parse(localStorage.getItem('ms_order'));  
  	let order_list = JSON.parse(localStorage.getItem('ms_order_list')); 

  	this.setState({pay_date: moment().format('DD-MM-YYYY'), order: order, order_list: order_list})
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
	    let imgName = item.order.ino+'.'+txt[1];
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
	 
	      
	  		let temp = { 
	  			status: 'PAYMENT', pay_date: item.pay_date, 
	  			pay_time: item.pay_time, pay_total: item.pay_total,
	  			slip: slip   
	  		}
	  		let data = { data: temp, ino: item.order.ino, uid: item.order.uid  }
			updateOrder(data)
		  	.then(function(results) {  
		  		if (results.data.status === '200') {   
					Router.push({
					    pathname: '/cart',
					    query: { confirm: 'payment' }
					})
		  		} else {
		  			show_err('warning',results.data.msg); 	
		  		}
		  	});	



	    });

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
  	let sumQty = 0

  	const rows = item.order_list.map((row, i) => {   
  	  sumQty = sumQty + parseFloat(row.qty)
      return (  
		<div className="row" key={i} > 
			<div className="col-2 col-md-2"><img className="img-fluid img-thumbnail" src={row.img} /></div>
			<div className="col-10 col-md-10">
				{row.name}<br/>
				<small className="pull-left ">จำนวน {row.qty} </small>
				<small className="pull-right ">{parseFloat(row.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</small>
			</div>
		</div>  
      ) 
  	})  



	return(
	<section className="bg-White sectionTop" >
		<h5>เลือกช่องทางการชำระเงิน</h5>
        <div className="row">   
        	<div className="col-md-6 col-12">
				<div className="row"> 
					<div className="col-md-12 bg-cart-gray min-100">
		        	    <br/>
		        		<h5>โอน / ชำระผ่านช่องทางธนาคาร</h5>
						<div className="row font-20"> 
							<div className="col-5 col-sm-5 mgt-10 text-right">ธนาคาร : </div>
							<div className="col-7 col-sm-7 mgt-10">กรุงไทย</div>
						</div>
						<div className="row font-20"> 
							<div className="col-5 col-sm-5 mgt-10 text-right">เลขบัญชี : </div>
							<div className="col-7 col-sm-7 mgt-10">989-8-785772</div>
						</div>
						<div className="row font-20"> 
							<div className="col-5 col-sm-5 mgt-10 text-right">ชื่อบัญชี : </div>
							<div className="col-7 col-sm-7 mgt-10">บจ.พชรคลินิก</div>
						</div>
						<br/>
						<h5>แจ้งชำระเงิน</h5>
		  	        	<div className="row">            
			  	        	<div className="col-sm-12 bg-cart-gray min-400">	 	  
					            <form role="form">

									<div className="row "> 
										<div className="col-4">
							                <div className="form-group ">
							                  <label>จำนวนเงินที่โอน</label>
							                  <input type="text" className="form-control reg_inp" id="paytotal" autoComplete="off" 
							                  	value={item.pay_total}                  
		                  						onChange={(e) => this.setState({pay_total: e.target.value})}/>
							                </div>
										</div>						
						
										<div className="col-4">
							                <div className="form-group ">
							                  <label>วันที่โอน</label>
							                  <input type="text" className="form-control reg_inp" id="paydate" autoComplete="off" 
							                  	value={item.pay_date}                  
		                  						onChange={(e) => this.setState({pay_date: e.target.value})}/>
							                </div>
										</div>
										<div className="col-4">
							                <div className="form-group ">
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
							แจ้งชำระเงิน
	  	        		</button>
	  	        		
	  	        	</div>
	  	        </div>


  	        </div>    
        	<div className="col-md-5 offset-md-1">
				<div className="row"> 
					<div className="col-md-12 bg-cart-gray ">
		        	    <br/>		        		
						<div className="row"> 
							<div className="col-sm-12"><h5>เลขที่คำสั่งซื้อ  <span className="txt-red">{item.order.ino}</span></h5></div>
						</div>
						<div className="row"> 
							<div className="col-sm-12"><b>ข้อมูลลูกค้า</b></div>
						</div>
						<div className="row"> 
							<div className="col-sm-11 offset-md-1">
								{item.order.customer_name}<br/>
							 	เบอร์โทร :  {item.order.tel}<br/>
							 	ที่อยู่ :  {item.order.address} {item.order.zip}
							</div>
						</div>




						<div className="row"> 
							<div className="col-sm-8"><b>รายละเอียดการสั่งซื้อ</b></div>
						</div>
						<br/>
						{rows}						
						<hr/>
			  	        <div className="row">            
			  	        	<div className="col-sm-8">ยอดรวม {sumQty.toLocaleString('en-US', {minimumFractionDigits: 0})} ชิ้น</div>
			  	        	<div className="col-sm-4 text-right">{parseFloat(item.order.price_total).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
			  	        </div> 
			  	        <div className="row">            
			  	        	<div className="col-sm-8">ส่วนลด </div>
			  	        	<div className="col-sm-4 text-right">{parseFloat(item.order.price_dis).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
			  	        </div> 
			  	        <div className="row">            
			  	        	<div className="col-sm-8">ค่าจัดส่ง</div>
			  	        	<div className="col-sm-4 text-right">{parseFloat(item.order.price_send).toLocaleString('en-US', {minimumFractionDigits: 2})}</div> 
			  	        </div> 
			  	        <div className="row">            
			  	        	<div className="col-sm-12 mgt-40 text-right">
			  	        		<h4>ยอดรวมทั้งสิ้น&nbsp;&nbsp;&nbsp;<span className="txt-red">{ parseFloat(parseFloat(item.order.price_total) - parseFloat(item.order.price_dis) + parseFloat(item.order.price_send)).toLocaleString('en-US', {minimumFractionDigits: 2})}  บาท</span></h4>  
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