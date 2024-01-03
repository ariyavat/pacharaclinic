import React, {Component} from 'react';
import moment from 'moment';
import ConfirmBox from '../../components/common/ConfirmBox';
import {getWherehouse, getWherehouses, createWherehouse, updateWherehouse, deleteWherehouse} from '../../utils/CompanyAPI';

const initialState = {
  id: '', name: '', address: '',tel: '',  wList: [], isViews: false, isEdit: false, loading: false, isDelete: false,
};

export default class WherehouseForm extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reSet(e){
  	e.preventDefault();
  	this.setState({ isViews: false, isDelete: false })
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount () {      
  	this.getDatas();

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

  handleNewData(e){
  	e.preventDefault();
  	this.setState({ id: '', name: '', address: '',tel: '', isViews: true, isEdit: false, isDelete: false, loading: false });
  }

  handleEditData (data,e) {
    e.preventDefault();
    this.setState({ id: data.id, name: data.name, address: data.address,tel: data.tel, isEdit: true, isViews: true, isDelete: false, loading: false });
  }

  handleDelete (e) {
  	e.preventDefault();
  	this.setState({ isDelete: true });
  }

  DeleteResult (status) {
    if (status === 'YES') {
      let data = {id: this.state.id} ;
      this.setState({ loading: true },()=>{  this.deleteData(data); });      
    } else {
      this.setState({ isDelete: false });
    }
  }

  handleSaveData(e){
  	e.preventDefault();  	
	let con = 'Y'; let msg = '';		
	if (this.state.name !== '') {
	    con = 'Y';
	} else {
	    con = 'N'; msg = 'ไม่ได้กรอกคลังสินค้า!!!';
	}		
	if (con === 'Y') {
		this.setState({ loading: true },()=>{
		  	if(this.state.isEdit===false){	  	
			  	let data = {
			  		name: this.state.name,
			  		address: this.state.address,
			  		tel: this.state.tel
			  	}
			  	this.saveData(data);
		  	} else {
			    const temp = {
			  		name: this.state.name, address: this.state.address, tel: this.state.tel
			    };
			    const newData = {data: temp, id: this.state.id};
			    this.updateData(newData);
		  	}
		});	
	} else { show_err('warning',msg);  }
  }



  render() {  
  	const item = this.state;

    if(item.isViews=== false){
    	return(
	    <div className="row">
		   	<div className="col-sm-12">

				<div className="row">
					<div className="col-sm-6">
						<h3 className="text-info">คลังสินค้า</h3>
					</div>
					<div className="col-sm-6">
		              <button className="btn btn-flat btn-default pull-right" onClick={this.handleNewData.bind(this)} >
		                <i className="fa fa-plus"></i> เพิ่มคลังสินค้า
		              </button>
					</div>				
				</div>
		      	<WherehouseList List={item.wList} onEdit={this.handleEditData.bind(this)} />	
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
		              <h3 className="modal-title"><i className="fa fa-file-text-o mgr-10"></i> เพิ่มคลังสินค้า</h3>
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

			                <div className="form-group mgt-20">            
			                  <label  className="col-sm-4" >คลังสินค้า <span className="text-red">*</span></label>
			                  <div className="col-sm-8">
			                    <input type="text"  className="form-control" name="none" ref='name' 
			                      value={item.name}
			                      onChange={(e) => this.setState({name: e.target.value})} />
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
			                    <input type="text"  className="form-control" name="none" ref='tel'  
			                      value={item.tel}
			                      onChange={(e) => this.setState({tel: e.target.value})} />
			                  </div>    
			                </div>
			                <br/><br/><br/>

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

	getDatas() {
		let _this = this;
		getWherehouses('ALL')
		.then(function(results) {
		  if (results.data.status === '200') {
		    _this.setState({ wList: results.data.data, isViews: false, isDelete: false });
		  } else if (results.data.status === '204') {
		    _this.setState({wList: [], isViews: false});
		  }
		});
  	}


	saveData(data) {
		let _this = this;

		createWherehouse(data)
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
		updateWherehouse(data)
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
    deleteWherehouse(data)
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



function WherehouseList(props) {
  const _this = this
  const { List, onEdit } = props
  const templist =  List.map((data,i) =>
        <tr key={i} >
          <td>{i + 1}</td>        
          <td>{data.name}</td>  
          <td>{data.address}</td>
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
		        <th>คลังสินค้า</th> 
		        <th>ที่อยู่</th>
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
                  <small>ไม่มีรายการคลังสินค้า!!</small>
            </div>                          
        </div>
        : null
    }



  </div>

  )
}

