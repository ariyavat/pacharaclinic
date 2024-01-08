import React from 'react'
import Router from 'next/router'
import moment from 'moment';
import Cleave from 'cleave.js/react'

import { createCustomer, chkCustomer, getCustomer, updateCustomer } from '../../utils/CustomerAPI'
export default class Edit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false,
      uid:'',id:'-', username:'', password:'', add_date:'', title:'', fname:'', lname:'', nname:'', fullname: '',
      nationality:'', idcard:'', dob:'', dd:'', dm:'', address:'', tm:'', am:'', province:'', zip:'', 
      tel:'', email:'', facebook:'', lineID:'',occupation:'',occ_address:'', druge:'', food:'',color:'',member: 'NONE',
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }
  componentWillReceiveProps(nextProps){
  	this.getDatas()
   	//console.log('EDITSS','-'+nextProps.id+'-')    
  } 
  componentDidMount () {    	
  	this.getDatas()
  	//console.log('EDIT','-'+this.props.id+'-')
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

  		//console.log('DOB',item.dob, )
  		//let uid = Math.random().toString(36).substring(7)+moment().format('DDMMYYYYHmmss');
  	
	    const _this = this;
	    let temp = {
      		//uid: uid,
      		//id:'none', 
      		//username:'-', 
      		//password:'-', 
      		//add_date: moment(), 
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
      		//member: 'NONE',
	    }
	    let cdata = { data: temp, uid: item.uid}
		updateCustomer(cdata)
	  	.then(function(results) {  
	  		console.log('cc',results)
	  		if (results.data.status === '200') {   
	  			show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว'); 
				Router.push({
				    pathname: '/profile',
				    query: { uid: item.uid, view : 'detail', gid: '1' }
				})
	  		} else {
	  			show_err('warning',results.data.message); 	
	  		}
	  	});	


	    /*
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
	    */

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
  
	return(
	<section className="bg-White sectionTop" >
		
	        <div className="row">   
	        	<div className="col-sm-12">
	        	<div className="row">
	        		<div className="col-md-12 text-center">
	        			<div className="profile-userb"><i className="fa fa-user"></i></div>
	        			<span className="font-40 txt-gn mgl-10">แก้ไขข้อมูล</span>
	        		</div>
	        	</div>




	  	        <div className="row">            
	  	        	<div className="col-md-4"> 
			  	        <div className="row">            
			  	        	<div className="col-sm-11 bg-cart-gray min-500">	
					            <form role="form">			             
					                <div className="form-group mgt-20">
					                  <label >คำนำหน้า *</label>
					                  <input type="text" className="reg_inp" name="title" id="title" autoComplete="off" 
										value={item.title}                  
                  						onChange={(e) => this.setState({title: e.target.value})}/>
					                </div>
					                <div className="form-group">
					                  <label >ชื่อ *</label>
					                  <input type="text" className="reg_inp" name="fname" id="fname" autoComplete="off" 
					                  	value={item.fname}                  
                  						onChange={(e) => this.setState({fname: e.target.value})}/>
					                </div>
					                <div className="form-group">
					                  <label >สกุล *</label>
					                  <input type="text" className="reg_inp" name="lname" id="lname" autoComplete="off" 
					                    value={item.lname}                  
                  						onChange={(e) => this.setState({lname: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label >ชื่อเล่น </label>
					                  <input type="text" className="reg_inp" name="nname" id="nname" autoComplete="off" 
					                  	value={item.nname}                  
                  						onChange={(e) => this.setState({nname: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label >สัญชาติ</label>
					                  <input type="text" className="reg_inp" name="nationality" id="nationality" autoComplete="off" 
					                  value={item.nationality}                  
                  					  onChange={(e) => this.setState({nationality: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label>เลขที่บัตรประชาชน *</label>
									  <Cleave className="reg_inp" placeholder="" name="idcard" id="idcard"
						                options={{blocks: [1, 4, 5, 2, 1], delimiter: '-', numericOnly: true}}
						                value={item.idcard}  
						                onChange={(e) => this.setState({idcard: e.target.value})} />					                
					                </div>	
					                <div className="form-group">
					                  <label >วันเกิด *</label>
									  <Cleave className="reg_inp" placeholder="" name="dob" id="dob"
						                options={{blocks: [2, 2, 4], delimiter: '-', numericOnly: true}}
						                value={item.dob}  
						                onChange={(e) => this.setState({dob: e.target.value})} />					          
					                </div>	
									<br/>

					            </form>	
			  	        	</div>
			  	        </div>  
	  	        	</div>
	  	        	<div className="col-md-4"> 
		  	        <div className="row">            
			  	        	<div className="col-sm-11 bg-cart-gray min-500">	 	  
					            <form role="form">			             
					                <div className="form-group mgt-20">
					                  <label >ที่อยู่ *</label>
					                  <input type="text" className="reg_inp" name="address" id="address" autoComplete="off" 
					                  value={item.address}                  
                  					  onChange={(e) => this.setState({address: e.target.value})} />
					                </div>
					                <div className="form-group">
					                  <label >ตำบล *</label>
					                  <input type="text" className="reg_inp" name="tm" id="tm" autoComplete="off" 
					                  value={item.tm}                  
                  					  onChange={(e) => this.setState({tm: e.target.value})} />
					                </div>
					                <div className="form-group">
					                  <label >อำเภอ *</label>
					                  <input type="text" className="reg_inp" name="am" id="am" autoComplete="off" 
					                  value={item.am}                  
                  					  onChange={(e) => this.setState({am: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label >จังหวัด *</label>
					                  <input type="text" className="reg_inp" name="province" id="province" autoComplete="off" 
					                  value={item.province}                  
                  					  onChange={(e) => this.setState({province: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label >รหัสไปรษณีย์ *</label>
					                  <input type="text" className="reg_inp" name="zip" id="zip" autoComplete="off" 
					                  value={item.zip}                  
                  					  onChange={(e) => this.setState({zip: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label >เบอร์โทร *</label>
					                  <Cleave className="reg_inp" placeholder="" name="tel" id="tel"
						                options={{blocks: [3, 3, 4], delimiter: '-', numericOnly: true}}
						                value={item.tel}  
						                onChange={(e) => this.setState({tel: e.target.value})} />					              
					                </div>	
					                <div className="form-group">
					                  <label >อีเมล์ </label>
					                  <input type="text" className="reg_inp" name="email" id="email" v="off" 
					                  value={item.email}                  
                  					  onChange={(e) => this.setState({email: e.target.value})} />
					                </div>	
									<br/>

					            </form>	

			  	        	</div>
			  	        </div>  
	  	        	</div>
	  	        	<div className="col-md-4"> 
		  	        <div className="row">            
			  	        	<div className="col-sm-11 bg-cart-gray min-300">	 	  
					            <form role="form">			             
					                <div className="form-group mgt-20">
					                  <label >Facebook</label>
					                  <input type="text" className="reg_inp" name="facebook" id="facebook" autoComplete="off" 
					                  value={item.facebook}                  
                  					  onChange={(e) => this.setState({facebook: e.target.value})} />
					                </div>
					                <div className="form-group">
					                  <label>Line ID</label>
					                  <input type="text" className="reg_inp" name="lineID" id="lineID" autoComplete="off" 
					                  value={item.lineID}                  
                  					  onChange={(e) => this.setState({lineID: e.target.value})} />
					                </div>
					                <div className="form-group">
					                  <label >อาชีพ</label>
					                  <input type="text" className="reg_inp" name="occupation" id="occupation" autoComplete="off" 
					                  value={item.occupation}                  
                  					  onChange={(e) => this.setState({occupation: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label >สถานที่ทำงาน </label>
					                  <input type="text" className="reg_inp" name="occ_address" id="occ_address" autoComplete="off" 
					                  value={item.occ_address}                  
                  					  onChange={(e) => this.setState({occ_address: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label>แพ้ยา</label>
					                  <input type="text" className="reg_inp" name="druge" id="druge" autoComplete="off" 
					                  value={item.druge}                  
                  					  onChange={(e) => this.setState({druge: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label >อาหารที่ชอบ</label>
					                  <input type="text" className="reg_inp" name="food" id="food" autoComplete="off" 
					                  value={item.food}                  
                  					  onChange={(e) => this.setState({food: e.target.value})} />
					                </div>	
					                <div className="form-group">
					                  <label >สีที่ชอบ</label>
					                  <input type="text" className=" reg_inp" name="color" id="color" autoComplete="off" 
					                  value={item.color}                  
                  					  onChange={(e) => this.setState({color: e.target.value})} />
					                </div>	
									<br/>

					            </form>	


			  	        	</div>
			  	        </div>  
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
    const _this = this
    let data = JSON.parse(localStorage.getItem('ms_profile'));  
    if(data !== null){     
      this.setState({ data: data },()=>{
          getCustomer(data.uid)
          .then(function(response) {                  
              if(response.data.status === '200'){
               let  item =  response.data.data  
               //let item = 

			    let temp = {
		      		uid: item.uid,
		      		id: item.id, 
		      		//username:, 
		      		//password:'-', 
		      		//add_date: moment(), 
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
		      		//member: 'NONE',
			    }               
			    _this.setState(temp) 
              }               
          })  

      })  
    } else {
        Router.push({
            pathname: '/profile',
            query: { login: 'wahsffd' }
        })
    }  
  }




}