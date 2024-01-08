import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import Calendar from './Calendar'
import BookForm from './BookForm'
import { getLocations } from '../../utils/ContactAPI'
import {  getDoctorTimes } from '../../utils/DoctorAPI'
import {  getEmployeeTime } from '../../utils/EmployeeAPI'

export default class Appointment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false, isView : 'LIST', data: [], cn: '1', cname: '', locations: [], dat: '', sdata: null,
      
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentDidMount () {   
    let dat = moment().format('YYYY-MM');

    const _this = this
    getLocations()
    .then(function(response) { 
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ locations: List },()=>{
          _this.getDatas(dat);
        }) 
    }) 
  }

  handleChange(e){
    e.preventDefault()    
    let idx = this.state.locations.findIndex(x => x.id === e.target.value); 
    this.setState({ cn: e.target.value, cname: this.state.locations[idx].name })
  }


  handleShowData(dat){
  	this.getDatas(dat);
  }

  handleClosepage(){
    this.setState({ isView: 'LIST' })
  }

  handleSelectdata(dat){    

    let profile = JSON.parse(localStorage.getItem('ms_profile'));
    let idx = this.state.data.findIndex(x => x.day === dat);  
    const _this = this
    let temp = {
      dname: '',
      qty: 0,
      dat: dat,
      cn: this.state.cn,     
      cname: '', 
      hn: profile.id,
      fullname: profile.fullname,
      tlist: [],
    }        
    if(idx !== -1){
      temp.dname = this.state.data[idx].dname1
    } 
    
    let rt = moment().isSameOrBefore(dat);
    if(rt === true){
      getEmployeeTime(this.state.cn,dat)
      .then(function(response) {     
          if(response.data.status === '200'){   
            let data = response.data.data
            temp.qty = data.qty
            temp.cname = data.cname
            let list = []
             for (let i = 1; i <= data.qty; i++) {
                  let t = { id: i, name: 'พนักงาน '+i }  
                  list.push(t)              
            }
            temp.tlist = list
            _this.setState({ isView: 'FORM', dat: dat, sdata: temp }) 
          } else {
            show_err('warning','วันที่เลือกไม่สามารถจองคิวได้!')
          }          
          
      })

    }





  }


  render () {
    const item = this.state
  
	return(
	<div>
    <div className="row">   
      <div className="col-md-6">
        <h4 className="txt-gn">นัดหมายล่วงหน้า</h4>
      </div> 
      <div className="col-md-6">
        {
          item.isView === 'FORM'?
            <span className="pull-right alink mgt-10 font-40" onClick={this.handleClosepage.bind(this)}> <i className="fa fa-close text-danger"/> </span>
          : null
        }
      </div>
    </div> 


    {
      !item.loading && item.isView === 'LIST' ? 
      <div>
        <div className="row">
          <div className="col-12 tselect">
             <span>สาขา : </span>
             <select id="cn" ref="cn" className="mgr-20"  value={item.cn}  onChange={this.handleChange.bind(this)}>
              {
                item.locations.map((item,i)=>(<option key={i} value={item.id}>{item.name}</option>))  
              }                 
             </select>

             <small className="mgl-20">เลือกสาขา จองคิวรับบริการ  จากนั้นเลือกวันที่ ที่ต้องการจองคิว</small>
          </div>
        </div>  
        <Calendar 
              datas={item.data} 
              cn={item.cn} 
              onGetData={this.handleShowData.bind(this)}
              onSelect={this.handleSelectdata.bind(this)}  />
      </div>
      : 
       <BookForm dat={item.dat} data={item.sdata} cn={item.cn} cname={item.cname}  />
    }

	
	</div>
	)   
  }

 //
  getDatas(dat){
    const _this = this
    getDoctorTimes(dat)
    .then(function(response) {     
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
  }


}