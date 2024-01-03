import React from 'react';
import moment from 'moment';
import ContentHeader from '../../components/common/ContentHeader';
import WherehouseForm from '../../components/setting/WherehouseForm';
import LocationForm from '../../components/setting/LocationForm';

import {getCompany, updateCompany} from '../../utils/CompanyAPI';

const initialState = { 
  name: '', taxno: '', address: '', tel: '', fax: '', company: []
};

export default class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() {
    this.getCompany();
    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) => 
        this.handleKeyPress(e, this.refs[x])
    }


    //console.log(JSON.parse(localStorage.getItem('msClinic')))
   


  }

  handleKeyPress(e, field) { 
    if (e.keyCode === 13) {
        e.preventDefault()
        if(field.name!=='none'){    
          this.refs[field.name].focus() 
        }                 
    }
  }

  handleSaveData(e) {
    e.preventDefault();
    if(this.state.name !== ''){
    if(this.state.address !== ''){
    if(this.state.tel !== ''){
      let data = {
        name: this.state.name, 
        taxno: this.state.taxno, 
        address: this.state.address, 
        tel: this.state.tel, 
        fax: this.state.fax
      }
      this.updateCompany(data);
    } else { show_err('warning','ยังไม่ได้กรอกเบอร์โทร...')   }
    } else { show_err('warning','ยังไม่ได้กรอกที่อยู่...')   }
    } else { show_err('warning','ยังไม่ได้กรอกชื่อบริษัท...')   }
  }

  render() {    
    const item = this.state;

    return (
    <div>
      <ContentHeader title="ตั้งค่าระบบ" small="ข้อมูลบริษัท" />
      <section className="content"> 
      <form className="form-horizontal">
        <div className="box box-info min-600"  >  
          <div className="box-body">           
            <div className="row">
              <div className="col-sm-7 col-sm-offset-1">
                <h3 className="text-info">ข้อมูลบริษัท</h3>

                <div className="form-group mgt-20">            
                  <label  className="col-sm-4" >ชื่อบริษัท <span className="text-red">*</span></label>
                  <div className="col-sm-8">
                    <input type="text"  className="form-control" name="taxno" ref='company_name' 
                      value={item.name}
                      onChange={(e) => this.setState({name: e.target.value})} />
                  </div>
                </div>    
                <div className="form-group">            
                  <label  className="col-sm-4" >เลขประจำตัวผู้เสียภาษี </label>
                  <div className="col-sm-8">
                    <input type="text"  className="form-control" name="address" ref='taxno'  
                      value={item.taxno}
                      onChange={(e) => this.setState({taxno: e.target.value})} />
                  </div>
                </div>  
                <div className="form-group">            
                  <label  className="col-sm-4" >ที่อยู่ <span className="text-red">*</span></label>
                  <div className="col-sm-8">
                    <textarea className="form-control" name="phone" ref='address'  rows="3" 
                      value={item.address}
                      onChange={(e) => this.setState({address: e.target.value})} />
                  </div>
                </div>      
                <div className="form-group">            
                  <label  className="col-sm-4" >เบอร์โทร <span className="text-red">*</span></label>
                  <div className="col-sm-8">
                    <input type="text"  className="form-control" name="fax" ref='phone'  
                      value={item.tel}
                      onChange={(e) => this.setState({tel: e.target.value})} />
                  </div>    
                </div>    
                <div className="form-group">  
                  <label  className="col-sm-4" >Fax </label>
                  <div className="col-sm-8">
                    <input type="text"  className="form-control" name="none" ref='fax'  
                      value={item.fax}
                      onChange={(e) => this.setState({fax: e.target.value})} />
                  </div>
                </div> 
                <div className="row">
                  <div className="col-sm-7 col-sm-offset-4">          
                    <button type="button" className="btn btn-primary mgl-10" onClick={this.handleSaveData.bind(this)} >
                      <i className="fa fa-save"></i> บันทึกข้อมูล
                    </button>   
                  </div>
                </div>
           
                <hr/> 
                <WherehouseForm />            
                <hr/> 
                <LocationForm  company={item.company} />
                <br/><br/><br/>
                          
              </div> 
              <div className="col-sm-4">
                <ul className="timeline timeline-inverse">  
                      <li className="time-label">
                          <span className="bg-aqua">
                            คำแนะนำ
                          </span>
                      </li>
                      <li>
                        <i className="fa fa-circle-o bg-blue"></i>
                        <div className="timeline-item">                          
                          <div className="timeline-body">
                            <span>แก้ไขข้อมูลบริษัท</span><br/>
                            <span className="pad-10">ข้อมูลบริษัท จะแสดงในใบเสร็จรับเงิน และเอกสารต่างๆ</span>
                          </div>
                        </div>
                      </li>   
                      <li>
                        <i className="fa fa-circle-o bg-blue"></i>
                        <div className="timeline-item">                          
                          <div className="timeline-body">
                            <span>เพิ่ม หรือแก้ไขข้อมูลคลังสินค้า</span><br/>
                            <span className="pad-10">กำหนดคลังสินค้าเพื่อใช้งานในสาขาต่างๆ</span>

                          </div>
                        </div>
                      </li>
                      <li>
                        <i className="fa fa-circle-o bg-blue"></i>
                        <div className="timeline-item">                          
                          <div className="timeline-body">
                            <span>เพิ่ม หรือแก้ไขข้อมูลสาขา</span><br/>
                            <span className="pad-10">กำหนดสาขาของคลินิก และกำหนดให้สาขาใช้งานคลังสินค้า</span><br/>
                            <span className="pad-10 text-red">*** 1 สาขาสามารถใช้งานคลังสินค้าได้ 1 คลังสินค้า และห้ามซ้ำกัน</span>
                          </div>
                        </div>
                      </li>

                      
                </ul> 
              </div>
            </div>

          </div>  
      </div>      
      </form>
      </section>


    </div>
    );
  }

  getCompany(){
    const _this = this;
    getCompany()
    .then(function(results) {
      if (results.data.status === '200') {
        const item = results.data.data;
        _this.setState({ name: item.name, taxno: item.taxno, address: item.address, tel: item.tel, fax: item.fax , company: item }); 
      } else if (results.data.status === '204') {
          show_err('warning','ไม่พบข้อมูลบริษัท')         
      }
    });
  }

  updateCompany(data) {
    let _this = this;
    updateCompany(data)
    .then(function(results) {
      if (results.data.status === '200') {
        _this.getCompany();
        show_err('success','แก้ไขข้อมูลเรียบร้อยแล้ว'); 
      }
    });
  }



}
