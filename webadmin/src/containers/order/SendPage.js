import React from 'react';
import axios from 'axios';
import uuid from 'uuid'
import PaymentList from '../../components/order/PaymentList';
import PaymentForm from '../../components/order/PaymentForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getOrders, updateOrder } from '../../utils/OrderAPI';

import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';



import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], ems: '', send_date: '',
};


export default class SendPage extends React.Component {

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

    this.getDatas();

  }

  handleNewForm (e) {  
    this.setState({isView: 'FORM', isEdit: false, data: [], loading: false });
  }

  handleEdit (data) {
  	console.log(data)
    this.setState({isView: 'FORM',isEdit: true, data: data, loading: false});
  }

  handleView (data) {
  	console.log(data)
    //this.setState({isView: 'VIEW', isEdit: true, data: data});
  }

  handleSaveData (ems, dat) {
  	this.setState({isView: 'SAVE', ems: ems, send_date: dat});
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
      const {data, ems, send_date} = this.state
      const temp = {send_status: 'COMPLETE', ems: ems, send_date: send_date};
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
    let title = 'รอส่งสินค้า';
    switch (item.isView) {
      case 'LIST' : title = 'รอส่งสินค้า'; break;
      case 'VIEW' : title = 'ข้อมูลการส่งสินค้า'; break;
      case 'FORM' : title = 'ข้อมูลการส่งสินค้า'; break;
    }
    
    return (
      <div>
        <ContentHeader title="รายการสั่งซื้อ" small={title} >
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
            <PaymentList  
              mode={'NONE'}        
              data={item.products}              
              onView={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <PaymentForm
              mode={'SEND'}
              loading={item.loading}
              onReset={this.reset.bind(this)}          
          	  onSave={this.handleSaveData.bind(this)}
              order={item.data}
         
            />
            : null
        }

        {
          this.state.isView === 'SAVE' ?
            <ConfirmBox
              mode={'PAYMENT'}
              onSave={this.DeleteResult.bind(this)}
            />          : null
        }


  
      </div>
    );
  }
 //

  getDatas () {
    let _this = this; 
    getOrders('WEBADMIN','SEND')
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
