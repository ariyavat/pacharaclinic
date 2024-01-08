import React, {Component} from 'react';
import moment from 'moment'
import Pager from 'react-pager';
import SearchInput, {createFilter} from 'react-search-input';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const KEYS_TO_FILTERS = ['tel', 'customer_name', 'pay_date'];

import * as config from '../../config';
const imgURL = `${config.init.url}images/products/`;

export default class SeedoctorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '', mode: 'N',
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



  handleNew () {
  	this.props.onNew();
  }

  handleEdit (data, e) {
    this.props.onEdit(data);
  }

  handleTypChange (e) {
    e.preventDefault();      
    this.setState({mode: this.refs.mode.value});     
 
  }

  handleShowData () {
  
	if(this.refs.date.value !== ''){
		const sdat = this.refs.date.value;
		const txt = sdat.split('/');
		const sdate = txt[2]+'-'+txt[1]+'-'+txt[0];	 	
	 	this.props.onShow(sdate,this.refs.mode.value);
	
	} else { show_err('warning','ไม่ได้กรอกวันที่')  } 
  	
  }

  render() {
    const _this = this;
    const item = this.state
    const {data} = this.props;

    const filteredData = data.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS)); 

    const rows = filteredData.map((row, i) => {
      return (
        <tr  key={i} className="alink" onClick={this.handleEdit.bind(this,row)} >
          <td >{i + 1}</td>
          <td className="text-center">{ moment(row.dat).format('DD/MM/YYYY HH:mm') }</td>
          <td>{row.title}</td> 
          <td >{row.cname} </td>

          <td className="text-center">
          { row.status === 'N'? <span className="text-orange">เปิดคำถาม</span> : null }
          { row.status === 'Y'? <span className="text-success">สิ้นสุด</span> : null }
          </td>              
        </tr>
      );
    });


    return (

      <section className="content">
        <div className="box box-info min-550" >  
          <div className="box-header with-border" >
            <div className="col-sm-6">
              <form role="form">  
                <div className="row">
             
                  <div className="col-sm-8">
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
            <div className="col-sm-2 ">
	  			<select className="form-control" id="mode"  ref="mode" value={item.mode} onChange={this.handleTypChange.bind(this)}>                                                      
	                <option value="N" >เปิดคำถาม</option> 
	                <option value="Y" >สิ้นสุด</option>   
	            </select> 
            </div> 
            <div className="col-sm-2 ">
            	<input type="text" className="form-control" id="date" name="none" ref="date" placeholder="วันที่" autoComplete="off" />
            </div>
            <div className="col-sm-2 ">
				<button type="button" className="btn btn-default" onClick={this.handleShowData.bind(this)} >
					<i className="fa fa-search"></i> แสดงข้อมูล
				</button>	
            </div>


          </div>
          <div className="box-body">        
            <table id="mytable" className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th className="text-center" width="50">#</th>
                  <th className="text-center" width="150">วันที่สั่งซื้อ</th>
                  <th className="text-center">คำถาม</th>
                  <th className="text-center" width="200">ผู้ถาม</th>
                  <th className="text-center" width="150">สถานะ</th>                                         
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


