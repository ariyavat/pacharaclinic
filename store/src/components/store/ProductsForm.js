import React, {Component} from 'react';
import Navtabs from '../common/Navtabs'; 
import { getProductSetList } from '../../utils/ProductAPI';

import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name'];

const initialState = {
  id: '', name: '', unit: '', total: 0, dList: [], productList : [], tempList: [], searchTerm: '', searchTermTemp: '',
  isView: false, pid: '', pname: '', qty: '', punit: '',
  tabs: [
      {title:' รายการสินค้าในคลินิก ',mode:''},{title:'  รายการวัตถุดิบ  ',mode:''}      
  ]
};

export default class ProductsForm extends Component {

  constructor(props) {
    super(props);   
    this.state = initialState;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({productList: nextProps.productList});
  }

  componentDidMount () {
    const _this = this
 
   	if (this.props.isEdit === true) {    
     let item = this.props.data;
 	 let list = []; 
    
    getProductSetList(item.id)
    .then(function(results) { 

      if (results.data.status === '200') {
        list =  results.data.data;
      } 
	  _this.setState({
	       id: item.id, name: item.name, unit: item.unit, total: item.total,  dList: list 
	  });

    });

   	} else {
	     this.setState({
	       id: '', name: '', unit: '', total: '',  dList: []
	     });      
   	}

    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }
    
