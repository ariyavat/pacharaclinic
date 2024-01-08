import React, {Component} from 'react';
import uuid from 'uuid';
import moment from 'moment';
import UploadImages from '../common/UploadImages';

import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name'];

import * as config from '../../config';
const imgURL = `${config.init.web_url}/images/pgroup/`;

const initialState = {
  gid: null, mode: '',  gname: '', img:'',
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },

};


export default class GroupForm extends Component {

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
     let item = this.props.data
     console.log(item)

     let img = null;
     if (item.img !== 'NO') {
       img = item.img;
     }
    
     let img_data = {
       imagePreviewUrl: imgURL + img,
       oimg: img,
       img: img,
       file: null,
       edit_img: 'N',
     };

     console.log(img, img_data)

    
     this.setState({
       gid: item.gid, mode: item.mode, gname: item.gname, uploadedFile: img_data,
     });
   	} else {   
      this.setState({ gid: null, mode: this.props.mode,  gname: '',  });

   }

    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }    
  }




  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();    
    let img = this.state.uploadedFile.img;
      let item = this.state
      let data = {
        gid: item.gid,
        mode: item.mode,
        gname: item.gname,
        img: img,
        uploadedFile: item.uploadedFile
      }  
      this.props.onSave(data);
   
  }


  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }



  render() {
  	const item = this.state;
    const {onReset, loading, isEdit} = this.props;


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
	      

	                      </div>
       				</div>
                    <div className="col-sm-6 ">
 
                    <form className="form-horizontal">
       
                      <div className="form-group mgt-20">          
                        <label  className="col-sm-3 control-label" >ชื่อกลุ่ม <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" ref='gname' value={item.gname} onChange={(e) => this.setState({gname: e.target.value})}  />
                        </div>  
                      </div>   







                    </form>
                    </div>
                    {
                      item.mode === 'T' ?
                       <div className="row mgt-20">      
                          <div className="col-sm-6 col-sm-offset-4">

                            <UploadImages
                              imgURL={imgURL}
                              isEdit={this.props.isEdit}
                              data={this.state.uploadedFile}
                              onImgChage={this.handleImageChange.bind(this)} />
                          </div>

                        </div>

                      : null
                    }




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
                  isEdit && item.mode !== 'T' ?
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

