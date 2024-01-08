import React, {Component} from 'react';
import uuid from 'uuid';
import moment from 'moment';
import UploadImages from '../common/UploadImages';

import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['id', 'name'];

import * as config from '../../config';
//const imgURL = `${config.init.url}/images/vdo/`;

const imgURL = `${config.init.web_url}API/images/reviews/`;

const initialState = {
  id: '', name: '',  typ: 'Y',  dat: '', img: '', title: '', detail: '',
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
};


export default class VdoForm extends Component {

  constructor(props) {
    super(props);   
    this.state = initialState;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps) {
    //this.setState({productList: nextProps.productList});
  }

  componentDidMount () {
    const _this = this
   	if (this.props.isEdit === true) {    
     let item = this.props.data;



     setBtnStatus(item.typ,'typ');
     let img = null;
     //if(item.typ === 'N'){	
	    img = item.name;
	   
	    let img_data = {
	       imagePreviewUrl: imgURL + img,
	       oimg: img,
	       img: img,
	       file: null,
	       edit_img: 'N',
	     };
	     this.setState({
	       uploadedFile: img_data,
	     });


     //}

    
     this.setState({
       id: item.id, dat: item.dat, name: item.name, typ: item.typ, img: item.name,
     });
   	} else {
      let item = this.state;
      setBtnStatus(item.typ,'typ');
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
    this.setState({ typ: title })

  }


  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();
    let img = this.state.uploadedFile.img;

    
    //let status = this.refs.status.value;
    this.setState({img: img }, () => {    
      let item = this.state
      let data = {
        id: item.id,
        name: item.name,
        typ: item.typ,
        dat: item.dat,
        img: item.img,
        title: item.title,
        detail: item.detail,
        uploadedFile: item.uploadedFile
      }  
      this.props.onSave(data);
    });
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
      
                    <div className="col-sm-6  col-sm-offset-3">
 
                    <form className="form-horizontal">

                      <div className="form-group"> 
                        <label  className="col-sm-3 control-label" >ประเภท </label>
                        <div className="col-sm-3">
                            <div className="input-group">
                              <div className="radioBtn btn-group">
                                <a className="btn btn-primary btn-sm active" name="typ" title="Y"
                                onClick={this.handleBtnClick.bind(this)} >VDO</a>
                                <a className="btn btn-primary btn-sm notActive" name="typ" title="N"
                                onClick={this.handleBtnClick.bind(this)} >IMAGE</a>
                              </div>
                              <input type="hidden" id="typ" ref="typ"  value={item.typ}/>
                            </div>                    
                        </div>
                      </div>   
  
	                     <div className="row mgt-20">      
	                        <div className="col-sm-8 col-sm-offset-2">

	                          <UploadImages
	                            imgURL={imgURL}
	                            isEdit={this.props.isEdit}
	                            data={this.state.uploadedFile}
	                            onImgChage={this.handleImageChange.bind(this)} />
	                        </div>
	                      </div>
                       <div className="row mgt-20">      
                          <div className="col-sm-8 col-sm-offset-2">
                            <form className="form-horizontal">


                              <div className="form-group mgt-20">
                                <label  className="col-sm-3 control-label" >Title <span className="text-red">*</span></label>
                                <div className="col-sm-9"> 
                                  <input 
                                    type="text"  className="form-control" name="title" ref='title' 
                                    value={item.title}
                                    onChange={(e) => this.setState({title: e.target.value})} />
                                </div> 
                              </div>

                            <div className="form-group">          
                              <label  className="col-sm-3 control-label" >รายละเอียด <span className="text-red">*</span></label>
                              <div className="col-sm-9">
                                <textarea className="form-control" name="detail" ref='detail'  rows="10" 
                                  value={item.detail}
                                  onChange={(e) => this.setState({detail: e.target.value})} />
                              </div>  
                            </div> 




                            </form>
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
	                <a  className="btn btn-flat btn-success pull-right mgr-10" 
	                  onClick={this.handleSaveData.bind(this)}  > <i className="fa fa-save mgr-10"></i>  บันทึกข้อมูล   </a> 

              	}                                       
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

