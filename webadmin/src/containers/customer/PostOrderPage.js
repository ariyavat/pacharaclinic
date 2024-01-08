import React from 'react';
import axios from 'axios';
import moment from 'moment'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ContentHeader from '../../components/common/ContentHeader';
import PostForm from '../../components/customer/PostForm';
import {getPayments} from '../../utils/QueueAPI';
import {getOrders} from '../../utils/OrderAPI';
import {getCustomer} from '../../utils/CustomerAPI';

import * as config from '../../config';

const current_date = moment().format("DD/MM/YYYY");

const initialState = {
  loading: false, isViews: 'LIST', tempList: [], data: [], customer: null, dList: [], sdat:'', edat: ''
};

export default class PostOrderPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleClose = this.handleClose.bind(this)
  }


  componentWillMount() {
   // this.getSUP();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() {  
  	$('#date').datepicker({ autoclose: true });
  	$('#date1').datepicker({ autoclose: true });
  	let dat = moment().format("YYYY-MM-DD");
  	this.setState({  loading: true, isViews: 'LIST', sdat: dat, edat: dat },()=>{  this.getDatas(dat,dat);  })  
  }

  handleShowData(e){
	e.preventDefault();
	if(this.refs.date.value !== ''){
	if(this.refs.date1.value !== ''){			
		const date = this.refs.date.value 
		const txt = date.split('/')	
		const sdate = txt[2]+'-'+txt[1]+'-'+txt[0]		
		const date1 = this.refs.date1.value 
		const txt1 = date1.split('/')	
		const edate = txt1[2]+'-'+txt1[1]+'-'+txt1[0]	
		this.setState({  loading: true, isViews: 'LIST', sdat: sdate, edat: edate  },()=>{  this.getDatas(sdate,edate);  })
	} else { show_err('warning','ไม่ได้กรอกวันที่สิ้นสุด')  }	
	} else { show_err('warning','ไม่ได้กรอกวันที่')  }
	//this.setState({  loading: true, isViews: false },()=>{  this.getDatas();  })
  }

  handleClose(e){
  
  	this.setState({  data: [], loading: true, isViews: 'LIST' },()=>{
  		this.getDatas(this.state.sdat,this.state.edat);		
  	});

  }

  handleShowDetail(data,e){
  	
  	e.preventDefault()
  	const _this = this
  	getCustomer(data.customer_id)
    .then(function(results) {
     
      if (results.data.status === '200') {
        _this.setState({customer: results.data[0], data: data, loading: false},()=>{
        	_this.setState({ isViews: 'VIEW'});
        });
      } else if (results.data.status === '204') {
        _this.setState({customer: [], isViews: 'LIST', loading: false});
      }
    });  	
  }


  render() {
    const item = this.state;
    console.log(item)
    return (
      <div>
        <ContentHeader title="ห้องยา / การเงิน" small="รายงานการชำระเงิน" >
        {
          item.isViews === 'VIEW' ?
          <a onClick={this.handleClose}><i className="fa fa-close pull-right hclose"></i> </a>
          : null
        }
        </ContentHeader>
		{
			item.isViews === 'LIST' ?
        	<section className="content non-printable">
 				<div className="box box-info min-600" >
					<div className="box-header with-border" >
						<div className="col-sm-2">
			                <div className="form-group">
			                  <input type="text" className="form-control" id="date" name="none" ref="date" placeholder="วันที่" autoComplete="off" />
			                </div>
						</div>
						<div className="col-sm-2">
			                <div className="form-group">
			                  <input type="text" className="form-control" id="date1" name="none" ref="date1" placeholder="ถึงวันที่"  autoComplete="off"/>
			                </div>
						</div>
						<div className="col-sm-2">						
							<button type="button" className="btn btn-default" onClick={this.handleShowData.bind(this)} >
								<i className="fa fa-search"></i> แสดงข้อมูล
							</button>			
						
						</div>
						{
							item.tempList.length > 0 && !item.isViews ?
				            <div className="col-sm-3 pull-right">
	                         	<ReactHTMLTableToExcel
						          id="test-table-xls-button"
						          className="btn btn-fault pull-right"
						          table="mytable"
						          filename="ems"
						          sheet="tablexls"
						          buttonText="Download as XLS"
						        />						
							</div>
							: null
						}
					
					</div>
					<div id="rep" className="box-body"> 	
						{
							item.isViews === 'LIST' ?
							<ReportList List={item.tempList} onShow={this.handleShowDetail.bind(this)} />
							: 
							null					
						}										
						
					</div>

					{
					this.state.loading ?
						<div className="overlay">
		              		<i className="fa fa-refresh fa-spin"></i>
		            	</div>
					: null
					}


      			</div>
        	</section> 			

			: 
			null					
		}	


		{
			item.isViews === 'VIEW' ?
			<PostForm data={item.data} customer={item.customer} onClose={this.handleClose} />
			: 
			null					
		}	




      </div>
    );
  }

 //
  getDatas (sdat,edat) { 
    let _this = this;   
    getOrders('POS','-','-',sdat,edat,'-','-','-')
    .then(function(results) {    
  
      if (results.data.status === '200') {
      	_this.setState({ tempList: results.data.data, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ tempList: [] , loading: false });
      }
    });
  }




}



function ReportList (props) {
	const _this = this
	const { List, onShow } = props;
	let sumTotal = 0; let sumCash= 0;  let sumRecive; 
	const list =  List.map((data,i) =>{
		const total = parseFloat(data.totalprice);
	
		return(
        <tr key={i} className="alink" onClick={onShow.bind(this,data)}> 
        	<td>{i+1}</td>   
        	<td>{ moment(data.dat).format('DD/MM/YYYY') }</td>    
        	<td>{data.customer_id}</td>    
        	<td>{data.customer_name}</td> 
        	<td className="text-right">{total.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
        	<td className="text-center">
        	{
        		data.ems === 'NO' ?
        		<span>-</span>
        		:
        		<span>{data.ems}</span>
        	}
        	</td> 
        	<td className="text-center">
        	{
        		data.ems === 'NO' ?
        		<span>รอส่ง</span>
        		:
        		<span className="text-green">ส่งแล้ว</span>
        	}
        	</td> 
        	
         
        </tr>
		)
	});

	return(
	<div className="row">
		<div className="col-sm-12">
			<div className="row">
				<div className="col-sm-12">
					<table id="mytable" className="table table-bordered table-hover">
					    <thead>
					    <tr>
					      <th width='70' className="text-center">#</th>	    
					      <th width='100' className="text-center">วันที่เปิดบิล</th> 
					      <th width='100' className="text-center">รหัสลูกค้า</th> 
					      <th className="text-center">ชื่อลูกค้า</th>	 	           
					      <th width='120' className="text-center">ราคารวม</th>
					      <th width='150' className="text-center">EMS</th>
					      <th width='90' className="text-center">สถานะ</th>
					    </tr>
					    </thead>
					    <tbody>
					    {list}
					    </tbody>
					</table>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12">


				</div>
			</div>
		</div>
	</div>

	)
}

