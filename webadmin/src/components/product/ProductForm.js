import React, {Component} from 'react';
import UploadImages from '../common/UploadImages';
import { Editor } from "react-draft-wysiwyg";
import {EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name'];

import * as config from '../../config';
const imgURL = `${config.init.web_url}/images/products/`;

const initialState = {
  id: '', typ: 'product', product_name: '', mode: '1', state: 'N',
  unit: '', price: 0, status: 'Y', productList : [], searchTerm: '', img: 'NO', con: '', send: '', detail: '', title: '',  wg: 0,
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
  editorState: EditorState.createEmpty(),
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


export default class ProductForm extends Component {

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
     setBtnStatus(item.status,'status');
     setBtnStatus(item.state,'state');
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
    
     this.setState({
       id: item.id, mode: item.mode, typ: item.typ, product_name: item.product_name, state: item.state,
       unit: item.unit, price: item.price, status: item.status, wg: item.wg,
       title: item.title, con: item.con, send: item.send, detail: item.detail,
       img: item.img, uploadedFile: img_data,
       editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(item.detail)
        )
      ),



     });
   	} else {
      let item = this.state;
      setBtnStatus(item.status,'status');
      setBtnStatus(item.state,'state');
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
    let img = this.state.uploadedFile.img;
    let status = this.refs.status.value;
    let state = this.refs.state.value;
    this.setState({img: img, status: status }, () => {    
      let item = this.state
      let data = {
        id: item.id,
        typ: item.typ,
        mode: item.mode,
        product_name: item.product_name,
        price: item.price,
        unit: item.unit,
        img: item.img,
        status: item.status,
        state: state,
        title: item.title,
        wg: item.wg,
        con: item.con,
        send: item.send,
        detail: item.detail,
        uploadedFile: item.uploadedFile
      }
      

      this.props.onSave(data);
    });
  }


  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }

  handleSelectItem(data){
    this.setState({  id: data.id, product_name: data.name, unit: data.unit, price: data.price  })
  }


  handleTypChange (e) {
    e.preventDefault();
  
      let idx = this.state.menu.findIndex((x) => x.mode === this.refs.mode.value);
      this.setState({mode: this.refs.mode.value});     
 
  }

  onEditorStateChange (editorState) {
    this.setState({  editorState: editorState, detail: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
   // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  render() {
  	const item = this.state;
    const {onReset, loading, mode, groupList} = this.props;
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

    let createTYP = function (item, key) {
      return <option value={item.gid} key={key} >{item.gname}</option>
    } 

    let menu = groupList
    //if(mode === 'T'){  menu = groupList; }
    //if(mode === 'L'){  menu = item.menuL; }
    if(mode === 'M'){  menu = item.menuM; }


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
                    <div className={cls} >
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
                            value={item.id} />
                        </div>  
                        <label  className="col-sm-3 control-label" >HOT </label>
                        <div className="col-sm-3">
                            <div className="input-group">
                              <div className="radioBtn btn-group">
                                <a className="btn btn-primary btn-sm active" name="state" title="H"
                                onClick={this.handleBtnClick.bind(this)} >YES</a>
                                <a className="btn btn-primary btn-sm notActive" name="state" title="N"
                                onClick={this.handleBtnClick.bind(this)} >NO</a>
                              </div>
                              <input type="hidden" id="state" ref="state"  value={item.state}/>
                            </div>                    
                        </div>



                      </div>
           
                      <div className="form-group">              
                        <label  className="col-sm-3 control-label" >กลุ่ม <span className="text-red">*</span></label>
                        <div className="col-sm-9"> 
                            <select className="form-control" id="mode"  ref="mode" value={item.mode} onChange={this.handleTypChange.bind(this)}>                                                      
                                {menu.map(createTYP)}     
                            </select>   
                        </div> 
                      </div>


                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ชื่อรายการ <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='product_name' 
                            value={item.product_name}                          
                            onChange={(e) => this.setState({product_name: e.target.value})} />
                        </div>  
                      </div>                  
                      <div className="form-group">  
                
                        <label  className="col-sm-3 control-label" >ราคาขาย <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="minqty" ref='price'  
                            value={item.price}
                            onChange={(e) => this.setState({price: e.target.value})} />
                        </div>  
                        <label  className="col-sm-3 control-label" >หน่วย <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="bprice" ref='unit' value={item.unit} />
                        </div>                                                                  
                      </div>  
                      {
                        mode === 'P' ?
                        <div className="form-group"> 
                          <label  className="col-sm-3 control-label" >น้ำหนัก / กรัม</label>
                          <div className="col-sm-3">
                            <input type="text"  className="form-control" name="status" ref='wg' 
                              value={item.wg} onChange={(e) => this.setState({wg: e.target.value})} />       
                          </div>
                        </div>
                        :null
                      }


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
                          <Editor
                            editorState={item.editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange.bind(this)}
                          />



                        </div>  
                      </div>  
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>


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

