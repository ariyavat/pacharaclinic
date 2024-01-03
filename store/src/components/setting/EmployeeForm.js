import React, {Component} from 'react';

const initialState = {
  id: '', name: '', typ: '', address: '', tel: '', status: 'Y',
};

export default class EmployeeForm extends Component {

  constructor(props, context) {
    super(props);    
    this.state = initialState;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
   	if (this.props.isEdit === true) {
   		const item = this.props.data;     		
      setBtnStatus(item.status,'status')
     	this.setState(item);
   	} else {
     if (this.props.autonumber === 'Y') {
       this.setState({id: 'AUTO', typ: this.props.typ});
     } else {
      this.setState({typ: this.props.typ});
     }
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
    let status = this.refs.status.value;   
    this.setState({ status: status, },()=>{ this.props.onSave(this.state);  });
    
  }

  handleBtnClick(e){
    const title = e.target.title
    const name = e.target.name
    setBtnStatus(title,name)
  }

  render() {  
  	const item = this.state;
    const { typ } = this.props;
    let title = 'แพทย์';
    if(typ === 'D'){ title = 'แพทย์';  } else {  title = 'พนักงาน';  }
    return (

      <section className="content">
        <div className="box box-info" >  
          <div className="box-header with-border" >
              <div className="row">
                <div className="col-sm-6">
                   <h3 className="modal-title text-blue">
                    {
                     this.props.isEdit ? "แก้ไขข้อมูล" + title : "เพิ่ม" + title
                    } 
                  </h3>
                </div>
                <div className="col-sm-6">
                        
                </div>
              </div>       
          </div>
          <div className="box-body min-600"> 

                  <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                    <form className="form-horizontal">
                      <div className="form-group">
                        <label  className="col-sm-3 control-label" >รหัส <span className="text-red">*</span></label>
                        <div className="col-sm-4">
                          <input 
                            type="text"  className="form-control" name="taxno" ref='id' 
                            value={item.id}
                            disabled={this.props.isEdit || this.props.autonumber === 'Y'}
                            onChange={(e) => this.setState({id: e.target.value})} />
                        </div>
                                         
                      </div>
                
                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ชื่อ - สกุล<span className="text-red">*</span></label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" name="tel" ref='fname'  
                            value={item.name}
                            onChange={(e) => this.setState({name: e.target.value})} />
                        </div>                 
                      </div> 

                      <div className="form-group"> 
                        <label  className="col-sm-3 control-label" >เบอร์โทร </label>
                        <div className="col-sm-9">                  
                          <input 
                            type="text"  className="form-control" name="address" ref='tel'  
                            value={item.tel}
                            onChange={(e) => this.setState({tel: e.target.value})} /> 
                        </div> 
                      </div>                                       
      
                      <div className="form-group">          
                        <label  className="col-sm-3 control-label" >ที่อยู่ </label>
                        <div className="col-sm-9">
                          <input type="text"  className="form-control" name="tel" ref='address'  
                            value={item.address}
                            onChange={(e) => this.setState({address: e.target.value})} />
                        </div>              
                      </div>

                      <div className="form-group"> 
                        <label  className="col-sm-3 control-label" >สถานะ </label>
                        <div className="col-sm-9">
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
                        <div className="col-sm-9 col-sm-offset-3">
                          <hr/>
                          <button type="button" className="btn btn-success " onClick={this.handleSaveData.bind(this)} >
                            <i className="fa fa-save"></i> { this.props.isEdit ? "แก้ไข" : "บันทึก" }
                          </button> 

                          {
                            this.props.isEdit ?
                            <button type="button" className="btn btn-danger mgl-10" onClick={this.handleDeletData.bind(this)} >
                              <i className="fa fa-trash"></i> ลบ
                            </button>
                            : null
                          }     


                          <button type="button" className="btn btn-default mgl-10" onClick={this.props.onReset} >
                            <i className="fa fa-circle-o-notch"></i> ยกเลิก
                          </button> 


                        </div>
                      </div>




                    </form>
                    </div>
                  </div>


          </div>
        </div>
      </section>


    );
  }
}

