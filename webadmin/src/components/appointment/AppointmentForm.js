import React, {Component} from 'react';
import moment from 'moment';
import uuid from 'uuid';
import OrderStatus from '../common/OrderStatus';

import {createAppointment, updateAppointment } from '../../utils/AppointmentAPI'; 


export default class AppointmentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      appData: {dat:'',tim:'',fullname:'',mem:''},

      id: '', cn: '', cname: '', add_date: '', app_date: '', start_time: '', 
      end_time: '',customer_id: '', customer_name: '', tel: '', product_id: '', 
      product_name: '', doctor_id: '-',  doctor_name: 'ไม่ระบุแพทย์', emp_id: '-', 
      emp_name: 'ไม่ระบุพนักงาน',room_id: '-', room_name: 'ไม่ระบุห้อง', mem: '', 
      status: 'NONE',

    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () { 
  let appData = this.props.data
  let dat = moment(appData.dat).format('DD/MM/YYYY')

   this.setState({
      appData: appData, app_date: dat, start_time: appData.tim, 
      customer_id: appData.id, customer_name:  appData.fullname   
    });

   $('#date').datepicker({ autoclose: true });
    this.refs.app_date.value = dat;  
  }

  componentWillReceiveProps(nextProps) {
   
   // this.setState({appData: nextProps.data});
  }

  handleSaveData (e) {
    e.preventDefault();
    if(this.props.mode==='PAYMENT'){
      this.props.onSave();
    } else if(this.props.mode==='SEND'){
      if(this.refs.send_date.value!==''){
      if(this.state.ems !== ''){
        let date = this.refs.send_date.value ;
        let txt = date.split('/') ;
        let sdate = txt[2]+'-'+txt[1]+'-'+txt[0] ; 
        this.props.onSave(this.state.ems, sdate);  
      } else { show_err('warning','ไม่ได้กรอกเลขที่ส่งของ');  }  
      } else { show_err('warning','ไม่ได้เลือกวันที่ส่งสินค้า');  }        
    }
    
  }

  handleChange(mode,e){
    e.preventDefault();
    if(mode==='D'){
      let idx = this.props.dcList.findIndex((x) => x.id === this.refs.dname.value);
      if(idx === -1){
        this.setState({doctor_id: '-', doctor_name: 'ไม่ระบุแพทย์'});
      } else {
        this.setState({doctor_id: this.props.dcList[idx].id, doctor_name: this.props.dcList[idx].name});  
      }     
    } if(mode==='E'){ 
      let idx = this.props.empList.findIndex((x) => x.id === this.refs.empname.value);
      if(idx === -1){
        this.setState({emp_id: '-', emp_name: 'ไม่ระบุแพทย์'});
      } else {
        this.setState({emp_id: this.props.empList[idx].id, emp_name: this.props.empList[idx].name});  
      }   
    } else if(mode==='L'){ 
      let idx = this.props.locations.findIndex((x) => x.id === this.refs.empname.value);
      if(idx === -1){
        this.setState({cn: '-', emp_name: 'เลือกสาขา'});
      } else {
        this.setState({cn: this.props.locations[idx].id, cname: this.props.locations[idx].name});  
      }   
    }  else {
      let idx = this.props.roomList.findIndex((x) => x.id === this.refs.room.value);
      if(idx === -1){
        this.setState({room_id: '-', room_name: 'ไม่ระบุห้อง'});
      } else {
        this.setState({room_id: this.props.roomList[idx].id, room_name: this.props.roomList[idx].name});  
      }   
    }
  }

  handleSaveData (e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('msClinic'));
    const item = this.state;
    const {data} = this.props.data;
    const txt = this.refs.app_date.value.split('/');
    const app_date = txt[2]+'-'+txt[1]+'-'+txt[0];  
  

    if(this.refs.app_date.value !== ''){

          let temp = {
            id: uuid.v1(), cn: item.cn, cname: item.cname,             
            add_date:  moment().format(), app_date: app_date, start_time: item.start_time, end_time: item.end_time,
            customer_id: item.customer_id, customer_name: item.customer_name, 
            tel: item.tel, doctor_id: item.doctor_id, doctor_name: item.doctor_name,
            emp_id: item.emp_id, emp_name: item.emp_name,
            room_id: item.room_id, room_name: item.room_name, mem: item.mem, status: item.status,
            }
          this.saveData(temp);
      
    } else { show_err('warning','ยังไม่ได้เลือกวันที่นัด!!!');  }
  }

  handleCancel(e){
    e.preventDefault();
    let _this = this
    let item = this.state.appData
    let temp = { status: 'CANCEL'  }
    let upData = {data: temp, uid: item.uid, aid: item.aid }
    updateAppointment(upData)
    .then(function(results) {      
      show_err('success','ยกเลิกการนัดเรียบร้อยแล้ว');
      _this.props.onReset();
    });

  }

  render() {
    const item = this.state
    const { empList, dcList, roomList, locations } = this.props

    let createDC = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    }  	



  	return (
    <section className="content">
      <div className="box box-info min-650" >  

        <div className="box-body min-400"> 

          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
            <form className="form-horizontal">
              <h4>ข้อมูลนัดจากลูกค้า</h4><br/>

              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label  className="col-sm-2 control-label" >รหัส </label>
                    <div className="col-sm-3">
                      <input  type="text"  className="form-control" value={item.appData.id} disabled={true}/>
                    </div>
                    <label  className="col-sm-2 control-label" >ชื่อ - สกุล </label>
                    <div className="col-sm-5">
                      <input type="text"  className="form-control" value={item.appData.fullname} disabled={true} />
                    </div>                  
                  </div>
                  <div className="form-group">                
                    <label  className="col-sm-2 control-label" >เบอร์โทร </label>
                    <div className="col-sm-3">                  
                      <input type="text"  className="form-control"  value='' disabled={true} /> 
                    </div>                         
                    <label  className="col-sm-2 control-label" >วันที่ </label>
                    <div className="col-sm-2">                  
                      <input type="text"  className="form-control"  value={moment(item.appData.dat).format('DD/MM/YYYY')} disabled={true} /> 
                    </div> 
                    <label  className="col-sm-1 control-label" >เวลา </label>
                    <div className="col-sm-2">                  
                      <input type="text"  className="form-control"  value={item.appData.tim} disabled={true} /> 
                    </div>   

                  </div>
                  <div className="form-group">                
                    <label  className="col-sm-2 control-label" >ข้อความ </label>
                    <div className="col-sm-10">                  
                      <input type="text"  className="form-control"  value={item.appData.mem} disabled={true} /> 
                    </div> 
                  </div>
                  <div className="form-group">                
                    <label  className="col-sm-2 control-label" >สาขา </label>
                    <div className="col-sm-5">                  
                      <input type="text"  className="form-control"  value={item.appData.bname} disabled={true} /> 
                    </div> 
                  </div>

                </div>
              </div>

              <h4>รายละเอียดการนัดหมาย</h4><br/>


                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">          
                      <label  className="col-sm-2 control-label" >สาขา<span className="text-red">*</span></label>
                      <div className="col-sm-6">
                      <select className="form-control" id="cn" ref='cn' value={item.cn} onChange={this.handleChange.bind(this,'L')} > 
                          <option value="-">เลือกสาขา</option>                        
                          {locations.map(createDC)}     
                        </select>                           
                      </div>              
                    </div>
                    <div className="form-group">                 
                      <label  className="col-sm-2 control-label" >วันที่<span className="text-red">*</span></label>
                      <div className="col-sm-3">                  
                        <input type="text" className="form-control" id="date" name="none" ref="app_date" autoComplete="off" />
                      </div>  
                      <label  className="col-sm-1 control-label" >เวลา<span className="text-red">*</span></label>
                      <div className="col-sm-2">
                        <input type="text"  className="form-control" name="end_time" ref='start_time'  autoComplete="off" 
                          value={item.start_time}
                          onChange={(e) => this.setState({start_time: e.target.value})} />
                      </div>
                      <label  className="col-sm-1 control-label" >ห้อง</label>
                      <div className="col-sm-2">
                      <select className="form-control select2" id="room" ref='room' value={item.room_id}  onChange={this.handleChange.bind(this,'R')}> 
                          <option value="-">ไม่ระบุห้อง</option>                        
                          {roomList.map(createDC)}     
                        </select>                           
                      </div>  

                    </div>  

                  </div>

                </div>

                <div className="row">
                  <div className="col-sm-12">

                    <div className="form-group">          
                      <label  className="col-sm-2 control-label" >พบแพทย์ </label>
                      <div className="col-sm-6">
                      <select className="form-control select2" id="dname" ref='dname' value={item.doctor_id} onChange={this.handleChange.bind(this,'D')} > 
                          <option value="-">ไม่ระบุแพทย์</option>                        
                          {dcList.map(createDC)}     
                        </select>                           
                      </div>              
                    </div>
                    <div className="form-group">          
                      <label  className="col-sm-2 control-label" >พนักงาน </label>
                      <div className="col-sm-6">
                      <select className="form-control select2" id="empname" ref='empname' value={item.emp_id} onChange={this.handleChange.bind(this,'E')} > 
                          <option value="-">ไม่ระบุพนักงาน</option>                        
                          {empList.map(createDC)}     
                        </select>                           
                      </div>              
                    </div>
          

                    <div className="form-group"> 
                      <label  className="col-sm-2 control-label" >รายละเอียด </label>
                      <div className="col-sm-6">
                      <textarea className="form-control" name="none" ref='mem'  rows="3" 
                        value={item.mem}
                        onChange={(e) => this.setState({mem: e.target.value})} />
                      </div> 
                    </div>
      

                  </div>                        
                </div>  


                <hr/>     
                <div className="row">

                  <div className="col-sm-3 col-sm-offset-2">
                    
                      <button type="button" className="btn btn-lg btn-block btn-success " onClick={this.handleSaveData.bind(this)} >
                        <i className="fa fa-save"></i> ยืนยันการนัดหมาย
                      </button> 
                  </div>
                  <div className="col-sm-3">
                    
                      <button type="button" className="btn btn-lg btn-block btn-danger " onClick={this.handleCancel.bind(this)} >
                        <i className="fa fa-trash"></i> ยกเลิกการนัด
                      </button> 
                  </div>
  
                </div>




              </form>
            
            </div>
          </div> 


        </div>
      </div>
    </section>   
  	);
  }

  //
  saveData(data){
    const _this = this;
    const item = this.state.appData
    createAppointment(data)
    .then(function(results) {
        if (results.data.status === '201') {
          let temp = { status: 'COMPLETE'  }
          let upData = {data: temp, uid: item.uid, aid: item.aid }
          updateAppointment(upData)
          .then(function(results) {
          
            show_err('success','บันทึกข้อมูลเรียบร้อย');
            _this.props.onReset();
          });
        } else if (results.data.status === '203') {
          show_err('warning',results.data.message) 
        }
    });
  }


}


