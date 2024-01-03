import React, {Component} from 'react';
import moment from 'moment';
import TempList from './TempList';

import {getGenerals} from '../../utils/GeneralAPI';
import {getSupliers} from '../../utils/SupplierAPI';
import {getEmployees} from '../../utils/EmployeeAPI';
import {getWherehouses} from '../../utils/CompanyAPI';
import {getAutonumber, getAutonumberID, setAutonumber} from '../../utils/AutonumberAPI';
import {getProducts} from '../../utils/ProductAPI';
import {getTempRecives, createTempRecive, updateTempRecive, deleteTempRecive, deleteTempRecives, createRecive, createReciveList, updateStore} from '../../utils/StoreAPI';

import * as config from '../../config';
const imgURL = `${config.init.url}/images/products/`;

const initialState = {
	autonumber: 'N', adata: [], supList: [], typList: [], wList: [], rList: [], empList: [], tmpList: [],
	ino: '', dat: '', mem: '', typ_id: 'A', typ_name: 'ทั่วไป', sup_id: '-', sup_name: '', 
	rno: '', emp_id: '', emp_name: '', con_id: '', con_name: '',
	pid: '', pname: '', qty: '', price: '', unit: 'หน่วย', no: '', 	
};


export default class ReciveForm extends Component {

  constructor(props) {
    super(props);  
    this.typ = [{id: 'A', name: 'ทั่วไป'}]; 
    this.state = initialState;
  }

  componentDidMount () {
    const _this = this
    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }

    $("#dname").select2()
    $("#dname").select2({ width: '100%' })
    $("#dname").on("select2:select", function(e) {               
        let i = e.params.data.element.index  
        if(i > 0){   
          _this.setState({ 
          	pid: _this.props.products[i-1].id, 
          	pname: _this.props.products[i-1].name, 
          	unit: _this.props.products[i-1].unit  
          },()=>{  _this.refs.d_qty.focus();  })  
        } else {
           _this.setState({ pid: '', pname: '', unit: 'หน่วย' })                     
        }             
    })
    $("#dname").val("").trigger("change") 

