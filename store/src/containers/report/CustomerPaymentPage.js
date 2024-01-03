import React from 'react';
import axios from 'axios';
import moment from 'moment'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ContentHeader from '../../components/common/ContentHeader';
import StoreReportDetail from '../../components/store/StoreReportDetail';
import {getCustomerPayment} from '../../utils/QueueAPI';
import * as config from '../../config';

const initialState = {
  loading: false, isViews: false, tempList: [], data: [], dList: [], employees: [], emp_id: 'ALL', emp_name: '',
};


export default class CustomerPaymentPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    //
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() { 
  	$('#date').datepicker({ autoclose: true });
  	$('#date1').datepicker({ autoclose: true });
  	let dat = moment().format("YYYY-MM-DD");
  	this.setState({  loading: true, isViews: false },()=>{  this.getDatas(dat,dat);  })  
  }

  handleEmpChange (e) {
    e.preventDefault();
	let idx = this.state.employees.findIndex((x) => x.id === this.refs.emp.value);
	  if(idx !== -1){
	    this.setState({emp_id: this.refs.emp.value, emp_name: this.state.employees[idx].name});  
	  } else {
	    this.setState({emp_id: 'ALL'});  
	  }
  }


  handleShowData(e){
	e.preventDefault()
	if(this.refs.date.value !== ''){
	if(this.refs.date.value !== ''){			
		const date = this.refs.date.value 
		const txt = date.split('/')	
		const sdate = txt[2]+'-'+txt[1]+'-'+txt[0]		
		const date1 = this.refs.date1.value 
		const txt1 = date1.split('/')	
		const edate = txt1[2]+'-'+txt1[1]+'-'+txt1[0]	
		this.setState({  loading: true, isViews: false },()=>{  this.getDatas(sdate,edate);  })
	} else { show_err('warning','ไม่ได้กรอกวันที่สิ้นสุด')  }	
	} else { show_err('warning','ไม่ได้กรอกวันที่')  }
  }

  handleShowDetail(data,e){
  	e.preventDefault()
  	this.setState({  data: data, loading: true },()=>{
  		this.getDetail(data.ino);  		
  	});
  	
  }


  render() {
    const item = this.state;
    let createEmp = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    return (
      <div>
        <ContentHeader title="รายงาน" small="ยอดซื้อของลูกค้า" />
        <section className="content non-printable">
 				<div className="box box-info min-600" >
					<div className="box-header with-border" >
						<div className="col-sm-8">
							<div className="row">
							
								<div className="col-sm-3">
					                <div className="form-group">
					                  <input type="text" className="form-control" id="date" name="none" ref="date" placeholder="วันที่" autoComplete="off" />
					                </div>
								</div>
								<div className="col-sm-3">
					                <div className="form-group">
					                  <input type="text" className="form-control" id="date1" name="none" ref="date1" placeholder="ถึงวันที่" autoComplete="off" />
					                </div>
								</div>								
								<div className="col-sm-2">
									<button type="button" className="btn btn-default" onClick={this.handleShowData.bind(this)} >
										<i className="fa fa-search"></i> แสดงข้อมูล
									</button>									
								</div>
	                          	
							</div>
						</div>
						{
							item.tempList.length > 0 && !item.isViews ?
				            <div className="col-sm-4">
	                         	<ReactHTMLTableToExcel
						          id="test-table-xls-button"
						          className="btn btn-fault pull-right"
						          table="mytable"
						          filename="customer_payments"
						          sheet="tablexls"
						          buttonText="Download as XLS"
						        />						
							</div>
							: null
						}
					
					</div>
					<div id="rep" className="box-body"> 	
						{
							!item.isViews ?
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
      </div>
    );
  }
  //
  getDatas (sdat,edat) { 
    let _this = this;
    getCustomerPayment(sdat,edat)
    .then(function(results) {
      if (results.data.status === '200') {
      	_this.setState({ tempList: results.data.data, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ tempList: [] , loading: false });
      }
    });
  }

/*
  getDetail (ino) { 
    let _this = this;
    getReciveDetail(ino)
    .then(function(results) {
      if (results.data.status === '200') {
      	_this.setState({ dList: results.data.data, loading: false, isViews: true  });
      } else if (results.data.status === '204') {
        _this.setState({ dList: [] , loading: false, isViews: false });
      }
    });
  }
  */

}



function ReportList (props) {
	const _this = this
	const { List } = props;
	let sumTotal = 0; let sumCash= 0;  
	const list =  List.map((data,i) =>{		
		let total = parseFloat(data.total);	
		return(
        <tr key={i}  > 
        	<td>{i+1}</td>   
     
        	<td>{data.customer_id}</td>    
        	<td>{data.customer_name}</td> 
        	<td >{total.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
     
		
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
					      <th width="40">#</th>	    
					      <th width="150">รหัสลูกค้า</th> 
					      <th >ชื่อลูกค้า</th> 			
					      <th width="250">จำนวนเงิน</th> 
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

