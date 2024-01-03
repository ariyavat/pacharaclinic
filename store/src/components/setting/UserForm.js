import React, {Component} from 'react';
import uuid from 'uuid';
import {getUserName} from '../../utils/UserAPI';
const initialState = {
  uid: '', emp_id: '', emp_name: '', username: '', password: '', admin: 'N', con: 'N',
  auth:{
    M1 : 'N', M2 : 'N', M3 : 'N', M4 : 'N', M5 : 'N', M6 : 'N', M7 : 'N', M8 : 'N',  M9 : 'N',   
  }
  
};

export default class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState); 
  }

  componentDidMount () {
    
    if (this.props.isEdit === true) {     
        const state = this.state; 
        let pitem = this.props.data;
       // setBtnStatus(pitem.admin,'admin');
        //setBtnStatus(pitem.con,'con');
        let auth = JSON.parse(pitem.auth); 
        pitem.auth = auth;
        setBtnStatus(pitem.auth.M1,'M1');     
        setBtnStatus(pitem.auth.M2,'M2');   
        setBtnStatus(pitem.auth.M3,'M3');   
         
        this.setState(pitem);
    } else {
      const item = this.state;
      let uid = uuid.v1();      
      setBtnStatus(item.auth.M1,'M1');
      setBtnStatus(item.auth.M2,'M2');
      setBtnStatus(item.auth.M3,'M3');
      //setBtnStatus(item.admin,'admin');
      //setBtnStatus(item.con,'con');
      this.setState({ uid: uid });
    }

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

  handleEmpChange (e) {
    e.preventDefault();
      let idx = this.props.empList.findIndex((x) => x.id === this.refs.empid.value);
      if(idx !== -1){
        this.setState({emp_id: this.refs.empid.value, emp_name: this.props.empList[idx].name});  
      } else {
        this.setState({emp_id: '', emp_name:''});  
      }
  }



  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault(); 
    const _this = this; 
    let item = this.state;
    let con = 'Y';
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
       // item.admin = _this.refs.admin.value;
       // item.con = _this.refs.con.value;
        let auth = {
          M1 : _this.refs.M1.value,
          M2 : _this.refs.M2.value, 
          M3 : _this.refs.M3.value,
        }; 
        item.auth = JSON.stringify(auth);    
        _this.props.onSave(item); 
      }
    });
  }

  handleBtnClick(e){
    const title = e.target.title
    const name = e.target.name
    setBtnStatus(title,name)
  }

  render() { 
    const item = this.state;
    const {empList} = this.props;  

    let createEmp = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    return (

      <section className="content">
        <div className="box box-info" >  
          <div className="box-header with-border" >
              <div className="row">
                <div className="col-sm-12">
                   <h3 className="modal-title text-blue">
                    {
                     this.props.isEdit ? "แก้ไขข้อมูลผู้ใช้งาน" : "เพิ่มผู้ใช้งาน"
                    } 
                  </h3>
                </div>
                <div className="col-sm-6">
                       
                </div>
              </div>       
          </div>
          <div className="box-body min-600"> 
      <form className="form-horizontal">
                  <div className="row">
                    <div className="col-sm-5">
                    
                      <h4>ข้อมูลผู้ใช้งาน</h4>
                      <div className="form-group mgt-20">                 
                        <label  className="col-sm-4 control-label" >พนักงาน </label>
                        <div className="col-sm-8">                  
                        <select className="form-control" id="empid"  ref="empid" value={item.emp_id} onChange={this.handleEmpChange.bind(this)}> 
                              <option value="-"></option>                        
                              {empList.map(createEmp)}     
                          </select>              
                        </div>                  
                      </div>
                

                      <div className="form-group">          
                        <label  className="col-sm-4 control-label" >Username <span className="text-red">*</span></label>
                        <div className="col-sm-8">
                          <input type="text"  className="form-control" name="password" ref='username'  
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
                          <button type="button" className="btn btn-success " onClick={this.handleSaveData.bind(this)} >
                            <i className="fa fa-save"></i> { this.props.isEdit ? "แก้ไข" : "บันทึก" }
                          </button> 
                          {
                            this.props.isEdit ?
                            <button type="button" className="btn btn-danger mgl-10" onClick={this.handleDeletData.bind(this)} >
                              <i className="fa fa-trash"></i> ลบ
                            </button>
                            : null
                          }    
                          <button type="button" className="btn btn-default mgl-10" onClick={this.props.onReset} >
                            <i className="fa fa-circle-o-notch"></i> ยกเลิก
                          </button> 
                        </div>
                      </div>



                    
                    </div>
                    <div className="col-sm-6 col-sm-offset-1">

                        <h4>สิทธิ์การใช้งาน</h4>
                        <div className="row mgt-20">         
                          <div className="col-sm-8">
                            <div className="form-group"> 
                              <label  className="col-sm-6 control-label" >Back Office </label>
                              <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="radioBtn btn-group">
                                      <a className="btn btn-primary btn-sm active" name="M1" title="Y"
                                      onClick={this.handleBtnClick.bind(this)} >YES</a>
                                      <a className="btn btn-primary btn-sm notActive" name="M1" title="N"
                                      onClick={this.handleBtnClick.bind(this)} >NO</a>
                                    </div>
                                    <input type="hidden" id="M1" ref="M1"  value={item.auth.M1}/>
                                  </div>                    
                              </div>
                            </div>               
                          </div>
                        </div>
                     
                        <div className="row mgt-10">       
                          <div className="col-sm-8">
                            <div className="form-group"> 
                              <label  className="col-sm-6 control-label" >โรงงาน </label>
                              <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="radioBtn btn-group">
                                      <a className="btn btn-primary btn-sm active" name="M2" title="Y"
                                      onClick={this.handleBtnClick.bind(this)} >YES</a>
                                      <a className="btn btn-primary btn-sm notActive" name="M2" title="N"
                                      onClick={this.handleBtnClick.bind(this)} >NO</a>
                                    </div>
                                    <input type="hidden" id="M2" ref="M2"  value={item.auth.M2}/>
                                  </div>                    
                              </div>
                            </div>               
                          </div>
                        </div>
               
                        <div className="row mgt-10">       
                          <div className="col-sm-8">
                            <div className="form-group"> 
                              <label  className="col-sm-6 control-label" >ตั้งค่าระบบ </label>
                              <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="radioBtn btn-group">
                                      <a className="btn btn-primary btn-sm active" name="M3" title="Y"
                                      onClick={this.handleBtnClick.bind(this)} >YES</a>
                                      <a className="btn btn-primary btn-sm notActive" name="M3" title="N"
                                      onClick={this.handleBtnClick.bind(this)} >NO</a>
                                    </div>
                                    <input type="hidden" id="M3" ref="M3"  value={item.auth.M3}/>
                                  </div>                    
                              </div>
                            </div>               
                          </div>
                        </div>


                  </div>
                  </div>

      </form>
          </div>
        </div>
      </section>


    );
  }
}