    this.setNewForm();
  }

  handleKeyPress(e, field) { 
    if (e.keyCode === 13) {
        e.preventDefault()
        if(field.name!=='none'){    
          this.refs[field.name].focus() 
        }                 
    }
  }

  handleTypChange (mode,e) {
  	e.preventDefault();
  	if(mode==='T'){
    	let idx = this.typ.findIndex((x) => x.id === this.refs.typ.value);
    	this.setState({typ_id: this.refs.typ.value, typ_name: this.typ[idx].name});  		
  	}
  	if(mode==='E'){
    	let idx = this.state.empList.findIndex((x) => x.id === this.refs.econ.value);
    	this.setState({con_id: this.refs.econ.value, con_name: this.state.empList[idx].name});  		
  	}
  	if(mode==='S'){
    	let idx = this.state.supList.findIndex((x) => x.id === this.refs.sub.value);
    	this.setState({sup_id: this.refs.sub.value, sup_name: this.state.supList[idx].name});  		
  	}
  }


  handleAddItem(e){
  	e.preventDefault();
    let item = this.state;
    const users = JSON.parse(localStorage.getItem('msClinic'));
    let no = 1;
    if (item.pid !== '') {
      if (item.qty !== '' || item.qty > 0) {
        if (item.price !== '' || item.qty > 0) {
          let idx = item.tmpList.findIndex((x) => x.product_id === item.pid);
          if (idx === -1) {
            if (item.tmpList.length > 0) {
              no = parseFloat(item.tmpList[0].no) + 1;
            }
            const data = {             
              product_id: item.pid,
              product_name: item.pname,
              qty: item.qty,
              price: item.price,
              unit: item.unit,
              no: no,
            };

            this.addItems(data);
          } else {
            const temp = {qty: item.qty, price: item.price};
            const newData = {data: temp, product_id: item.pid};
            this.updateItems(newData);
          }
        } else { show_err('warning','ยังไม่กรอกราคารวม'); }
      } else { show_err('warning','ยังไม่กรอกจำนวนรับ'); }
    } else { show_err('warning','ยังไม่เลือกรายการสินค้า'); }  	
  }

  handleEditItem(data){  
    $('#dname').select2()
    $("#dname").val(data.product_id).trigger("change")  
    this.setState({pid: data.product_id, pname: data.product_name, qty: data.qty, price: data.price, unit: data.unit, no: data.no}, () => {         
      this.refs.d_qty.focus();
    });
  }

  handleDeleteItem(data){  	
  	const users = JSON.parse(localStorage.getItem('msClinic'));
    let item = this.state;
    let newdata = {product_id: data.product_id} ;
    this.deleteItems(newdata);
  }

  handleSaveData () {
    const item = this.state;
    const users = JSON.parse(localStorage.getItem('msClinic'));
    if (item.tmpList.length > 0) {
      const _this = this;
      const data = {
        ino: item.ino,
        rno: item.rno,
        dat: moment().format(),
        typ_id: item.typ_id,
        typ_name: item.typ_name,
        sup_id: item.sup_id,
        sup_name: item.sup_name,
        emp_id: item.emp_id,
        emp_name: item.emp_name,
        con_id: item.con_id,
        con_name: item.con_name,
        mem: item.mem,
      };
      if (this.state.autonumber === 'Y') {
        let newData = getAutonumberID(this.state.adata);
        data.ino = newData.lastID;
        setAutonumber(newData.id, newData.maxID)
        .then(function(results) {
          _this.saveData(data);
        });
      } else {
        _this.saveData(data);
      }
    } else {
      show_err('warning','ไม่มีรายการรับเข้า')
    }
  }

  render() {
  	const item = this.state;
    const {onReset, products} = this.props;
    let totalprice = 0;

    let createTYP = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    let createSub = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    let createRno = function (item, key) {
      return <option value={item.ino} key={key} >{item.ino}</option>
    }     

    return (

    <div className="box box-info affix" > 

        <div className="atop">
          <div className="row">
            <div className="col-xs-5 col-sm-7">
              <h3 className="modal-title">
              	<i className="fa fa-file-text-o mgr-10"></i> รับเข้าคลัง     	
              </h3>
            </div>
            <div className="col-xs-7 col-sm-5">       
                <a onClick={onReset}><i className="fa fa-close pull-right aclose"></i> </a>               
            </div>
          </div>
        </div> 
        <div className="scroll-area"> 
			<div className="row headBar">
				<div className="row">
            		<div className="col-sm-3">
      					<div className="row">
      		          		<div className="col-xs-7 col-sm-7 form-group">	         
      			                <label>เลขที่</label>
      			                <input type="text" className="form-control"  
      			                	value={item.ino} 
                            		disabled={this.state.autonumber === 'Y'} 
                            		onChange={(e) => this.setState({ino: e.target.value})} /> 
      		            	</div>      					
      		          		<div className="col-xs-5 col-sm-5 form-group">	         
      			                <label>วันที่</label>
      			                <input type="text" className="form-control" value={item.dat}  /> 
      		            	</div>      		       	 		            			          
      		            	<div className="col-sm-12 form-group">
      		            		<label>หมายเหตุ</label>
      							<input type="text" className="form-control"
      								value={item.mem}  
      								onChange={(e) => this.setState({mem: e.target.value})}  />
      		            	</div>		            
      					</div> 
            		</div>
      				<div className="col-sm-4 col-sm-offset-1">
      					<div className="row">
      		          		<div className="col-sm-6 form-group">	         
      			                <label>ประเภท</label>
		                        <select className="form-control" id="typ"  ref="typ" value={item.typ_id} onChange={this.handleTypChange.bind(this,'T')}> 		                                                  
		                            {this.typ.map(createTYP)}     
		                        </select> 
      		            	</div>	      		         	            	          
      		            	<div className="col-sm-6 form-group">
      		            		<label>รับจาก</label>
		                        <select className="form-control" id="sub"  ref="sub" value={item.sup_id} onChange={this.handleTypChange.bind(this,'S')} > 
		                            <option value="-"></option>                        
		                            {item.supList.map(createSub)}     
		                        </select> 
      		            	</div>
      		  
      					</div>
      				</div>			
					<div className="col-sm-3 col-sm-offset-1">
      					<div className="row">
      		          		<div className="col-sm-12 form-group">	         
      			                <label>พนักงาน</label>
		                        <input type="text" className="form-control" value={item.emp_name} />
      		            	</div>	      		         	            	          
      		            	<div className="col-sm-12 form-group">
      		            		<label>ผู้ตรวจสอบ</label>
		                        <select className="form-control" id="econ"  ref="econ" value={item.con_id} onChange={this.handleTypChange.bind(this,'E')}> 
		                            <option value="-"></option>                        
		                            {item.empList.map(createSub)}     
		                        </select> 
      		            	</div>      		      
      					</div>					
					</div>
				</div>
			</div>
         	<div className="abody min-600">  
         		<form role="form">
					    <div className="row">

                      <div className="col-sm-5 form-group">                       
                          <label>รายการสินค้า</label>                      
                          <select className="form-control select2" id="dname" ref='dname' value={item.pid} > 
                            <option value=""></option>                        
                            {products.map(createSub)}     
                          </select> 
                      </div>
                      <div className="col-xs-5 col-sm-2 form-group">
                          <label>จำนวน / {item.unit}</label>
                          <input type="text" className="form-control" name="d_price" id="d_qty" ref="d_qty" 
                            value={item.qty}
                            onChange={(e) => this.setState({qty: e.target.value})} />
                      </div> 
                      <div className="col-xs-5 col-sm-2 form-group">
                          <label>ราคารวม</label>
                          <input type="text" className="form-control" name="enter" id="d_price" ref="d_price" 
                            value={item.price}
                            onChange={(e) => this.setState({price: e.target.value})} />
                      </div>
                      <div className="col-xs-1 col-sm-1 pad-top-25">
                        <button type="button" className="btn btn-default" onClick={this.handleAddItem.bind(this)} >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>

					    </div>
				    </form>
              	<TempList
                	mode={'IN'}
                	onEdit={this.handleEditItem.bind(this)}
                	onDelete={this.handleDeleteItem.bind(this)}
                	data={item.tmpList} />  

                  {
                    item.tmpList.length === 0 ?
                    <div className="col-sm-12 text-center pad-bottom-50">
                        <div className="dblock">
                        <div className="icon font-50">
                                <i className="ion ion-bag"></i>
                              </div>
                              <small>ไม่มีรายการสินค้าที่จะรับเข้าคลัง!!</small>
                        </div>                          
                      </div>
                    : null
                  }

          	</div>
        </div>
        <div className="abottom">
            <div className="row">
              <div className="col-xs-4 col-sm-6">
                <a  className="btn btn-flat btn-default mgl-10" 
                  onClick={onReset} > <i className="fa fa-refresh mgr-10"></i>  ยกเลิก   </a>
              </div>
              <div className="col-xs-8 col-sm-6">          
                <a  className="btn btn-flat btn-success pull-right mgr-10" 
                  onClick={this.handleSaveData.bind(this)}  > <i className="fa fa-save mgr-10"></i>  บันทึกข้อมูล   </a>                             
              </div>
            </div>
        </div>


    </div>
    );
  }
  //
  setNewForm(){
    const _this = this;   
    const users = JSON.parse(localStorage.getItem('msClinic'));    
    let state = initialState;
    state.dat = moment().format('DD/MM/YYYY');
	  state.emp_id = users.emp_id;
	  state.emp_name = users.emp_name;
    getAutonumber('IN','ST')
    .then(function(results) {
        if (results.data.status === '200') {
          	let data = results.data.data;
          	state.adata = data;
          	state.autonumber = data.typ;          	
          	if (data.typ === 'Y') {
            	state.ino = 'AUTO';
          	}         
         	_this.setState(state,()=>{
			    _this.getSUP();
			    _this.getEmployees();
			    //_this.getWherehouses(users.location_id);
			    _this.getTempRecives();
         	});
        } else {
			_this.setState(state,()=>{
			    _this.getSUP();
			    _this.getEmployees();	
			   // _this.getWherehouses(users.location_id);	
			    _this.getTempRecives();		
			});
        }
    });     

  }

  getSUP () {    
    let _this = this;
    getSupliers('ACTIVE')
    .then(function(results) {      
      if (results.data.status === '200') {
        _this.setState({ supList: results.data.data  })        
      } else if (results.data.status === '204') {
        _this.setState({ supList: []  })
      }
    });    
  }

  getEmployees () {
    let _this = this;
    getEmployees('D','Y')
    .then(function(results) {
      if (results.data.status === '200') {        
        _this.setState({empList: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({empList: []});
      }
    });
  }

  getWherehouses(id) {
	let _this = this;
	getWherehouses(id)
	.then(function(results) {
	  if (results.data.status === '200') {
	    _this.setState({ wList: results.data.data });
	  } else if (results.data.status === '204') {
	    _this.setState({wList: []});
	  }
	});
  }

  getTempRecives () {
    let _this = this;
    const users = JSON.parse(localStorage.getItem('msClinic'));
    getTempRecives(users.location_id)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({tmpList: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({tmpList: []});
      }
    });
    this.clearTemp();
  }

  addItems (data) {
    let _this = this;
    createTempRecive(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','เพิ่มรายการเรียบร้อย') 
        _this.getTempRecives();
      } else if (results.data.status === '203') {
        show_err('warning',results.data.message)
      }
    });
  }

  updateItems (data) {
    let _this = this;
    updateTempRecive(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขรายการเรียบร้อยแล้ว') 
        _this.getTempRecives();
      }
    });
  }

  deleteItems (data) {
    let _this = this;
    deleteTempRecive(data)
    .then(function(results) {
      if (results.data.status === '201') {
        show_err('success','ลบรายการเรียบร้อยแล้ว') 
        _this.getTempRecives();
      }
    });
  }

  clearTemp () {
    this.setState({pid: '', pname: '', qty: '', price: ''},()=>{  
      $("#dname").val("").trigger("change") 
      $("#dname").focus()
    });
  }



  saveData (data) {
    let _this = this;
    let con = 'Y'; let msg = '';
    if (data.ino !== '') {
        con = 'Y';
    } else {
      con = 'N'; msg = 'ไม่ได้กรอกเลขที่';
    }
    if (con === 'Y') {
      createRecive(data)
      .then(function(results) {      
        if (results.data.status === '201') {
          const tempList = _this.state.tmpList;
    		  const saveData = {
    		  	data : data,
    		  	dList: tempList
    		  }
          tempList.forEach(function(val) {
            const newData = {
              ino: data.ino,
              cn: val.cn,
              product_id: val.product_id,
              product_name: val.product_name,
              qty: val.qty,
              total: val.qty,
              price: val.price,
              unit: val.unit,
              no: val.no,
            };
            createReciveList(newData);           
            updateStore(newData, 'I', _this.state.mem, data.dat);
          });
          let delData = {cn: '-'} ;
          deleteTempRecives(delData);         
          _this.props.onSave(saveData);
        } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ') 
        }
      });
    } else {
      show_err('warning',msg)
    }
  }


}