    this.setState({productList: this.props.productList, tempList: this.props.tempList});

  }

  handleKeyPress(e, field) { 
    if (e.keyCode === 13) {
        e.preventDefault()
        //if(field.name!=='none'){    
          //this.refs[field.name].focus() 
        //}                 
    }
  }


  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();
    if (this.state.id !== '') { 
    if(this.state.dList.length > 0){
    	let data = {
    		id: this.state.id,
    		name: this.state.name,    	
    		unit: this.state.unit,
    		dList: this.state.dList,
    	}
    	this.props.onSave(data);    	
    } else { show_err('warning','ไม่ได้เลือกวัตถุดิบ!!') }        
    } else { show_err('warning','ไม่ได้เลือกสินค้า!!') }
  }

  handleSelectItem(data){
    this.setState({  id: data.id, name: data.name, unit: data.unit  })
  }

  handleSelectItemD(data){
    this.setState({  pid: data.id, pname: data.name, punit: data.unit, isView: true  })
  }

  handleCloseView(){
  	this.setState({  pid: '', pname: '', punit: '', qty: '', isView: false  })
  }

  saveItem(e){
  	e.preventDefault();
  	let item = this.state
  	if(item.pid !== ''){
  	if(item.qty !== ''){
  		let list = item.dList
  		let temp = {
  			id: item.id,
  			pid: item.pid,
  			pname: item.pname,
  			qty: item.qty,
  			unit: item.punit
  		}
  		list.push(temp)
  		this.setState({ dList: list, isView: false, })
  	} else {  show_err('warning','ยังไม่ได้กรอกจำนวน!!!');   }
  } else {  show_err('warning','ยังไม่ได้เลือกสินค้า!!!');   }

  }

  handleDelete(i,e){
  	e.preventDefault(); 
  	let list = this.state.dList
  	list.splice(i)

  	this.setState({ dList: list })

  }

  render() {
  	const item = this.state;
    const {onReset, loading, isEdit} = this.props;
    const filteredData = item.productList.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS)); 
    const tempData = item.tempList.filter(createFilter(item.searchTermTemp, KEYS_TO_FILTERS)); 
 
    const rows = filteredData.map((row, i) => {
      return (
        <tr key={i} className="alink" onClick={this.handleSelectItem.bind(this,row)}>            
          <td >{row.id}</td>   
          <td >{row.name}</td> 
          <td >{row.unit}</td> 
        </tr>      
      );
    });
    
    const trows = tempData.map((row, i) => {
      return (
        <tr key={i} className="alink" onClick={this.handleSelectItemD.bind(this,row)}>            
          <td >{row.id}</td>   
          <td >{row.name}</td> 
          <td >{row.unit}</td> 
        </tr>      
      );
    });

    const drows = item.dList.map((row, i) => {
      return (
        <tr key={i} >            
          <td >{row.pid}</td>   
          <td >{row.pname}</td>
          <td >{row.qty}</td>  
          <td >{row.unit}</td> 
          <td className="text-center">
            <a className="text-info dblock alink" onClick={this.handleDelete.bind(this,i)} >
              <i className="fa fa-remove text-danger"></i>
            </a>
          </td>

        </tr>      
      );
    });

    return (

    <div className="box box-info affix" > 

        <div className="atop">
          <div className="row">
            <div className="col-xs-5 col-sm-7">
              <h3 className="modal-title"><i className="fa fa-file-text-o mgr-10"></i> {this.props.isEdit ? "แก้ไขข้อมูล" : "เพิ่มรายการใหม่" } </h3>
            </div>
            <div className="col-xs-7 col-sm-5">       
                <a onClick={onReset}><i className="fa fa-close pull-right aclose"></i> </a>               
            </div>
          </div>
        </div> 
        <div className="scroll-area">     
          <div className="abody h100">        
    
                  <div className="row mgt-20">
                    <div className="col-sm-5 border-right">
                    	<Navtabs tabs={item.tabs} >
                    		<div className="tab-pane active min-663" id="tab_0" >
                    			{
                    				isEdit ?
                    				<div className="row">
                    					<div className="col-sm-12 text-center"> 
                    						<h1>แก้ไขข้อมูลได้เฉพาะรายการวัติถุดิบเท่านั้น</h1>

                    					</div>
                    				</div>
                    				:
                    				<div>
				                      	<div className="row">
				                          <div className="col-sm-8 form-group">                    
				                              <label  className="col-sm-2 control-label" >ค้นหา</label>
				                              <div className="col-sm-10">
				                                <input type="text" 
				                                  className="form-control" autoComplete="off"
				                                  name="enter" 
				                                  value={this.state.searchTerm}                           
				                                  onChange={(e) => this.setState({searchTerm: e.target.value})} />
				                              </div>
				                          </div>                    
				                      	</div>
				                      	<div className="row">
				                          <div className="col-sm-12">                    
				                            <table id="mytable" className="table table-bordered table-hover">
				                                <thead>
				                                <tr>		                                
				                                  <th width="120">รหัส</th>
				                                  <th>รายการ</th>
				                                  <th width="90">หน่วย</th>
				                                </tr>
				                                </thead>
				                                <tbody>
				                           		{rows}  		                              
				                                </tbody>
				                            </table> 
				                          </div>                    
				                      	</div>
			                      	</div>
                    			}



                    		</div>
                    		<div className="tab-pane min-663" id="tab_1" >

								{
									item.isView === false ?
									<div className="row">
				                        <div className="col-sm-12">  

					                      	<div className="row">
					                          <div className="col-sm-8 form-group">                    
					                              <label  className="col-sm-2 control-label" >ค้นหา</label>
					                              <div className="col-sm-10">
					                                <input type="text" 
					                                  className="form-control" autoComplete="off"
					                                  name="enter" 
					                                  value={this.state.searchTermTemp}                           
					                                  onChange={(e) => this.setState({searchTermTemp: e.target.value})} />
					                              </div>
					                          </div>                    
					                      	</div>
					                      	<div className="row">
					                          <div className="col-sm-12">                    
					                            <table id="mytable" className="table table-bordered table-hover">
					                                <thead>
					                                <tr>		                                
					                                  <th width="120">รหัส</th>
					                                  <th>รายการ</th>
					                                  <th width="90">หน่วย</th>
					                                </tr>
					                                </thead>
					                                <tbody>
					                           		{trows}  		                              
					                                </tbody>
					                            </table> 
					                          </div>                    
					                      	</div>


				                        </div>
				                    </div> 									
									:
									<div className="row">
				                        <div className="col-sm-12"> 
											<div className="row">
												<div className="col-sm-12">
													<a onClick={this.handleCloseView.bind(this)}><i className="fa fa-close pull-right aclose text-red"></i> </a>
												</div>			
											</div>

											<div className="row mgt-20">
												<div className="col-sm-3"><h4>รหัส</h4></div>
												<div className="col-sm-9 text-red"><h4>{item.pid}</h4></div>
											</div>
											<div className="row mgt-10">
												<div className="col-sm-3"><h4>ชื่อ</h4></div>
												<div className="col-sm-9 text-blue"><h4>{item.pname}</h4></div>
											</div>									
											<div className="row mgt-10">
												<div className="col-sm-3"><h4>หน่วย</h4></div>
												<div className="col-sm-9"><h4>{item.punit}</h4></div>
											</div>
											<hr/>
 											<form role="form">
												<div className="row">
										            <div className="col-sm-3 form-group">
										                <label>จำนวน</label>
										                <input type="text" className="form-control" name="enter" id="qty" ref="qty"  autoComplete="off"
										                  value={item.qty}
										                  onChange={(e) => this.setState({qty: e.target.value})} />
										            </div>
										            <div className="col-sm-4 pad-top-25">
										              <button type="button" className="btn btn-block btn-info" onClick={this.saveItem.bind(this)} >
										                <i className="fa fa-plus"></i> เพิ่มรายการ
										              </button>
										            </div>


												</div>
											</form>
				                        </div>
				                    </div> 
								}


                    		</div>
                    	</Navtabs>
                    </div>
                    <div className="col-sm-5 col-sm-offset-1">

	                    <form className="form-horizontal">
	                      <div className="form-group">
	                        <label  className="col-sm-3 control-label" >รหัส <span className="text-red">*</span></label>
	                        <div className="col-sm-3">
	                          <input 
	                            type="text"  className="form-control" name="id" ref='id'  autoComplete="off"
	                            value={item.id}
	                            disabled={this.props.isEdit}  />
	                        </div> 
	                      </div>
	                      <div className="form-group">          
	                        <label  className="col-sm-3 control-label" >ชื่อสินค้า <span className="text-red">*</span></label>
	                        <div className="col-sm-9">
	                          <input type="text"  className="form-control" name="fname" ref='fname'  autoComplete="off"
	                            value={item.name} />
	                        </div>  
	                      </div>                  
	      
	                      <div className="form-group">  
	                        <label  className="col-sm-3 control-label" >หน่วย <span className="text-red">*</span></label>
	                        <div className="col-sm-3">
	                          <input type="text"  className="form-control" name="unit" ref='unit' autoComplete="off"
	                            value={item.unit}  />
	                        </div>               
	                      </div>          

	                    </form>
						<div className="row">
							<div className="col-sm-12">
								<h3>รายการวัตถุดิบ</h3>
							</div>
						</div>
                      	<div className="row">
                          <div className="col-sm-12">                    
                            <table id="mytable" className="table table-bordered table-hover">
                                <thead>
                                <tr>		                                
                                  <th width="120">รหัส</th>
                                  <th>รายการ</th>
                                  <th width="90">จำนวน</th>
                                  <th width="90">หน่วย</th>
                                  <th width="40"></th>
                                </tr>
                                </thead>
                                <tbody>
                           		{drows}  		                              
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
                <a  className="btn btn-flat btn-success pull-right mgr-10" 
                  onClick={this.handleSaveData.bind(this)}  > <i className="fa fa-save mgr-10"></i>  บันทึกข้อมูล   </a>  
               
                  <a  className="btn btn-flat btn-danger pull-right mgr-10" 
                    onClick={this.handleDeletData.bind(this)} > <i className="fa fa-trash mgr-10"></i>  ลบข้อมูล   </a>
                                       
              </div>
            </div>
        </div>


        {
        loading ?
          <div className="overlay">
            <i className="fa fa-refresh fa-spin"></i>
          </div>
        : null
        } 


    </div>
    );
  }
}

