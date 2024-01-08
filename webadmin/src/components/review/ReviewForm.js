import React, {Component} from 'react';
import uuid from 'uuid';
import moment from 'moment';
import UploadImages from '../common/UploadImages';
import { Editor } from "react-draft-wysiwyg";
import {EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name'];

import * as config from '../../config';
const imgURL = `${config.init.web_url}/images/reviews/`;

const initialState = {
  id: '', title: '', mode:'',  shot_detail: '', detail: '', status: 'Y', img: 'NO', dat: '', img_list: '',
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
  editorState: EditorState.createEmpty(),
};


export default class ReviewForm extends Component {

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
       id: item.id, mode:item.mode, dat: item.dat, title: item.title, shot_detail: item.shot_detail, 
       detail: item.detail, status: item.status, img: item.img, uploadedFile: img_data,
       editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(item.detail)
          )
        ),

     });
   	} else {
      let item = this.state;
      setBtnStatus(item.status,'status');
      this.setState({ dat : moment(), id: uuid.v1() });

   }

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
    this.setState({img: img, status: status }, () => {    
      let item = this.state
      let data = {
        id: item.id,
        mode:item.mode,
        title: item.title,
        shot_detail: item.shot_detail,
        detail: item.detail,
        dat: item.dat,
        img: item.img,
        img_list: '',
        status: item.status,        
        uploadedFile: item.uploadedFile
      }  
      this.props.onSave(data);
    });
  }

  handleTypChange (e) {
    e.preventDefault();
  
      let idx = this.state.menu.findIndex((x) => x.mode === this.refs.mode.value);
      this.setState({mode: this.refs.mode.value});     
 
  }

  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }

    onEditorStateChange (editorState) {
    this.setState({  editorState: editorState, detail: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
   // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  render() {
  	const item = this.state;
    const {onReset, loading, isEdit, groupList} = this.props;
    let menu = groupList
    let createTYP = function (item, key) {
      return <option value={item.gid} key={key} >{item.gname}</option>
    } 
    //* **/

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
       				<div className="col-sm-4 ">
	                     <div className="row mgt-20">      
	                        <div className="col-sm-8 col-sm-offset-2">

	                          <UploadImages
	                            imgURL={imgURL}
	                            isEdit={this.props.isEdit}
	                            data={this.state.uploadedFile}
	                            onImgChage={this.handleImageChange.bind(this)} />
	                        </div>

	                      </div>
       				</div>
                    <div className="col-sm-6 ">
 
                    <form className="form-horizontal">
       
                      <div className="form-group mgt-20">          
                        <label  className="col-sm-3 control-label" >หัวเรื่อง <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='title' value={item.title} onChange={(e) => this.setState({title: e.target.value})}  />
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
                        <label  className="col-sm-3 control-label" >ข้อความตัวอย่าง </label>
                        <div className="col-sm-9">
                          <textarea className="form-control" name="shot_detail" ref='shot_detail'  rows="6" 
                            value={item.shot_detail}
                            onChange={(e) => this.setState({shot_detail: e.target.value})} />
                        </div>  
                      </div>              

                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >รายละเอียด </label>
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
                {
                  isEdit ?
                    <a  className="btn btn-flat btn-danger pull-right mgr-10" 
                      onClick={this.handleDeletData.bind(this)} > <i className="fa fa-trash mgr-10"></i>  ลบข้อมูล   </a>
                  :

                  null

                  
                }   

                  <a  className="btn btn-flat btn-success pull-right mgr-10" 
                    onClick={this.handleSaveData.bind(this)}  > <i className="fa fa-save mgr-10"></i>  บันทึกข้อมูล   </a> 



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

