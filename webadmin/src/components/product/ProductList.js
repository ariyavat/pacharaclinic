 import React, {Component} from 'react';
import Pager from 'react-pager';
import SearchInput, {createFilter} from 'react-search-input';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const KEYS_TO_FILTERS = ['id', 'product_name'];

import * as config from '../../config';
//const imgURL = `${config.init.url}images/products/`;
const imgURL = `${config.init.web_url}images/products/`;

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], searchTerm: '', auth: [], group_id: 'ALL',
      menu:[
        {mode: '1', name: 'ผลิตภัณฑ์ยารักษาสิว'}, 
        {mode: '2', name: 'ผลิตภัณฑ์ยารักษาฝ้ากระ'},
        {mode: '3', name: 'ผลิตภัณฑ์แชมพู'}, 
        {mode: '4', name: 'ผลิตภัณ์สเปย์ฉีดผมขึ้น'},
        {mode: '5', name: 'ผลิตภัณ์ยาแก้แพ้'}, 
        {mode: '6', name: 'ผลิตภัณฑ์บำรุงผิวขาว กระจ่างใส'},
        {mode: '7', name: 'ผลิตภัณฑ์บำรุงผิวกาย'}, 
        {mode: '8', name: 'ผลิตภัณฑ์เพิ่มความชุ่มชื่นให้ผิว'},
        {mode: '9', name: 'ผลิตภัณฑ์ลดริ้วรอย ยกกระชับใบหน้า'}, 
        {mode: '10', name: 'ผลิตภัณฑ์บำรุงรอบดวงตา'},
        {mode: '11', name: 'ผลิตภัณฑ์ทำความสะอาดผิว'}, 
        {mode: '12', name: 'ผลิตภัณฑ์ครีมกันแดด'},
        {mode: '13', name: 'ผลิตภัณฑ์สบู่'},
        {mode: '14', name: 'ผลิตภัณฑ์ล้างหน้า'},
        {mode: '15', name: 'ผลิตภัณฑ์เซรั่มบำรุงผิว'},
        {mode: '16', name: 'ผลิตภัณฑ์ Sleeping Mask'},
        {mode: '17', name: 'ผลิตภัณฑ์สครับ และ นวดหน้า'},
      ],
      menuT:[
        {mode: '1', name: 'รักษาสิว'}, 
        {mode: '2', name: 'ผิวกระจ่างใส'},
        {mode: '3', name: 'รักษาฝ้า'}, 
        {mode: '4', name: 'ทำความสะอาดผิว'},
        {mode: '5', name: 'ยกกระชับ'},
        {mode: '6', name: 'คุณแม่หลังคลอด'},
      ],
      menuL:[
        {mode: '1', name: 'เลเซอร์'}, 
        {mode: '2', name: 'ฉีดผิว'},
      ], 
      menuM:[
        {mode: '1', name: 'คุณแม่หลังคลอด'}, 
   
      ],



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

  handleDGchange (e) {
    e.preventDefault()
    let idx = this.props.gList.findIndex((x) => x.id === this.refs.dg.value);
    this.setState({group_id: this.refs.dg.value},()=>{
      this.props.onSearch(this.refs.dg.value,'');
    });
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
    const { auth,group_id } = this.state;
    const {data, mode, groupList} = this.props;

    const filteredData = data.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS)); 
    
    let menu = groupList
    //if(mode === 'T'){  menu = item.menuT; }
    //if(mode === 'L'){  menu = item.menuL; }
    if(mode === 'M'){  menu = item.menuM; }


    const rows = filteredData.map((row, i) => {
      let img = imgURL+row.img      
      let name = 'ไม่ได้กำหนดกลุ่ม';
      let idx = menu.findIndex((x) => x.gid === row.mode);  
      if(idx !== -1){
        name = menu[idx].gname;
      } 
      

      return (
        <tr  key={i} >
          <td >{i + 1}</td>
          <td >{row.id}<br/>{ row.state === 'H'? <span className="text-danger">HOT</span>  : null } </td>
          <td >
            <img  className="img-responsive img-thumbnail" width="100" src={img} />
          </td>
          <td >
            {row.product_name}<br/>
            <span className="mgl-50">-- {name}</span>
          </td>
          <td >{row.price}</td>
          <td >{row.unit}</td>   
          <td className="text-center" >
          {
            row.status === 'Y' ?
            <i className="fa fa-check text-success"></i>
            : 
            <i className="fa fa-close text-danger"></i>   
          }
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
                  <th width="100">รหัส</th>
                  <th width="100">รูปภาพ</th>
                  <th>รายการ</th>  
                  <th width="100">ราคาขาย</th>   
                  <th width="100">หน่วย</th>  
                  <th width="80">สถานะ</th> 
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


