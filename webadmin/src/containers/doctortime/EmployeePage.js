import React from 'react';
import axios from 'axios';
import uuid from 'uuid';
import moment from 'moment';
import EmployeeList from '../../components/doctor/EmployeeList';
import EmployeeForm from '../../components/doctor/EmployeeForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getEmployees, getGenerals, getLocations } from '../../utils/AppointmentAPI'; 
import {getEmployeeTime, createEmployeeTime, updateEmployeeTime, deleteEmployeeTime} from '../../utils/DoctorAPI'; 

const monthTH = [
  {id:1,name:"มกราคม" },{id:2,name:"กุมภาพันธ์"},{id:3,name:"มีนาคม"},{id:4,name:"เมษายน"},
  {id:5,name:"พฤษภาคม"},{id:6,name:"มิถุนายน"},{id:7,name:"กรกฎาคม"},{id:8,name:"สิงหาคม"},
  {id:9,name:"กันยายน"},{id:10,name:"ตุลาคม"},{id:11,name:"พฤศจิกายน"},{id:12,name:"ธันวาคม"}
];



import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false, data: {}, products: [], dcList: [], locations: [], delData: {}, dat:''
};


export default class EmployeePage extends React.Component {

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
    let dat = moment().format('YYYY-MM');   
    this.setState({ dat:dat },()=>{
    	this.getDatas(dat);	
    })
    
    const _this = this;
    getEmployees('D','Y')
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({dcList: results.data.data});
      } else {
        _this.setState({dcList: []});
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

  handleShowdata(dat){
  	this.setState({ dat: dat },()=>{
  		this.getDatas(dat);	
  	})
    
  }

  handleNew (data) {  	
    this.setState({isView: 'FORM',isEdit: false, data: null, loading: false});
  }

  handleEdit (data) {  	
    //this.setState({isView: 'FORM',isEdit: true, data: data, loading: false});

    this.setState({ isView: 'DELETE', delData: data })
  }

  handleView (data) {  	
    //this.setState({isView: 'VIEW', isEdit: true, data: data});
  }

  handleSaveData (data) {

		this.saveData(data)
  	
  	
  }

  handleDeledata(data){
  	this.setState({ isView: 'DELETE', delData: data })
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
      const {delData} = this.state
      this.deleteData(delData);    
    } else {
      this.setState({isView: 'FORM'});
    }
  }

  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  render() {
    const item = this.state;
    let title = 'ตารางพนักงานทรีทเมนท์';
    switch (item.isView) {
      case 'LIST' : title = 'ตารางพนักงานทรีทเมนท์'; break;
      case 'VIEW' : title = 'ข้อมูลตารางพนักงานทรีทเมนท์'; break;
      case 'FORM' : title = 'ข้อมูลตารางพนักงานทรีทเมนท์'; break;
    }
    
    return (
      <div>
        <ContentHeader title="ตารางพนักงาน" small={title} >
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
            <EmployeeList   
              mode={'NONE'}   
              monthTH={monthTH}    
              data={item.products}    
              onShow={this.handleShowdata.bind(this)}   
              onNew={this.handleNew.bind(this)}       
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <EmployeeForm 
              loading={item.loading}
              monthTH={monthTH} 
              isEdit={item.isEdit}
              onReset={this.reset.bind(this)}          
          	  onSave={this.handleSaveData.bind(this)}
          	  onDele={this.handleDeledata.bind(this)}
              data={item.data}
              dcList={item.dcList}      
              locations={item.locations}
              onReset={this.reset.bind(this)}
            />
            : null
        }

        {
          this.state.isView === 'DELETE' ?
            <ConfirmBox
              mode={'DELETE'}
              onSave={this.DeleteResult.bind(this)}
            />          
            : null
        }


  
      </div>
    );
  }
 //

  getDatas (dat) {
    let _this = this; 

    getEmployeeTime(dat)
    .then(function(results) {  
      if (results.data.status === '200') {
        _this.setState({products: results.data.data,isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
  }


   saveData (data) {
    let _this = this;
   
    createEmployeeTime(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','บันทึกข้อมูลแล้ว')        
        _this.getDatas(_this.state.dat);
    
      }
    });
   
  } 


  updateData (data) {
    let _this = this;
    updateEmployeeTime(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas(_this.state.dat);
    
      }
    });
  }

  deleteData (data) {
    let _this = this;
    deleteEmployeeTime(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบข้อมูลเรียบร้อยแล้ว')        
        _this.getDatas(_this.state.dat);
    
      }
    });
  }

}
