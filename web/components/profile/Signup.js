import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import Cleave from 'cleave.js/react'

import { createCustomer, chkCustomer, mDetailCustomer } from '../../utils/CustomerAPI'
export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false, oidcard: '', otel: '', 
      uid:'',id:'-', username:'', password:'', add_date:'', title:'', fname:'', lname:'', nname:'', fullname: '',
      nationality:'', idcard:'', dob:'', dd:'', dm:'', address:'', tm:'', am:'', province:'', zip:'', 
      tel:'', email:'', facebook:'', lineID:'',occupation:'',occ_address:'', druge:'', food:'',color:'',member: 'NONE',
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
  	console.log('xx',this.props.mode)
  }

  handleShowDetail(e){
  	e.preventDefault()
  	const _this = this;
  	const item = this.state
  	if(item.oidcard !== '' || item.otel !== ''){
  		let code = item.oidcard, tel = item.otel 
  		//if(item.otel !== ''){ code =  item.otel  }
  		let data = { code: code, tel: tel    }
	    mDetailCustomer(data)
	    .then(function(results) {    
	      if (results.data.status === '200') {
	      	let customer = results.data.data


	  		let uid = Math.random().toString(36).substring(7)+moment().format('DDMMYYYYHmmss');
		    let data = {
	      		uid: uid,
	      		id:customer.id, 
	      		username:'-', 
	      		password:'-', 
	      		add_date: moment(), 
	      		title: customer.title, 
	      		fname: customer.fname, 
	      		lname: customer.lname, 
	      		nname: customer.nname, 
	      		fullname:  customer.fullname,
	      		nationality: customer.nationality, 
	      		idcard: customer.idcard, 
	      		dob: customer.dob, 
	      		dd: customer.dd, 
	      		dm: customer.dm, 
	      		address: customer.address, 
	      		tm: customer.tm, 
	      		am: customer.am, 
	      		province: customer.province, 
	      		zip: customer.zip, 
	      		tel: customer.tel, 
	      		email: customer.email, 
	      		facebook: customer.facebook, 
	      		lineID: customer.lineID,
	      		occupation: customer.occupation,
	      		occ_address: customer.occ_address, 
	      		druge: customer.druge, 
	      		food: customer.food,
	      		color: customer.color,
	      		member: 'MEMBER',
		    } 			
		    let cdata = {
		    	mode: 'user', idcard: item.oidcard, tel: item.otel
		    }

		    console.log(cdata)
		    chkCustomer(cdata)
		    .then(function(results) {  console.log('vvv',results)
		      if (results.data.status === '200') {
	 			localStorage.setItem('ms_signup', JSON.stringify(data));  
		       
				Router.push({
				    pathname: '/profile',
				    query: { auth: 'setnewauth' }
				})

		      } else {
		      	show_err('warning',results.data.msg); 
		      }

		    });	

	      } else {
	      	show_err('warning',results.data.msg); 
	      }

	    });

  	} else {  show_err('warning','ยังไม่ได้กรอกเลขที่บัตรประชาชน หรือ เบอร์โทร!')   }

  }

  handleSubmit(e){
  	e.preventDefault()
  	const item = this.state
  
  	if(item.title !== ''){
  	if(item.fname !== ''){
  	if(item.lname !== ''){
  	if(item.idcard !== ''){
  	if(item.dob !== ''){
  	if(item.address !== ''){
  	if(item.tm !== ''){
  	if(item.am !== ''){
  	if(item.province !== ''){
  	if(item.zip !== ''){
  	if(item.tel !== ''){
  	if(item.email !== ''){
  		//console.log('DOB',item.dob, )
  		let uid = Math.random().toString(36).substring(7)+moment().format('DDMMYYYYHmmss');
  	
	    const _this = this;
	    let data = {
      		uid: uid,
      		id:'none', 
      		username:'-', 
      		password:'-', 
      		add_date: moment(), 
      		title: item.title, 
      		fname: item.fname, 
      		lname: item.lname, 
      		nname: item.nname, 
      		fullname:  item.title+item.fname+'    '+item.lname,
      		nationality: item.nationality, 
      		idcard: item.idcard, 
      		dob: item.dob, 
      		dd: item.dob.substring(0, 2), 
      		dm: item.dob.substring(2, 2), 
      		address: item.address, 
      		tm: item.tm, 
      		am: item.am, 
      		province: item.province, 
      		zip: item.zip, 
      		tel: item.tel, 
      		email: item.email, 
      		facebook: item.facebook, 
      		lineID: item.lineID,
      		occupation: item.occupation,
      		occ_address: item.occ_address, 
      		druge: item.druge, 
      		food: item.food,
      		color: item.color,
      		member: 'NONE',
	    }

	    let cdata = {
	    	mode: 'user', idcard: item.idcard, tel: item.tel
	    }
	    chkCustomer(cdata)
	    .then(function(results) { 	   
	      if (results.data.status === '200') {
 			localStorage.setItem('ms_signup', JSON.stringify(data));  
	       
			Router.push({
			    pathname: '/profile',
			    query: { auth: 'setnewauth' }
			})

	      } else {
	      	show_err('warning',results.data.msg); 
	      }

	    });
	} else { show_err('warning','ยังไม่ได้กรอก Email!')  }
  	} else { show_err('warning','ยังไม่ได้กรอกเบอร์โทร!')  } 
  	} else { show_err('warning','ยังไม่ได้กรอกรหัสไปรษณีย์!')  } 
  	} else { show_err('warning','ยังไม่ได้กรอกจังหวัด!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกอำเภอ!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกตำบล!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกที่อยู่!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกวันเกิด!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกเลขที่บัตรประชาชน!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกสกุล!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกชื่อ!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกคำนำหน้า!')  }
  	
  	
  }


  render () {
    const item = this.state
    const { mode } = this.props
  
	return(
	<section className="bg-White sectionTop" >
		
	        <div className="row">   
	        	<div className="col-sm-12">
	        	<div className="row">
	        		<div className="col-md-12 text-center">
	        			<div className="profile-userb"><i className="fa fa-user"></i></div>
	        			<span className="font-40 txt-gn mgl-10">ลงทะเบียน</span>
	        		</div>
	        	</div>
				
				<div className="row">            
	  	        	<div className="col-md-12 bg-cart-gray pad-10"> 
	  	        	<form role="form">
	  	        	{
	  	        		mode === 'OLD' ?
	  	        	    <div>
		  	        	    <strong>ลูกค้าเก่าคลินิก</strong> <small>กรอกเบอร์โทร หรือ เลขที่บัตรประชาชน เพื่อแสดงข้อมูล</small>	  	        	   
							<div className="row mgt-10 xs-hideen">            
				  	        	<div className="col-md-2 text-right">เลขที่บัตรประชาชน</div>
				  	        	<div className="col-md-3">
				  	        		<Cleave className="reg_inp" placeholder="" name="oidcard" id="oidcard"
							                options={{blocks: [1, 4, 5, 2, 1], delimiter: '-', numericOnly: true}}
							                value={item.oidcard}  
							                onChange={(e) => this.setState({oidcard: e.target.value})} />
				  	        	</div>
				  	        	<div className="col-md-2">หรือ <span className="pull-right">เบอร์โทร</span></div>
				  	        	<div className="col-md-2">
				  	        		<Cleave className="reg_inp" placeholder="" name="otel" id="otel"
							                options={{blocks: [3, 3, 4], delimiter: '-', numericOnly: true}}
							                value={item.otel}  
							                onChange={(e) => this.setState({otel: e.target.value})} />
				  	        	</div>
				  	        	<div className="col-md-2">
									<button className="btn btn-info" onClick={this.handleShowDetail.bind(this)} >
									  <i className="fa fa-search" />	ตรวจสอบข้อมูล
				  	        		</button>
				  	        	</div>
				  	        </div>

							<div className="row mgt-10 xs-visible">            
				  	        	<div className="col-6 pad-top-10">เลขที่บัตรประชาชน</div>
				  	        	<div className="col-6">
				  	        		<Cleave className="reg_inp" placeholder="" name="oidcard" id="oidcard"
							                options={{blocks: [1, 4, 5, 2, 1], delimiter: '-', numericOnly: true}}
							                value={item.oidcard}  
							                onChange={(e) => this.setState({oidcard: e.target.value})} />
				  	        	</div>
				  	        	<div className="col-6 pad-top-10">หรือ  เบอร์โทร</div>
				  	        	<div className="col-6">
				  	        		<Cleave className="reg_inp" placeholder="" name="otel" id="otel"
							                options={{blocks: [3, 3, 4], delimiter: '-', numericOnly: true}}
							                value={item.otel}  
							                onChange={(e) => this.setState({otel: e.target.value})} />
				  	        	</div>
				  	        	<div className="col-12 text-center mgt-10">
									<button className="btn btn-info" onClick={this.handleShowDetail.bind(this)} >
									  <i className="fa fa-search" />	ตรวจสอบข้อมูล
				  	        		</button>
				  	        	</div>
				  	        </div>
			  	        </div>

	  	        		: 

			  	       	<div>
				  	        <strong>รายละเอียดการลงทะเบียน</strong> <small>สำหรับทั่วไปที่ยังไม่เคยใช้บริการกับคลินิก</small>
							<div className="row mgt-10 xs-hideen"> 
								<div className="col-12">



									<div className="row mgt-10">            
						  	        	<div className="col-2 text-right pad-top-10">คำนำหน้า *</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="title" id="title" autoComplete="off" 
													value={item.title}                  
			                  						onChange={(e) => this.setState({title: e.target.value})}/>
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">ชื่อ *</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="fname" id="fname" autoComplete="off" 
								                  	value={item.fname}                  
			                  						onChange={(e) => this.setState({fname: e.target.value})}/>
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">นามสกุล *</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="lname" id="lname" autoComplete="off" 
								                    value={item.lname}                  
			                  						onChange={(e) => this.setState({lname: e.target.value})} />
						  	        	</div>			  	        				  	        
						  	        </div>	
									<div className="row mgt-10">            
						  	        	<div className="col-2 text-right pad-top-10">ชื่อเล่น</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="nname" id="nname" autoComplete="off" 
								                  	value={item.nname}                  
			                  						onChange={(e) => this.setState({nname: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">สัญชาติ</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="nationality" id="nationality" autoComplete="off" 
								                  value={item.nationality}                  
			                  					  onChange={(e) => this.setState({nationality: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">เลขที่บัตรประชาชน *</div>
						  	        	<div className="col-2">
						  	        		<Cleave className="reg_inp" placeholder="" name="idcard" id="idcard"
									                options={{blocks: [1, 4, 5, 2, 1], delimiter: '-', numericOnly: true}}
									                value={item.idcard}  
									                onChange={(e) => this.setState({idcard: e.target.value})} />
						  	        	</div>			  	        				  	        
						  	        </div>
						  	        <div className="row mgt-10">            
						  	        	<div className="col-2 text-right pad-top-10">วันเกิด *</div>
						  	        	<div className="col-2">
						  	        		<Cleave className="reg_inp" placeholder="" name="dob" id="dob"
									                options={{blocks: [2, 2, 4], delimiter: '-', numericOnly: true}}
									                value={item.dob}  
									                onChange={(e) => this.setState({dob: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">ที่อยู่ *</div>
						  	        	<div className="col-6">
						  	        		<input type="text" className="reg_inp" name="address" id="address" autoComplete="off" 
								                  value={item.address}                  
			                  					  onChange={(e) => this.setState({address: e.target.value})} />
						  	        	</div>		  	        				  	        
						  	        </div>
									<div className="row mgt-10">            
						  	        	<div className="col-2 text-right pad-top-10">ตำบล *</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="tm" id="tm" autoComplete="off" 
								                  value={item.tm}                  
			                  					  onChange={(e) => this.setState({tm: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">อำเภอ *</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="am" id="am" autoComplete="off" 
								                  value={item.am}                  
			                  					  onChange={(e) => this.setState({am: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">จังหวัด *</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="province" id="province" autoComplete="off" 
								                  value={item.province}                  
			                  					  onChange={(e) => this.setState({province: e.target.value})} />
						  	        	</div>			  	        				  	        
						  	        </div>	
						  	        <div className="row mgt-10">            
						  	        	<div className="col-2 text-right pad-top-10">รหัสไปรษณีย์ *</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="zip" id="zip" autoComplete="off" 
								                  value={item.zip}                  
			                  					  onChange={(e) => this.setState({zip: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">เบอร์โทร *</div>
						  	        	<div className="col-2">
						  	        		<Cleave className="reg_inp" placeholder="" name="tel" id="tel"
									                options={{blocks: [3, 3, 4], delimiter: '-', numericOnly: true}}
									                value={item.tel}  
									                onChange={(e) => this.setState({tel: e.target.value})} />	
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">อีเมล์</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="email" id="email" v="off" 
								                  value={item.email}                  
			                  					  onChange={(e) => this.setState({email: e.target.value})} />
						  	        	</div>			  	        				  	        
						  	        </div>	  
						  	        <div className="row mgt-10">            
						  	        	<div className="col-2 text-right pad-top-10">Facebook</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="facebook" id="facebook" autoComplete="off" 
								                  value={item.facebook}                  
			                  					  onChange={(e) => this.setState({facebook: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">Line ID</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="lineID" id="lineID" autoComplete="off" 
								                  value={item.lineID}                  
			                  					  onChange={(e) => this.setState({lineID: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">อาชีพ</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="occupation" id="occupation" autoComplete="off" 
								                  value={item.occupation}                  
			                  					  onChange={(e) => this.setState({occupation: e.target.value})} />
						  	        	</div>			  	        				  	        
						  	        </div>	     
						  	        <div className="row mgt-10">            
						  	        	<div className="col-2 text-right pad-top-10">สถานที่ทำงาน</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="occ_address" id="occ_address" autoComplete="off" 
								                  value={item.occ_address}                  
			                  					  onChange={(e) => this.setState({occ_address: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">แพ้ยา</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="druge" id="druge" autoComplete="off" 
								                  value={item.druge}                  
			                  					  onChange={(e) => this.setState({druge: e.target.value})} />
						  	        	</div>
						  	        	<div className="col-2 text-right pad-top-10">อาหารที่ชอบ</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className="reg_inp" name="food" id="food" autoComplete="off" 
								                  value={item.food}                  
			                  					  onChange={(e) => this.setState({food: e.target.value})} />
						  	        	</div>			  	        				  	        
						  	        </div>
						  	        <div className="row mgt-10">            
						  	        	<div className="col-2 text-right pad-top-10">สีที่ชอบ</div>
						  	        	<div className="col-2">
						  	        		<input type="text" className=" reg_inp" name="color" id="color" autoComplete="off" 
								                  value={item.color}                  
			                  					  onChange={(e) => this.setState({color: e.target.value})} />
						  	        	</div>
						  	      		  	        				  	        
						  	        </div>


								</div>
							</div>


						<div className="row mgt-10 xs-visible"> 
							<div className="col-12">


								<div className="row mgt-10">            
					  	        	<div className="col-4 text-right pad-top-10">คำนำหน้า *</div>
					  	        	<div className="col-5">
					  	        		<input type="text" className="reg_inp" name="title" id="title" autoComplete="off" 
												value={item.title}                  
		                  						onChange={(e) => this.setState({title: e.target.value})}/>
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">ชื่อ *</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="fname" id="fname" autoComplete="off" 
							                  	value={item.fname}                  
		                  						onChange={(e) => this.setState({fname: e.target.value})}/>
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">นามสกุล *</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="lname" id="lname" autoComplete="off" 
							                    value={item.lname}                  
		                  						onChange={(e) => this.setState({lname: e.target.value})} />
					  	        	</div>			  	        				  	        
					  	          
					  	        	<div className="col-4 text-right pad-top-10">ชื่อเล่น</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="nname" id="nname" autoComplete="off" 
							                  	value={item.nname}                  
		                  						onChange={(e) => this.setState({nname: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">สัญชาติ</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="nationality" id="nationality" autoComplete="off" 
							                  value={item.nationality}                  
		                  					  onChange={(e) => this.setState({nationality: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">บัตรประชาชน *</div>
					  	        	<div className="col-8">
					  	        		<Cleave className="reg_inp" placeholder="" name="idcard" id="idcard"
								                options={{blocks: [1, 4, 5, 2, 1], delimiter: '-', numericOnly: true}}
								                value={item.idcard}  
								                onChange={(e) => this.setState({idcard: e.target.value})} />
					  	        	</div>			  	        				  	        
					  	                    
					  	        	<div className="col-4 text-right pad-top-10">วันเกิด *</div>
					  	        	<div className="col-8">
					  	        		<Cleave className="reg_inp" placeholder="" name="dob" id="dob"
								                options={{blocks: [2, 2, 4], delimiter: '-', numericOnly: true}}
								                value={item.dob}  
								                onChange={(e) => this.setState({dob: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">ที่อยู่ *</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="address" id="address" autoComplete="off" 
							                  value={item.address}                  
		                  					  onChange={(e) => this.setState({address: e.target.value})} />
					  	        	</div>		  	        				  	        
					  	                 
					  	        	<div className="col-4 text-right pad-top-10">ตำบล *</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="tm" id="tm" autoComplete="off" 
							                  value={item.tm}                  
		                  					  onChange={(e) => this.setState({tm: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">อำเภอ *</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="am" id="am" autoComplete="off" 
							                  value={item.am}                  
		                  					  onChange={(e) => this.setState({am: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">จังหวัด *</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="province" id="province" autoComplete="off" 
							                  value={item.province}                  
		                  					  onChange={(e) => this.setState({province: e.target.value})} />
					  	        	</div>			  	        				  	        
					  	                 
					  	        	<div className="col-4 text-right pad-top-10">รหัสไปรษณีย์ *</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="zip" id="zip" autoComplete="off" 
							                  value={item.zip}                  
		                  					  onChange={(e) => this.setState({zip: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">เบอร์โทร *</div>
					  	        	<div className="col-8">
					  	        		<Cleave className="reg_inp" placeholder="" name="tel" id="tel"
								                options={{blocks: [3, 3, 4], delimiter: '-', numericOnly: true}}
								                value={item.tel}  
								                onChange={(e) => this.setState({tel: e.target.value})} />	
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">อีเมล์</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="email" id="email" v="off" 
							                  value={item.email}                  
		                  					  onChange={(e) => this.setState({email: e.target.value})} />
					  	        	</div>			  	        				  	        
					  	                
					  	        	<div className="col-4 text-right pad-top-10">Facebook</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="facebook" id="facebook" autoComplete="off" 
							                  value={item.facebook}                  
		                  					  onChange={(e) => this.setState({facebook: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">Line ID</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="lineID" id="lineID" autoComplete="off" 
							                  value={item.lineID}                  
		                  					  onChange={(e) => this.setState({lineID: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">อาชีพ</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="occupation" id="occupation" autoComplete="off" 
							                  value={item.occupation}                  
		                  					  onChange={(e) => this.setState({occupation: e.target.value})} />
					  	        	</div>			  	        				  	        
					  	               
					  	        	<div className="col-4 text-right pad-top-10">สถานที่ทำงาน</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="occ_address" id="occ_address" autoComplete="off" 
							                  value={item.occ_address}                  
		                  					  onChange={(e) => this.setState({occ_address: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">แพ้ยา</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="druge" id="druge" autoComplete="off" 
							                  value={item.druge}                  
		                  					  onChange={(e) => this.setState({druge: e.target.value})} />
					  	        	</div>
					  	        	<div className="col-4 text-right pad-top-10">อาหารที่ชอบ</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className="reg_inp" name="food" id="food" autoComplete="off" 
							                  value={item.food}                  
		                  					  onChange={(e) => this.setState({food: e.target.value})} />
					  	        	</div>			  	        				  	        
					  	           
					  	        	<div className="col-4 text-right pad-top-10">สีที่ชอบ</div>
					  	        	<div className="col-8">
					  	        		<input type="text" className=" reg_inp" name="color" id="color" autoComplete="off" 
							                  value={item.color}                  
		                  					  onChange={(e) => this.setState({color: e.target.value})} />
					  	        	</div>
					  	      		  	        				  	        
					  	        </div>


							</div>						

						</div>	

						</div>
	  	        	}


		     


			  	    </form>
	  	        	</div>
	  	        </div>


	  	        <div className="row">            
	  	        	<div className="col-md-4 offset-sm-4  text-center mgt-30">
		  	        	<div className="row">            
			  	        	<div className="col-sm-11 " >
			  	        		<button className="btn btn-block btn-signup" onClick={this.handleSubmit.bind(this)} >
									ยืนยัน
			  	        		</button>
			  	        	</div>
			  	        </div>  
	  	        	</div>
	  	        </div>

	        	</div> 
	        </div>  
		<br/><br/><br/><br/>
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