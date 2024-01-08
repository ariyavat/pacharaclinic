import React, {Component} from 'react';
import moment from 'moment';
import OrderStatus from '../common/OrderStatus';

import * as config from '../../config';
const imgURL = `${config.init.web_url}images/slip/`;

export default class PaymentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {  ems: '', status: '', send_status: '', send_date: '',  }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    if(this.props.mode==='SEND'){
      $('#send_date').datepicker({ autoclose: true })
    }
   // this.setState({data: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    //
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


  render() {
    const item = this.state
    const {order, mode} = this.props;  
    let img =  imgURL+order.slip;



  	return (
    <section className="content">
      <div className="box box-info min-650" >  
        <div className="box-header with-border cbg-gray" >
          <div className="col-xs-9 col-sm-10">


            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">เลขที่บิล</h4></div>
                <div className="col-xs-8 col-sm-4"><h4 className="modal-title">{order.ino}</h4></div>
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">วันที่</h4></div>
                <div className="col-xs-8 col-sm-4"><h4 className="modal-title">{ moment(order.dat).format('DD/MM/YYYY HH:mm') }</h4></div>                
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">ชื่อลูกค้า</h4></div>
              <div className="col-xs-8 col-sm-4"><h4 className="modal-title">{order.customer_name}</h4></div>
             </div>
            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">ค่าสินค้า</h4></div>
                <div className="col-xs-8 col-sm-4"><h4 className="modal-title"><span className="text-blue">{parseFloat(order.price_total).toLocaleString('en-US', {minimumFractionDigits: 0})}</span> บาท</h4></div>
            </div>

            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">ส่วนลด</h4></div>
              <div className="col-xs-8 col-sm-4"><h4 className="modal-title"><span className="text-blue">{parseFloat(order.price_dis).toLocaleString('en-US', {minimumFractionDigits: 0})}</span></h4></div>
                           
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">ค่าส่ง</h4></div>
              <div className="col-xs-8 col-sm-4"><h4 className="modal-title"><span className="text-blue">{parseFloat(order.price_send).toLocaleString('en-US', {minimumFractionDigits: 0})}</span></h4></div>
                           
            </div>



            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">จำนวนเงินโอน</h4></div>
              <div className="col-xs-8 col-sm-4"><h2 className="modal-title"><span className="text-danger">{parseFloat(order.pay_total).toLocaleString('en-US', {minimumFractionDigits: 0})}</span></h2></div>
                           
            </div>


            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">วันที่โอน</h4></div>
              <div className="col-xs-8 col-sm-4"><h4 className="modal-title"><span className="text-blue">{order.pay_date}</span></h4></div>
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">เวลาโอน</h4></div>
              <div className="col-xs-8 col-sm-4"><h4 className="modal-title"><span className="text-blue">{order.pay_time}</span></h4></div>                
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">ที่อยู่</h4></div>
              <div className="col-xs-8 col-sm-8"><h4 className="modal-title"><span className="text-blue">{order.address} {order.zip}</span></h4></div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-2"><h4 className="modal-title">เบอร์โทร</h4></div>
              <div className="col-xs-8 col-sm-8"><h4 className="modal-title"><span className="text-blue">{order.tel}</span></h4></div>
            </div>




            {
              mode === 'COMPLETE' ?
              <div className="row">
                <div className="col-xs-4 col-sm-2"><h4 className="modal-title">เลขที่ส่งของ</h4></div>
                <div className="col-xs-8 col-sm-4"><h4 className="modal-title">{order.ems}</h4></div>
                <div className="col-xs-4 col-sm-2"><h4 className="modal-title">วันที่ส่งของ</h4></div>
                <div className="col-xs-8 col-sm-4"><h4 className="modal-title">{order.send_date}</h4></div>

             </div>
              : null
            }


    
          </div>
          <div className="col-xs-3 col-sm-2">
              {
                mode === 'PAYMENT'?
                <a className="btn btn-app pull-right" onClick={this.handleSaveData.bind(this)} >
                  <i className="fa fa-save"></i> ยืนยันการชำระเงิน
                </a>
                :
                null
            }     
          </div>         
     
        </div>
        <div className="box-body min-400">   
        {
          mode === 'SEND' ?
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">          
                  <label  className="col-sm-4 control-label" >วันที่ส่งสินค้า <span className="text-red">*</span></label>
                  <div className="col-sm-8">
                    <input type="text"  className="form-control" name="none" id="send_date" ref='send_date' autoComplete="off" />
                  </div>            
              </div>
              <div className="form-group mgt-10">          
                <label  className="col-sm-4 control-label" >เลขที่ส่งของ <span className="text-red">*</span></label>
                <div className="col-sm-8">
                  <input type="text"  className="form-control" name="ems" ref='ems' autoComplete="off" 
                    value={item.ems}
                    onChange={(e) => this.setState({ems: e.target.value})} />
                </div>         
              </div>


            </div>
            <div className="col-sm-3">
                <a className="btn btn-info btn-lg pull-left" onClick={this.handleSaveData.bind(this)} >
                  <i className="fa fa-save"></i> ยืนยันการส่งสินค้า
                </a>

            </div>
          </div> 
          : null
        }
  



          <div className="row mgt-20">
            <div className="col-sm-12">
              <OrderListItems List={order.detail} mode={mode}  />
            </div>
          </div>  


          <div className="row mgt-20">
            <div className="col-sm-6">
             <h2>SLIP การโอน</h2>
             {
              img !== 'NO' ?
              <img  className="img-responsive img-thumbnail" src={img} /> 
              : null
             }
             


            </div>
          </div>  



        </div>
      </div>
    </section>   
  	);
  }

}


function OrderListItems (props) {
  const _this = this
  const { List, mode} = props
  const templist =  List.map((data,i) =>
        <tr key={i} > 
        	<td>{data.id}</td>         
          <td>{data.name}</td>  
          <td>{data.qty}</td>
          <td>{parseFloat(data.price).toLocaleString('en-US', {minimumFractionDigits: 0})}</td>     
        </tr>
  )

  const sendlist =  List.map((data,i) =>{
    if(data.typ === 'D'){
      return(
          <tr key={i} > 
            <td>{data.id}</td>         
            <td>{data.name}</td>  
            <td>{data.qty}</td>
            <td>{parseFloat(data.price).toLocaleString('en-US', {minimumFractionDigits: 0})}</td>     
          </tr>
      )      
    }
  })


  return(
  <table id="mytable" className="table table-bordered table-hover">
      <thead>
      <tr>       
        <th width="100">รหัส</th> 
        <th>รายการสินค้า</th> 
        <th width="100">จำนวน</th>
        <th width="100">ราคารวม</th>                      
      </tr>
      </thead>
      <tbody>
      { 
        mode === 'SEND' ?  sendlist :  templist

      }
 
      </tbody>
  </table>
  )
}
