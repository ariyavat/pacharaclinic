import React, {Component} from 'react';
import moment from 'moment'
import Pager from 'react-pager';
import SearchInput, {createFilter} from 'react-search-input';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const KEYS_TO_FILTERS = ['tel', 'customer_name', 'pay_date'];

import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

export default class RepList extends Component {
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
    $('#date').datepicker({ autoclose: true });  
    this.setState({data: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }



  handleShowData (e) {
  	e.preventDefault();
	if(this.refs.date.value !== ''){
		const sdat = this.refs.date.value;
		const txt = sdat.split('/');
		const sdate = txt[2]+'-'+txt[1]+'-'+txt[0];	 	
	 	this.props.onShow(sdate);
	
	} else { show_err('warning','ไม่ได้กรอกวันที่')  } 
  	
  }

  handleEdit (data, e) {
    this.props.onEdit(data);
  }


  render() {
    const _this = this;
    const item = this.state
    const {data, mode} = this.props;

    //const filteredData = data.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS)); 
    




    const rows = data.map((row, i) => {
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

				<div className="row">
					<div className="col-sm-4">
		                <div className="form-group">
		                  <input type="text" className="form-control" id="date" name="none" ref="date" placeholder="วันที่" autoComplete="off" />
		                </div>
					</div>
										
					<div className="col-sm-2">
						<button type="button" className="btn btn-default" onClick={this.handleShowData.bind(this)} >
							<i className="fa fa-search"></i> แสดงข้อมูล
						</button>									
					</div>                      	
				</div>


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
                  <th className="text-center" width="100">{ mode === 'NONE'? 'วันที่โอน' : 'วันที่ส่งสินค้า' }</th>  
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


