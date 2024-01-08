import React from 'react'
import Router from 'next/router'
import { createCustomer, chkCustomer } from '../../utils/CustomerAPI'
export default class RequestForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false,
      user:'', password:'', conpassword:'' 
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
  	const item = this.state
  	if(item.user !== ''){
  	if(item.password !== ''){
  	if(item.conpassword !== ''){
  	if(item.password === item.conpassword){
  		let data = JSON.parse(localStorage.getItem('ms_signup'));
  		data.username =  item.user.trim()
  		data.password =  item.password.trim()
	    let cdata = {
	    	mode: 'auth', username: data.username, password: data.password
	    }
	    chkCustomer(cdata)
	    .then(function(results) { 	 
	      if (results.data.status === '200') {

 			createCustomer(data)
	      	.then(function(results) { 	  
	      		if (results.data.status === '201') {     			

	      			localStorage.setItem('ms_profile', JSON.stringify(data)); 
					Router.push({
					    pathname: '/profile',
					    query: { uid: data.uid, view: 'detail', gid: '1' }
					})

	      		} else {
	      			show_err('warning','ไม่สามารถลงทะเบียนได้!!'); 	
	      		}

	      	});

	      } else {
	      	show_err('warning',results.data.msg); 
	      }

	    });  		

	
  	} else { show_err('warning','การยืนยันรหัสผ่านไม่ถูกต้อง!')  } 	
  	} else { show_err('warning','ยังไม่ได้ยืนยันรหัสผ่าน!')  }  		
  	} else { show_err('warning','ยังไม่ได้กรอกรหัสผ่าน!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกชื่อผู้ใช้!')  }
  	
  }


  render () {
    const item = this.state
  
	return(
	<section className="bg-White sectionTop" >
		
	        <div className="row">   
	        	<div className="col-sm-12">
	        	<div className="row">
	        		<div className="col-md-12 text-center">
	        			<div className="profile-userb"><i className="fa fa-key"></i></div>
	        			<span className="font-30 txt-gn mgl-10">กำหนดข้อมูลใช้งาน</span>
	        		</div>
	        	</div>

	  	        <div className="row">            
	  	  
	  	        	<div className="col-md-4 offset-md-4"> 
		  	        	<div className="row">            
			  	        	<div className="col-sm-12 bg-cart-gray min-400">	 	  
					            <form role="form">			             
					                <div className="form-group mgt-30">
					                  <label>ชื่อผู้ใช้</label>
					                  <input type="text" className="form-control reg_inp" id="user" autoComplete="off" 
					                  	value={item.user}                  
                  						onChange={(e) => this.setState({user: e.target.value})}/>
					                </div>

					                <div className="form-group mgt-30">
					                  <label>รหัสผ่าน</label>
					                  <input type="password" className="form-control reg_inp" id="password" autoComplete="off"  
					                  	value={item.password}                  
                  						onChange={(e) => this.setState({password: e.target.value})}/>
					                </div>	

					                <div className="form-group mgt-30">
					                  <label>ยืนยันรหัสผ่าน</label>
					                  <input type="password" className="form-control reg_inp" id="conpassword" autoComplete="off"  
					                  	value={item.conpassword}                  
                  						onChange={(e) => this.setState({conpassword: e.target.value})}/>
					                </div>						        

					            </form>	
					            <br/>
			  	        	</div>
			  	        </div>  
	  	        	</div>
	  	        </div> 	



	  	        <div className="row">            
	  	        	<div className="col-md-4 offset-sm-4  text-center mgt-30">
		  	        	<div className="row">            
			  	        	<div className="col-sm-12 " >
			  	        		<button className="btn btn-block btn-signup" onClick={this.handleSubmit.bind(this)} >
									ตกลง
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