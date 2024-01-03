import React from 'react';
import axios from 'axios';
import moment from 'moment'


import ContentHeader from '../../components/common/ContentHeader';

import {getPaymentLists} from '../../utils/QueueAPI';

import {getGenerals} from '../../utils/GeneralAPI';
import {getCompany, getLocations} from '../../utils/CompanyAPI';
import {getOrders} from '../../utils/OrderAPI';


import * as config from '../../config';

const initialState = {
	gList: [], ltList: [],
 	loading: false, isViews: false, tempList: [], data: [], cn: '1', dat: '', year: '', month: '', fdat: '',
 	loading1: false, saleTotal : 0, loading2: false, PieData: [], loading3: false, 
 	loading4: false, customerTotal: 0, dblist: [], totalPrice: 0,
};

const bgCl = [
	{color: '#f56954',cls:'cl-red'},{color: '#00a65a',cls:'cl-green'},{color: '#f39c12',cls:'cl-yellow'},
	{color: '#00c0ef',cls:'cl-blue'},{color: '#3c8dbc',cls:'cl-teal'},{color: '#d2d6de',cls:'cl-gray'}  
]



const month_list = [
	'January', 'February', 'March', 'April', 'May', 'June', 
	'July', 'August', 'September', 'October', 'November', 'December'
];

