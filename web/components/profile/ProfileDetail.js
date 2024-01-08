import React from 'react'
import Router from 'next/router'
import { getCustomer, getMsCustomer, mCodeCustomer, updateCustomer } from '../../utils/CustomerAPI'

export default class ProfileDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [], loading: false, vip: null, vipTotal: 0, mcode: '',
      member: [
        {id:'S', name:'SILVER MEMBER', discount: 5, free: 1, img: '../static/img/mem01.jpg', txt1: 'ทันทีที่เปิดสมาชิก SILVER MEMBER', txt2:'NONE' },
        {id:'G', name:'GOLD MEMBER', discount: 10, free: 2, img: '../static/img/mem02.jpg', txt1:'สะสมยอดซื้อครบ 50,000 บาท', txt2:'ในปีถัดไปจะยกระดับของท่านเป็น GOLD MEMBER' },
        {id:'P', name:'PLATINUM MEMBER', discount: 15, free: 3, img: '../static/img/mem03.jpg', txt1:'สะสมยอดซื้อครบ 150,000 บาท', txt2:'ในปีถัดไปจะยกระดับของท่านเป็น PLATINUM MEMBER' },
        {id:'D', name:'DIAMOND MEMBER', discount: 10, free: 2, img: '../static/img/mem04.jpg', txt1:'สะสมยอดซื้อครบ 150,000 บาท', txt2:'ในปีถัดไปจะยกระดับของท่านเป็น DIAMOND MEMBER' }
      
      ]


    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){
       this.getCustomerMember()      
  } 

  componentDidMount () {   
    this.getCustomerMember()  
  }


  handleMember(e){
  	e.preventDefault()
    Router.push({
        pathname: '/profile',
        query: { member: 'new_member' }
    }) 
  }

  handleEditData(e){
    e.preventDefault()
    let item = this.state.data
    //console.log(this.state.data)    
    Router.push({
        pathname: '/profile',
        query: { edit: item.uid }
    }) 
    
  }


  handleConMember(e){
    e.preventDefault()
    if(this.state.mcode !== ''){
      let item = this.state
      let _this = this
      let code = item.mcode.trim()
      let data = { code: code  }
       mCodeCustomer(data)
      .then(function(results) {  
        if (results.data.status === '200') {   
            let data = results.data.data          

            let temp = { member: 'MEMBER', id: data.id  }
            let udata = { data: temp, uid: item.data.uid  }
            updateCustomer(udata)
              .then(function(results) {  
                if (results.data.status === '200') {   
                  show_err('success','ยืนยันสมาชิกเรียบร้อยแล้ว');   
                  _this.getCustomerMember()
                } else {
                  show_err('warning',results.data.msg);   
                }
              }); 

        } else {
          show_err('warning','ไม่พบ Code นี้ในระบบ!!');   
        }
      }); 


    } else {
      show_err('warning','ยังไม่ได้กรอก Member Code!!'); 
    }
  }


  render () {
    const item = this.state
    const data = item.data
    let id = 0
    if(item.vip!== null){
      if(item.vip.level === 'S'){ id = 0; }
      if(item.vip.level === 'G'){ id = 1; }
      if(item.vip.level === 'P'){ id = 2; }
      if(item.vip.level === 'D'){ id = 3; }
    }
  
	return(
  <div>
      <div className="row">   
        <div className="col-md-8">
          <h4 className="txt-gn">{data.fullname}</h4>
        </div> 
        <div className="col-md-4 text-right">
          <button type="button" className="bg-green btn-green pull-right" onClick={this.handleEditData.bind(this)}  >                  
            แก้ไขข้อมูล
          </button>            
        </div>
      </div>        
      <div className="row">   
        <div className="col-md-12">       
          <div className="row">   
            <div className="col-md-11 mgt-10 offset-md-1 "><b>วันเกิด: </b> { data.dob}</div> 
          </div>  

          <div className="row">   
            <div className="col-md-11 mgt-10 offset-md-1 "><b>หมายเลขบัตรประชาชน: </b> { data.idcard}</div> 
          </div>  
          <div className="row">   
            <div className="col-md-11 mgt-10 offset-md-1 "><b>ที่อยู่: </b> { data.address} ต.{data.tm} อ.{data.am} จ.{data.province}  {data.zip}</div> 
          </div> 
          <div className="row">   
            <div className="col-md-11 mgt-10 offset-md-1 "><b>เบอร์โทร: </b> { data.tel}</div> 
          </div> 
          <div className="row">   
            <div className="col-md-11 mgt-10 offset-md-1 "><b>Email: </b> { data.email}</div> 
          </div> 
          <div className="row">   
            <div className="col-md-11 mgt-10 offset-md-1 "><b>Facebook: </b> { data.facebook}</div> 
          </div>  
          <div className="row">   
            <div className="col-md-11 mgt-10 offset-md-1 "><b>Line ID: </b> { data.lineID}</div> 
          </div>

          <hr/>
          {
            item.vip === null ?
            <div className="row">   
              <div className="col-md-12 mgt-10">
                <div className="row">   
                  <div className="col-md-12 mgt-10"><b>ข้อมูลสมาชิก</b></div> 
                </div>


                <p>Silver member ทันทีที่เปิดบัตรสมาชิก Silver member รับส่วนลดทันที 5% สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก รับสิทธิ์เพิ่มทรีทเมนท์ ฟรีอีก 1 ครั้ง สำหรับการซื้อคอร์ส</p>
                <p>Gold member ท่านสมาชิกสะสมยอดซื้อครบ 50,000 บาท จะยกระดับสมาชิกของท่านเป็น Gold member ทันที รับส่วนลดทันที 10% สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก รับสิทธิ์เพิ่มทรีทเมนท์ ฟรีอีก 2 ครั้ง สำหรับการซื้อคอร์ส</p>
                <p>Diamond member ท่านสมาชิกสะสมยอดซื้อครบ 150,000 บาท จะยกระดับสมาชิกของท่านเป็น Diamond member ทันที รับส่วนลดทันที 10% สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก รับสิทธิ์เพิ่มทรีทเมนท์ ฟรีอีก 2 ครั้ง สำหรับการซื้อคอร์ส รับสทธิ์ทรีทเมนท์ฟรี 1 ครั้ง ในเดือนเกิด</p>
                <hr/>
                <br/><h4>ค่าสมัครสมาชิก  <span className="txt-red">100</span> บาท</h4>
                <div className="row">   
                  <div className="col-md-4 offset-md-4 mgt-10">
                    <button type="button" className="bg-green btn-green" onClick={this.handleMember.bind(this)} >                  
                      สมัครสมาชิกใหม่
                    </button>            

                  </div> 
                </div>
                <hr/>


                <br/><h4>สมาชิกคลินิก <small className="font-13 text-danger">สมาชิกคลินิกเก่าให้ขอ Member Code จากทางคลินิก</small></h4>
                <form role="form">
                  <div className="row "> 
                    <div className="col-md-4">
                              <div className="form-group">
                                <label>Member Code</label>
                                <input type="text" className="form-control reg_inp" id="mcode" autoComplete="off" 
                                  value={item.mcode}                  
                                  onChange={(e) => this.setState({mcode: e.target.value})}/>
                              </div>
                    </div>  
                    <div className="col-md-4">
                    <button type="button" className="bg-green btn-green mgt-20" onClick={this.handleConMember.bind(this)} >                  
                      ยืนยันสมาชิก
                    </button>  
                    </div>          
                  </div>

                </form>
                


              </div> 
            </div>
            : null
          }

          {
            item.vip !== null &&  item.vip === 'WAIT'  ?
            <div className="row">   
              <div className="col-md-12 mgt-10 text-center txt-gn">
                <div className="row">   
                  <div className="col-md-12 mgt-10"><b>ข้อมูลสมาชิก</b></div> 
                </div>       
                <h1>รอยืนยันการสมัครสมาชิก</h1>
              </div> 
            </div>
            : null
          }   

          {
            item.vip !== null ?
            <div className="row">   
              <div className="col-md-12">
                   

                <div className="row">   
                  <div className="col-md-12">
                    <h4 className="txt-gn">เลขสมาชิก {item.vip.id} </h4>
                    <h4>ยอดการซื้อสะสม  {parseFloat(item.vipTotal).toLocaleString('en-US', {minimumFractionDigits: 2})} บาท</h4>
                  </div> 
                </div>  
                <div className="row">   
                  <div className="col-md-4"><img className="d-block w-100" src={item.member[id].img} /></div> 
                </div> 
                <div className="row">   
                  <div className="col-md-12 mgt-20 font-17">
                    <span className="20"><b>ปัจจุบันท่านเป็นสมาชิก  {item.member[id].name}</b></span><br/>
                    <span>รับส่วนลดทันที {item.member[id].discount}% สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก</span><br/>
                    <span>รับสิทธิ์เพิ่มทรีทเมนท์ ฟรี อีก {item.member[id].free} ครั้ง สำหรับการซื้อคอร์ส</span>
                  </div> 
                </div>       
            
              </div> 
            </div>
            : null
          }  


        </div>  
      </div>  

      <br/><br/>
        <div className="row">   
          <div className="col-md-12 mgt-10">
            <b>เงื่อนไขและเอกสิทธิ์พิเศษสำหรับคุณโดยเฉพาะ</b><br/>
            โดยกำหนดตัดยอดการสะสม 1 ปีหลังจากที่ถือบัตร
          </div> 
        </div> 

        <div className="row">   
          <div className="col-md-4">
            <div className="row">   
              <div className="col-md-12"><img className="d-block w-100" src={item.member[0].img} /></div> 
            </div> 
            <div className="row">   
              <div className="col-md-12 font-13">
                <b>{item.member[0].name}</b><br/>
                <small>
                {item.member[1].txt1}<br/>                             
                <b>รับส่วน {item.member[0].discount}%</b> สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก<br/>
                <b>รับสิทธิ์เพิ่มทรีทเมนท์ ฟรี อีก {item.member[0].free} ครั้ง สำหรับการซื้อคอร์ส </b>    
                </small>           
              </div> 
            </div> 
          </div> 
          <div className="col-md-4">
            <div className="row">   
              <div className="col-md-12"><img className="d-block w-100" src={item.member[1].img} /></div> 
            </div> 
            <div className="row">   
              <div className="col-md-12 font-13">
                <b>{item.member[1].name}</b><br/>
                <small>
                {item.member[1].txt1}<br/>
                {item.member[1].txt2}<br/>
                <b>รับส่วน {item.member[1].discount}%</b> สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก<br/>
                <b>รับสิทธิ์เพิ่มทรีทเมนท์ ฟรี อีก {item.member[1].free} ครั้ง สำหรับการซื้อคอร์ส </b>    
                </small>                  
              </div> 
            </div> 
          </div>  
          <div className="col-md-4">
            <div className="row">   
              <div className="col-md-12"><img className="d-block w-100" src={item.member[3].img} /></div> 
            </div> 
            <div className="row">   
              <div className="col-md-12 font-13">
                <b>{item.member[3].name}</b><br/>
                <small>
                {item.member[3].txt1}<br/>
                {item.member[3].txt2} <br/>               
                <b>รับส่วน {item.member[3].discount}%</b> สำหรับการซื้อผลิตภัณฑ์ของพชรคลินิก<br/>
                <b>รับสิทธิ์เพิ่มทรีทเมนท์ ฟรี อีก {item.member[3].free} ครั้ง สำหรับการซื้อคอร์ส รับสทธิ์ทรีทเมนท์ฟรี 1 ครั้ง ในเดือนเกิด</b>    
                </small>                  
              </div> 
            </div> 
          </div> 
        </div> 



    <br/>
  </div>
	)   


  }

  //
  getCustomerMember(){
    const _this = this
    let data = JSON.parse(localStorage.getItem('ms_profile'));  
    if(data !== null){     
      this.setState({ data: data },()=>{
          getCustomer(data.uid)
          .then(function(response) {                  
              if(response.data.status === '200'){
               let  cdata =  response.data.data                   
                _this.setState({ data: cdata },()=>{
                  if(cdata.member === 'MEMBER'){
                    getMsCustomer(cdata.id)
                    .then(function(response) {
                      if(response.data.status === '200'){

                        _this.setState({ vip: response.data[0], vipTotal:  response.data.totalprice})
                        console.log('customer',response.data.totalprice)
                      }
                      
                    })
                  } else if(cdata.member === 'PAYMENT'){
                    _this.setState({ vip: 'WAIT' })
                  }
                }) 
              } 
              
          })  

      })  
    } else {
        Router.push({
            pathname: '/profile',
            query: { login: 'wahsffd' }
        })
    }  
  }



}