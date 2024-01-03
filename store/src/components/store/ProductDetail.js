import React, {Component} from 'react';
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Navtabs from '../common/Navtabs';
import StockCardList from './StockCardList';
import {getStockCard, } from '../../utils/StoreAPI';
import * as config from '../../config';
const imgURL = `${config.init.url}/images/products/`;
const noimgURL = `${config.init.url}images/no.jpg`;

const initialState = {
 	loading: false, year: '', month: 'ALL', cardList: [], auth: [],
 	tabs: [
	    {title:' ประวัติการรับเข้า ',mode:''},{title:'  Stock Card  ',mode:''}	      		
	]
};

export default class ProductDetail extends Component {

  constructor(props) {
    super(props);
	this._month = [
		{id:'ALL',name:'ทั้งหมด'},{id:'01',name:'มกราคม'},{id:'02',name:'กุมภาพันธ์'},{id:'03',name:'มีนาคม'},
		{id:'04',name:'เมษายน'},{id:'05',name:'พฤษภาคม'},{id:'06',name:'มิถุนายน'},{id:'07',name:'กรกฎาคม'},
		{id:'08',name:'สิงหาคม'},{id:'09',name:'กันยายน'},{id:'10',name:'ตุลาคม'},{id:'11',name:'พฤศจิกายน'},
		{id:'12',name:'ธันวาคม'}
	];   
 
    this.state = initialState;
  }

