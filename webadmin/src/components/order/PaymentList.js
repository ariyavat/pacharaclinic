import React, {Component} from 'react';
import moment from 'moment'
import Pager from 'react-pager';
import SearchInput, {createFilter} from 'react-search-input';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const KEYS_TO_FILTERS = ['tel', 'customer_name', 'pay_date'];

import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

export default class PaymentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '',
    };
  }
  componentWillMount(){
    //const auth = JSON.parse(localStorage.getItem('msClinic')).auth; 
   // this.setState({auth: auth});
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {    
    this.setState({data: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }



  handleNew () {
  	this.props.onNew();
  }

  handleEdit (data, e) {
    this.props.onEdit(data);
  }


  render() {
    const _this = this;
    const item = this.state
    const { auth,group_id } = this.state;
    const {data, mode} = this.props;

    const filteredData = data.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS)); 
    




    const rows = filteredData.map((row, i) => {
      let totalprice = parseFloat(row.price_total) + parseFloat(row.price_send)
      return (
        <tr  key={i} className="alink" onClick={this.handleEdit.bind(this,row)} >
          <td >{i + 1}</td>
          <td className="text-center">{row.ino}</td>
          <td className="text-center">{ moment(row.dat).format('DD/MM/YYYY HH:mm') }</td>
          <td className="text-right">{parseFloat(row.price_total).toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
          <td className="text-right">{parseFloat(row.price_send).toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
          <td className="text-right">{totalprice.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
          <td >{row.customer_name} </td>

          <td className="text-center">{ mode === 'NONE'? row.pay_date : row.send_date }</td>
          <td className="text-center">{ mode === 'NONE'? row.pay_time : row.ems  }</td> 
          {
          mode === 'NONE'?
          <td className="text-right">{parseFloat(row.pay_total).toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
          :
          null            
          }


              
        </tr>
      );
    });


    return (

      <section className="content">
        <div className="box box-info min-550" >  
          <div className="box-header with-border" >
            <div className="col-sm-9">
              <form role="form">  
                <div className="row">
             
                  <div className="col-sm-5">
                      <div className="form-group">                         
                          <input type="text" 
                            className="form-control" autoComplete="off"
                            name="enter" 
                            value={this.state.searchTerm}                           
                            onChange={(e) => this.setState({searchTerm: e.target.value})}                               
                            />
                      </div>
                  </div>  
             
                </div>
              </form>
            </div>
            <div className="col-sm-3 ">
       
    

            </div>          
          </div>
          <div className="box-body">        
            <table id="mytable" className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th className="text-center" width="50">#</th>
                  <th className="text-center" width="100">เลขที่สั่งซื้อ</th>
                  <th className="text-center" width="150">วันที่สั่งซื้อ</th>
                  <th className="text-center" width="100">ราคาสินค้า</th>
                  <th className="text-center" width="100">ค่าส่ง</th>
                  <th className="text-center" width="100">ราคารวม</th>
                  <th className="text-center">ชื่อลูกค้า</th>  
                  <th className="text-center" width="100">{ mode === 'NONE'? 'วันที่โอน' : 'วันที่ส่ง' }</th>  
                  <th className="text-center" width="100">{ mode === 'NONE'? 'เวลาโอน' : 'เลขที่ส่งของ' }</th>  
                  { mode === 'NONE'? <th className="text-center" width="150">จำนวนเงิน</th> : null }                                           
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
          </div>  


        </div>
      </section>
    );
  }
}


