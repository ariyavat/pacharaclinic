import React from 'react';
import axios from 'axios';
import uuid from 'uuid';
import moment from 'moment';
import SeedoctorList from '../../components/doctor/SeedoctorList';
import SeedoctorForm from '../../components/doctor/SeedoctorForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';

import {getSeedoctor, getSeedoc, createSeedoctorlist} from '../../utils/DoctorAPI';




import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], list: [], products: [],
};


export default class SeedoctorPage extends React.Component {

  constructor(props) {
    super(props);
        this.state = initialState;
  }
  reset (e) {
    e.preventDefault();
    this.setState({isView: 'LIST', isEdit: false, data: []});
  }


  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }
  componentDidMount() {

    this.getDatas('N');

  }

  handleNewForm (e) {  
    this.setState({isView: 'FORM', isEdit: false, data: [], loading: false });
  }

  handleEdit (data) {
    this.getDetail(data.uid,data.id)
    /*
    let _this = this;
    getSeedoc(data.uid, data.id)
    .then(function(results) {   
      if (results.data.status === '200') {
      	let list = []
      	if(results.data.list !== 'NO'){
      		list = results.data.list
      	}
        _this.setState({isView: 'FORM',isEdit: true, data: results.data.data, list: list, loading: false, });
      } 
    });    
    */
  }

  handleView (data) {
  	//console.log(data)
    this.getDetail(data.uid,data.id)

    /*
    let _this = this; 
    getSeedoctor(status)
    .then(function(results) {  
      if (results.data.status === '200') {
        _this.setState({products: results.data.data,isView: 'LIST'});
      } else if (results.data.status === '204') {
        _this.setState({products: [], isView: 'LIST'});
      }
    });
    */
    //this.setState({isView: 'VIEW', isEdit: true, data: data});
  }

  handleSaveData (data) {
    const _this = this
    createSeedoctorlist(data)
    .then(function(results) {    
      if (results.data.status === '201') {          
        _this.setState({ isRequest : false },()=>{
          show_err('success','บันทึกคำตอบเรียบร้อยแล้ว..')
          _this.getDetail(data.uid,data.id)
        })

      } else {
        show_err('warning',results.data.msg);   
      }
    }); 
  }



  handleClosepage () {
    this.setState({isView: 'LIST'});
  }

  handleShowData(dat,mode){
  	
  	this.getDatas(mode)
  }

  render() {
    const item = this.state;
    let title = 'รายการคำถาม';
    switch (item.isView) {
      case 'LIST' : title = 'รายการคำถาม'; break;
      case 'VIEW' : title = 'ข้อมูลคำถาม'; break;
      case 'FORM' : title = 'ข้อมูลคำถาม'; break;
    }
    
    return (
      <div>
        <ContentHeader title="SEE DOCTOR" small={title} >
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
            <SeedoctorList                    
              data={item.products}       
              onShow={this.handleShowData.bind(this)}
              onEdit={this.handleEdit.bind(this)}    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <SeedoctorForm
              loading={item.loading}
              data={item.data}
              list={item.list}
              onSave={this.handleSaveData.bind(this)}
            />
            : null
        }



  
      </div>
    );
  }
 //

 getDetail(uid,id){
    let _this = this;
    getSeedoc(uid,id)
    .then(function(results) { 
      console.log(results)  
      if (results.data.status === '200') {
        let list = []
        if(results.data.list !== 'NO'){
          list = results.data.list
        }
        _this.setState({isView: 'FORM',isEdit: true, data: results.data.data, list: list, loading: false, });
      } 
    }); 
 }

  getDatas (status) {
    let _this = this; 
    getSeedoctor(status)
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
