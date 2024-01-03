import React from 'react';
import axios from 'axios';
import moment from 'moment'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ContentHeader from '../../components/common/ContentHeader';
import StoreReportDetail from '../../components/store/StoreReportDetail';
import {getPaymentLists} from '../../utils/QueueAPI'; 
import {getComsales} from '../../utils/OrderAPI';
import {getEmployees} from '../../utils/EmployeeAPI';
import * as config from '../../config';

const initialState = {
  loading: false, isViews: false, tempList: [], data: [], employees: [], emp_id: 'ALL', emp_name: '',
  dList: [], tList: [], pList: []
};


export default class EmpsalePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    this.getEmployee();
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
        <ContentHeader title="รายงาน" small="ยอดขายของพนักงาน" />
        <section className="content non-printable">
 				<div className="box box-info min-600" >
					<div className="box-header with-border" >
						<div className="col-sm-8">
							<div className="row">
							    <div className="col-sm-4">
					              <select className="form-control" id="emp"  ref="emp" value={item.emp_id} onChange={this.handleEmpChange.bind(this)}> 
					                  <option value="ALL">เลือกพนักงาน</option>                        
					                  {item.employees.map(createEmp)}     
					              </select> 

							    </div>

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
							item.dList.length > 0 || item.tList.length > 0 || item.pList.length > 0 ?
				            <div className="col-sm-4">
	                         	<ReactHTMLTableToExcel
						          id="test-table-xls-button"
						          className="btn btn-fault pull-right"
						          table="mytable"
						          filename="rep_payments"
						          sheet="tablexls"
						          buttonText="Download as XLS"
						        />						
							</div>
							: null
						}
					
					</div>
					<div id="rep" className="box-body"> 	
					
						<ReportList dList={item.dList} tList={item.tList} pList={item.pList} onShow={this.handleShowDetail.bind(this)} />
										
						
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
  getEmployee(){
    let _this = this;
    const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    getEmployees(cn,'E')
    .then(function(results) {
  
      if (results.data.status === '200') {        
        _this.setState({employees: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({employees:[]});
      }
    });	
  }

  getDatas (sdat,edat) { 
    let _this = this;
    getComsales(this.state.emp_id,sdat,edat)
    .then(function(results) {
      
      if (results.data.status === '200') {
      	let data = results.data
      	let dList = []
      	let tList = []
      	let pList = []
      	if(data.dList !== null){ dList = data.dList  }
      	if(data.tList !== null){ tList = data.tList  }
      	if(data.pList !== null){ pList = data.pList  }

      	_this.setState({ dList: dList, tList: tList, pList: pList, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ dList: [], tList: [], pList: [] , loading: false });
      }
    });
  }

}



function ReportList (props) {
	const _this = this
	const { dList, tList, pList } = props;
	let sumTotal = 0; let sumRecive= 0;  
	const dlist =  dList.map((data,i) =>{		
		let price = parseFloat(data.price);	
		let recive = parseFloat(data.recive);	
		sumTotal = sumTotal + price;
		sumRecive = sumRecive + recive;
		return(
        <tr key={i}  > 
        	<td>{i+1}</td>   
        	<td>{ moment(data.dat).format('DD/MM/YYYY') }</td>            
        	<td>{data.customer_id}</td>  
        	<td>{data.typ_name}</td>
        	<td>{data.name}</td> 
        	<td>{data.qty}</td> 
        	<td>{data.unit}</td>
        	<td >{price.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
        	<td >{recive.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
            <td>{data.emp_name1}</td>
            <td>{data.emp_name2}</td>		
        </tr>
		)
	});


	const tlist =  tList.map((data,i) =>{		
		let price = parseFloat(data.price);	
		let recive = parseFloat(data.recive);
		sumTotal = sumTotal + price;
		sumRecive = sumRecive + recive;
		return(
        <tr key={i}  > 
        	<td>{i+1}</td>   
        	<td>{ moment(data.dat).format('DD/MM/YYYY') }</td>            
        	<td>{data.customer_id}</td>  
        	<td>{data.typ_name}</td>
        	<td>{data.name}</td> 
        	<td>{data.qty}</td> 
        	<td>{data.unit}</td>
        	<td >{price.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
        	<td >{recive.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
            <td>{data.emp_name1}</td>
            <td>{data.emp_name2}</td>		
        </tr>
		)
	});

	const plist =  pList.map((data,i) =>{		
		let price = parseFloat(data.price);	
		let recive = parseFloat(data.recive);
		sumTotal = sumTotal + price;
		sumRecive = sumRecive + recive;
		return(
        <tr key={i}  > 
        	<td>{i+1}</td>   
        	<td>{ moment(data.dat).format('DD/MM/YYYY') }</td>            
        	<td>{data.customer_id}</td>  
        	<td>{data.typ_name}</td>
        	<td>{data.name}</td> 
        	<td>{data.qty}</td> 
        	<td>{data.unit}</td>
        	<td >{price.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
        	<td >{recive.toLocaleString('en-US', {minimumFractionDigits: 2})}</td> 
            <td>{data.emp_name1}</td>
            <td>{data.emp_name2}</td>		
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
					      <th width="70">วันที่</th> 					      
					      <th width="100">HN</th>
					      <th width="140">ประเภท</th>  
					      <th>รายการ</th>	 	           
					      <th width="60">จำนวน</th>	
					   	  <th width="60">หน่วย</th>	
					   	  <th width="90">ราคา</th>	
					   	  <th width="90">รับเงิน</th>		
					      <th width="130">พนักงาน</th> 
					      <th width="130">พนักงาน</th> 
					    </tr>
					    </thead>
					    <tbody>
					    {dlist}
					    {tlist}
					    {plist}
					    </tbody>

					    {
					    dList.length > 0 || tList.length > 0 || pList.length > 0 ?
					    <tfoot>
						    <tr>
						      <th colSpan="7" className="text-right"><h4>รวมทั้งหมด</h4></th>							    
						      <th width='90' className="text-right"><h4>{parseFloat(sumTotal).toLocaleString('en-US', {minimumFractionDigits: 2})}</h4></th>
						      <th width='90' className="text-right"><h4>{parseFloat(sumRecive).toLocaleString('en-US', {minimumFractionDigits: 2})}</h4></th>					   
						      <th colSpan="2" className="text-right"></th>
						    </tr>					    
					    </tfoot>
					    : null
					    }



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

