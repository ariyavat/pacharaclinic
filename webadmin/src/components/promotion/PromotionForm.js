import React, {Component} from 'react';
import UploadImages from '../common/UploadImages';
import { Editor } from "react-draft-wysiwyg";
import {EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name'];

import * as config from '../../config';
//const imgURL = `${config.init.url}/images/promotions/`;
const imgURL = `${config.init.web_url}images/promotions/`;

const initialState = {
  id: '', promotion_name: '',  typ: 'P', unit: '', price_total: 0, productList : [], searchTerm: '', img: 'NO',
   con: '', detail: '', title: '', discount: '', price_sale: '',  status: 'Y', start_date: '', end_date: '',
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
  editorState: EditorState.createEmpty(),
};


export default class PromotionForm extends Component {

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
    $('#start_date').datepicker({ autoclose: true })
    $('#end_date').datepicker({ autoclose: true })


   	if (this.props.isEdit === true) {    
     let item = this.props.data;
     setBtnStatus(item.status,'status');
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
     let edate = ''
    if(item.start_date !== null && item.start_date !== '0000-00-00'){
      let txt = item.start_date.split('-') ;
      sdate = txt[2]+'/'+txt[1]+'/'+txt[0]; 
      this.refs.start_date.value = sdate; 
    }
    if(item.end_date !== null && item.end_date !== '0000-00-00'){        
      let txt = item.end_date.split('-') ;
      edate = txt[2]+'/'+txt[1]+'/'+txt[0];         
      this.refs.end_date.value = edate;          
    }
    
     this.setState({
       id: item.id, typ: item.typ, promotion_name: item.promotion_name, 
       unit: item.unit, price_total: item.price_total, price_sale: item.price_sale, status: item.status,
       title: item.title, con: item.con, detail: item.detail, discount: item.discount, 
       img: item.img, uploadedFile: img_data, start_date: item.start_date, end_date: item.end_date, 

       editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(item.detail)
        )
      ),


     });
   	} else {
      let item = this.state;
      setBtnStatus(item.status,'status');

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

  handleBtnClick(e){
    const title = e.target.title
    const name = e.target.name
    setBtnStatus(title,name)
  }


  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();
    let item = this.state
    let status = this.refs.status.value
    let sdate = ''; let edate = '';
    if(item.id !== ''){
    if(item.price_total !== ''){
    if(item.discount !== ''){
    if(this.refs.start_date.value!=='' || this.refs.start_date.value!=='00/00/0000'){
    if(this.refs.end_date.value!=='' || this.refs.end_date.value!=='00/00/0000'){
        let date = this.refs.start_date.value ;
        let txt = date.split('/') ;
        sdate = txt[2]+'-'+txt[1]+'-'+txt[0] ;      
        let date1 = this.refs.end_date.value ;
        let txt1 = date1.split('/'); 
        edate = txt1[2]+'-'+txt1[1]+'-'+txt1[0] ;

        let img = this.state.uploadedFile.img;
        this.setState({img: img, status: status }, () => {    
          
          let data = {
            id: item.id,
            typ: item.typ,
            promotion_name: item.promotion_name,
            price_total: item.price_total,
            price_sale: item.price_sale,
            discount: item.discount,
            unit: item.unit,
            img: item.img,
            status: item.status,
            title: item.title,
            start_date: sdate,
            end_date: edate,
            con: item.con,        
            detail: item.detail,
            uploadedFile: item.uploadedFile
          } 
          this.props.onSave(data);
        });



    } else { con = 'N'; show_err('warning','ยังไม่ได้กรอกวันที่สิ้นสุด'); }
    } else { con = 'N'; show_err('warning','ยังไม่ได้กรอกวันที่เริ่มต้น'); }
    } else { show_err('warning','ยังไม่ได้ % ส่วนลด')   }
    } else { show_err('warning','ยังไม่ได้กรอกราคาปกติ')   }
    } else { show_err('warning','ยังไม่ได้เลือกโปรโมชั่น')   }  

  }


  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }

  handleSelectItem(data){  
    this.setState({  id: data.id, promotion_name: data.name, unit: data.unit, price_sale: data.price  })
  }

  onEditorStateChange (editorState) {
    this.setState({  editorState: editorState, detail: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
   // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }



  render() {
  	const item = this.state;
    const {onReset, loading} = this.props;
    const filteredData = item.productList.filter(createFilter(item.searchTerm, KEYS_TO_FILTERS)); 


    const rows = filteredData.map((row, i) => {
      return (
        <tr key={i} className="alink" onClick={this.handleSelectItem.bind(this,row)}>            
          <td >{row.id}</td>   
          <td >{row.name}</td>   
          <td >{row.price}</td> 
          <td >{row.unit}</td> 
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
                    <div className="col-sm-6 ">
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
                            type="text"  className="form-control" name="barcode" ref='id' 
                            value={item.id}
                            disabled={this.props.isEdit || this.props.autonumber === 'Y'}
                            onChange={(e) => this.setState({id: e.target.value})} />
                        </div> 
                      </div>
                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ชื่อรายการ <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='promotion_name' value={item.promotion_name}  onChange={(e) => this.setState({promotion_name: e.target.value})}  />
                        </div>  
                      </div>   
                      <div className="form-group"> 
                        <label  className="col-sm-3 control-label" >ราคาขาย <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="price_total" ref='price_sale'  
                            value={item.price_sale}
                            onChange={(e) => this.setState({price_sale: e.target.value})} />
                        </div>
                        <label  className="col-sm-3 control-label" >ราคาปกติ <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="discount" ref='price_total'  
                            value={item.price_total}
                            onChange={(e) => this.setState({price_total: e.target.value})} />
                        </div>

                      </div>               
                      <div className="form-group">  
                        <label  className="col-sm-3 control-label" >ส่วนลด (%) <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="unit" ref='discount'  
                            value={item.discount}
                            onChange={(e) => this.setState({discount: e.target.value})} />
                        </div>                
  
                        <label  className="col-sm-3 control-label" >หน่วย <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="bprice" ref='unit' value={item.unit} />
                        </div>                                                                  
                      </div> 
                      <div className="form-group">          
                          <label  className="col-sm-3 control-label" >วันที่เริ่มต้น </label>
                          <div className="col-sm-3">
                            <input type="text"  className="form-control" name="none" id="start_date" ref='start_date' autoComplete="off" />
                          </div> 
                          <label  className="col-sm-3 control-label" >วันที่สิ้นสุด </label>
                          <div className="col-sm-3">
                            <input type="text"  className="form-control" name="none" id="end_date" ref='end_date' autoComplete="off"  />
                          </div>
                      </div>




                      <div className="form-group"> 
                        <label  className="col-sm-3 control-label" >สถานะ </label>
                        <div className="col-sm-3">
                            <div className="input-group">
                              <div className="radioBtn btn-group">
                                <a className="btn btn-primary btn-sm active" name="status" title="Y"
                                onClick={this.handleBtnClick.bind(this)} >YES</a>
                                <a className="btn btn-primary btn-sm notActive" name="status" title="N"
                                onClick={this.handleBtnClick.bind(this)} >NO</a>
                              </div>
                              <input type="hidden" id="status" ref="status"  value={item.status}/>
                            </div>                    
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
                        <label  className="col-sm-3 control-label" >รายละเอียดสินค้า <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                       
                        <Editor
                          editorState={item.editorState}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={this.onEditorStateChange.bind(this)}
                        />


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

