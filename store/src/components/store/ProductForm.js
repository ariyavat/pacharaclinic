import React, {Component} from 'react';
import UploadImages from '../common/UploadImages';

import * as config from '../../config';
const imgURL = `${config.init.url}/images/products/`;

const initialState = {
  id: '', name: '', typ: '', unit: '', total: 0, status: 'Y', img: 'NO', size: '', size_unit: '', stotal: 0,
  gList: [{typ: 'C', name: 'ครีม'},{typ: 'P', name: 'แพ็คเก็จ'},{typ: 'S', name: 'สติ๊กเกอร์'},{typ: 'B', name: 'กล่องบรรจุ'}],
  uploadedFile: {
    file: null, imagePreviewUrl: null, img: null, oimg: null, edit_img: 'N',
  },
};


export default class ProductForm extends Component {

  constructor(props) {
    super(props);   
    this.state = initialState;
  }

  componentDidMount () {
    const _this = this
    console.log(this.props)
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
       id: item.id, name: item.name, typ: item.typ, size: item.size, size_unit: item.size_unit, stotal: item.stotal,
       unit: item.unit, total: item.total, status: item.status,img: item.img, uploadedFile: img_data,
     });
   	} else {
      let item = this.state;
      setBtnStatus(item.status,'status');    
   }

    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }

  }

  handleKeyPress(e, field) { 
    if (e.keyCode === 13) {
        e.preventDefault()
        //if(field.name!=='none'){    
          //this.refs[field.name].focus() 
        //}                 
    }
  }

  handleDGchange (e) {
    e.preventDefault()
    let idx = this.state.gList.findIndex((x) => x.id === this.refs.dg.value);
    this.setState({typ: this.refs.dg.value});
  }

  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();
    let img = this.state.uploadedFile.img;  
    let status = this.refs.status.value;
    this.setState({img: img, status: status}, () => {     

    if (this.state.id !== '') {
      if (this.state.typ !== '') {
      if (this.state.name !== '') {
        this.props.onSave(this.state);
      } else {
        show_err('warning','ไม่ได้กรอกชื่อ') 
      }
    } else {  show_err('warning','ไม่ได้กรอกประเภท')  }
    } else { show_err('warning','ไม่ได้กรอกรหัส') }


      
    });
  }

  handleBtnClick(e){
    const title = e.target.title
    const name = e.target.name
    setBtnStatus(title,name)
  }

  handleImageChange (file, e) {
    this.setState({uploadedFile: file});
  }


  render() {
  	const item = this.state;
    const {onReset, loading} = this.props;

    let createDG = function (item, key) {
      return <option value={item.typ} key={key} >{item.name}</option>
    } 

    return (

    <div className="box box-info affix" > 

        <div className="atop">
          <div className="row">
            <div className="col-xs-5 col-sm-7">
              <h3 className="modal-title"><i className="fa fa-file-text-o mgr-10"></i> {this.props.isEdit ? "แก้ไขข้อมูลวัตถุดิบ" : "เพิ่มรายการวัตถุดิบใหม่" } </h3>
            </div>
            <div className="col-xs-7 col-sm-5">       
                <a onClick={onReset}><i className="fa fa-close pull-right aclose"></i> </a>               
            </div>
          </div>
        </div> 
        <div className="scroll-area">     
          <div className="abody h100">        
    
                  <div className="row mgt-20">
                    <div className="col-sm-2 col-sm-offset-1">

                      <UploadImages
                        imgURL={imgURL}
                        isEdit={this.props.isEdit}
                        data={this.state.uploadedFile}
                        onImgChage={this.handleImageChange.bind(this)} />


                    </div>
                    <div className="col-sm-7 col-sm-offset-1">
                    <form className="form-horizontal">
                      <div className="form-group">
                        <label  className="col-sm-3 control-label" >รหัส <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input 
                            type="text"  className="form-control" name="id" ref='id'  autoComplete="off"
                            value={item.id}
                            disabled={this.props.isEdit}
                            onChange={(e) => this.setState({id: e.target.value})} />
                        </div> 
                        <label  className="col-sm-3 control-label" >ประเภท <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <select className="form-control" id="dg"  ref="dg" value={item.typ}  disabled={this.props.isEdit}
                            onChange={this.handleDGchange.bind(this)}> 
                            <option value="-"></option>                        
                            {this.state.gList.map(createDG)}     
                          </select>                       
                        </div> 
                      </div>

          

                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ชื่อวัตถุดิบ <span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" name="fname" ref='fname'  autoComplete="off"
                            value={item.name}
                            onChange={(e) => this.setState({name: e.target.value})} />
                        </div>  
                      </div>                  
      
                      <div className="form-group">  
                        <label  className="col-sm-3 control-label" >หน่วย <span className="text-red">*</span></label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="unit" ref='unit' autoComplete="off"
                            value={item.unit}
                            onChange={(e) => this.setState({unit: e.target.value})} />
                        </div>               
                      </div>
                      <div className="form-group">  
                        <label  className="col-sm-3 control-label" >จุดสั่งซื้อ </label>
                        <div className="col-sm-3">
                          <input type="text"  className="form-control" name="stotal" ref='stotal' autoComplete="off"
                            value={item.stotal}
                            onChange={(e) => this.setState({stotal: e.target.value})} />
                        </div>               
                      </div>

                      {
                        item.typ === 'P' ?
                        <div className="form-group">  
                          <label  className="col-sm-3 control-label" >ขนาด/ปริมาณ </label>
                          <div className="col-sm-3">
                            <input type="text"  className="form-control" name="psize" ref='psize' autoComplete="off"
                              value={item.size}
                              onChange={(e) => this.setState({size: e.target.value})} />
                          </div>
                          <label  className="col-sm-3 control-label" >หน่วยขนาด </label>
                          <div className="col-sm-3">
                            <input type="text"  className="form-control" name="usize" ref='usize'   autoComplete="off"
                              value={item.size_unit}
                              onChange={(e) => this.setState({size_unit: e.target.value})} />
                          </div>
                        </div>
                        : null
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
}

