import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import renderHTML from 'react-render-html'
import { Editor } from '@tinymce/tinymce-react'
import Layout from '../components/Layout'
import Icon from '../components/common/Icon'
import ViewForm from '../components/seedoctor/ViewForm'  
import DoctorForm from '../components/seedoctor/DoctorForm' 
import Calendar from '../components/seedoctor/Calendar'  
import BookForm from '../components/seedoctor/BookForm' 

import { getDoctorTime, getDoctorTimes, getSeedoctor, createSeedoctor } from '../utils/DoctorAPI'
import { getLocations } from '../utils/ContactAPI'

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true, isView: 'LIST',  data: [], rqList: [], cn:'1',  
      isRequest : false, title: '', msg: '', id: '', locations: [], dat: '', doctor: '', sdata: null,

    }   

  }
  shouldComponentUpdate(_nextProps, nextState) {     
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){

      let view = 'LIST'
      let id = ''
      if(nextProps.url.query.id){
        view = 'VIEW'
        id  = nextProps.url.query.id
      } 
      this.setState({ loading: false, isView: view, id: id },()=>{
        if(view === 'LIST'){
          //this.getDatas();
          this.getRequest();  
          //console.log('LIST')        
        } else {
          //console.log('DETAIL')
        }
      })
 


  }


  componentDidMount () {    
    let data = JSON.parse(localStorage.getItem('ms_profile'));     
    if(data === null){
      Router.push({
          pathname: '/profile',
          query: { login: 'seedoctor' }
      })
    } else {
      let id = ''
      let view = 'LIST'
      if(this.props.url.query.id){
        view = 'VIEW'
        id  = this.props.url.query.id
      } 
      this.setState({ loading: false, isView: view, id: id },()=>{
        if(view === 'LIST'){
          //this.getDatas();
          this.getRequest();         
        } else {
          //console.log('DETAIL')
        }
      })
 
    } 
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
    this.setState({ cn: e.target.value})
  }

  handleRequest(view){   
    this.setState({
      isRequest : view,
      isView: 'LIST'
    })
  }

  handleEditorChange = (e) => {
    //console.log('Content was updated:', e.target.getContent());
    this.setState({ msg: e.target.getContent() })
  }

  handleView(data){
    Router.push({
          pathname: '/seedoctor',
          query: { id: data.id, uid: data.uid }
    })    
  

  }

  handleSaveDatra = (e) => {
   
    const item = this.state
    const _this = this
    if(item.title !== ''){
    if(item.msg !== ''){
      let profile = JSON.parse(localStorage.getItem('ms_profile'));
      let id = Math.random().toString(36).substring(7)+moment().format('DDMMYYYYHmmss');
      let dat = moment().format('YYYY-MM-DD H:m:ss')
      let data = { 
        id: id, uid: profile.uid, cname: profile.fullname, 
        title: item.title, mem: item.msg, dat: dat, status: 'N', edat: dat, anum: 0    }

    

      /*
      createSeedoctor(data)
      .then(function(results) {    
        if (results.data.status === '201') {          
          _this.setState({ isRequest : false },()=>{
            show_err('success','ส่งคำถามถึงแพทย์เรียบร้อยแล้ว..')
            _this.getRequest()
          })

        } else {
          show_err('warning',results.data.msg);   
        }
      }); 
      */


    } else { show_err('warning','ยังไม่ได้กรอกรายละเอียดคำถาม!')  }
    } else { show_err('warning','ยังไม่ได้กรอกหัวข้อเรื่อง!')  }
  }

  handleClose(){
    this.setState({ isView: 'LIST' })
  }

  handleShowdoctors(){
    this.setState({ isView: 'DOCTOR' })
  }

  handleShowData(dat){
    this.getDatas(dat);
  }

  handleSelectdata(dat){
    let idx = this.state.data.findIndex(x => x.day === dat);     
    let profile = JSON.parse(localStorage.getItem('ms_profile'));
    if(profile !== null && profile.id !== 'none'){         
        this.setState({ isView: 'FORM', dat: dat, sdata: this.state.data[idx]  })
    }    
  }

  handleClosepage(){
    this.setState({ isView: 'LIST' })
  }

  render () {    
    const item = this.state  
    let clinic = '';




    return(
    <Layout page="seedoctor">   
        <div className="container-fluid">         
        	<section className="sectionTop review" >	
		        <div className="container">
			        <div className="row">            
			        	<div className="col-sm-12 ">
				  		    <header className="review-header">
                  <div className="row">            
                    <div className="col-6 ">
                      <h1>SEE DOCTOR </h1>
                    </div>
                    <div className="col-6 ">
                    {
                      item.isView === 'FORM'?
                        <span className="pull-right alink mgt-10 font-40" onClick={this.handleClosepage.bind(this)}> <i className="fa fa-close text-danger"/> </span>
                      : null
                    }
                    
                    </div>
                  </div>
				  		    </header>
			        	</div>     
			        </div>
              {
                item.loading ? 
                <div className="row">            
                  <div className="col-sm-12 mgt-100 text-center">
                      <h1 className="txt-blue">Load Data</h1>
                      <br/><br/><br/><br/><br/><br/><br/> 
                  </div>  
                     
                </div>
                :
                null
              } 

              {
                item.isView === 'LIST' ?
               <div className="row">    
                  <div className="col-sm-4 mgt-20 min-80 hidden-xs">
                    <div className="row">            
                      <div className="col-12 text-left">
                        <h4>รวมโชค</h4>
                        <a href="https://line.me/ti/p/ZeQ0qP62gP" target="_blank">
                          <img className="img-responsive img-thumbnail" src="static/img/qr01.png" />
                        </a>
                        <small>คลิ๊ก หรือ แสกน QR CODE เพื่อปรึกษาแพทย์</small>

                      </div>                         
                    </div> 
                    <div className="row">            
                      <div className="col-12 text-left">
                        <h4>หางดง</h4>
                        <a href="https://line.me/ti/p/YqCHPQrT5u" target="_blank">
                          <img className="img-responsive img-thumbnail" src="static/img/qr02.png" />
                        </a>
                        <small>คลิ๊ก หรือ แสกน QR CODE เพื่อปรึกษาแพทย์</small>

                      </div>                         
                    </div> 
                  </div>


                  <div className="col-sm-8 mgt-20">
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

                             <small className="mgl-20">เลือกสาขา เพื่อดูตารางแพทย์ประจำวัน</small>
                          </div>
                        </div>
               
                          <Calendar 
                            datas={item.data} 
                            cn={item.cn} 
                            onGetData={this.handleShowData.bind(this)}
                            onSelect={this.handleSelectdata.bind(this)}  />

                            <small>เลือกวันที่ต้องการจองคิวปรึกษาแพทย์ </small><br/>
                            <small className="text-danger">วันที่ไม่มีชื่อแพทย์จะไม่สามารถ จองคิวได้ </small>

                      </div>
                      : null
                    }




                  </div>   




                </div> 
                :
                <BookForm dat={item.dat} data={item.sdata} />
              }

            </div>            			    
        	</section>
        </div>
    </Layout>
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

  getRequest(){
    let data = JSON.parse(localStorage.getItem('ms_profile')); 
    console.log(data)
    /*
    const _this = this
    getSeedoctor(data.uid)
    .then(function(response) {  
        console.log(response)   
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ rqList: List }) 
    })  
    */
  }



}