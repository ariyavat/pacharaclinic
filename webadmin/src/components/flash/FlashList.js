 import React, {Component} from 'react';
import Pager from 'react-pager';
import SearchInput, {createFilter} from 'react-search-input';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const KEYS_TO_FILTERS = ['id', 'product_name'];

import * as config from '../../config';
const imgURL = `${config.init.url}images/flash/`;

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '', auth: [], 
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
    const { auth } = this.state;
    const {data} = this.props;

    const filteredData = data.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS)); 
    

    const rows = filteredData.map((row, i) => {
      let img = imgURL+row.img   

      return (
        <tr  key={i} >
          <td >{i + 1}</td>
 
          <td >
            <img  className="img-responsive img-thumbnail" width="100" src={img} />
          </td>
          <td >
            {row.pname}
          </td>
          <td >{row.price_sale}</td>
          <td >{row.dat}</td>   
          <td className="text-center" >
			{row.start_time} - {row.end_time}
          </td>  
          <td className="text-center alink">
            <a className="text-info dblock" onClick={this.handleEdit.bind(_this,row)} >
              <i className="fa fa-pencil"></i>
            </a>
          </td> 
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
       
              <button className="btn btn-flat btn-default pull-right" onClick={this.handleNew.bind(this)} >
                <i className="fa fa-plus"></i> เพิ่มรายการใหม่
              </button>
      

            </div>          
          </div>
          <div className="box-body">        
            <table id="mytable" className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th width="50">#</th>
                  <th width="100">รูปภาพ</th>
                  <th>รายการ</th>  
                  <th width="100">ราคาขาย</th>   
                  <th width="100">วันที่</th>  
                  <th width="150">เวลา</th> 
                  <th width="80"></th>                                   
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


