import React, {Component} from 'react';
import uuid from 'uuid';
import moment from 'moment';
import UploadImages from '../common/UploadImages';

import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name'];

import * as config from '../../config';
//const imgURL = `${config.init.url}/images/contacts/`;
const imgURL = `${config.init.web_url}images/contacts/`;

const initialState = {
  id: null, name: '',  map:'NO', img: 'NO', address: '', tel: '', img_line: 'NO', img_fb: 'NO',
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
  uploadedMap: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
  uploadedLine: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },

  uploadedFb: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
};


export default class ContactForm extends Component {

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
     console.log(item)
     let img_data = {
       imagePreviewUrl: imgURL + item.img,
       oimg: item.img,
       img: item.img,
       file: null,
       edit_img: 'N',
     };

     let map_data = {
       imagePreviewUrl: imgURL + item.map,
       oimg: item.map,
       img: item.map,
       file: null,
       edit_img: 'N',
     };

     let line_data = {
       imagePreviewUrl: imgURL + item.img_line,
       oimg: item.img_line,
       img: item.img_line,
       file: null,
       edit_img: 'N',
     };


     let fb_data = {
       imagePreviewUrl: imgURL + item.img_fb,
       oimg: item.img_fb,
       img: item.img_fb,
       file: null,
       edit_img: 'N',
     };

    
     this.setState({
       id: item.id, name: item.name, address: item.address, tel: item.tel, 
       img: item.img, map: item.map, img_line: item.img_line, img_fb: item.img_fb,
       uploadedFile: img_data, uploadedMap: map_data, 
       uploadedLine: line_data, uploadedFb: fb_data, 

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


  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();
    const item = this.state
    if(item.name !== ''){
    if(item.tel !== ''){
    if(item.address !== ''){  
      let con = 'Y'  
     // console.log(item.uploadedFile.file,this.props.isEdit)
    	if (item.uploadedFile.file === null && !this.props.isEdit) { show_err('warning','ไม่ได้เลือกรูปแผนที่'); con = 'N'  }
      if(con === 'Y'){
        if (item.uploadedMap.file === null && !this.props.isEdit ) {  show_err('warning','ไม่ได้เลือกรูปคลินิก'); con = 'N'  }
      }
      if(con === 'Y'){
        if (item.uploadedLine.file === null && !this.props.isEdit ) {  show_err('warning','ไม่ได้เลือกรูป QR CODE LINE'); con = 'N'  }
      }
      if(con === 'Y'){
        if (item.uploadedFb.file === null && !this.props.isEdit ) {  show_err('warning','ไม่ได้เลือกรูป QR CODE FACEBOOK'); con = 'N'  }
      }



      if(con === 'Y'){

          let img = item.uploadedFile.img;
          let map = item.uploadedMap.img;
          let img_line = item.uploadedLine.img;
          let img_fb = item.uploadedFb.img;
          
          let data = {
              id: item.id,
              name: item.name,
              address: item.address,
              map: map,
              img: img, 
              img_line: img_line, 
              img_fb: img_fb, 
              tel: item.tel,        
              uploadedFile: item.uploadedFile,
              uploadedMap: item.uploadedMap,
              uploadedLine: item.uploadedLine,
              uploadedFb: item.uploadedFb
          }  

          this.props.onSave(data);

      }



    } else {  show_err('warning','ไม่ได้กรอก ที่อยู่');  }
    } else {  show_err('warning','ไม่ได้กรอก เบอร์โทร');  }
    } else {  show_err('warning','ไม่ได้กรอก ชื่อสาขา');  }



 
  }


  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }

  handleMapChange (file, e) {
    this.setState({uploadedMap: file});
  }

  handleLineChange (file, e) {
    this.setState({uploadedLine: file});
  }

  handleFbChange (file, e) {
    this.setState({uploadedFb: file});
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
       				     <h3>แผนที่</h3>
	                     <div className="row mgt-20">      
	                        <div className="col-sm-8 col-sm-offset-2">

	                          <UploadImages
	                            imgURL={imgURL}
	                            isEdit={this.props.isEdit}
	                            data={this.state.uploadedMap}
	                            onImgChage={this.handleMapChange.bind(this)} />
	                        </div>

	                      </div>

       				     <h3>รูปคลินิก</h3>
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
                        <label  className="col-sm-3 control-label" >ชื่อสาขา <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='title' value={item.name} onChange={(e) => this.setState({name: e.target.value})}  />
                        </div>  
                      </div> 
                      <div className="form-group mgt-20">          
                        <label  className="col-sm-3 control-label" >เบอร์โทร <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='tel' value={item.tel} onChange={(e) => this.setState({tel: e.target.value})}  />
                        </div>  
                      </div> 
                
                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ที่อยู่ <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <textarea className="form-control" name="address" ref='address'  rows="6" 
                            value={item.address}
                            onChange={(e) => this.setState({address: e.target.value})} />
                        </div>  
                      </div>  

                      <div className="row mgt-20">
                        <div className="col-sm-6 "> 

                            <h3>QR LINE</h3>
                            <div className="row mgt-20">      
                              <div className="col-sm-8 col-sm-offset-2">

                                <UploadImages
                                  imgURL={imgURL}
                                  isEdit={this.props.isEdit}
                                  data={this.state.uploadedLine}
                                  onImgChage={this.handleLineChange.bind(this)} />
                              </div>
                            </div>


                        </div>
                        <div className="col-sm-6 "> 

                            <h3>QR FACEBOOK</h3>
                            <div className="row mgt-20">      
                              <div className="col-sm-8 col-sm-offset-2">

                                <UploadImages
                                  imgURL={imgURL}
                                  isEdit={this.props.isEdit}
                                  data={this.state.uploadedFb}
                                  onImgChage={this.handleFbChange.bind(this)} />
                              </div>
                            </div>


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

