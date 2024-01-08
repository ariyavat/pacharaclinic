import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import renderHTML from 'react-render-html'
import { Editor } from '@tinymce/tinymce-react'
import Layout from '../components/Layout'
import Icon from '../components/common/Icon'
import ViewForm from '../components/seedoctor/ViewForm'  
import DoctorForm from '../components/seedoctor/DoctorForm'
import { getDoctorTime, getSeedoctor, createSeedoctor } from '../utils/DoctorAPI'


export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true, isView: 'LIST',  data: [], rqList: [],  isRequest : false, title: '', msg: '', id: ''
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
          this.getDatas();
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
          this.getDatas();
          this.getRequest();         
        } else {
          //console.log('DETAIL')
        }
      })
 
    }    

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


    } else { show_err('warning','ยังไม่ได้กรอกรายละเอียดคำถาม!')  }
    } else { show_err('warning','ยังไม่ได้กรอกหัวข้อเรื่อง!')  }
  }

  handleClose(){
    this.setState({ isView: 'LIST' })
  }

  handleShowdoctors(){
    this.setState({ isView: 'DOCTOR' })
  }

  render () {    
    const item = this.state  
    let clinic = '';
    const rows = item.data.map((row, i) => {
      let isView = false
      if(clinic !== row.cn){
        isView = true
        clinic = row.cn
      }

      let dtext = '';
      switch(row.day){
        case '1' :  dtext = 'จันทร์';  break;
        case '2' :  dtext = 'อังคาร';  break;
        case '3' :  dtext = 'พุธ';  break;
        case '4' :  dtext = 'พฤหัสบดี';  break;
        case '5' :  dtext = 'ศุกร์';  break;
        case '6' :  dtext = 'เสาร์';  break;
        case '7' :  dtext = 'อาทิตย์';  break;
      }

      return (  
      <div className="row" key={i}> 
        <div className="col-sm-12">
        {
          isView ?
          <div className="mgt-20">
            <b>{row.cname}</b>
            <hr/>
          </div>
          : null
        }
          <div className="row"> 
            <div className="col-sm-4">
              {dtext}
            </div>
            <div className="col-sm-8">
              {row.dname1}
            </div>

          </div>

                  
        </div> 
      </div>          
      )
    })

    const trows = item.rqList.map((row, i) => { 
      return (  
      <div className="row mgt-20 alink" key={i} onClick={this.handleView.bind(this,row)}> 
        <div className="col-md-12 mgt-10 bg-cart-gray pad-10">
          <div className="row">   
            <div className="col-md-9"><b>{row.title}</b></div> 
            <div className="col-md-3 text-right">
              <small><Icon cls="fa fa-commenting-o" /> {row.anum} ตอบ</small>
            </div> 
          </div> 
          <hr/>
          <div className="row">   
            <div className="col-md-12">
            {renderHTML(row.mem)}
            </div> 
         
          </div> 

        </div>
      </div>        
      )
    })

    return(
    <Layout page="seedoctor">   
        <div className="container-fluid">         
        	<section className="sectionTop review" >	
		        <div className="container">
			        <div className="row">            
			        	<div className="col-sm-12 ">
				  		    <header className="review-header">				  		   
				  		      <h1>SEE DOCTOR </h1>
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
              !item.loading && item.isView === 'LIST'  ?          
              <div className="row"> 
                <div className="col-sm-12 col-12 min-500">
                  {
                    !item.isRequest ?
                    <div className="row">                      
                      <div className="col-md-3 ">
                        <button type="button" className="bg-green btn-green" onClick={this.handleRequest.bind(this,true)}  >                  
                          สร้างคำถามถึงแพทย์
                        </button>            
                      </div>
                      <div className="col-md-6 "></div>
                      <div className="col-md-3 ">
                        <button type="button" className="bg-green btn-gray pull-right " onClick={this.handleShowdoctors.bind(this)}  >                  
                          ตารางแพทย์
                        </button>            
                      </div>
                    </div>
                    : 
                    <div className="mgt-10">
                    <form role="form">  
                    <div className="form-group mgt-30">
                      <label>หัวข้อเรื่อง : </label>
                      <input type="text" className="form-control" id="rtitle" autoComplete="off" 
                        value={item.title}                  
                        onChange={(e) => this.setState({title: e.target.value})}/>
                    </div>


                      <div className="row">  
                        <div className="col-md-12">                

                       <Editor
                         initialValue=""
                         init={{
                           height: 300,
                           menubar: false,
                           plugins: [
                             'advlist autolink lists link image charmap print preview anchor',
                             'searchreplace visualblocks code fullscreen',
                             'insertdatetime media table paste code help wordcount'
                           ],
                           toolbar:
                             'undo redo | formatselect | bold italic backcolor | \
                             alignleft aligncenter alignright alignjustify | \
                             bullist numlist outdent indent | removeformat | help'
                         }}
                         onChange={this.handleEditorChange}
                       />



                        </div>               
                      </div> 
                  
                      <div className="row">  
                        <div className="col-md-12 mgt-10">

                      <button type="button" className="btn btn-primary pull-right mgl-10" onClick={this.handleSaveDatra.bind(this)}  >                  
                      ส่งคำถาม
                      </button>  

                      <button type="button" className="btn btn-light pull-right" onClick={this.handleRequest.bind(this,false)}  >                  
                      ยกเลิก
                      </button>  




                        </div>                                      
                      </div> 
                      <hr/>
                    </form> 
                    </div>                 
                  }

                  {
                    item.rqList.length > 0 ?
                    trows
                    : 
                    <div className="row mgt-20" > 
                      <div className="col-md-12 ">
                        <h2>ไม่พบคำถาม!!</h2>
                      </div>
                    </div>
                  }
                  <br/>
                </div>  

       


              </div>

              : null

              }

              {
                !item.loading && item.isView === 'VIEW'  ?  
                <ViewForm id={item.id}  onRequest={this.handleRequest.bind(this)} />

                : null
              }

              {
                !item.loading && item.isView === 'DOCTOR'  ?  
                <DoctorForm datas={item.data}  onClose={this.handleClose.bind(this)} />

                : null
              }





		        </div>
            			    
        	</section>
        </div>
    </Layout>
    )
  }
  //

  getDatas(){
    const _this = this
    getDoctorTime()
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