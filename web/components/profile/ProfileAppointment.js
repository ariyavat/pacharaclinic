import React from 'react'
import Router from 'next/router'
import moment from 'moment';
import DatePicker from "react-datepicker";
import Cleave from 'cleave.js/react'
import { getAppointment, msAppointment, createAppointment } from '../../utils/AppointmentAPI'
import { getContacts } from '../../utils/ContactAPI'
export default class ProfileAppointment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      appList: [], wList: [], loading: false, isViews: 'LIST',
      bid: '3',dat: '', tim: '', mem: '', status: 'NONE', locations: [], bname: ''
    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){
    this.getApp()
    this.getWait()   
    this.getLocation();
  }  

  componentDidMount () {  
    this.getLocation();
    this.getApp()
  	this.getWait()
  }
  handleNewform(e){
    e.preventDefault()
    this.setState({ isViews: 'FORM', bid:'3', dat: '', tim: '', mem: '', status: 'NONE', bname:'' })
  }

  handleDateChange(date) {
    this.setState({
      dat: date
    });
  }

  handleSubmit(e){
  	e.preventDefault()
    const _this = this
    const item = this.state
    if(item.dat !== ''){
    if(item.tim !== ''){  
    if(item.mem !== ''){
      
      let { data } = this.props
      let aid = 'APP'+Math.random().toString(36).substring(7)+moment().format('DDMMYYYYHmmss');
      let temp = {
        aid : aid,
        uid: data.uid,
        id: data.id,
        bid: item.bid,
        dat: moment(item.dat).format('YYYY-MM-DD'),
        tim: item.tim,
        mem: item.mem,
        status: 'NONE',
        note: '',
        bname: item.bname
      }  
      createAppointment(temp)
      .then(function(results) {  
       
        if (results.data.status === '201') {   
          _this.setState({ isViews: 'LIST', dat: '', tim: '', mem: '', status: 'NONE' },()=>{

            _this.getApp()
            _this.getWait()

          })
        } else {
          show_err('warning',results.data.msg);   
        }
      }); 
  
      
  } else { show_err('warning','ยังไม่ได้กรอกข้อความ!')  }  
    } else { show_err('warning','ยังไม่ได้กรอกเวลา!')  }   
    } else { show_err('warning','ยังไม่ได้กรอกวันที่!')  }
  }

  handleLactionClick(id,name){
    this.setState({ bid: id, bname: name })
  }

  render () {
    const item = this.state
    const { data } = this.props 


    const rows = item.appList.map((row, i) => {      
      return(
      <div className="row" key={i}>   
        <div className="col-md-12 mgt-10">
          {i+1}.  วันที่ {moment(row.app_date).format('DD-MM-YYYY')} เวลา {row.start_time}<br/>
          <span className="mgl-50">สาขา : {row.cname}</span><br/>
          <span className="mgl-50">แพทย์ : {row.doctor_name}</span><br/>
          <span className="mgl-50">รายละเอียด : {row.mem}</span><br/>
        </div> 
      </div> 
      )
    })



    const wrows = item.wList.map((row, i) => {      
      return(
      <div className="row" key={i}>   
        <div className="col-md-12 mgt-10">
          {i+1}.  วันที่ {row.dat} เวลา {row.tim} <small> {row.mem}</small>
        </div> 
      </div> 
      )
    })


    const lrows = item.locations.map((row, i) => {
      let fcl = "fa fa-square-o"
      if(row.id === item.bid){
        fcl = "fa fa-check-square-o"
      }
      return (  
      <div className="row key={i} alink" onClick={this.handleLactionClick.bind(this,row.id,row.name)} > 
        <div className="col-md-1"></div> 
        <div className="col-md-1 mgt-5"><i className={fcl} /></div>  
        <div className="col-md-6 mgt-5">{row.name}</div> 
      </div>
      )
    })
 
  

	return(
  <div>
      <div className="row">   
        <div className="col-md-12">
          <h4 className="txt-gn">นัดหมายล่วงหน้า</h4>
        </div> 
      </div>  
      {
        item.isViews === 'LIST' ?
        <div className="row">   
          <div className="col-sm-12">
            <div className="row">   
              <div className="col-sm-9"></div>         
              <div className="col-sm-3 pull-right">
                          <button type="button" className="bg-green btn-green pull-right" onClick={this.handleNewform.bind(this)} >                  
                            เพิ่มรายการนัด
                          </button>  
                
              </div>
            </div>         

            {
              item.appList.length > 0 ?
              rows
              :
              <div className="row" >   
                <div className="col-md-12 mgt-10 text-center ">
                  <h5>ไม่พบรายการนัดหมาย</h5>
                </div> 
              </div> 

            }
       

            {
              item.wList.length > 0 ?
              <div>
                <br/>
                <div className="row" >   
                  <div className="col-md-12 mgt-10 text-left ">
                    <h4>รายการนัดรอการยืนยัน</h4>



                    {wrows}
                  </div> 
                </div>
              </div>
              : null

            }

          </div>          
        </div>

        :
        <div className="row">   
          <div className="col-sm-12">


            <form role="form">

                  <div className="row "> 
                    <div className="col-md-4">
                        <div className="form-group mgt-30">
                          <label>วันที่</label>
                          <DatePicker
                            className="form-control reg_inp"
                            selected={item.dat}
                            onChange={this.handleDateChange.bind(this)} 
                          />

                    
                        </div>
                    </div> 
                    <div className="col-md-4">
                        <div className="form-group mgt-30">
                          <label>เวลา</label>
                          <Cleave className="form-control reg_inp" placeholder="ชัวโมง.นาที" name="tim" id="tim"
                            options={{blocks: [2, 2], delimiter: '.', numericOnly: true}}
                            value={item.tim}  
                            onChange={(e) => this.setState({tim: e.target.value})} />                          
                        </div>
                    </div>
                  </div>
                  <div className="row "> 
                    <div className="col-md-8">
                      <div className="form-group mgt-30">
                        <label>ข้อความ</label>
                        <input type="text" className="form-control reg_inp" id="mem" autoComplete="off" 
                          value={item.mem}                  
                          onChange={(e) => this.setState({mem: e.target.value})}/>
                      </div>
                    </div>   
                  </div>
                  <div className="row "> 
                    <div className="col-md-8">สาขา</div>  
                  </div>
                  {
                    lrows
                  } 
                  <div className="row "> 
                    <div className="col-md-4 mgt-30">
                          <button type="button" className="bg-green  btn-green pull-right" onClick={this.handleSubmit.bind(this)}>                  
                            บันทึกรายการนัด
                          </button>                     
                    </div>   
                  </div>




            </form> 
            <br/>


          </div>          
        </div>

      }

    <br/>
  </div>
	)   
  }

  //

  getLocation(){
    const _this = this
    getContacts()
    .then(function(response) {              
        let List = []    
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ locations: List }) 
    })     
  }


  getWait(){
    const _this = this  
    const data = this.props.data


     getAppointment(data.uid,'NONE')
    .then(function(results) {  
    
      if (results.data.status === '200') {   
          let data = results.data.data 
          _this.setState({  wList: data })
      } 
    });
  }

  getApp(){
    const _this = this  
    const { data } = this.props

     msAppointment(data.id)
    .then(function(results) {  
      console.log('AA',results)
      if (results.data.status === '200') {   
          let data = results.data.data 
          _this.setState({  appList: data })
      } 
    });
  }



}