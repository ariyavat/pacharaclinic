import React from 'react';
import axios from 'axios';

import UserForm from '../components/setting/UserForm';
import ContentHeader from '../components/common/ContentHeader';
import {getEmployee, updateEmployee} from '../utils/EmployeeAPI';
import {getUserName, getUser, updateUser} from '../utils/UserAPI';

const initialState = {
  loading: true, isEdit: false, data: [],
  id: '', name: '', typ: '', address: '', tel: '', username: '', password: '', uid: ''
};


export default class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.autonumber_data = null;
    this.state = initialState;
  }
  reset (e) {
    e.preventDefault();
    this.setState({isView: 'LIST', isEdit: false, data: [], open: false});
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }
  componentDidMount() {
  	const _this = this;
 	const data = JSON.parse(localStorage.getItem('msClinic'));
 	this.getEmployee(data.emp_id);
 	getUser(data.uid)
    .then(function(results) {
      if (results.data.status === '200') {
      	const udata = results.data.data;
        _this.setState({uid: data.uid, username: udata.username, password: udata.password});
      }
    });    	

    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }
  }

  handleKeyPress(e, field) { 
    if (e.keyCode === 13) {
        e.preventDefault()
        if(field.name!=='none'){    
          this.refs[field.name].focus() 
        }                 
    }
  }

  handleNewForm (e) {
    let _this = this;
    _this.setState({isView: 'FORM', isEdit: false, data: []});
  }

  handleEdit (data) {
    this.setState({isView: 'FORM', isEdit: true, data: data});
  }

  handleSaveData (e) {   
  	e.preventDefault();  
  	const _this = this;
    if(this.refs.fname.value !== ''){
	  	this.setState({ loading: true },()=>{
		  	const temp = {
		  		name: this.state.name, address: this.state.address, tel: this.state.tel,
		  	}
		  	const data = { data: temp, id:this.state.id }

		  	updateEmployee(data)
		  	.then(function(results) {
		  		if(results.data.status === '200'){
		  			 show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว');
		  		} else {
		  			show_err('warning',results.data.message);
		  		}
		  		_this.setState({ loading: false })
		  	});  		
	  	}); 
    } else {  show_err('warning','ยังไม่ได้กรอก ชื่อ - สกุล!!!');  }

  }

  handleEditData(e){
  	e.preventDefault();
    const _this = this; 
    let item = this.state;
    let con = 'Y';

    if(this.refs.username.value !== ''){
    if(this.refs.password.value !== ''){

		this.setState({ loading: true },()=>{
		    getUserName(item.username)
		    .then(function(results) {
		      if (results.data.status === '200') {
		        if(_this.props.isEdit){
		          if(item.uid !== results.data.data.uid){ 
		            con = 'N';  

		            show_err('warning','Username นี้มีการใช้งานในระบบแล้ว!!!'); 
		          }
		        }
		      } 
		      if(con === 'Y'){
		      	const temp = { username: item.username, password: item.password }
		      	const data = { data: temp, uid: item.uid }
		      	updateUser(data)
		      	.then(function(results) {
			  		if(results.data.status === '200'){
			  			 show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว');
			  		} else {
			  			show_err('warning',results.data.message);
			  		}
			  		_this.setState({ loading: false })
		      	});
		      }
		    });
		});


    } else {  show_err('warning','ยังไม่ได้กรอก Username!!!');  }
    } else {  show_err('warning','ยังไม่ได้กรอก Password!!!');  }

  }



  render() {   
    const item = this.state;

    return (
    <div>
        <ContentHeader title="ข้อมูลผู้ใช้งาน" small="รายละเอียดผู้ใช้งานระบบ" />
        <section className="content">
          <div className="box box-info" >  
          	<div className="box-body min-650"> 
          	<form className="form-horizontal">
          		<div className="row">
          			<div className="col-sm-6 min-300 border-right">
          				<h4>ข้อมูลทั่วไป</h4><br/><br/>

	                      <div className="form-group">
	                        <label  className="col-sm-3 control-label" >รหัส <span className="text-red">*</span></label>
	                        <div className="col-sm-4">
	                          <input 
	                            type="text"  className="form-control" name="taxno" ref='id' value={item.id} disabled={true} />
	                        </div>
	                                         
	                      </div>
	                
	                      <div className="form-group">          
	                        <label  className="col-sm-3 control-label" >ชื่อ - สกุล <span className="text-red">*</span></label>
	                        <div className="col-sm-9">
	                          <input type="text"  className="form-control" name="tel" ref='fname'  
	                            value={item.name}
	                            onChange={(e) => this.setState({name: e.target.value})} />
	                        </div>                 
	                      </div> 

	                      <div className="form-group"> 
	                        <label  className="col-sm-3 control-label" >เบอร์โทร </label>
	                        <div className="col-sm-9">                  
	                          <input 
	                            type="text"  className="form-control" name="address" ref='tel'  
	                            value={item.tel}
	                            onChange={(e) => this.setState({tel: e.target.value})} /> 
	                        </div> 
	                      </div>                                       
	      
	                      <div className="form-group">          
	                        <label  className="col-sm-3 control-label" >ที่อยู่ </label>
	                        <div className="col-sm-9">
	                          <input type="text"  className="form-control" name="tel" ref='address'  
	                            value={item.address}
	                            onChange={(e) => this.setState({address: e.target.value})} />
	                        </div>              
	                      </div>

	                      <div className="form-group">                         
	                        <div className="col-sm-9 col-sm-offset-3">
	                          <hr/>
	                          <button type="button" className="btn btn-success " onClick={this.handleSaveData.bind(this)} >
	                            <i className="fa fa-save"></i> แก้ไขข้อมูล
	                          </button> 

	            

	                        </div>
	                      </div>
          			</div>
          			<div className="col-sm-4 col-sm-offset-1">
          				<h4>แก้ไข Username / Password</h4> <br/><br/>
	                      <div className="form-group"> 
	                        <label  className="col-sm-4 control-label" >Username <span className="text-red">*</span></label>
	                        <div className="col-sm-8">                  
	                          <input 
	                            type="text"  className="form-control" name="password" ref='username'  
	                            value={item.username}
	                            onChange={(e) => this.setState({username: e.target.value})} /> 
	                        </div> 
	                      </div>                                       
	      
	                      <div className="form-group">          
	                        <label  className="col-sm-4 control-label" >Password <span className="text-red">*</span></label>
	                        <div className="col-sm-8">
	                          <input type="password"  className="form-control" name="none" ref='password'  
	                            value={item.password}
	                            onChange={(e) => this.setState({password: e.target.value})} />
	                        </div>              
	                      </div>

	                      <div className="form-group">                         
	                        <div className="col-sm-8 col-sm-offset-4">
	                          <hr/>
	                          <button type="button" className="btn btn-success " onClick={this.handleEditData.bind(this)} >
	                            <i className="fa fa-save"></i> แก้ไขข้อมูล
	                          </button>         

	                        </div>
	                      </div>



          			</div>


          		</div>
          	</form>
          	</div>

			{
			item.loading ?
				<div className="overlay">
	          		<i className="fa fa-refresh fa-spin"></i>
	        	</div>
			: null
			}
          </div>
        </section>
    </div>
    );
  }
	//

  getEmployee(id){
  	const _this = this;
    getEmployee(id)
    .then(function(results) {
      if (results.data.status === '200') {
      	const data = results.data[0];
        _this.setState({id: data.id, name: data.name, typ: data.typ, address: data.address, tel: data.tel, loading: false});
      } else {
        _this.setState({loading: false});
      }
    });    	
  }


}
