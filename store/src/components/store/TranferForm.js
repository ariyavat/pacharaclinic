import React, {Component} from 'react';
import moment from 'moment';
import TempList from './TempList';

import {getGenerals} from '../../utils/GeneralAPI';
import {getEmployees} from '../../utils/EmployeeAPI';
import {getWherehouses} from '../../utils/CompanyAPI';
import {getAutonumber, getAutonumberID, setAutonumber} from '../../utils/AutonumberAPI';
import {getProducts,getProduct} from '../../utils/ProductAPI';
import {
	getProductTotal, getTempTranfers, createTempTranfer, updateTempTranfer, deleteTempTranfer, deleteTempTranfers, 
	createTranfer, updateStore, updatePickup
} from '../../utils/StoreAPI';

import * as config from '../../config';
const imgURL = `${config.init.url}/images/products/`;

const initialState = {
	autonumber: 'N', adata: [], empList: [], tmpList: [], data: [], dList: [], pList: [], tempPlist: [],
	ino: '', dat: '', mem: '', sup_id: '', sup_name: '', 
	emp_id: '', emp_name: '', con_id: '', con_name: '', status: 'N',
	pid: '', pname: '', qty: '', unit: 'หน่วย', no: '', barcode: '', 	isLoad: false,
};


export default class TranferForm extends Component {

  constructor(props) {
    super(props);    
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
           _this.setState({ pid: '', pname: '', unit: 'หน่วย', barcode: '' })                     
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

  }

  handleSetData(data){
  	this.setState({ pid: data.product_id, pname: data.product_name, qty: data.qty, unit: data.unit  },()=>{
	    $('#dname').select2()
	    $("#dname").val(data.product_id).trigger("change")   
	    $('#d_qty').focus()
  	})
  }

  handleAddItem(e){
  	e.preventDefault();
  	const _this = this;
    let item = this.state;
    const { pData } = this.props
    const users = JSON.parse(localStorage.getItem('msClinic'));

    console.log(item,pData,users)
    let no = 1;
     let total = 0;
    if (item.pid !== '') {
      if (item.qty !== '' || item.qty > 0) {    
      if (item.barcode !== '') {      
          
          let idx = item.tmpList.findIndex((x) => x.product_id === item.pid);
          if (idx === -1) {
            if (item.tmpList.length > 0) {
              no = parseFloat(item.tmpList[0].no) + 1;
            }
            const data = {	
              cn: pData.data.cn,
              barcode: item.barcode,         
              product_id: item.pid,
              product_name: item.pname,
              qty: item.qty,          
              unit: item.unit,
              no: no,
            };
            _this.addItems(data);
          } else {
            const temp = {qty: item.qty, barcode: item.barcode};
            const newData = {data: temp, product_id: item.pid, cn: pData.cn};
            _this.updateItems(newData);
          }        
      } else { show_err('warning','ยังไม่กรอก Barcode'); }
      } else { show_err('warning','ยังไม่กรอกจำนวนรับ'); }
    } else { show_err('warning','ยังไม่เลือกรายการสินค้า'); }  	

  }

  handleEditItem(data){  
    $('#dname').select2()
    $("#dname").val(data.product_id).trigger("change")  
    this.setState({pid: data.product_id, pname: data.product_name, qty: data.qty, unit: data.unit, no: data.no}, () => {         
      this.refs.d_qty.focus();
    });
  }

  handleDeleteItem(data){  	

  	//const users = JSON.parse(localStorage.getItem('msClinic'));
    //let item = this.state;
    let newdata = {product_id: data.product_id} ;
    this.deleteItems(newdata);
  }

