import React from 'react';
import axios from 'axios';
import uuid from 'uuid';
import moment from 'moment';
import PaymentList from '../../components/order/PaymentList';
import PaymentForm from '../../components/order/PaymentForm';
import ConfirmBox from '../../components/common/ConfirmBox';
import ContentHeader from '../../components/common/ContentHeader';
import {
  getOrders, updateOrder, createVisit, createOrder, createOrderList, 
  createPctrec, createPctlist, getService, getServiceList 
} from '../../utils/OrderAPI';
import {getCustomer} from '../../utils/CustomerAPI';


import {uploadimage, deleteimage} from '../../utils/UploadImagAPI';



import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

const initialState = {
  isView: 'LOAD', isEdit: false,data: [], products: [], msProductList: [], customer: [],
};


export default class PaymentPage extends React.Component {

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
    let _this = this; 
    getCustomer(data.uid)
    .then(function(results) {  
      //console.log(results)
      if (results.data.status === '200') {
        _this.setState({isView: 'FORM',isEdit: true, data: data, loading: false, customer:results.data.data });
      } 
    });
    
  }

  handleView (data) {
  	console.log(data)
    //this.setState({isView: 'VIEW', isEdit: true, data: data});
  }

  handleSaveData () {
  	this.setState({isView: 'SAVE'});
  }

  DeleteResult (status) {
    const _this = this;
    if (status === 'YES') {
      const {data, customer} = this.state
      let status = 'COMPLETE';

      if(customer.id !== 'none'){
        const vn = uuid.v1();
        const cn = '0';
        const dat = moment().format();
        const customer_id = customer.id;
        const customer_name = data.customer_name;

        const visit = {
          id: vn, 
          cn: cn, 
          mode: 'WEB', 
          dat: dat,   
          customer_id: customer_id, 
          customer_name: customer_name,
          doctor_id: '', 
          doctor_name: '', 
          note: 'ซื้อสินค้าผ่านเว็บไซต์', 
          tnote: '',
          dinose: '',
          wg: '',
          hg: '',
          hl: '',
          bl: '',
          tl: '',     
          status: 'COMPLETE',       
        } 

        const order = {
          ino: data.ino,  
          vn: vn,
          cn: cn,
          dat: dat,
          customer_id: customer_id, 
          customer_name: customer_name,     
          payment_mode: 'WEB', 
          payment_plan: 0,     
          emp_id : '',
          emp_name : '', 
          mem: '',
          totalprice : 0,
          payment: 0 ,
          status : 'COMPLETE',
          mode: 'S',
          ems: 'NO',
          sprice: 0,
        }   

      createVisit(visit)
      .then(function(results) {    
        if (results.data.status === '201') {   

          createOrder(order)
          .then(function(results) { 
            if (results.data.status === '201') { 

              data.detail.forEach(function(val){   

                if(val.typ !== 'D'){
                  //Order list      
                  getService(val.id)
                  .then(function(results) {
                    if (results.data.status === '200') {
                      let sv = results.data.data                 
                  
                      let odata = {
                        ino: order.ino,
                        vn: order.vn,
                        cn: order.cn,
                        customer_id: order.customer_id,
                        customer_name: order.customer_name,
                        typ_id: sv.typ_id,
                        typ_name: sv.typ_name,
                        ref_id: val.id,
                        id: val.id,
                        name: sv.name,
                        qty: val.qty,
                        unit: val.unit,
                        payment: 0,
                        uprice: val.price,
                        discount: 0,
                        price: val.price,
                        dcom: 'N',
                        scom: 'N',
                        vat: sv.vat,
                        dis_emp_id: '',
                        dis_emp_name: '',   
                        emp_id_1: '',
                        emp_name_1: '',
                        com_1: 0,
                        emp_id_2: '',
                        emp_name_2: '',
                        com_2: 0,
                        emp_id_3: '',
                        emp_name_3: '',
                        com_3: 0,
                        emp_id_4: '',
                        emp_name_4: '',
                        com_4: 0,
                      } 
                                           
                      createOrderList(odata)
                      .then(function(results) {
                        //console.log('createOrderList',results.data)
                      });
                      
                      let tmode = 'T';
                      if(val.typ === 'P'){ tmode = 'P'; }
                      let qtotal = val.qty;
                      if(sv.qty_mode === 'Y'){  qtotal = parseFloat(sv.qty_limit) * parseFloat(val.qty); }
                      let tdata = {
                        order_id: order.ino,
                        vn: order.vn,
                        cn: order.cn,
                        dat: order.dat,
                        customer_id: order.customer_id,
                        customer_name: order.customer_name,
                        mode: tmode,
                        typ_id: sv.typ_id,
                        typ_name: sv.typ_name,         
                        id: val.id,
                        name: sv.name,
                        qty: val.qty,
                        total: qtotal,
                        unit: val.unit,           
                        price: val.price,
                        payment: val.price,
                        day_mode: sv.day_mode,
                        day_limit: sv.day_limit,
                        qty_mode: sv.qty_mode,
                        qty_limit: sv.qty_limit,
                        status: 'WAIT'
                      }

                      
                      createPctrec(tdata)
                      .then(function(results) {
                        //console.log('createPctrec',results.data)
                      });
                    

                      if(val.typ === 'P'){
                        getServiceList(val.id,sv.typ_id)
                        .then(function(results) {
                          
                          if(results.data.status === '200'){
                          
                            results.data.data.forEach(function(val1){  

                              if(val.mode !== 'D'){
                                let tqty = val1.qty * val.qty
                                let trdata = {
                                  order_id: order.ino,
                                  vn: order.vn,
                                  cn: order.cn,
                                  customer_id: order.customer_id,
                                  customer_name: order.customer_name,
                                  ref_id: val.id,
                                  typ_id: 'TR',
                                  typ_name: 'Treatment',         
                                  id: val1.pid,
                                  name: val1.pname,
                                  qty: tqty,
                                  total: tqty,
                                  unit: val1.unit,
                                  status: 'WAIT'
                                }
                        
                                createPctlist(trdata)
                                .then(function(results) {
                                  //console.log('createPctrec',results.data)
                                });

                                
                              }




                            })
                          }

                        });
                      }
                    }
                  });
                }     
              });
            }
          });       
        } else {
          status = 'CONFIRM';
        } 
      });

    } 

    const temp = {send_status: status};
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
    let title = 'แจ้งการชำระเงิน';
    switch (item.isView) {
      case 'LIST' : title = 'แจ้งการชำระเงิน'; break;
      case 'VIEW' : title = 'ข้อมูลการแจ้งชำระเงิน'; break;
      case 'FORM' : title = 'ข้อมูลการแจ้งชำระเงิน'; break;
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
              mode={'PAYMENT'}
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
    getOrders('WEBADMIN','PAYMENT')
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
