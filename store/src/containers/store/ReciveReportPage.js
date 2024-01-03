import React from 'react';
import axios from 'axios';
import moment from 'moment'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ContentHeader from '../../components/common/ContentHeader';
import StoreReportDetail from '../../components/store/StoreReportDetail';
import {getRecives, getReciveDetail} from '../../utils/StoreAPI';

import * as config from '../../config';

const initialState = {
  loading: false, isViews: false, tempList: [], data: [], dList: []
};


export default class ReciveReportPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
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
    return (
      <div>
        <ContentHeader title="คลังสินค้า" small="รายงานการรับสินค้าเข้าคลัง" />
        <section className="content non-printable">
 				<div className="box box-info min-600" >
					<div className="box-header with-border" >
						<div className="col-sm-7">
							<div className="row">
								<div className="col-sm-4">
					                <div className="form-group">
					                  <input type="text" className="form-control" id="date" name="none" ref="date" placeholder="วันที่" />
					                </div>
								</div>
								<div className="col-sm-4">
					                <div className="form-group">
					                  <input type="text" className="form-control" id="date1" name="none" ref="date1" placeholder="ถึงวันที่" />
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
				            <div className="col-sm-5">
	                         	<ReactHTMLTableToExcel
						          id="test-table-xls-button"
						          className="btn btn-fault pull-right"
						          table="mytable"
						          filename="rep_send_orders"
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
							<StoreReportDetail 
								mode={'I'}
								data={item.data} 
								dList={item.dList} 
								onHide={(e) => this.setState({isViews: false})}  />
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


  getDatas (sdat,edat) { 
    let _this = this;
    getRecives(sdat,edat)
    .then(function(results) {
      if (results.data.status === '200') {
      	_this.setState({ tempList: results.data.data, loading: false  });
      } else if (results.data.status === '204') {
        _this.setState({ tempList: [] , loading: false });
      }
    });
  }

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

}



function ReportList (props) {
	const _this = this
	const { List, onShow } = props
	const list =  List.map((data,i) =>
        <tr key={i} className="alink" onClick={onShow.bind(this,data)} > 
        	<td>{i+1}</td>   
        	<td>{ moment(data.dat).format('DD/MM/YYYY HH:mm') }</td>       
        	<td>{data.ino}</td> 
        	<td>{data.typ_name}</td> 
        	<td>{data.supplier_name}</td> 
            <td>{data.mem}</td> 
        </tr>
	)

	return(
	<table id="mytable" className="table table-bordered table-hover">
	    <thead>
	    <tr>
	      <th>#</th>	    
	      <th>วันที่</th> 
	      <th>เลขที่</th>	 	           
	      <th>ประเภท</th>	
	      <th>ผู้ขาย</th>
	      <th>หมายเหตุ</th>                      
	    </tr>
	    </thead>
	    <tbody>
	    {list}
	    </tbody>
	</table>
	)
}