  handleSaveData () {

    this.setState({ isLoad: true },()=>{
        const item = this.state;
        const { pData } = this.props
        //let udata = { data: { status: 'Y', sdat: moment().format() } , ino: pData.data.ino, cn: pData.data.cn}
        const users = JSON.parse(localStorage.getItem('msClinic'));
        if (item.tmpList.length > 0) {
          const _this = this;
          const data = {
            ino: item.ino,  
            dat: moment().format(),
            sup_id: item.sup_id,
            sup_name: item.sup_name, 
            emp_id: item.emp_id,
            emp_name: item.emp_name,
            con_id: item.con_id,
            con_name: item.con_name,
            mem: item.mem,
            status: 'N',
            dList: item.tmpList,
            pList: item.tempPlist,
            pino: pData.data.ino,
            pcn: pData.data.cn
          };

          if (item.autonumber === 'Y') {
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
          show_err('warning','ไม่มีรายการโอน')
          this.setState({ isLoad: false })
        }

    })




  }

  render() {
  	const item = this.state;
    const {onReset, products, pData} = this.props;
    let totalprice = 0;

    let createTYP = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 
 



    let n = 0
    const list =  pData.dList.map((data,i) =>{
      if(data.status === 'N'){
        let itemIdx = item.tmpList.findIndex((x) => x.product_id === data.product_id);     
        if(itemIdx === -1){
          n = n + 1
           return(
            <tr key={i} className="alink" onClick={this.handleSetData.bind(this,data)} > 
              <td>{n}</td>        
              <td>{data.product_id}</td> 
              <td>{data.product_name}</td> 
              <td>{parseFloat(data.qty) - parseFloat(data.rqty)}</td> 
              <td>{data.unit}</td> 
            </tr>
          ) 
        }        
      }

    })

    const dlist =  item.tempPlist.map((data,i) =>
      <tr key={i} className="alink" onClick={this.handleSetData.bind(this,data)} > 
        <td>{i+1}</td>        
        <td>{data.pid}</td> 
        <td>{data.pname}</td> 
        <td>{data.qty}</td> 
        <td>{data.unit}</td> 
      </tr>
    )

    return (

    <div className="box box-info affix" > 

        <div className="atop">
          <div className="row">
            <div className="col-xs-5 col-sm-7">
              <h3 className="modal-title">
              	<i className="fa fa-file-text-o mgr-10"></i> โอนสินค้า              	
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
      			                <label>พนักงาน</label>
		                        <input type="text" className="form-control" value={item.emp_name} />
      		            	</div>
      					</div> 
            		</div>
		
					<div className="col-sm-5 col-sm-offset-4">
      					<div className="row">
	            			<div className="col-sm-6 form-group">
      		            		<label>สาขาที่รับ</label>
		                        <input type="text" className="form-control" 
		                        value={item.sup_name}  />
      		            	</div>     		         	            	          
      		            	<div className="col-sm-6 form-group">
      		            		<label>ผู้ตรวจสอบ</label>
		                        <select className="form-control" id="econ"  ref="econ" value={item.con_id} onChange={this.handleTypChange.bind(this,'E')}> 
		                            <option value="-"></option>                        
		                            {item.empList.map(createTYP)}     
		                        </select> 
      		            	</div>   
      		            	<div className="col-sm-12 form-group">
      		            		<label>หมายเหตุ</label>
      							<input type="text" className="form-control"
      								value={item.mem}  
      								onChange={(e) => this.setState({mem: e.target.value})}  />
      		            	</div>	

      					</div>					
					</div>
				</div>
			</div>
         	<div className="abody min-550">  
				<div className="row">
					<div className="col-sm-4"> 
						<h4>รายการเบิกสินค้า</h4>
						<div className="row">
							<div className="col-sm-12"> 

				              <table id="mytable" className="table table-bordered table-hover">
				                  <thead>
				                  <tr>
				                    <th>#</th>      
				                    <th>รหัส</th> 
				                    <th>ชื่อสินค้า</th>              
				                    <th>จำนวน</th>    
				                    <th>หน่วย</th>                                    
				                  </tr>
				                  </thead>
				                  <tbody>
				                  {list}
				                  </tbody>
				              </table>
							</div>
						</div>

					</div>
					<div className="col-sm-5"> 
						<h4>รายการโอนสินค้า</h4>
						<div className="row">
							<div className="col-sm-12"> 
			         		<form role="form">
								<div className="row">

			                      <div className="col-sm-12 form-group">                       
			                          <label>รายการสินค้า</label>                      
			                          <select className="form-control select2" id="dname" ref='dname' value={item.pid} > 
			                            <option value=""></option>                        
			                            {products.map(createTYP)}     
			                          </select> 
			                      </div>
			      

								</div>
                <div className="row">

        
                            <div className="col-sm-4 form-group">
                                <label>จำนวน / {item.unit}</label>
                                <input type="text" className="form-control" name="enter" id="d_qty" ref="d_qty" 
                                  value={item.qty}
                                  onChange={(e) => this.setState({qty: e.target.value})} />
                            </div>  
                            <div className="col-sm-4 form-group">
                                <label>Barcode</label>
                                <input type="text" className="form-control" name="enter" id="d_bcode" ref="d_bcode" 
                                  value={item.barcode}
                                  onChange={(e) => this.setState({barcode: e.target.value})} />
                            </div>           
                            <div className="col-sm-1 pad-top-25">
                              <button type="button" className="btn btn-default" onClick={this.handleAddItem.bind(this)} >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>

                </div>


							</form>
			              	<TempList
			                	mode={'OUT'}
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
					</div>
					<div className="col-sm-3"> 
						<h4>รายการวัตถุดิบที่จ่ายออก</h4>
						<div className="row">
							<div className="col-sm-12"> 

				              <table id="mytable" className="table table-bordered table-hover">
				                  <thead>
				                  <tr>
				                    <th>#</th>      
				                    <th>รหัส</th> 
				                    <th>วัตถุดิบ</th>              
				                    <th>จำนวน</th>    
				                    <th>หน่วย</th>                                    
				                  </tr>
				                  </thead>
				                  <tbody>
				                  {dlist}
				                  </tbody>
				              </table>
							</div>
						</div>

					</div>
				</div>
          	</div>
        </div>
        <div className="abottom">
            <div className="row">
              <div className="col-xs-4 col-sm-6">
                <a  className="btn btn-flat btn-default mgl-10" 
                  onClick={onReset} > <i className="fa fa-refresh mgr-10"></i>  ยกเลิก   </a>
              </div>
              <div className="col-xs-8 col-sm-6">        
              {
                !item.isLoad ?
                  <a  className="btn btn-flat btn-success pull-right mgr-10" 
                                    onClick={this.handleSaveData.bind(this)}  > <i className="fa fa-save mgr-10"></i>  บันทึกข้อมูล   </a>  
                : null
              }  
                                           
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

    let { pData } = this.props
    state.dat = moment().format('DD/MM/YYYY');
  	state.emp_id = users.emp_id;
  	state.emp_name = users.emp_name;
  	state.data = pData.data;
  	state.dList = pData.dList;
  	state.sup_id = pData.data.cn;
  	state.sup_name = pData.data.location_name;
    state.tempPlist = [];
    state.pList = [];
    getAutonumber('TN','ST')
    .then(function(results) {
        if (results.data.status === '200') {
          	let data = results.data.data;
          	state.adata = data;
          	state.autonumber = data.typ;                  	
          	if (data.typ === 'Y') {
            	state.ino = 'AUTO';
          	}         
         	_this.setState(state,()=>{
         	    		    
			    _this.getEmployees();
			    _this.getTempRecives();
         	});
        } else {
			_this.setState(state,()=>{			   
			    _this.getEmployees();		
			    _this.getTempRecives();		
			});
        }
    });     
    let data = { id: '-' }
    deleteTempTranfers(data)
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



  getTempRecives () {
    let _this = this;
    const {pData} = this.props
    const users = JSON.parse(localStorage.getItem('msClinic'));

    getTempTranfers(pData.data.cn)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.setState({tmpList: results.data.data});
      } else if (results.data.status === '204') {
        _this.setState({tmpList: []});
      }
    });
    this.clearTemp();
  }

