import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import ProfileDetail from './ProfileDetail'  
import ProfileMember from './ProfileMember' 
import ProfileEms from './ProfileEms'
import ProfileOrder from './ProfileOrder'  
import ProfileCourse from './ProfileCourse'
import ProfileHistory from './ProfileHistory' 
import Appointment from '../book/Appointment' 

export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {id: 'none'}, loading: false, mode : '1', smode: 'none', 
      menu:[
        {mode: '1', name: 'ข้อมูลผู้ใช้งาน'}, 
        {mode: '2', name: 'ยอดสะสม'},
        {mode: '3', name: 'นัดหมายล่วงหน้า'},
        {mode: '4', name: 'Course คงเหลือ'}, 
        {mode: '5', name: 'รายการสั่งซื้อ / แจ้งชำระเงิน'},
        {mode: '7', name: 'ประวัติการสั่งซื้อ'},
      ]

    }     
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return (this.props !== _nextProps)  || (this.state !== nextState);
  }

  componentWillReceiveProps(nextProps){
    let data = JSON.parse(localStorage.getItem('ms_profile'));
    this.setState({ data: data })        
  }

  componentDidMount () {   
    let then = JSON.parse(localStorage.getItem('ms_login')).login_date    
    let now = moment().format('DD/MM/YYYY H:mm:ss'); 
    let tim = moment.utc(moment(now,"DD/MM/YYYY H:mm:ss").diff(moment(then,"DD/MM/YYYY H:mm:ss"))).format("H")
    if(parseFloat(tim) > 2){ 
      localStorage.removeItem('ms_profile');
      Router.push({
          pathname: '/profile',
          query: { login: 'wahsffd' }
      })       
    } else {
      let data = JSON.parse(localStorage.getItem('ms_profile')); 
      this.setState({ data: data })
    }
   
 /*   
    console.log(JSON.parse(localStorage.getItem('ms_login')))
    */
  	//localStorage.removeItem('ms_profile');
  }

  handleMenuSelect(i,e){
    e.preventDefault()
    this.setState({ mode: i },()=>{
      let uid = this.props.uid
      let ulr = { uid: 'dsdfsdf', view : 'detail', gid: '1'  }
      switch(i){
        case '1' :  ulr = { uid: uid, view : 'detail', gid: '1'  }; break
        case '2' :  ulr = { uid: uid, view : 'member', gid: '2'  }; break
        case '3' :  ulr = { uid: uid, view : 'appointment', gid:'3'  }; break
        case '4' :  ulr = { uid: uid, view : 'course', gid: '4'  }; break
        case '5' :  ulr = { uid: uid, view : 'orders', gid: '5'  }; break     
        case '7' :  ulr = { uid: uid, view : 'history', gid: '7'  }; break
      }

      Router.push({
          pathname: '/profile',
          query: ulr
      }) 
        
    })

  }

  handleLogout(e){
    e.preventDefault()
    localStorage.removeItem('ms_profile');
    Router.push({
          pathname: '/profile',
          query: { login: 'wahsffd' }
    })  
    show_err('success','ออกจากระบบเรียบร้อยแล้ว!') 


  }

  render () {
    const item = this.state
    const { uid, view, gid, data } = this.props


  
	return(
	<section className="bg-White" >		
        <div className="row">   
        	<div className="col-md-3">




            <ul id="MenuF">
              <li className={gid === '1' ? 'txt-green' : ''} onClick={this.handleMenuSelect.bind(this,'1')}>
                <a href="#" ><span className={gid === '1' ? 'txt-green' : ''}>{item.menu[0].name}</span></a>
              </li>
              
              <li className={gid === '7' ? 'txt-green' : ''} onClick={this.handleMenuSelect.bind(this,'7')}>
                <a href="#" ><span className={gid === '7' ? 'txt-green' : ''}>{item.menu[5].name}</span></a>
              </li>

              {
                item.data.id !== 'none' ?
                <li className={gid === '4' ? 'txt-green' : ''} onClick={this.handleMenuSelect.bind(this,'4')}>
                  <a href="#" ><span className={gid === '4' ? 'txt-green' : ''}>{item.menu[3].name}</span></a>
                </li>
                : null
              }

              {
                item.data.id !== 'none' ?
              <li className={gid === '3' ? 'txt-green' : ''} onClick={this.handleMenuSelect.bind(this,'3')}>
                <a href="#" ><span className={gid === '3' ? 'txt-green' : ''}>{item.menu[2].name}</span></a>
              </li>
                : null
              }

              <li className={gid === '5' ? 'txt-green' : ''} onClick={this.handleMenuSelect.bind(this,'5')}>
                <a href="#" ><span className={gid === '5' ? 'txt-green' : ''}>{item.menu[4].name}</span></a>
              </li>
   




              <li onClick={this.handleLogout.bind(this)}>
                <a href="#" ><span className="txt-red">ออกจากระบบ</span></a>
              </li>              

            </ul>  	    
        	</div>
        	<div className="col-md-9">     
           
            { view === 'detail' ? <ProfileDetail data={data} /> : null }
            { view === 'member' ? <ProfileMember /> : null }
            { view === 'appointment' ? <Appointment data={data}  /> : null }
            { view === 'course' ? <ProfileCourse data={data} /> : null }
            { view === 'orders' ? <ProfileOrder uid={uid} /> : null }
            { view === 'orderstatus' ? <ProfileEms /> : null }
            { view === 'history' ? <ProfileHistory /> : null }   
            
  	    
        	</div>        	
        </div>  
		<br/><br/>
	</section>
	)   
  }

 //
  getDatas(){
  	/*
    const _this = this
    getPromotions('WEB','-','-')
    .then(function(response) {         
        let List = []
        if(response.data.status === '200'){   
          List = response.data.data
        } 
        _this.setState({ data: List }) 
    })
    */
  }



}