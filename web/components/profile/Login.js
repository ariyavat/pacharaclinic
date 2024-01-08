import React from 'react'
import Router from 'next/router'
import moment from 'moment';
import { login } from '../../utils/CustomerAPI'
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false, username: '', password: ''
    }     
   
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
  	console.log(this.props)
  }

  handleKeyPress(value, event){
    if(event.key === 'Enter'){
    	if(value === 'enter'){
    		this.login()
    	} else {
    		this.refs[value].focus();	
    	}      
    }
  }
 

  handleRegister (mode,e){
  	e.preventDefault()
	Router.push({
	    pathname: '/profile',
	    query: { signup: mode }
	})
  }

  handleLogin(e){
  	e.preventDefault()
  	this.login()
  }

  handleFogot(e){
  	e.preventDefault()
	Router.push({
  		pathname: '/profile',
  		query: { forgot: 'true' }
	})

  }

  login(){
  	const item = this.state
  	const mode = this.props.mode
  	if(item.username !== ''){
  	if(item.password !== ''){  
	    let cdata = { username: item.username, password: item.password }
		login(cdata)
	  	.then(function(results) { 	  
	  		if (results.data.status === '200') {   
	  			let  profile = results.data.data 
	  			localStorage.setItem('ms_profile', JSON.stringify(profile))	  
	  			let temp = {  login_date: moment().format('DD/MM/YYYY H:mm:ss') }
	  			localStorage.setItem('ms_login', JSON.stringify(temp))
	  			if(mode === 'seedoctor'){
					Router.push({
					    pathname: '/seedoctor',
					})	
	  			} else if(mode === 'booking'){
					Router.push({
					    pathname: '/booking',
					    query: { uid: profile.uid, view: 'appointment', gid: '3' }
					})	
	  			} else if(mode === 'cart'){
					Router.push({
					    pathname: '/cart',
					})	
	  			} else {
					Router.push({
					    pathname: '/profile',
					    query: { uid: profile.uid, view: 'detail', gid: '1' }
					})	  				
	  			}
	
					  				
	  		


	  		} else {
	  			show_err('warning',results.data.msg); 	
	  		}
	  	});	
  	} else { show_err('warning','ยังไม่ได้กรอกรหัสผ่าน!')  }  	
  	} else { show_err('warning','ยังไม่ได้กรอกชื่อผู้ใช้!')  } 	
  }


  render () {
    const item = this.state
  
	return(
	<section className="bg-White sectionTop" >
		
	        <div className="row">   
	        	<div className="col-md-6 col-10  offset-1 offset-sm-3 ">
	  	        <div className="row">            
	  	        	<div className="col-sm-8 offset-sm-2 bg-green">
			  	        <div className="row">            
			  	        	<div className="col-3 font-40 ">
			  	        		<div className="profile-user mgt-10 mgl-10 pull-left"><i className="fa fa-user"></i></div>
			  	        
			  	        	
			  	        	</div>
			  	        	<div className="col-9 font-40 ">	
								<button className="pf-button pf-button4 pf-active pull-right mgt-20" onClick={this.handleRegister.bind(this, 'OLD')} >
			  	        			ลูกค้าคลินิก
			  	        		</button>


			  	        		<button className="pf-button pf-button4 pf-active pull-right mgt-20" onClick={this.handleRegister.bind(this, 'NEW')} >
			  	        			ลงทะเบียนใหม่
			  	        		</button>
			  	        	</div>
			  	        </div> 
	  	        	</div>
	  	        </div>  
	  	        <div className="row">            
	  	        	<div className="col-sm-8 offset-sm-2 bg-cart-gray min-300">
	  	       		
	
			            <form role="form">			             
			                <div className="form-group mgt-30">
			                  <label>ชื่อผู้ใช้</label>
			                  <input type="text" className="form-control reg_inp"  ref="username" autoComplete="off"  
								value={item.username}   
								onKeyPress={(event) => this.handleKeyPress('password', event)}               
                  				onChange={(e) => this.setState({username: e.target.value})}/>
			                </div>

			                <div className="form-group mgt-30">
			                  <label>รหัสผ่าน</label>
			                  <input type="password" className="form-control reg_inp" id="password" name="password" ref="password" autoComplete="off" 
								value={item.password}    
								onKeyPress={(event) => this.handleKeyPress('enter', event)}                
                  				onChange={(e) => this.setState({password: e.target.value})}/>
			                </div>	
			                <div className="row"> 
								<div className="col-sm-12">
									<a href="#" className="pull-right" onClick={this.handleFogot.bind(this)}>ลืมรหัสผ่าน</a>
								</div>
			                </div>		 
			            </form>	


	  	        	</div>
	  	        </div>  
	  	        <div className="row">    
	  	                   
	  	        	<div className="col-sm-8 offset-sm-2 login-btn text-center" onClick={this.handleLogin.bind(this)} >	  	        	 
	  	      			เข้าสู่ระบบ
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