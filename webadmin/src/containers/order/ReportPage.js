import React from 'react';
import axios from 'axios';
import uuid from 'uuid';
import moment from 'moment';
import RepList from '../../components/order/RepList';
import PaymentForm from '../../components/order/PaymentForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {getOrders, updateOrder } from '../../utils/OrderAPI';

//import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';



import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const current_date = moment().format("YYYY-MM-DD");

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], dat: ''
};


export default class ReportPage extends React.Component {

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
  	this.setState({ dat : current_date   },()=>{
  		this.getDatas();	
  	})
  }

  handleNewForm (e) {  
    this.setState({isView: 'FORM', isEdit: false, data: [], loading: false });
  }

  handleEdit (data) {
  	console.log(data)
    this.setState({isView: 'FORM',isEdit: true, data: data, loading: false});
  }

  handleView (dat) {
  	
    this.setState({ dat: dat},()=>{
    	this.getDatas();	
    });
  }

  handleSaveData (ems) {
  	this.setState({isView: 'SAVE', ems: ems});
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
      const {data, ems} = this.state
      const temp = {send_status: 'COMPLETE', ems: ems};
      const newData = {data: temp, ino: data.ino, uid: data.uid};
      console.log(newData)
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
    let title = 'รายงานการสั่งซื้อสินค้า';
    switch (item.isView) {
      case 'LIST' : title = 'รายงานการสั่งซื้อสินค้า'; break;
      case 'VIEW' : title = 'รายละเอียดการสั่งซื้อ'; break;
      case 'FORM' : title = 'รายละเอียดการสั่งซื้อ'; break;
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
            <RepList     
              mode={'COM'}   
              data={item.products}              
              onShow={this.handleView.bind(this)}
              onEdit={this.handleEdit.bind(this)}    
            /> :
          null
        }

        {
          this.state.isView === 'FORM' ?
            <PaymentForm
              mode={'COMPLETE'}
              loading={item.loading}
              onReset={this.reset.bind(this)}          
          	  onSave={this.handleSaveData.bind(this)}
              order={item.data}
         
            />
            : null
        }



  
      </div>
    );
  }
 //

  getDatas () {
    let _this = this; 
    getOrders('WEBREP',this.state.dat)
    .then(function(results) { 
      console.log(results) 
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
