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
//const imgURL = `${config.init.url}/images/contacts/`;
const imgURL = `${config.init.web_url}images/abouts/`;

const initialState = {
  id: null, dname: '',   img: 'NO', sname: '', detail: '', 
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
  editorState: EditorState.createEmpty(),
 
};


export default class AboutForm extends Component {

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
   
     let img_data = {
       imagePreviewUrl: imgURL + item.img,
       oimg: item.img,
       img: item.img,
       file: null,
       edit_img: 'N',
     };
    
     this.setState({
       id: item.id, dname: item.dname, sname: item.sname, detail: item.detail, 
       img: item.img, uploadedFile: img_data,
       editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(item.detail)
        )
      ),

     });
   	} else {     
      this.setState({ id: null });
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

  onEditorStateChange (editorState) {
    this.setState({  editorState: editorState, detail: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
   // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }


  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();
    const item = this.state
    if(item.dname !== ''){
      let con = 'Y'  
     // console.log(item.uploadedFile.file,this.props.isEdit)
      if (item.uploadedFile.file === null && !this.props.isEdit) { show_err('warning','ไม่ได้เลือกรูปแพทย์'); con = 'N'  }



      if(con === 'Y'){

          let img = item.uploadedFile.img;
          let data = {
              id: item.id,
              dname: item.dname,
              sname: item.sname,
           	  detail: item.detail,
              img: img,         
              uploadedFile: item.uploadedFile,
            
          }  
          this.props.onSave(data);

      }



    } else {  show_err('warning','ไม่ได้กรอก ชื่อแพทย์');  }



 
  }


  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }




  render() {
  	const item = this.state;
    const {onReset, loading} = this.props;


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
       				     <h3>รูปแพทย์</h3>
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
                        <label  className="col-sm-3 control-label" >ชื่อแพทย์ <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='dname' value={item.dname} onChange={(e) => this.setState({dname: e.target.value})}  />
                        </div>  
                      </div> 
                      <div className="form-group mgt-20">          
                        <label  className="col-sm-3 control-label" >รายละเอียด <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='sname' value={item.sname} onChange={(e) => this.setState({sname: e.target.value})}  />
                        </div>  
                      </div> 
                
                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ประวัติแพทย์ <span className="text-red">*</span></label>
                        <div className="col-sm-9">
							<Editor
                            editorState={item.editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange.bind(this)}
                         		 />

                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>

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