export default class RepDasboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;

  }

  componentWillMount() {
  	let cn = JSON.parse(localStorage.getItem('msClinic')).location_id;
  	let dat = moment().format("YYYY-MM-DD");
  	let year = moment().format("YYYY");
  	let month = moment().format("MM");
	var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	var firstDay = new Date(y, m, 1);
	var lastDay = new Date(y, m + 1, 0);

	firstDay = moment(firstDay).format('YYYY-MM-DD');
  	this.setState({ cn: cn, dat: dat, year: year, month: month, fdat: firstDay},()=>{
	    this.getLocationList();
	    //this.getDgroups();  		
  	})

  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() { 
  	$('#date').datepicker({ autoclose: true });
  	$('#date1').datepicker({ autoclose: true });
  	let dat = moment().format("YYYY-MM-DD");
  	let year = moment().format("YYYY");
  	let month = moment().format("MM");  
  	this.setState({  loading: true, isViews: false, dat: dat, year: year, month: month },()=>{ 
  		this.getSumSales(dat);  
  		//this.getSumGroups(dat);
  		this.getSumYears();
  		this.getSumCustomers(dat);
  	})

  }

  handleEmpChange (e) {
    e.preventDefault();
	let idx = this.state.ltList.findIndex((x) => x.id === this.refs.emp.value);
	  if(idx !== -1){
	    this.setState({cn: this.refs.emp.value});  
	  } else {
	    this.setState({cn: 'ALL'});  
	  }
  }


  handleShowData(e){
	e.preventDefault()
	if(this.refs.date.value !== ''){
	if(this.refs.date.value !== ''){			
		const date = this.refs.date.value 
		const txt = date.split('/')	
		const sdate = txt[2]+'-'+txt[1]+'-'+txt[0]	
		const year =  txt[2]
		const month = txt[1]
		this.setState({  loading: true, isViews: false, dat: sdate, year: year, month: month },()=>{  
			this.getSumSales(sdate);
			//this.getSumGroups(sdate);  
			this.getSumYears();
			this.getSumCustomers(sdate);
		})
	} else { show_err('warning','ไม่ได้กรอกวันที่สิ้นสุด')  }	
	} else { show_err('warning','ไม่ได้กรอกวันที่')  }
  }




  render() {
    const item = this.state;

    let createLT = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    let total =  parseFloat(item.saleTotal);
    let customertotal = parseFloat(item.customerTotal);
    let oyear =  parseFloat(item.year) - 1;

    const lrows = item.ltList.map((row, i) => {
      	let total = parseFloat(row.tprice);
      	let tbname = 'pieCharts'+row.id;     
      	return (
		<div key={i} className="col-sm-6 col-xs-12 ">
			<div className="row min-200">
				<div className="col-sm-6 ">
					<h4>{row.name}</h4> <br/>
					<canvas id={tbname} className="min-100"></canvas>	
					
				</div>
				<div className="col-sm-6 ">
					<h4><span className="text-blue">{total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span> <small>บาท</small></h4><br/>				
					<GroupList data={row.list} />
				</div>
			</div>	
			<hr/>	
		</div>       
      	);


    });



    const rows = item.ltList.map((row, i) => {
      let cls = row.cls;
      return (
      <div key={i} className="row text-left mgt-10">   
      	<div className="col-sm-6"> <span  className={cls}>{row.name}</span> </div> 
      	<div className="col-sm-6"> {parseFloat(row.totalprice).toLocaleString('en-US', {minimumFractionDigits: 2})} </div>   
        
      </div>
      );
    });

    const crows = item.ltList.map((row, i) => {
      let cls = row.cls+'  mgr-10';
      return (
     	<span key={i} className={cls}>{row.name}</span>   
      );
    });



    const rows1 = item.dblist.map((row, i) => {
      let cls = row.cls+" mgr-10";
      return (
      <div key={i} className="row text-left mgt-10">   
      	<div className="col-sm-8"> <span  className={cls}>{row.label}</span> </div> 
      	<div className="col-sm-4"> {row.value} </div>   
      </div>
      );
    });

    return (
      <div>
        <ContentHeader title="รายงาน" small="รายงานผู้บริหาร" />
        <section className="content non-printable">
 				<div className="box box-info min-600" >
					<div className="box-header with-border" >
						<div className="col-sm-8">
							<div className="row">
							    <div className="col-sm-4">
					              <select className="form-control" id="emp"  ref="emp" value={item.cn} onChange={this.handleEmpChange.bind(this)}> 
					                  <option value="-">เลือกสาขา</option>                        
					                  {item.ltList.map(createLT)}     
					              </select> 

							    </div>

								<div className="col-sm-3">
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
		
					</div>
					<div id="rep" className="box-body"> 	
						<h3>Revenue analysis  <small>ณ วันที่ { moment(item.dat).format('DD/MM/YYYY') }</small> <br/></h3>
						<div className="row mgt-10">	

							{ lrows }							
						
						</div>						
						<div className="row mgt-10">
							<div className="col-sm-6 min-400 text-center border-right">

								<span>เปรียบเทียบทุกสาขา วันที่ { moment(item.fdat).format('DD/MM/YYYY') } ถึง { moment(item.dat).format('DD/MM/YYYY') }</span> 
								{
								this.state.loading1 ?
									<div className="overlay">
					              		<i className="fa fa-refresh fa-spin"></i>
					            	</div>
								: 
								<h1><span className="text-blue">{parseFloat(item.totalPrice).toLocaleString('en-US', {minimumFractionDigits: 2})}</span> <small>บาท</small></h1>
								}
                        		<div className="row mgt-20">
									<div className="col-sm-7 text-center">
										<div className="chart">
											<canvas id="lpchart" className="min-100"></canvas>
										</div>

									</div>
									<div className="col-sm-5 text-center">
										{rows}
									</div>
                        		</div>	
							
						

							</div>
							<div className="col-sm-6 min-400 text-center">
								<span>ยอดขายเปรียบเทียบ  {oyear} กับ {item.year}</span> 
								{
								this.state.loading3 ?
									<div className="overlay">
					              		<i className="fa fa-refresh fa-spin"></i>
					            	</div>
								: 								
								<div className="chart">
									<canvas id="lineChart" className="min-300"></canvas>
								</div>
								}					        				

							</div>
					
						</div>
						<hr/>
						<h3>Customer Analysis</h3>
						<div className="row mgt-10">
							<div className="col-sm-6 min-400 text-center border-right">  
								<span>ยอดจ่ายเงินต่อหัวของลูกค้า</span> 
								{
								item.loading4 ?
									<div className="overlay">
					              		<i className="fa fa-refresh fa-spin"></i>
					            	</div>
								: 
								<h1><span className="text-blue">{customertotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span> <small>บาท</small></h1>
								}
                        									
								<span className="pull-left">ณ วันที่ { moment(item.dat).format('DD/MM/YYYY') }</span> <br/>
								<span>สินค้าขายดีในสาขา (แยกตามกลุ่มผลิตภัณฑ์)</span> <br/>
                        		<div className="row mgt-20">
									<div className="col-sm-7 text-center">
										{
										item.loading4 ?
											<div className="overlay">
							              		<i className="fa fa-refresh fa-spin"></i>
							            	</div>
										: 								
										<div className="chart">
											<canvas id="pieChart1" className="min-100"></canvas>
										</div>
										}								
									</div>
									<div className="col-sm-5 text-left">
										{rows1}
									</div>
                        		</div>									

							</div>

							<div className="col-sm-6 text-center">
								<span>เปรียบเทียบการจ่ายเงินต่อหัวกับสาขาอื่น</span> 
								{
								this.state.loading4 ?
									<div className="overlay">
					              		<i className="fa fa-refresh fa-spin"></i>
					            	</div>
								: 								
								<div className="chart">
									<canvas id="barChart" className="min-300"></canvas><br/><br/>
									{crows}

								</div>
								}					        				

							</div> 

  


						</div>

					</div>

      			</div>
        </section> 
      </div>
    );
  }
  //
	getLocationList() {
		let _this = this;
		getLocations()
		.then(function(results) {
		  if (results.data.status === '200') {
		  	let data = results.data.data
		  	let list = []		  	
		  	data.forEach(function(item, i){
		  		let arr = {
		  			id: item.id,
		  			name: item.name,
		  			tprice: 0,
		  			totalprice: 0,
		  			list: [],
		  			cls: ''
		  		}
		  		list.push(arr)
		  	})		  	
		    _this.setState({ ltList: list})
		  } else if (results.data.status === '204') {
		    _this.setState({ltList: []})
		  }
		});
  	}

  	getDgroups () {
	    let _this = this;
	    getGenerals('DG')
	    .then(function(results) {
	      if (results.data.status === '200') {
	        _this.setState({gList: results.data.data});      
	      } else if (results.data.status === '204') {
	        _this.setState({gList: []});
	      }
	    });
  	}

  	getSumSales (sdat) { 
    	let _this = this;   	 	
    	this.setState({ loading1: true, saleTotal: 0 },()=>{
	    getOrders('sumpsale',this.state.cn,'COMPLETE',sdat,this.state.fdat,'-','-','-')
	    .then(function(results) {	
	       
	      if (results.data.status === '200') {
	      	let ltList = _this.state.ltList
	      	let datas = results.data.data
	      	let pdata = []
	      	datas.forEach(function(item, i){
		      	let tbname = 'pieCharts'+item.id;

		      	let vList = [];
		      	if(item.List !== 'NO'){
		      		vList = item.List;
		      	}  
				let list = []	
				vList.forEach(function(item, i){
					let lebel = {
				        value    : item.tprice,
				        color    : bgCl[i].color,
				        highlight: bgCl[i].color,
				        label    : item.typ_name,
				        cls: bgCl[i].cls				        				
					}
					list.push(lebel)					
				}); 			
				if(list.length > 0){
					pieChart('#'+tbname,list);	
				}	
				let idx = ltList.findIndex((x) => x.id === item.id);
				ltList[idx].tprice = item.tprice
				ltList[idx].list = vList
				ltList[idx].totalprice = item.totalprice
				ltList[idx].cls = bgCl[i].cls	

				let plebel = {
			        value    : item.totalprice,
			        color    : bgCl[i].color,
			        highlight: bgCl[i].color,
			        label    : item.cname,
			        cls: bgCl[i].cls				        				
				}
				pdata.push(plebel)	

	      	})

	      	pieChart('#lpchart',pdata);	

	      	_this.setState({ loading1: false, ltList: ltList, totalPrice: results.data.totalprice });
	      } else  {
	        _this.setState({ loading1: false, totalPrice: 0 });
	      }
	    });    	
    	})
    }

  	getSumGroups (sdat) { 
    	let _this = this;    	
   	 	
    	this.setState({ loading2: true,  },()=>{
		    getOrders('sumpaydg',this.state.cn,'COMPLETE',sdat,'-','-','-','-')
		    .then(function(results) {
			    if (results.data.status === '200') {
				  	let datas = results.data.data				 
				  	let list = []				
				    datas.forEach(function(item, i){
				   
						let lebel = {
					        value    : item.tprice,
					        color    : bgCl[i].color,
					        highlight: bgCl[i].color,
					        label    : item.typ_name,
					        cls: bgCl[i].cls				        				
						}
						list.push(lebel)					
				    });
			      	_this.setState({ loading2: false, PieData:list    },()=>{
			      		pieChart('#pieChart',list);
			      	});
			    } else if (results.data.status === '204') {
			        _this.setState({ loading2: false, PieData: []  },()=>{
			        	pieChart('#pieChart',[]);
			        });
			    }
		    });    	
    	})
    }


  	getSumYears () { 
    	let _this = this;   	 	
    	this.setState({ loading3: true,},()=>{
            let mnt = parseFloat(this.state.month)
         
		    getOrders('sumyear',this.state.cn,'COMPLETE',this.state.year,mnt,'-','-','')
		    .then(function(results) {
		    
		    	if (results.data.status === '200') {
		    		let nyear = _this.state.year
		    		let oyear = parseFloat(_this.state.year) - 1
			    	let data1 = results.data.data1
			    	let data2 = results.data.data2		 

			    	let lb = []

					for (let i = 0; i < mnt; i++) { 
						lb[i] = month_list[i]	 
					}

			
					const lData = {
					  labels  : lb,
					  datasets: [
					    {
					      label               : oyear,
					      fillColor           : 'rgba(210, 214, 222, 1)',
					      strokeColor         : 'rgba(210, 214, 222, 1)',
					      pointColor          : 'rgba(210, 214, 222, 1)',
					      pointStrokeColor    : '#c1c7d1',
					      pointHighlightFill  : '#fff',
					      pointHighlightStroke: 'rgba(220,220,220,1)',
					      data                : data2
					    },
					    {
					      label               : nyear,
					      fillColor           : 'rgba(60,141,188,0.9)',
					      strokeColor         : 'rgba(60,141,188,0.8)',
					      pointColor          : '#3b8bba',
					      pointStrokeColor    : 'rgba(60,141,188,1)',
					      pointHighlightFill  : '#fff',
					      pointHighlightStroke: 'rgba(60,141,188,1)',
					      data                : data1
					    }
					  ]
					}
					_this.setState({ loading3: false,  },()=>{  
						lineChart('#lineChart',lData);  						
					});
				  	
		    	}		   
		    });    	
    	})
    }


  	getSumCustomers (sdat) { 
    	let _this = this;   	 	
    	this.setState({ loading4: true, customerTotal: 0 },()=>{
    		let mnt = parseFloat(this.state.month)
    		let ltList = this.state.ltList
    	
		    getOrders('sumpercustomer',this.state.cn,'COMPLETE',sdat,mnt,'-','-','-')
		    .then(function(results) {
		     
		      if (results.data.status === '200') {
		      	let datas = results.data.data
			  	let ddatas = results.data.dlist				 
			  	let list = []	
			  	if(ddatas !== 'NO'){
				    ddatas.forEach(function(item, i){
				   
						let lebel = {
					        value    : item.qty,
					        color    : bgCl[i].color,
					        highlight: bgCl[i].color,
					        label    : item.typ_name,
					        cls: bgCl[i].cls				        				
						}
						list.push(lebel)					
				    }); 			  		
			  	}


		    	let lb = []

				for (let i = 0; i < mnt; i++) { 
					lb[i] = month_list[i]	 
				}

				let dataset = []
			    datas.forEach(function(item, i){                
					let lebel = {
					    label               : item.cname,					    
					      fillColor           : bgCl[i].color,
					      strokeColor         : bgCl[i].color,
					      pointColor          : bgCl[i].color,
					      pointStrokeColor    : 'rgba(60,141,188,1)',
					      pointHighlightFill  : '#fff',
					    
					    data                : item.list
					}
					dataset.push(lebel)										
			    }); 
				
				const lData = {
				  labels  : lb,
				  datasets: dataset
				}

		      	_this.setState({ loading4: false, customerTotal: results.data.total, dblist: list  },()=>{
		      		pieChart('#pieChart1',list);
		      		barChart('#barChart',lData);
		      	});
		      } else if (results.data.status === '204') {
		        _this.setState({ loading4: false, customerTotal: 0, dblist: [] });
		      }
		    });   
		     	
    	})
    }







  

}


function Pchart (props) { 
  	const { data, id } = props;
  	const tbname = '#'+id;

	let list = []		

	data.forEach(function(item, i){

		let lebel = {
	        value    : item.tprice,
	        color    : bgCl[i].color,
	        highlight: bgCl[i].color,
	        label    : item.typ_name,
	        cls: bgCl[i].cls				        				
		}
		list.push(lebel)					
	}); 
	if(data.length > 0){
		pieChart(tbname,list);	
	}
	

  	return(
  	<div className="chart">
  		<canvas id={id} className="min-100"></canvas>
  	</div>
  	)
}



function GroupList (props) { 
  const { data } = props;

  const rows = data.map((row, i) => {
  	let total = parseFloat(row.tprice)
    return (
      <tr key={i} >
        <td width="150"><span className={bgCl[i].cls}>{row.typ_name}</span></td>    
        <td ><span>{total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span> <small>บาท</small></td>
      </tr>      
    );
  });


  return(
  <div className="row">
    <div className="col-sm-12">
      <table id="mytable" className="table">
          <tbody>
          {rows}         
          </tbody>
      </table>
    </div>    
  </div>  
  )
}


