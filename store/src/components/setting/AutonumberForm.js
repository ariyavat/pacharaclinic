import React, {Component} from 'react';
import moment from 'moment';
const initialState = {
  id: '', cn: 'ST', name: '', aformat: '',  lnum: '', lastID: 0, typ: 'Y', lastM: '', mode:'A'
};

export default class AutonumberForm extends Component {

  constructor(props) {
    super(props);
    this.headTitle = 'เพิ่ม';
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);  
    this.handleModeChange = this.handleModeChange.bind(this);
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {
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


  componentWillReceiveProps(nextProps) {
    if (nextProps.isEdit) {
      let data = nextProps.data;
      this.setState(data);
    } else {
      initialState.cn = nextProps.data.cn;
      this.setState(initialState);
    }
  }

  handleModeChange (event) {
    let value = this.refs.kmode.value;
    if (value === 'A') {
      this.setState({mode: 'A', lastM: ''});
    } else {
      let lastM = '';      
      if(value === 'M'){  
        lastM= moment().format('MM');
      } else {
        lastM= moment().format('YY');
      }
      this.setState({mode: value, lastM: lastM});
    }
  }

  handleChange (event) {
    let value = this.refs.typ.value;
    if (value === 'N') {
      this.setState({typ: value, aformat: '', lnum: ''});
    } else {
      this.setState({typ: value});
    }
  }

  handleCnChange(e){
    e.preventDefault();
    this.setState({ cn: this.refs.cn.value},()=>{
      this.props.onShow(this.refs.cn.value);
    });
  }

  handleDeletData (e) {
    e.preventDefault();
    this.props.onDelete();
  }

  handleSaveData (e) {
    e.preventDefault();  
    this.setState({id: this.props.id, name: this.props.title}, () => {
      this.props.onSave(this.state);
    });
  }


  render() {
  
  	const item = this.state;
    const {onGetID, loactionList} = this.props;
    
    let createLG = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 


    return (

    <div className="row mgb-10">
      <div className="col-sm-12">
        <form className="form-horizontal">
      
            <div className="form-group">
                <label  className="col-sm-4 control-label" >ประเภท <span className="text-red">*</span></label>
                <div className="col-sm-6">
                        <select className="form-control" ref="typ"  value={this.state.typ}  onChange={this.handleChange}  >
                          <option value="Y">อัตโนมัติ</option> 
                          <option value="N">กำหนดเอง</option>       
                        </select>             
                </div>
            </div>
            <div className="form-group">
                <label  className="col-sm-4 control-label" >อักษรนำ <span className="text-red">*</span></label>
                <div className="col-sm-6">
                    <input type="text"  className="form-control" name="lnum" ref='format' 
                      value={item.aformat}
                      disabled={this.state.typ === 'N'}
                      onChange={(e) => this.setState({aformat: e.target.value})}/>              
                </div>
            </div>
            <div className="form-group">
                <label  className="col-sm-4 control-label" >จำนวนหลัก(1-7) <span className="text-red">*</span></label>
                <div className="col-sm-2">
                  <input type="text"  className="form-control" name="last_id" ref='lnum'  
                      value={item.lnum}
                      disabled={this.state.typ === 'N'}
                      onChange={(e) => this.setState({lnum: e.target.value})}/>            
                </div>
            </div>
            <div className="form-group">
                <label  className="col-sm-4 control-label" >นับเลขใหม่ <span className="text-red">*</span></label>
                <div className="col-sm-6">
                    <select className="form-control" ref="kmode"  value={this.state.mode}  onChange={this.handleModeChange} >
                      <option value="A">รันเลขไปเรื่อยๆ</option> 
                      <option value="M">รันใหม่ทุกเดือน</option>  
                      <option value="Y">รันใหม่ทุกปี</option>      
                    </select>             
                </div>
            </div>
            <div className="form-group">
                <label  className="col-sm-4 control-label" >เลขที่ล่าสุด <span className="text-red">*</span></label>
                <div className="col-sm-6">
                  <input type="text"  className="form-control" name="none" ref='last_id'  value={item.lastID} disabled={true} />            
                </div>
            </div> 




        </form>
        <div className="row">
          <div className="col-sm-10 col-sm-offset-4">   
            <button type="button" className="btn btn-primary" onClick={this.handleSaveData.bind(this)} >
                <i className="fa fa-save"></i> บันทึกข้อมูล
            </button>           
            <button type="button" className="btn btn-default mgl-10" onClick={onGetID.bind(this)}  >
                แสดงตัวอย่างล่าสุด
            </button> 
            <span className="mgl-10">{this.props.lastID}</span>
          </div>
       
        </div>
        <hr/>
      </div>    
    
    </div>
    );
  }
}

