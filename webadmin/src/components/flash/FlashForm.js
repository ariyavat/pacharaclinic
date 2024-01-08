import React, {Component} from 'react';
import UploadImages from '../common/UploadImages';

import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name'];

import * as config from '../../config';
const imgURL = `${config.init.url}/images/flash/`;

const initialState = {
  id: null, dat: '',  typ: '',pid: '', pname: '', unit: '', price_sale: 0, price_total: 0, discount: 0,  productList : [], 
  dat: '', start_time: '', end_time: '', img: 'NO', con: '', send: '', detail: '', title: '', 
  searchTerm: '', 
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
  
};


export default class FlashForm extends Component {

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
  	$('#dat').datepicker({ autoclose: true })
    const _this = this
   	if (this.props.isEdit === true) {    

		let item = this.props.data;   
		let img = null;
		if (item.img !== null && item.img !== 'NO') {
			img = item.img;
		}
		let img_data = {
			imagePreviewUrl: imgURL + img,
			oimg: img,
			img: img,
			file: null,
			edit_img: 'N',
		};

		let sdate = ''
	
		if(item.dat !== null && item.dat !== '0000-00-00'){
			let txt = item.dat.split('-') ;
			sdate = txt[2]+'/'+txt[1]+'/'+txt[0]; 
			this.refs.dat.value = sdate; 
		}


		this.setState({
			id: item.id, dat: item.dat, typ: item.typ, pid: item.pid, pname: item.pname, 
			unit: item.unit, price_sale: item.price_sale, price_total: item.price_total,
			discount: item.discount, start_time: item.start_time, end_time: item.end_time,
			title: item.title, con: item.con, send: item.send, detail: item.detail,
			img: item.img, uploadedFile: img_data,
		});

   	} 

    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }

    this.setState({productList: this.props.productList});
    
  }

  handleKeyPress(e, field) { 
    if (e.keyCode === 13) {
        e.preventDefault()
        if(field.name!=='none'){    
          this.refs[field.name].focus() 
        }                 
    }
  }


  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();
    const item = this.state
    if(item.pid !== ''){
    if(item.price_sale !== ''){
    if(item.price_total !== ''){
    if(item.discount !== ''){
    if(this.refs.dat.value!=='' || this.refs.dat.value!=='00/00/0000'){
    if(item.start_time !== ''){
    if(item.end_time !== ''){
    	let con = 'Y'
	    if(item.uploadedFile.file === null && !this.props.isEdit) { 	    	
	    	con = 'N'
	    	show_err('warning','ยังไม่ได้เลือกรูป') 
	 	} 

	 	if(con === 'Y'){
	 		let date = this.refs.dat.value ;
	        let txt = date.split('/') ;
	        let dat = txt[2]+'-'+txt[1]+'-'+txt[0] ; 


		    let img = this.state.uploadedFile.img;
		    this.setState({img: img}, () => {   
		      
		      let data = {
		        id: item.id,
		        dat: dat,
		        typ: item.typ,
		        pid: item.pid,
		        pname: item.pname,
		        price_sale: item.price_sale,
		        price_total: item.price_total,
		        discount: item.discount,
		        start_time: item.start_time,
		        end_time: item.end_time,
		        unit: item.unit,
		        img: item.img,
	            title: item.title,          
	            con: item.con,      
	            send: item.send,  
	            detail: item.detail,
		        uploadedFile: item.uploadedFile
		      } 
		      this.props.onSave(data);
		    });
	 	}


    
    } else { show_err('warning','ยังไม่ได้กรอกเวลาสิ้นสุด') }
    } else { show_err('warning','ยังไม่ได้กรอกเวลาเริ่มต้น') }
    } else { show_err('warning','ยังไม่ได้กรอกวันที่') }
    } else { show_err('warning','ยังไม่ได้ % ส่วนลด')   }
    } else { show_err('warning','ยังไม่ได้กรอกราคาปกติ')   }
	} else { show_err('warning','ยังไม่ได้กรอกราคาขาย')   }
    } else { show_err('warning','ยังไม่ได้เลือกสินค้าและบริการ')   }


  }


  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }

  handleSelectItem(data,typ){
  	if(typ==='P'){
  		this.setState({  
  			typ:'P', pid: data.id, pname: data.name, unit: data.unit, price_total: data.price, 
  			price_sale: data.price, discount: data.discount   
  		})	
  	} else {
  		//
  	}
    
  }




  render() {
  	const item = this.state;
    const {onReset, loading} = this.props;
    const filteredData = item.productList.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS)); 


    const rows = filteredData.map((row, i) => {
      return (
        <tr key={i} className="alink" onClick={this.handleSelectItem.bind(this,row,'P')} >            
          <td >{row.id}</td>   
          <td >{row.name}</td>   
          <td >{row.price}</td> 
          <td >{row.unit}</td> 
        </tr>      
      );
    });

    let cls = "col-sm-6 "
    if(this.props.isEdit){
      cls += " col-sm-offset-3"
    }

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
                  	{
                  		!this.props.isEdit ?

	                    <div className="col-sm-5 border-right">               
	                      <div className="row">
	                          <div className="col-sm-7 form-group">                    
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
	                                  <th width="130">ราคาขาย</th>
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

                  		: null
                  	}
                    <div className={cls}>
                      <div className="row mgt-20">      
                        <div className="col-sm-6 col-sm-offset-3">

                          <UploadImages
                            imgURL={imgURL}
                            isEdit={this.props.isEdit}
                            data={this.state.uploadedFile}
                            onImgChage={this.handleImageChange.bind(this)} />
                        </div>

                      </div>
                    <form className="form-horizontal">
                      <div className="form-group mgt-20">
                        <label  className="col-sm-3 control-label" >รหัส <span className="text-red">*</span></label>
                        <div className="col-sm-3"> 
                          <input 
                            type="text"  className="form-control" name="pname" ref='pid' 
                            value={item.pid} />
                        </div>                 
                      </div>
    

                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ชื่อรายการ <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='product_name' 
                            value={item.pname}                          
                            onChange={(e) => this.setState({pname: e.target.value})} />
                        </div>  
                      </div>                  
                      <div className="form-group">  
                
                        <label  className="col-sm-3 control-label" >ราคาขาย <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="price_total" ref='price_sale'  
                            value={item.price_sale}
                            onChange={(e) => this.setState({price_sale: e.target.value})} />
                        </div> 
                        <label  className="col-sm-3 control-label" >ราคารวม <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="discount" ref='price_total'  
                            value={item.price_total}
                            onChange={(e) => this.setState({price_total: e.target.value})} />
                        </div>                                                                                     
                      </div>   
                      <div className="form-group">  
                
                        <label  className="col-sm-3 control-label" >ส่วนลด(%) <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="unit" ref='discount'  
                            value={item.discount}
                            onChange={(e) => this.setState({discount: e.target.value})} />
                        </div>             
                        <label  className="col-sm-3 control-label" >หน่วย <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="title" ref='unit' value={item.unit} />
                        </div>                                                                  
                      </div>  


                      <div className="form-group">          
                          <label  className="col-sm-3 control-label" >วันที่ <span className="text-red">*</span></label>
                          <div className="col-sm-3">
                            <input type="text"  className="form-control" name="none" id="dat" ref='dat' autoComplete="off" />
                          </div>                    
                      </div>


                      <div className="form-group">          
                          <label  className="col-sm-3 control-label" >เวลาเริ่มต้น <span className="text-red">*</span></label>
                          <div className="col-sm-3">
                            <input type="text"  className="form-control" name="none" id="start_time" ref='start_time' autoComplete="off" 
								value={item.start_time}
                            	onChange={(e) => this.setState({start_time: e.target.value})}  />
                          </div>  
                          <label  className="col-sm-3 control-label" >เวลาสิ้นสุด <span className="text-red">*</span></label>
                          <div className="col-sm-3">
                            <input type="text"  className="form-control" name="none" id="end_time" ref='end_time' autoComplete="off" 
								value={item.end_time}
                            	onChange={(e) => this.setState({end_time: e.target.value})}  />
                          </div>  

                      </div>



                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ข้อความตัวอย่าง <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='title' value={item.title} onChange={(e) => this.setState({title: e.target.value})} />
                        </div>  
                      </div>  

                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >เงื่อนไข <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <textarea className="form-control" name="con" ref='con'  rows="6" 
                            value={item.con}
                            onChange={(e) => this.setState({con: e.target.value})} />
                        </div>  
                      </div>  
                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >การจัดส่ง <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <textarea className="form-control" name="send" ref='send'  rows="4" 
                            value={item.send}
                            onChange={(e) => this.setState({send: e.target.value})} />
                        </div>  
                      </div> 

                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >รายละเอียดสินค้า <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <textarea className="form-control" name="detail" ref='detail'  rows="10" 
                            value={item.detail}
                            onChange={(e) => this.setState({detail: e.target.value})} />
                        </div>  
                      </div>  



                    </form>
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
  //






}