  componentWillMount(){
    const auth = JSON.parse(localStorage.getItem('msClinic')).auth; 
    this.setState({auth: auth});
  }


  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState); 
  }

  componentDidMount () {
    const _this = this    
    this.setState({year: moment().format('YYYY')});
    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }
  }

  handleKeyPress(e, field) { 
    if (e.keyCode === 13) {
        e.preventDefault()
        if(field.name!=='none'){    
          this.refs[field.name].focus() 
        }                 
    }
  }

  handleEdit (e) {
    this.props.onEdit(this.props.data);
  }

  handleMonthChange(e) {
    let i = this._month.findIndex((x) => x.id === this.refs.month.value);
    this.setState({ month: this._month[i].id })  
  }

  showItems(e){
  	if(this.state.year!==''){
  		this.setState({loading: true},()=>{
  			this.getStockCard(this.props.data.id,this.state.year,this.state.month);	
  		})
		
  	} else {  show_err('warning','ยังไม่ได้กรอกปี...') ;   }
   }

  render() {
  	const {data, rList} = this.props;
  	const item = this.state;
  	
	let createMTH = function (item, key) {
		return <option value={item.id} key={key} >{item.name}</option>
	}	

    let img = '';
    if(data.img===''){ 
      img = noimgURL;
    } else {
      img = imgURL+data.img;
    }

    return (
    <section className="content">
    	<div className="row">
        	<div className="col-md-4">

	          <div className="box box-primary">
	            <div className="box-body box-profile">
	              <img className="profile-user-img img-responsive img-circle" src={img} />

	              <h3 className="profile-username text-center">{data.name}</h3>

	              <p className="text-muted text-center">{data.id}</p>

	          
					<a onClick={this.handleEdit.bind(this)}  className="btn btn-primary btn-block"><b>แก้ไขข้อมูล </b></a>
	         
	              
	            </div>
	          </div>


	          <div className="box box-primary min-300">
	            <div className="box-header with-border">
	              <h3 className="box-title">ข้อมูลเพิ่มเติม</h3>
	            </div>
	            
	            <div className="box-body">	 

	            	<div className="row">
		            	<div className="col-sm-12 padrl-10">
			              <strong><i className="fa fa-angle-double-right margin-r-5"></i> ประเภท</strong>
			              <p className="text-muted pull-right">

				            {data.typ === 'C' ? <span>ครีม</span>  : null }
				            {data.typ === 'P' ? <span>แพ็คเก็จ</span>  : null }
				            {data.typ === 'S' ? <span>สติ๊กเกอร์</span>  : null }
				            {data.typ === 'B' ? <span>กล่องบรรจุ</span>  : null }

			                     
			              </p>				          
		            	</div> 
	            	</div> 


	            	<div className="row">
		            	<div className="col-sm-12 padrl-10">
			              <strong><i className="fa fa-angle-double-right margin-r-5"></i> หน่วย</strong>
			              <p className="text-muted pull-right">{data.unit}</p>				          
		            	</div> 
	            	</div> 

	 
	     

	       


	            	<div className="row">
		            	<div className="col-sm-12 padrl-10">
			              <strong><i className="fa fa-angle-double-right margin-r-5"></i> สถานะ</strong>
			              <p className="text-muted pull-right">
			              {
			              	data.status === 'Y'?
			              	<span className="label label-primary">ใช้งาน</span>
			              	:
			              	<span className="label label-danger">ไม่ใช้งาน</span>
			              }	                
			              </p>				          
		            	</div> 
	            	</div>                       

	           
	        
	            </div>
	          </div>

        	</div>
        	<div className="col-md-8">
				<Navtabs tabs={item.tabs} >
					<div className="tab-pane active min-575" id="tab_0" >
						<div className="row mgt-20">
							<div className="col-md-4">
				              <div className="row">
				                	<div className="col-sm-12">
					                  <div className="description-block">					                    
					                    <h3>
					                    	<span className="text-red">{parseFloat(data.total).toLocaleString('en-US', {minimumFractionDigits: 0})}</span>  <small>{data.unit}</small>
					                    </h3>
					                    <span className="description-text">จำนวนคงเหลือ</span>
					                  </div>
					                  <hr/>
					                </div>
				               	</div>

							</div>
							<div className="col-md-8">
								<ReciveList List={rList} />
							    {
							        rList.length === 0 ?
							        <div className="col-sm-12 text-center pad-bottom-50">
							            <div className="dblock mgt-100">       
							                  <small>ไม่มีรายการรับสินค้าเข้าคลัง!!</small>
							            </div>                          
							        </div>
							        : null
							    }
							    {
							        rList.length === 0 ?
									<div className="row">
										<div className="col-sm-12 text-center">
											<small className="margin-r-5">***  รายการรับเข้า 20 รายการล่าสุด</small>
										</div>
									</div>
							        : null
							    }								
							</div>
						</div>

					</div>
					<div className="tab-pane min-575" id="tab_1" >
						<div className="row">
						<form role="form">	
							<div className="col-sm-2 form-group">
			                  	<label>ปี (ค.ศ.) <span className="text-red">*</span></label>
			                  	<input 
			                  		type="text" className="form-control" name="month" ref="year" 
			                  		value={item.year} 
			                  		onChange={(e) => this.setState({year: e.target.value})}  />
				                
							</div>	
							<div className="col-sm-3 form-group">				                
				                  	<label>เดือน <span className="text-red">*</span></label>
				                  	<select className="form-control" id="month" ref="month"  value={item.month} onChange={this.handleMonthChange.bind(this)}  >						            	
						            	{this._month.map(createMTH)}			
						            </select>
							</div>	
							<div className="col-sm-2 pad-top-25">
								<button type="button" className="btn btn-default" onClick={this.showItems.bind(this)} >
									<i className="fa fa-search"></i> แสดงข้อมูล
								</button>
							</div>	
							{
							 	item.cardList.length > 0 ?
					            <div className="col-sm-5 pad-top-25">
		                         	<ReactHTMLTableToExcel
							          id="test-table-xls-button"
							          className="btn btn-fault pull-right"
							          table="mytable"
							          filename="stockcard"
							          sheet="tablexls"
							          buttonText="Download as XLS"
							        />						
								</div>
							 	: null
							}



						</form>
						</div>
						<div className="row">
							<div className="col-sm-12">
				          	<StockCardList List={item.cardList} />
							</div>	
						</div>


					</div>
				</Navtabs>
        	</div>
        </div>

    </section>
    );
  }

  getStockCard (id,year,month) {
    let _this = this;
    getStockCard(id,year,month)
    .then(function(results) {  
      if (results.data.status === '200') {
        _this.setState({cardList: results.data.data, loading: false});
      } else if (results.data.status === '204') {
        _this.setState({cardList: [], loading: false});
      }
    });
  }

}


function ReciveList (props) {
	const _this = this
	const { List } = props
	const list =  List.map((data,i) =>
  	<li key={i} >
	    <i className="fa fa-briefcase bg-blue"></i>
	    <div className="timeline-item">
	      <span className="time"><i className="fa fa-clock-o"></i> { moment(data.dat).format('DD/MM/YYYY HH:mm') }</span>
	      <h3 className="timeline-header">จำนวนรับ <span className="text-danger">{data.qty}</span> {data.unit}</h3>
	      <div className="timeline-body">
	        <span>เลขที่: {data.ino}</span><br/>
	        <span>ประเภท: {data.typ_name}</span><br/>
	        <span>จำนวนคงเหลือ: {data.total}  {data.unit}</span><br/>
	        <span>หมายเหตุ: {data.mem}</span>
	      </div>
	    </div>
  	</li>    
	)

	return(
	<ul className="timeline timeline-inverse">	
      	<li className="time-label">
            <span className="bg-aqua">
              รายการรับสินค้าเข้า
            </span>
      	</li>
      	{list}
	</ul>	
	)
}
