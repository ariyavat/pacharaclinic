import React, { Component } from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Login from './Login'
import * as config from '../config'



function Footer () {
	const d = new Date()
	const year_now = d.getFullYear()	
	
	return (    
		<footer className="main-footer non-printable">
		    <div className="pull-right hidden-xs">
		      <b>{config.init.version}</b>
		    </div>
		    <strong>
		    Copyright &copy; 2014-{year_now}  <a href="http://memorysoftthailand.com">Memorysoft</a>.
		    </strong> All rights reserved.
		</footer>
	)
}

//
class Main extends Component {
  constructor (props) {
    super(props);
    this.state = { isLogin: false, isLoad: false, auth: 'NO'  } 
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount () { 
    const data = JSON.parse(localStorage.getItem('msClinic'));
    if(data){      
      let auth =   JSON.parse(data.auth);  
      this.setState({ auth: auth },()=>{      
        getSatrtPage(); 
      })
    } else {
      this.context.router.push({
           pathname: '/login',
        }); 
    }
    getSatrtPage() 
  }

  handleMenuClick(url,e){
    e.preventDefault();
      this.context.router.push({
           pathname: url,
        }); 
      
  }

  handleLogOut() {       
    localStorage.clear()
  }

  render () {  	
    const auth =  this.state.auth;
    return(
    <div>

		    <div className="skin-blue sidebar-mini wrapper">
		      <Navbar {...this.state} />
         
          <MenubarList  auth={auth} onMenu={this.handleMenuClick.bind(this)}  />
         
		      
		      <div className="content-wrapper">    
		        {this.props.children}
		      </div>
		      <Footer />
		      <aside className="control-sidebar control-sidebar-dark non-printable">
		      	aside
		      </aside>
		      <div className="control-sidebar-bg non-printable"></div>
		    </div>
	
	   
	</div>
    )    
  }
}

export default Main
//
function MenubarList (props) {
  const _this = this
  const {auth, onMenu} = props
  let reg = 'N';
  if(auth.reg){ reg = auth.reg.status  }
  let finance = 'N';
  if(auth.finance){ finance = auth.finance.status }
  let treatment = 'N';
  if(auth.treatment){ treatment = auth.treatment.status }
  let doctor = 'N';
  if(auth.doctor){ doctor = auth.doctor.status }
  let store = 'N';
  if(auth.store){ store = auth.store.status }
  let service = 'N';
  if(auth.service){ service = auth.service.status }
  let setting = 'N';
  if(auth.setting){ setting = auth.setting.status }
  let report = 'N';
  if(auth.report){ report = auth.report.status }


  return(
    <aside className="main-sidebar non-printable">
      <section className="sidebar" >

            <ul className="sidebar-menu">
              <li className="header">MAIN MENU</li>
              <li className="">       
                <Link onClick={onMenu.bind(this,'/app')} activeClassName="active" onlyActiveOnIndex>
                  <i className="fa fa-dashboard"></i> <span>Dashboard</span>        
                </Link>                         
              </li>     
              {
                reg === 'Y'?
                  <li className="treeview">
                    <a href="#">
                      <i className="fa fa-user"></i>
                      <span>ประชาสัมพันธ์</span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li><Link onClick={onMenu.bind(this,'/app/customer')} ><i className="fa fa-circle-o"></i> ข้อมูลลูกค้า</Link></li> 
                      <li><Link to="/app/appointment"><i className="fa fa-circle-o"></i> รายการนัดหมาย</Link></li>
                      <li><Link to="/app/dob"><i className="fa fa-circle-o"></i> รายการวันเกิดลูกค้า</Link></li>
                    </ul>
                  </li> 
                : null
              }
              {
                finance === 'Y' ?
                <li className="treeview">
                  <a href="#">
                    <i className="fa fa-medkit"></i>
                    <span>ห้องยา / การเงิน</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><Link to="/app/queues"><i className="fa fa-circle-o"></i> คิวรับบริการ</Link></li> 
                    <li><Link to="/app/payment"><i className="fa fa-circle-o"></i> รายการแบ่งจ่าย</Link></li>
                    <li><Link to="/app/sumary"><i className="fa fa-circle-o"></i> สรุปยอด</Link></li>
                  </ul>
                </li>  
                : null
              }         
   
              {
                doctor === 'Y' ?
                <li className="treeview">
                  <a href="#">
                    <i className="fa fa-medkit"></i>
                    <span>ห้องตรวจ / พบแพทย์</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><Link to="/app/doctors"><i className="fa fa-circle-o"></i> คิวรับบริการ</Link></li> 
                    <li><Link to="/app/payment"><i className="fa fa-circle-o"></i> รายการแบ่งจ่าย</Link></li>
                    <li><Link to="/app/sumary"><i className="fa fa-circle-o"></i> สรุปยอด</Link></li>
                  </ul>
                </li>  
                : null
              }
              {
                treatment === 'Y' ?
                 <li className="treeview">
                  <a href="#">
                    <i className="fa fa-medkit"></i>
                    <span>ห้องทรีทเมนท์</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><Link to="/app/treatments"><i className="fa fa-circle-o"></i> คิวรับบริการ</Link></li>  
                    <li><Link to="/app/reptreatments"><i className="fa fa-circle-o"></i> รายการตัดใช้บริการ</Link></li> 
                  </ul>
                </li>   
                : null 
              }
      
              {
                store === 'Y' ?
                <li className="treeview">
                  <a href="#">
                    <i className="fa fa-briefcase"></i>
                    <span>คลังสินค้า</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><Link to="/app/product"><i className="fa fa-circle-o"></i> ยาและเวชภัณฑ์</Link></li> 
                    <li><Link to="/app/recive"><i className="fa fa-circle-o"></i> รับเข้า</Link></li>
                    <li><Link to="/app/out"><i className="fa fa-circle-o"></i> จ่ายออก</Link></li>
                    <li><Link to="/app/adjust"><i className="fa fa-circle-o"></i> ปรับสต็อค</Link></li>
                    <li className="text-center text-white">- โยกระหว่างสาขา -</li>
                    <li><Link to="/app/adjust"><i className="fa fa-circle-o"></i> รับเข้า </Link></li>
                    <li><Link to="/app/adjust"><i className="fa fa-circle-o"></i> จ่ายออก</Link></li>
                  </ul>
                </li>           
                : null
              }

              {
                service === 'Y' ?
                <li className="treeview">
                  <a href="#">
                    <i className="fa fa-list"></i>
                    <span>บริการ</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="text-center text-white">- ตั้งค่าเริ่มต้น -</li>
                    <li><Link to="/app/service_group"><i className="fa fa-circle-o"></i> ประเภทบริการ </Link></li>                  
                    <li className="text-center text-white">- ข้อมูลบริการ -</li>
                    <li><Link to="/app/services"><i className="fa fa-circle-o"></i> บริการ </Link></li>

                  </ul>
                </li> 
                : null
              }

              {
                setting === 'Y' ?  
                  <li className="treeview">
                    <a href="#">
                      <i className="fa fa-cog"></i>
                      <span>ตั้งค่าระบบ</span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li className="text-center text-white">- ข้อมูลบริษัท -</li>
                      <li><Link to="/app/company"><i className="fa fa-circle-o"></i> แก้ไขข้อมูลบริษัท</Link></li>
                      <li><Link to="/app/logo"><i className="fa fa-circle-o"></i> เพิ่มโลโก้บริษัท</Link></li>
                      <li><Link to="/app/autonumber"><i className="fa fa-circle-o"></i> เลขเอกสารอัตโนมัติ</Link></li>
                      <li><Link to="/app/others"><i className="fa fa-circle-o"></i> อื่นๆ</Link></li>

                      <li className="text-center text-white">- ข้อมูลเพิ่มเติม -</li>
                      <li><Link to="/app/gerneral"><i className="fa fa-circle-o"></i> ข้อมูลเสริม</Link></li>              
                      <li><Link to="/app/employee"><i className="fa fa-circle-o"></i> ข้อมูลแพทย์ / พนักงาน</Link></li>
                      <li><Link to="/app/supplier"><i className="fa fa-circle-o"></i> ข้อมูลผู้ขาย / เจ้าหนี้</Link></li>
                      <li><Link to="/app/user"><i className="fa fa-circle-o"></i> ข้อมูลผู้ใช้งาน</Link></li>
                    </ul>
                  </li>           
                  : null
                }

   





            </ul>
        
      </section>
    </aside>  
  )
}

Main.contextTypes = {
  router: React.PropTypes.object.isRequired
}



