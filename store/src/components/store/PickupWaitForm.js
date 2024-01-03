
import React, {Component} from 'react';
import moment from 'moment';
import PickupList from './PickupList';
import {getEmployees} from '../../utils/EmployeeAPI';

import { updatePickup, updatePickupList, getPickupDetail } from '../../utils/StoreAPI';

import * as config from '../../config';
const imgURL = `${config.init.url}/images/products/`;

const initialState = {
	con_id: '', con_name: '', status: 'N', empList: [], isEdit: false, data: null,
  qty: 0, 
};


export default class PickupWaitForm extends Component {

  constructor(props) {
    super(props);   
    this.state = initialState;
  }

  componentDidMount () {
  	this.getEmployees()   	
  	if(this.props.mode !== 'WAIT'){
	  	let { data } = this.props.data
	  	this.setState({  con_id: data.con_id, con_name: data.con_name })  		
  	}
  }



  handleTypChange (mode,e) {
  	e.preventDefault();
  	if(mode==='E'){
    	let idx = this.state.empList.findIndex((x) => x.id === this.refs.econ.value);
    	this.setState({con_id: this.refs.econ.value, con_name: this.state.empList[idx].name});  		
  	}

  }


  handleSaveData () {
    const item = this.state
    const data = this.props.data.data
    if (item.con_id !== '') {
      let temp = {
        con_id: item.con_id,
        con_name: item.con_name,
        status: 'C'
      };
      let udata = { data: temp , ino: data.ino, cn: data.cn}     
      this.saveData(udata);
    } else {
      show_err('warning','ยังไม่ได้เลือกผู้ตรวจสอบ!!!')
    }
  }

  handleEditData(data){
    this.setState({ isEdit: true, data: data, qty: data.qty })    
  }

  handleCancelData(data){
    let _this = this;
    const item = this.state;
    let delData = {
      data: { status: 'X'  },
      ino: data.ino,
      cn: data.cn,
      id: data.product_id
    }

    updatePickupList(delData)
    .then(function(results) {   
        if (results.data.status === '200') {     
          _this.setState({ isEdit: false, data: null },()=>{
                _this.props.onSaveEdit(data.ino);
          })          
        } else if (results.data.status === '203') {
          show_err('warning',results.data.message) 
        }
       
    });
  }


  handleCloseEdit(){
    this.setState({ isEdit: false, data: null })
  }

  handleSaveEditdata(){
    let _this = this;
    const item = this.state;

    let data = {
      data: { qty: item.qty  },
      ino: item.data.ino,
      cn: item.data.cn,
      id: item.data.product_id
    }

    updatePickupList(data)
    .then(function(results) {   
        if (results.data.status === '200') { 

    
          _this.setState({ isEdit: false, data: null },()=>{
                _this.props.onSaveEdit(data.ino);
          })
          
        } else if (results.data.status === '203') {
          show_err('warning',results.data.message) 
        }
       
    });

  }

  render() {
  	const item = this.state;
    const { data, mode, onReset } = this.props;
    
    let title = 'รายการเบิกสินค้า'
    if(mode === 'CON'){
    	title = 'รายการเบิกสินค้ารอส่ง'
    }


    let createTYP = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 
 

    return (

    <div className="box box-info affix" > 

        <div className="atop">
          <div className="row">
            <div className="col-xs-5 col-sm-7">
              <h3 className="modal-title">
              	<i className="fa fa-file-text-o mgr-10"></i> {title}              	
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
      			                	value={data.data.ino} 
                            		disabled={this.state.autonumber === 'Y'} /> 
      		            	</div>      					
      		          		<div className="col-xs-5 col-sm-5 form-group">	         
      			                <label>วันที่</label>
      			                <input type="text" className="form-control" value={data.data.dat}  /> 
      		            	</div>    
      		          		<div className="col-sm-12 form-group">	         
      			                <label>พนักงาน</label>
		                        <input type="text" className="form-control" value={data.data.emp_name} />
      		            	</div> 
      		     	            
      					</div> 
            		</div>
      				<div className="col-sm-3 col-sm-offset-1">
      					<div className="row">



     		    
      					</div>
      				</div>			
					<div className="col-sm-4 col-sm-offset-1">
      					<div className="row">
      		          		<div className="col-sm-12 form-group">	         
      		            		<label>หมายเหตุ</label>
      							<input type="text" className="form-control"
      								value={data.data.mem}  />
      		            	</div>	
      		            	<div className="col-sm-12 form-group">
      		            		<label>ผู้ตรวจสอบ</label>
		                        <select className="form-control" id="econ"  ref="econ" value={item.con_id} onChange={this.handleTypChange.bind(this,'E')}> 
		                            <option value=""></option>                        
		                            {item.empList.map(createTYP)}     
		                        </select> 
      		            	</div> 


      					</div>					
					</div>
				</div>
			</div>
         	<div className="abody min-550">  
                <div className="row">
                  <div className="col-xs-12 col-sm-12">
                    {
                      item.isEdit ?
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                            <h3>{item.data.product_name}</h3>
                            <small>{item.data.product_id}</small>
                            <hr/>


                            <div className="row">
                                    <div className="col-sm-6 form-group">           
                                      <label>จำนวน</label>
                                      <input type="text" className="form-control"
                                        value={item.qty} 
                                        onChange={(e)=>this.setState({qty:e.target.value})}  />
                                    </div>  
                                    <div className="col-sm-6 form-group pad-top-20">
                                   {item.data.unit}
                                    </div> 
                            </div>



                            <hr/>
                            <div className="row">
                              <div className="col-xs-6 col-sm-6">
                                  <a  className="btn btn-flat btn-success" onClick={this.handleSaveEditdata.bind(this)} > 
                                    <i className="fa fa-save mgr-10"></i>  แก้ไขข้อมูล   
                                  </a>  
                              </div>
                              <div className="col-xs-6 col-sm-6">

                                <a  className="btn btn-flat btn-default  " onClick={this.handleCloseEdit.bind(this)} > 
                                    <i className="fa fa-close mgr-10"></i>  ยกเลิก   
                                  </a> 
                              </div>
                            </div>

                        </div>
                      </div>
                      : 
                      <PickupList  data={data.dList} mode={mode}  onEdit={this.handleEditData.bind(this)}  onDelete={this.handleCancelData.bind(this)}  /> 
                    }                  
                     
                  </div>
                </div>
              	

                  {
                    data.dList.length === 0 ?
                    <div className="col-sm-12 text-center pad-bottom-50">
                        <div className="dblock">
                        <div className="icon font-50">
                                <i className="ion ion-bag"></i>
                              </div>
                              <small>ไม่มีรายการเบิกสินค้า!!</small>
                        </div>                          
                      </div>
                    : null
                  }

          	</div>
        </div>
        <div className="abottom">
            <div className="row">
              <div className="col-xs-4 col-sm-6">
   
              </div>
              <div className="col-xs-8 col-sm-6">      
               {
               	mode === 'WAIT' ?
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

  saveData (data) {
    //
    let _this = this;

      updatePickup(data)
      .then(function(results) {   
        if (results.data.status === '200') {   
          _this.props.onSave();
        } else if (results.data.status === '203') {
          show_err('warning','รหัสซ้ำ') 
        }
       
      });

  }



  


}

