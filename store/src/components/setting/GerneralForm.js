import React, {Component} from 'react';

const initialState = {
  id: '', name: '', typ: '', val1: '', val2: '', val3: '', val4: '', val5: '',
};

export default class GerneralForm extends Component {

  constructor(props) {
    super(props);
    this.headTitle = 'เพิ่ม';
    this.state = initialState;
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
    if (this.props.isEdit) {
      this.headTitle = 'แก้ไข';
      let data = this.props.data;
      this.setState(data);
    } else {
      this.setState(initialState);
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
    this.setState({typ: this.props.typ}, () => {
      this.props.onSave(this.state);
    });
  }


  render() {
 
  	const item = this.state;
    return (

      <div className="box box-info min-600" >  
        <div className="box-header with-border" >            
          <h3 className="box-title">{this.props.title}</h3>                           
        </div>
        <div className="box-body"> 
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1">
              <form className="form-horizontal">

                {
                  this.props.mode === 'A' ?
                  <div className="form-group">          
                    <label  className="col-sm-3" >รายการ<span className="text-red">*</span></label>
                    <div className="col-sm-8">
                      <input type="text"  className="form-control" name="none" ref='name'  
                        value={item.name}
                        onChange={(e) => this.setState({name: e.target.value})} />
                    </div>                 
                  </div> 
                    : null
                }

                {
                  this.props.mode === 'B' ?
                  <div>              
                    <div className="form-group">          
                      <label  className="col-sm-3 " >เลขที่บัญชี<span className="text-red">*</span></label>
                      <div className="col-sm-8">
                        <input type="text"  className="form-control" name="val1" ref='name'  
                          value={item.name}
                          onChange={(e) => this.setState({name: e.target.value})} />
                      </div>                 
                    </div> 
                    <div className="form-group">          
                      <label  className="col-sm-3 " >ชื่อบัญชี<span className="text-red">*</span></label>
                      <div className="col-sm-8">
                        <input type="text"  className="form-control" name="val2" ref='val1'  
                          value={item.val1}
                          onChange={(e) => this.setState({val1: e.target.value})} />
                      </div>                 
                    </div> 
                    <div className="form-group">          
                      <label  className="col-sm-3 " >ธนาคาร<span className="text-red">*</span></label>
                      <div className="col-sm-6">
                        <input type="text"  className="form-control" name="val3" ref='val2'  
                          value={item.val2}
                          onChange={(e) => this.setState({val2: e.target.value})} />
                      </div>                 
                    </div> 
                   <div className="form-group">          
                      <label  className="col-sm-3 " >สาขา</label>
                      <div className="col-sm-6">
                        <input type="text"  className="form-control" name="none" ref='val3'  
                          value={item.val3}
                          onChange={(e) => this.setState({val3: e.target.value})} />
                      </div>                 
                    </div> 

                  </div>
                    : null
                }
  

              </form>
              </div>
            </div>   
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1">

                <div className="row">
                  <div className="col-sm-8 col-sm-offset-3">
                    <hr/>
                    <button type="button" className="btn btn-success mgr-10" onClick={this.handleSaveData.bind(this)} >
                      <i className="fa fa-save"></i> { this.props.isEdit ? "แก้ไข" : "บันทึก" }
                    </button>

                    {
                      this.props.isEdit ?
                      <button type="button" className="btn btn-danger  mgr-10" onClick={this.handleDeletData.bind(this)} >
                        <i className="fa fa-trash"></i> ลบ
                      </button>
                      : null
                    }

                    <button type="button" className="btn btn-default" onClick={this.props.onReset} >
                      <i className="fa fa-circle-o-notch"></i> ยกเลิก
                    </button> 
                  </div>
                </div>
 

              </div>
            </div>

        </div>  
    </div>

    );
  }
}

