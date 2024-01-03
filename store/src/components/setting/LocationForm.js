import React, {Component} from 'react';
import moment from 'moment';
import ConfirmBox from '../../components/common/ConfirmBox';
import {getWherehouses, getLocation, getLocations, createLocation, updateLocation, deleteLocation} from '../../utils/CompanyAPI';

const initialState = {
  wList: [], loactionList: [], isViews: false, isEdit: false, loading: false, isDelete: false,
  id: '', name: '', sname: '', address: '',tel: '', wherehouse_id: '-', wherehouse_name: '',  com_name: '', com_taxno: '', com_address: '', com_tel: '', com_fax: '',
};

export default class LocationForm extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reSet(e){
  	e.preventDefault();
  	this.setState({ isViews: false, isDelete: false })
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {    
    this.getWherehouses();  
  	this.getDatas();
    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }
  }

  componentWillReceiveProps(nextProps) {
  	const item = nextProps.company;
  	this.setState({  com_name: item.name, com_address: item.address, com_taxno: item.taxno, com_tel: item.tel, com_fax: item.fax  })  
  }  

  handleKeyPress(e, field) { 
    if (e.keyCode === 13) {
        e.preventDefault()
        if(field.name!=='none'){    
          this.refs[field.name].focus() 
        }                 
    }
  }

  handleWHChange(e) {
    let i = this.state.wList.findIndex((x) => x.id === this.refs.wh.value);
    this.setState({ wherehouse_id: this.state.wList[i].id, wherehouse_name: this.state.wList[i].name }); 
  }

  handleNewData(e){
  	e.preventDefault();
  	this.setState({ id: '', name: '', address: '',tel: '', wherehouse_id: '-', wherehouse_name: '', isViews: true, isEdit: false, isDelete: false, loading: false });
  }

  handleEditData (data,e) {
    e.preventDefault();
    this.setState({ 
    	isEdit: true, isViews: true, isDelete: false, loading: false,
    	id: data.id, name: data.name, sname: data.sname, address: data.address,tel: data.tel, 
    	wherehouse_id: data.wherehouse_id, wherehouse_name: data.wherehouse_name,
		com_name: data.com_name, com_address: data.com_address, 
  		com_taxno: data.com_taxno, com_tel: data.com_tel, 
  		com_fax: data.com_fax
    });
  }

  handleDelete (e) {
  	e.preventDefault();
  	this.setState({ isDelete: true });
  }

  DeleteResult (status) {
    if (status === 'YES') {
      let data = {id: this.state.id} ;
      this.deleteData(data);
    } else {
      this.setState({ isDelete: false });
    }
  }

  handleSaveData(e){
  	e.preventDefault();  	
	let con = 'Y'; let msg = '';
	if (this.state.id !== '') {		
	if (this.state.name !== '') {
	if (this.state.sname !== '') {
	if (this.state.wherehouse_id !== '-') {
	    con = 'Y';
	} else { con = 'N'; msg = 'ไม่ได้เลือกคลังสินค้า!!!'; }
} else { con = 'N'; msg = 'ไม่ได้กรอกชื่อย่อสาขา!!!'; }	
	} else { con = 'N'; msg = 'ไม่ได้กรอกชื่อสาขา!!!'; }	
	} else { con = 'N'; msg = 'ไม่ได้กรอกสาขาเลขที่!!!'; }	

	if (con === 'Y') {
		this.setState({ loading: true },()=>{
		  	if(this.state.isEdit===false){	  	
			  	let data = {
			  		id: this.state.id,
			  		name: this.state.name,
			  		sname: this.state.sname,
			  		wherehouse_id: this.state.wherehouse_id,
			  		wherehouse_name: this.state.wherehouse_name,
			  		address: this.state.address,
			  		tel: this.state.tel,
			  		com_name: this.state.com_name, 
			  		com_address: this.state.com_address, 
			  		com_taxno: this.state.com_taxno, 
			  		com_tel: this.state.com_tel, 
			  		com_fax: this.state.com_fax,
			  		status: 'Y'
			  	}		  
			  	this.saveData(data);
		  	} else {
			    const temp = {		  		
			  		name: this.state.name,
			  		sname: this.state.sname,
			  		wherehouse_id: this.state.wherehouse_id,
			  		wherehouse_name: this.state.wherehouse_name,
			  		address: this.state.address,
			  		tel: this.state.tel,
			  		com_name: this.state.com_name, 
			  		com_address: this.state.com_address, 
			  		com_taxno: this.state.com_taxno, 
			  		com_tel: this.state.com_tel, 
			  		com_fax: this.state.com_fax,
			  		status: 'Y'
			    };
			    const newData = {data: temp, id: this.state.id};
			    this.updateData(newData);
		  	}
		});	
	} else { show_err('warning',msg); }

  }



  render() {  
  	const item = this.state;
    let createWH = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    if(item.isViews=== false){
    	return(
	    <div className="row">
		   	<div className="col-sm-12">

				<div className="row">
					<div className="col-sm-6">
						<h3 className="text-info">ข้อมูลสาขา</h3>
					</div>
					<div className="col-sm-6">
		              <button className="btn btn-flat btn-default pull-right" onClick={this.handleNewData.bind(this)} >
		                <i className="fa fa-plus"></i> เพิ่มสาขาใหม่
		              </button>
					</div>				
				</div>
		      	<LocationList List={item.loactionList} onEdit={this.handleEditData.bind(this)} />	
			</div>
	    </div>
    	)
    }

    if(item.isViews=== true){
    	return(
		<div className="box box-info affix" > 

	        {
	          	item.isDelete === false ?
	          	<div>
		        <div className="atop">
		          <div className="row">
		            <div className="col-xs-5 col-sm-7">
		              <h3 className="modal-title"><i className="fa fa-file-text-o mgr-10"></i> เพิ่มสาขาใหม่</h3>
		            </div>
		            <div className="col-xs-7 col-sm-5">				
		              	<a onClick={this.reSet.bind(this)}><i className="fa fa-close pull-right aclose"></i> </a>              	
		            </div>
		          </div>
		        </div> 
				<div className="scroll-area"> 		
					<div className="abody h100">				
			            <div className="row">
			              <div className="col-sm-6 col-sm-offset-3">				
							<h3 className="text-info mgt-20">ข้อมูลสาขา</h3>
			                <div className="form-group mgt-20">            
			                  <label  className="col-sm-4" >สาขาเลขที่ <span className="text-red">*</span></label>
			                  <div className="col-sm-2">
			                    <input type="text"  className="form-control" name="sname" ref='id' 
			                      disabled={item.isEdit}
			                      value={item.id}
			                      onChange={(e) => this.setState({id: e.target.value})} />
			                  </div>
			                  <label  className="col-sm-3" >ชื่อย่อสาขา <span className="text-red">*</span></label>
			                  <div className="col-sm-3">
			                    <input type="text"  className="form-control" name="name" ref='sname' 
			                      value={item.sname}
			                      onChange={(e) => this.setState({sname: e.target.value})} />
			                  </div>


			                </div>   
			                <div className="form-group">            
			                  <label  className="col-sm-4" >ชื่อสาขา <span className="text-red">*</span></label>
			                  <div className="col-sm-8">
			                    <input type="text"  className="form-control" name="address" ref='name' 
			                      value={item.name}
			                      onChange={(e) => this.setState({name: e.target.value})} />
			                  </div>
			                </div>  
			                <div className="form-group">            
			                  <label  className="col-sm-4" >คลังสินค้า <span className="text-red">*</span></label>
			                  <div className="col-sm-8">
			                      <select className="form-control select2" id="wh"  ref="wh" value={item.wherehouse_id} onChange={this.handleWHChange.bind(this)}> 
			                        <option value="-"></option>                        
			                        {item.wList.map(createWH)}     
			                      </select>  
			                  </div>
			                </div> 


			                <div className="form-group">            
			                  <label  className="col-sm-4" >ที่อยู่ </label>
			                  <div className="col-sm-8">
			                    <textarea className="form-control" name="tel" ref='address'  rows="3" 
			                      value={item.address}
			                      onChange={(e) => this.setState({address: e.target.value})} />
			                  </div>
			                </div>      
			                <div className="form-group">            
			                  <label  className="col-sm-4" >เบอร์โทร </label>
			                  <div className="col-sm-8">
			                    <input type="text"  className="form-control" name="com_name" ref='tel'  
			                      value={item.tel}
			                      onChange={(e) => this.setState({tel: e.target.value})} />
			                  </div>    
			                </div>

			                <h3 className="text-info mgt-20">ข้อมูลบริษัท</h3>

			                <div className="form-group mgt-20">            
			                  <label  className="col-sm-4" >ชื่อบริษัท </label>
			                  <div className="col-sm-8">
			                    <input type="text"  className="form-control" name="taxno" ref='com_name' 
			                      value={item.com_name}
			                      onChange={(e) => this.setState({com_name: e.target.value})} />
			                  </div>
			                </div>    
			                <div className="form-group">            
			                  <label  className="col-sm-4" >เลขประจำตัวผู้เสียภาษี </label>
			                  <div className="col-sm-8">
			                    <input type="text"  className="form-control" name="address" ref='taxno'  
			                      value={item.com_taxno}
			                      onChange={(e) => this.setState({com_taxno: e.target.value})} />
			                  </div>
			                </div>  
			                <div className="form-group">            
			                  <label  className="col-sm-4" >ที่อยู่ </label>
			                  <div className="col-sm-8">
			                    <textarea className="form-control" name="phone" ref='address'  rows="3" 
			                      value={item.com_address}
			                      onChange={(e) => this.setState({com_address: e.target.value})} />
			                  </div>
			                </div>      
			                <div className="form-group">            
			                  <label  className="col-sm-4" >เบอร์โทร </label>
			                  <div className="col-sm-8">
			                    <input type="text"  className="form-control" name="fax" ref='phone'  
			                      value={item.com_tel}
			                      onChange={(e) => this.setState({com_tel: e.target.value})} />
			                  </div>    
			                </div>    
			                <div className="form-group">  
			                  <label  className="col-sm-4" >Fax </label>
			                  <div className="col-sm-8">
			                    <input type="text"  className="form-control" name="none" ref='fax'  
			                      value={item.com_fax}
			                      onChange={(e) => this.setState({com_fax: e.target.value})} />
			                  </div>
			                </div> 
			                <br/><br/>


						  </div>
						</div>
					</div>
				</div>
		        <div className="abottom">
		          	<div className="row">
			            <div className="col-xs-4 col-sm-6">
			            	<a  className="btn btn-flat btn-default mgl-10" onClick={this.reSet.bind(this)} > <i className="fa fa-refresh mgr-10"></i>  ยกเลิก   </a>
			            </div>
			            <div className="col-xs-8 col-sm-6">          
			              <a  className="btn btn-flat btn-success pull-right mgr-10" onClick={this.handleSaveData.bind(this)} > <i className="fa fa-save mgr-10"></i>  บันทึกข้อมูล   </a>  
			              {
			              	item.isEdit === true ?
							<a  className="btn btn-flat btn-danger pull-right mgr-10" onClick={this.handleDelete.bind(this)} > <i className="fa fa-trash mgr-10"></i>  ลบข้อมูล   </a>
			              	: null
			              }			                       
			            </div>
		          	</div>
				</div>
				</div>	     
	        	: null
	        }

	        {
	          item.isDelete === true ?
	            <ConfirmBox
	              mode={'DELETE'}
	              onSave={this.DeleteResult.bind(this)}
	            />          
	            : null
	        }

			{
			item.loading ?
				<div className="overlay">
	          		<i className="fa fa-refresh fa-spin"></i>
	        	</div>
			: null
			}
    	</div>
    	)
    }


 }


	getWherehouses() {
		let _this = this;
		getWherehouses()
		.then(function(results) {
		  if (results.data.status === '200') {
		    _this.setState({ wList: results.data.data, isViews: false, isDelete: false });
		  } else if (results.data.status === '204') {
		    _this.setState({wList: [], isViews: false});
		  }
		});
  	}



	getDatas() {
		let _this = this;
		getLocations()
		.then(function(results) {
		  if (results.data.status === '200') {
		    _this.setState({ loactionList: results.data.data, isViews: false, isDelete: false });
		  } else if (results.data.status === '204') {
		    _this.setState({loactionList: [], isViews: false});
		  }
		});
  	}


	saveData(data) {
		let _this = this;

		createLocation(data)
		.then(function(results) {
		  	console.log(results);
		    if (results.data.status === '201') {
		    	_this.setState({ loading: false },()=>{
		      		show_err('success','บันทึกข้อมูลเรียบร้อย') 
		      		_this.getDatas();		    		
		    	});		      
		    } else if (results.data.status === '203') {
		        show_err('warning','รหัสซ้ำ')         
		    }
		});

	}

	updateData (data) {
		let _this = this;
		updateLocation(data)
		.then(function(results) {		  
		  if (results.data.status === '200') {
	    	_this.setState({ loading: false },()=>{
		      	show_err('success','แก้ไขรายการเรียบร้อยแล้ว') 
		      	_this.getDatas();		    		
		    }); 
		  }
		});
	}

  deleteData(data) {
    let _this = this;
    deleteLocation(data)
    .then(function(results) {
      if (results.data.status === '201') {
	    	_this.setState({ loading: false },()=>{
		      	show_err('success','ลบข้อมูลเรียบร้อยแล้ว') 
		      	_this.getDatas();		    		
		    });            
      }
    });
  }

}



function LocationList(props) {
  const _this = this
  const { List, onEdit } = props
  const templist =  List.map((data,i) =>
        <tr key={i} >
          <td>{i + 1}</td>        
          <td>{data.name}</td>  
          <td>{data.sname}</td>
          <td>{data.wherehouse_name}</td>
          <td className="text-center">
            <a className="text-info  alink" onClick={onEdit.bind(_this, data)} >
              <i className="fa fa-pencil"></i>
            </a>
          </td>     
        </tr>
  )

  return(
  <div className="row">
	<div className="col-sm-12 mgt-10">
	  	<table id="mytable" className="table table-bordered table-hover">
		    <thead>
		      <tr>     
		      	<th width="50">#</th>   
		        <th>สาขา</th> 
		        <th>ชื่อย่อ</th>
		        <th>คลังสินค้า</th>
		        <th width="50"></th>                      
		      </tr>
		      </thead>
		      <tbody>
		      	{templist}
		    </tbody>
	  	</table>
	</div>

    {
        templist.length === 0 ?
        <div className="col-sm-12 text-center pad-bottom-50">
            <div className="dblock">       
                  <small>ไม่มีสาขา!!</small>
            </div>                          
        </div>
        : null
    }



  </div>

  )
}