  setTempList(pid,mode,data){
  	let list = this.state.pList
  	let tmpList = []
  	let idx = list.findIndex((x) => x.pid === pid)

  	if(mode==='ADD'){
	  	if(idx === -1){
	  		let temp = {
	  			pid: pid, dList: data,
	  		}
	  		list.push(temp)

	  	} else {
	  		list.dList = data
	  	}  		
  	} else {
  		list.splice(idx,1)  		
  	}
  

  	list.forEach(function(k) { 
  		k.dList.forEach(function(val) { 
  			let pidx = tmpList.findIndex((x) => x.pid === val.pid)
  			if(pidx === -1){
  				let temp = {
  					pid: val.pid, pname: val.pname, qty: val.qty, unit: val.unit
  				}
  				tmpList.push(temp)
  			} else {
  				let tqty = tmpList[pidx].qty + val.qty
  				 tmpList[pidx].qty = tqty 
  			}	

  		})
  	})

  	this.setState({ pList: list, tempPlist: tmpList  })
  }

  addItems (data) {
    let _this = this;
    createTempTranfer(data)
    .then(function(results) {
      
      if (results.data.status === '201') {
        show_err('success','เพิ่มรายการเรียบร้อย') 
        _this.setTempList(data.product_id,'ADD',results.data.dList)
        _this.getTempRecives();
      } else if (results.data.status === '203') {
        show_err('warning',results.data.message)
      }
    });
  }

  updateItems (data) {
    let _this = this;
    updateTempTranfer(data)
    .then(function(results) {
      if (results.data.status === '200') {
        show_err('success','แก้ไขรายการเรียบร้อยแล้ว') 
        _this.getTempRecives();
      }
    });
  }

  deleteItems (data) {
    let _this = this;
    deleteTempTranfer(data)
    .then(function(results) {    
      if (results.data.status === '201') {
        show_err('success','ลบรายการเรียบร้อยแล้ว') 
        _this.setTempList(data.product_id,'DEL',null)
        _this.getTempRecives();
      }
    });
  }

  clearTemp () {
    this.setState({pid: '', pname: '', qty: '', barcode: '', unit: ''},()=>{  
      $("#dname").val("").trigger("change") 
      $("#dname").focus()
    });
  }



  saveData (data) {
    //console.log('save',data)

    

      let { pData } = this.props
      let _this = this;
      let con = 'Y'; let msg = '';
      if (data.ino !== '') {
          con = 'Y';
      } else {
        con = 'N'; msg = 'ไม่ได้กรอกเลขที่';
      }
      if (con === 'Y') {

        createTranfer(data)
        .then(function(results) { 
          if (results.data.status === '201') {     
            let pst = results.data.pstatus
            let udata = { data: { status: pst, sdat: moment().format() } , ino: pData.data.ino, cn: pData.data.cn}        
            updatePickup(udata)
            .then(function(results) {   
              _this.setState({ isLoad: false },()=>{
                _this.props.onSave(data);  
              })
                         
            });          
          } else if (results.data.status === '203') {
            show_err('warning','รหัสซ้ำ') 
            _this.setState({ isLoad: false })
          }
        });
      } else {
        show_err('warning',msg)
        _this.setState({ isLoad: false })
      }

   
  }


}

