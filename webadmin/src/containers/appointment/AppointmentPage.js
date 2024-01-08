import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import AppointmentList from '../../components/appointment/AppointmentList';
import AppointmentForm from '../../components/appointment/AppointmentForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getOrders, updateOrder } from '../../utils/OrderAPI';  
import {getAppointments, updateAppointment, getEmployees, getGenerals, createAppointment, getLocations } from '../../utils/AppointmentAPI'; 





import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false,data: {}, products: [], msProductList: [], empList: [], roomList: [], dcList: [],
  locations: [],
};


export default class AppointmentPage extends React.Component {

  constructor(props) {
    super(props);
        this.state = initialState;
  }
  reset () {    
    this.setState({isView: 'LIST', isEdit: false, data: []},()=>{
      this.getDatas();  
    });
  }


  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }
  componentDidMount() {

    this.getDatas();

    const _this = this;
    getEmployees('D','Y')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({dcList: results.data.data});
      } else {
        _this.setState({dcList: []});
      }
    });    

    getEmployees('E','Y')
    .then(function(results) {
      if (results.data.status === '200') {        
        _this.setState({empList: results.data.data},()=>{

        });
      } else if (results.data.status === '204') {
        _this.setState({empList:[]});
      }
    }); 

    getGenerals('RM')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({roomList: results.data.data});      
      } else if (results.data.status === '204') {
        _this.setState({roomList: []});
      }
    });    

    getLocations('-')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({locations: results.data.data});      
      } else if (results.data.status === '204') {
        _this.setState({locations: []});
      }
    });

     


  }


  handleEdit (data) {  	
    this.setState({isView: 'FORM',isEdit: true, data: data, loading: false});
  }

  handleView (data) {  	
    //this.setState({isView: 'VIEW', isEdit: true, data: data});
  }

  handleSaveData () {
  	this.setState({isView: 'SAVE'});
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
      const {data} = this.state
      const temp = {send_status: 'CONFIRM'};
      const newData = {data: temp, ino: data.ino, uid: data.uid};
    
      this.updateData(newData);
    
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'รายการนัดรอการยืนยัน';
    switch (item.isView) {
      case 'LIST' : title = 'รายการนัดรอการยืนยัน'; break;
      case 'VIEW' : title = 'ข้อมูลการนัด'; break;
      case 'FORM' : title = 'ข้อมูลการนัด'; break;
    }
    
    return (
      <div>
        <ContentHeader title="รายการนัดหมาย" small={title} >
        {
          item.isView === 'FORM' ?
          <a onClick={this.handleClosepage.bind(this)}><i className="fa fa-close pull-right hclose"></i> </a>
          : null
        }
        </ContentHeader>

        {
          this.state.isView === 'LOAD' ?
          'LOADING.....' : null
        }

        {
          this.state.isView === 'LIST' ?
            <AppointmentList   
              mode={'NONE'}       
              data={item.products}              
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <AppointmentForm 
              loading={item.loading}
              onReset={this.reset.bind(this)}          
          	  onSave={this.handleSaveData.bind(this)}
              data={item.data}
              dcList={item.dcList}
              empList={item.empList}
              roomList={item.roomList}
              locations={item.locations}
              onReset={this.reset.bind(this)}
            />
            : null
        }

        {
          this.state.isView === 'SAVE' ?
            <ConfirmBox
              mode={'APPOINTMENT'}
              onSave={this.DeleteResult.bind(this)}
            />          
            : null
        }


  
      </div>
    );
  }
 //

  getDatas () {
    let _this = this; 
    getAppointments('NONE')
    .then(function(results) {  
      if (results.data.status === '200') {
        _this.setState({products: results.data.data,isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
  }


  


  updateData (data) {
    let _this = this;
    updateOrder(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','ยืนยันการชำระเงินเรียบร้อยแล้ว')        
        _this.getDatas();
    
      }
    });
  }


}
