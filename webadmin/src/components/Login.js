import React, { Component } from 'react'
import moment from 'moment'
import {getUserName} from '../utils/UserAPI';
//import {getLocations, getLocation} from '../utils/CompanyAPI';  
import {getEmployeeLocationID} from '../utils/EmployeeAPI'; 

class Login extends Component {
	constructor (props) {
		super(props);	
		this.state = { 
			isLoad: false, loading: false,
			auth: {
				discount: 'N',
				gmreport: 'N',
		        reg: {status: 'N',read: 'N',add: 'N',edit: 'N'} ,
		        appointment: 'N', finance: 'N', doctor: 'N', 
		        treatment: 'N', store: 'N',
		        store: { status: 'N',read: 'N',add: 'N',edit: 'N',in: 'N',out: 'N', adj: 'N'} ,
		        service: 'N',
		        setting: 'N', report: 'N'
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


		    	 console.log(results)

		    	if (results.data.status === '200') {
		    		const rt = results.data.data;
		    		if(_this.refs.password.value === rt.password){	

		    			getEmployeeLocationID(rt.emp_id)
		    			.then(function(results) {
		    				if (results.data.status === '200') {
		    					const el = results.data.data;		    					
		    					let idx = el.findIndex((x) => x.cn === '1');		    				
		    					if(idx === -1){
		    						show_err('warning',rt.emp_name+'  ไม่มีสิทธิเข้าใช้งานใน สาขา '+_this.state.cname);
		    						_this.setState({ loading: false });
		    					} else {


							      let auth = _this.state.auth;  
							      const uauth = JSON.parse(rt.auth);
							      auth.discount = rt.discount;
							      auth.gmreport = rt.report;
							      if(uauth.reg.status === 'Y'){ 
							      	auth.reg.status = 'Y';
							      	if(uauth.reg.read === 'Y'){ auth.reg.read = 'Y'; }
							      	if(uauth.reg.add === 'Y'){ auth.reg.add = 'Y'; }
							      	if(uauth.reg.edit === 'Y'){ auth.reg.edit = 'Y'; }
							      }
							      if(uauth.finance.status === 'Y'){ auth.finance = 'Y'  }
							      if(uauth.treatment.status === 'Y'){ auth.treatment = 'Y'  }
							      if(uauth.doctor.status === 'Y'){ auth.doctor = 'Y'  }
							      if(uauth.store.status === 'Y'){ 
							      	auth.store.status = 'Y'  
							      	if(uauth.store.read === 'Y'){ auth.store.read = 'Y'; }
							      	if(uauth.store.add === 'Y'){ auth.store.add = 'Y'; }
							      	if(uauth.store.edit === 'Y'){ auth.store.edit = 'Y'; }
							      	if(uauth.store.in === 'Y'){ auth.store.in = 'Y'; }
							      	if(uauth.store.out === 'Y'){ auth.store.out = 'Y'; }
							      	if(uauth.store.adj === 'Y'){ auth.store.adj = 'Y'; }
							      }
							      if(uauth.service.status === 'Y'){ auth.service = 'Y'  }
							      if(uauth.setting.status === 'Y'){ auth.setting = 'Y'  }
							      if(uauth.report){ if(uauth.report.status === 'Y'){ auth.report = 'Y' }   }
							    	
					    			const newData = {
					    				uid: rt.uid,		    			
					    				emp_id: rt.emp_id,
					    				emp_name: rt.emp_name,
					    				username: rt.username,
					    				auth: auth,			    				
									    location_id: _this.state.cn,    
									    location_name: _this.state.cname, 
									    location_sname: _this.state.csname, 
					    				date: moment().format()
					    		    };
				    		    	localStorage.setItem('msClinic', JSON.stringify(newData));
									_this.context.router.push({
							       	 pathname: '/app',
							    	});	


		    					}
		    				} else {
		    					show_err('warning',rt.emp_name+'  ไม่มีสิทธิเข้าใช้งานใน '+_this.state.cname);
		    					_this.setState({ loading: false });
		    				}
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
			    	<a><b>WEB ADMIN </b><br/> Management Systems</a>
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