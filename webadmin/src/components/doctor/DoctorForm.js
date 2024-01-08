import React, {Component} from 'react';
import moment from 'moment';
import uuid from 'uuid';
import OrderStatus from '../common/OrderStatus';

//import {createAppointment, updateAppointment } from '../../utils/AppointmentAPI'; 


export default class DoctorForm extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      cn: '', cname: '', day: '', mont:'1', year:'',  
      doctor1: '', dname1: '', doctor2: '', dname3: '', doctor3: '', dname3: '', 
      yList:[],
    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () { 
	  let {data, isEdit} = this.props
    let list = [
    {id: moment().format('YYYY'), name: parseFloat(moment().format('YYYY')) + 543 }, 
    {id: parseFloat(moment().format('YYYY')) + 1, name: (parseFloat(moment().format('YYYY')) + 543) + 1 }
    ]

    this.setState({ year: moment().format('YYYY'), yList: list, mont: moment().format('MM') }) 



    /*
	  if(isEdit){
	   	this.setState({
	      cn: data.cn, cname: data.cname, day: data.day, doctor1: data.doctor1, dname1: data.dname1, 
	      doctor2: data.doctor2, dname3: data.dname3,  
	    });
	  } else {
      this.setState({ year: moment().format('YYYY')  }) 
    }   
    */  
  }
  componentWillReceiveProps(nextProps) {
   
   // this.setState({appData: nextProps.data});
  }

  handleChange(mode,e){
    e.preventDefault();
    if(mode==='1'){
      let idx = this.props.dcList.findIndex((x) => x.id === this.refs.dname1.value);
      if(idx === -1){
        this.setState({doctor1: '-', dname1: ''});
      } else {
        this.setState({doctor1: this.props.dcList[idx].id, dname1: this.props.dcList[idx].name});  
      }     
    } if(mode==='MN'){ 
    
      let idx = this.props.monthTH.findIndex((x) => x.id === parseFloat(this.refs.mnt.value));   

      if(idx === -1){
        this.setState({mont: ''});
      } else {
        this.setState({mont: this.props.monthTH[idx].id});  
      }  
    } else if(mode==='YT'){ 
      let idx = this.state.yList.findIndex((x) => x.id === parseFloat(this.refs.yt.value));
      if(idx === -1){
        this.setState({year: ''});
      } else {
        this.setState({year: this.state.yList[idx].id});  
      }  
    } else if(mode==='L'){ 
      let idx = this.props.locations.findIndex((x) => x.id === this.refs.cn.value);
      if(idx === -1){
        this.setState({cn: '-', cname: 'เลือกสาขา'});
      } else {
        this.setState({cn: this.props.locations[idx].id, cname: this.props.locations[idx].name});  
      }   
    } 
  }

  handleSaveData (e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('msClinic'));
    const data = this.state; 	

    console.log(data)
    
    if(data.cn !== '-'){
    if(data.doctor1 !== '-'){
    if(data.day !== ''){
    	
          let temp = {
	      	  cn: data.cn, cname: data.cname, day: data.day, 
            year: data.year, mont: data.mont, 
            doctor1: data.doctor1, dname1: data.dname1, 
	      	 
          } 
          this.props.onSave(temp);
    } else { show_err('warning','ยังไม่ได้วัน!!!');  }  
    } else { show_err('warning','ยังไม่ได้เลือกแพทย์!!!');  }  
    } else { show_err('warning','ยังไม่ได้สาขา!!!');  }
    
   
  }

  handleCancel(e){
    e.preventDefault();
    let _this = this
    let item = this.state
    let temp = { cn: item.cn, day: item.day  }
    this.props.onDele(temp);
  }

  render() {
    const item = this.state
    const { dcList, locations, isEdit, monthTH } = this.props

    let createDC = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    }  	

    let createMn = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 

    let createYt = function (item, key) {
      return <option value={item.id} key={key} >{item.name}</option>
    } 


  	return (
    <section className="content">
      <div className="box box-info min-650" >  

        <div className="box-body min-400"> 

          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
            <form className="form-horizontal">       


                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">          
                      <label  className="col-sm-2 control-label" >สาขา<span className="text-red">*</span></label>
                      <div className="col-sm-6">
                      <select className="form-control" id="cn" ref='cn' value={item.cn} onChange={this.handleChange.bind(this,'L')} disabled={this.props.isEdit} > 
                          <option value="-">เลือกสาขา</option>                        
                          {locations.map(createDC)}     
                        </select>                           
                      </div>              
                    </div>

                    <div className="form-group">          
                      <label  className="col-sm-2 control-label" >แพทย์<span className="text-red">*</span> </label>
                      <div className="col-sm-6">
                        <select className="form-control select2" id="dname1" ref='dname1' value={item.doctor1} onChange={this.handleChange.bind(this,'1')} > 
                          <option value="-">ไม่ระบุแพทย์</option>                        
                          {dcList.map(createDC)}     
                        </select>                           
                      </div>              
                    </div>
                    <div className="form-group">   
                      <label  className="col-sm-2 control-label" >ปี</label>
                      <div className="col-sm-2"> 
                        <select className="form-control" id="yt" ref='yt' value={item.year} onChange={this.handleChange.bind(this,'YT')} > 
                                             
                          {item.yList.map(createYt)}     
                        </select>
                      </div>
                      <label  className="col-sm-2 control-label" >เดือน</label>
                      <div className="col-sm-2"> 
                        <select className="form-control" id="mnt" ref='mnt' value={item.mont} onChange={this.handleChange.bind(this,'MN')} > 
                                             
                          {monthTH.map(createMn)}     
                        </select> 
                      </div>

                    </div>

                    <div className="form-group">                 
                      <label  className="col-sm-2 control-label" >วันที่<span className="text-red">*</span></label>
                      <div className="col-sm-10"> 

                      	<input type="text" 
                          className="form-control" autoComplete="off"                         
                          value={item.day}                           
                          onChange={(e) => this.setState({day: e.target.value})} />
                 

                      </div>  
               
          

                    </div>  

                  </div>

                </div>



                <hr/>     
                <div className="row">

                  <div className="col-sm-3 col-sm-offset-2">
                    
                      <button type="button" className="btn btn-lg btn-block btn-success " onClick={this.handleSaveData.bind(this)} >
                        <i className="fa fa-save"></i> บันทึกข้อมูล
                      </button> 
                  </div>
                  <div className="col-sm-3">
                    {
                    	isEdit ?
	                      <button type="button" className="btn btn-lg btn-block btn-danger " onClick={this.handleCancel.bind(this)} >
	                        <i className="fa fa-trash"></i> ลบข้อมูล
	                      </button>
                    	: null
                    }
 
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


