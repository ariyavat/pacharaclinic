import React, { Component } from 'react'
import moment from 'moment'
import {getUserName} from '../utils/UserAPI';
import {getLocations, getLocation} from '../utils/CompanyAPI';  
import {getEmployeeLocationID} from '../utils/EmployeeAPI'; 

class Login extends Component {
	constructor (props) {
		super(props);	
		this.state = { 
			isLoad: false, loading: false,
			auth: {
				admin: 'N',
				con: 'N',
		        M1: 'N' ,
		        M2: 'N' ,
		        M3: 'N' ,
		        M4: 'N' ,
		        M5: 'N' ,
		        M6: 'N' ,
		        M7: 'N' ,
		        M8: 'N' ,
		        M9: 'N' ,
		    },
		    cn: '-', cname: '', csname: '',
		    loactionList: [],      		
		}	
		this.handleLogin = this.handleLogin.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)	
	}
  	shouldComponentUpdate(_nextProps, nextState) {
    	return (this.props !== _nextProps)  || (this.state !== nextState);
  	}
	componentDidMount () {		
		for (let x in this.refs) {
	      this.refs[x].onkeypress = (e) =>	      	 
	      	this.handleKeyPress(e, this.refs[x])	        
	    }   
	    const _this = this;
	    /*
	    getLocations()
	    .then(function(results) {
	      if (results.data.status === '200') {
	        _this.setState({ loactionList: results.data.data });
	      }
	    });
	    */

	}

  	handleCnChange(e){
	    e.preventDefault();
	    const _this = this;
	    getLocation(this.refs.cn.value)
	    .then(function(results) {
	      if (results.data.status === '200') {
	      	const data = results.data.data;
	        _this.setState({ cn: data.id, cname: data.name, csname: data.sname });
	      } else { 
	      	_this.setState({ cn:'-', cname: '', csname: '' });
	      }
	    });	
  	}

	handleLogin(e) {
		e.preventDefault();
		this.setState({ loading: true },()=>{
			this.Login();	
		})
		
	}
  	handleKeyPress(e, field) {   		 
    	if (e.keyCode === 13) {     
    		e.preventDefault() 	    
      		if(field.name==='enter'){      			
      			this.Login()      		
      		} else {      			 
      			this.refs[field.name].focus()  	
      		}        		  		    	
    	}

  	}

  	Login(){
		const _this = this;
		
	    if(this.refs.username.value != ''){
	    if(this.refs.password.value != ''){	

		    getUserName(this.refs.username.value)
		    .then(function(results) {
		    	if (results.data.status === '200') {
		    		const rt = results.data.data;
		    		if(_this.refs.password.value === rt.password){	    					   					
		    		

				    	let auth = _this.state.auth;  
				      	const uauth = JSON.parse(rt.auth);
				      	auth.admin = rt.admin;
				      	auth.con = rt.con;			
				      	auth.M1 = uauth.M1;
				    	auth.M2 = uauth.M2;
				    	auth.M3 = uauth.M3;
				    	auth.M4 = uauth.M4;
				    	auth.M5 = uauth.M5;
				    	auth.M6 = uauth.M6;
				    	auth.M7 = uauth.M7;
				    	auth.M8 = uauth.M8;
				    	auth.M9 = uauth.M9;
		    			const newData = {
		    				uid: rt.uid,		    			
		    				emp_id: rt.emp_id,
		    				emp_name: rt.emp_name,
		    				username: rt.username,
		    				auth: auth,			    				
						    location_id: '',    
						    location_name: '', 
						    location_sname: '', 
		    				date: moment().format()
		    		    };
	    		    	localStorage.setItem('msClinic', JSON.stringify(newData));
						_this.context.router.push({
				       	 pathname: '/app',
				    	});		    					
		    	

		    		} else { show_err('warning','Password ไม่ถูกต้อง');  _this.setState({ loading: false }); }
		    	} else { show_err('warning','ไม่พบ Username นี้ในระบบ'); _this.setState({ loading: false }); }
		    });				
		} else {  show_err('warning','ไม่ได้กรอก Password'); _this.setState({ loading: false }); }	    	
	    } else {  show_err('warning','ไม่ได้กรอก Username'); _this.setState({ loading: false }); }
	
  	}

	render () {		
		const item = this.state;

	    let createLG = function (item, key) {
	      return <option value={item.id} key={key} >{item.name}</option>
	    } 


		return (
	
	    <div className="login-page">
	    	<div className="login-box">
				<div className="login-logo">					
			    	<a><b>STORE </b><br/> Management Systems</a>
			  	</div>
			  	<div className="login-box-body min-300">
			  		<p className="login-box-msg">Sign in to start your systems</p>

				    <form>		

				      <div className="form-group has-feedback">
				        <input type="text" className="form-control" name="password" ref="username" placeholder="Username" autoComplete="off" />
				        <span className="glyphicon glyphicon-user form-control-feedback"></span>
				      </div>
				      <div className="form-group has-feedback">
				        <input type="password" className="form-control" name="enter" ref="password" placeholder="Password" autoComplete="off" />
				        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
				      </div>
				      <div className="row">
				        <div className="col-xs-8"></div>				        
				        <div className="col-xs-4">
				          <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={this.handleLogin.bind(this)}>Sign In</button>
				        </div>
				        
				      </div>
				    </form>


		    	</div>
	    	</div>

	        {
	        item.loading ?
	          <div className="overlay">
	            <i className="fa fa-refresh fa-spin"></i>
	          </div>
	        : null
	        } 


	    </div>	
		)
	}
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default Login