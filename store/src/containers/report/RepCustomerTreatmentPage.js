import React from 'react';
import axios from 'axios';
import moment from 'moment'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ContentHeader from '../../components/common/ContentHeader';
import StoreReportDetail from '../../components/store/StoreReportDetail';
import {getTreatmentTotal} from '../../utils/TreatmentAPI';
import {getServices} from '../../utils/ServiceAPI';
import * as config from '../../config';

const initialState = {
  loading: false, isViews: false, tempList: [], data: [], dList: [], employees: [], tid: 'ALL', tname: '',
};

export default class RepCustomerTreatmentPage extends React.Component {

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
  	//this.setState({  loading: true, isViews: false })  
  }

  handleEmpChange (e) {
    e.preventDefault();
	let idx = this.state.employees.findIndex((x) => x.id === this.refs.emp.value);
	  if(idx !== -1){
	    this.setState({tid: this.refs.emp.value, tname: this.state.employees[idx].name});  
	  } else {
	    this.setState({tid: '-'});  
	  }
  }

  handleShowData(e){
	e.preventDefault()
	this.setState({  loading: true, isViews: false },()=>{  this.getDatas();  })
  }


  render() {
    const item = this.state;
    let createEmp = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    return (
      <div>
        <ContentHeader title="รายงาน" small="ทรีทเมนท์คงเหลือ" />
        <section className="content non-printable">
 				<div className="box box-info min-600" >
					<div className="box-header with-border" >
						<div className="col-sm-8">
							<div className="row">
							    <div className="col-sm-5">
					              <select className="form-control" id="emp"  ref="emp" value={item.emp_id} onChange={this.handleEmpChange.bind(this)}> 
					                  <option value="-">เลือกทรีทเมนท์</option>                        
					                  {item.employees.map(createEmp)}     
					              </select> 

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
						          filename="rep_payments"
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
							<ReportList List={item.tempList} />
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
  getEmployee(){ 
    let _this = this;
    const cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
    getServices('ALL','ALL','Y')
    .then(function(results) {  
      if (results.data.status === '200') {        
        _this.setState({employees: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({employees:[]});
      }
    });	
  }

  getDatas () {   
    let _this = this;
    getTreatmentTotal(this.state.tid)
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
	const { List } = props;
	let sumTotal = 0; let sumCash= 0;  
	const list =  List.map((data,i) =>{
		return(
        <tr key={i}  > 
        	<td>{i+1}</td>   
        	<td>{ moment(data.dat).format('DD/MM/YYYY H:ss') }</td>   
        	<td>{data.order_id}</td>          
        	<td>{data.customer_id}</td>  
        	<td>{data.customer_name}</td> 
        	<td>{data.qty}</td> 
        	<td>{data.total}</td> 
        	<td>{data.unit}</td>
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
					      <th width="150">วัน-เวลา ที่ซื้อ</th> 		
					      <th width="130">เลขที่ Order</th>			  
					      <th width="100">HN</th> 
					      <th>ชื่อ - สกุล</th>	 	           
					      <th width="100">จำนวนซื้อ</th>	
					      <th width="100">คงเหลือ</th>	
					   	  <th width="80">หน่วย</th>						  
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

