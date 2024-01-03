import React, { Component } from 'react'
import { Link } from 'react-router'


class Sidebar extends Component {
	constructor(props){
		super(props);
		this.state = { 
      adj : false,
      auth: {
            M1: 'N', M2: 'N', M3: 'N', M4: 'N', M5: 'N', M6: 'N', M7: 'N', M8 : 'N',           
            admin: 'N', con: 'N',
        }
    }
	
	}
	shouldComponentUpdate(_nextProps, nextState) {	
		return (this.props !== _nextProps)  || (this.state !== nextState);  
  }		
	componentDidMount () {			
		this.setState({  auth:  this.props.auth })
	}
	componentWillReceiveProps(nextProps) {
	   this.setState({  auth: nextProps.auth })	
	}
	render () {
    const item = this.state
		const auth = this.state.auth;
	  return (    
		<aside className="main-sidebar non-printable">
			<section className="sidebar" >

            <ul className="sidebar-menu">
              <li className="header">MAIN MENU</li>
              <li className="">       
                <Link to="/app" activeClassName="active" onlyActiveOnIndex>
                  <i className="fa fa-dashboard"></i> <span>หน้าแรก</span>        
                </Link>                         
              </li>   

              {
                auth.M1 === 'Y' ?
                <li className="treeview">
                  <a href="#">
                    <i className="fa fa-briefcase"></i>
                    <span>Back Office</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu"> 
                    <li><Link to="/app/pickup-wait"><i className="fa fa-circle-o"></i> เบิกสินค้ารออนุมัติ</Link></li> 
                    <li><Link to="/app/pickup-con"><i className="fa fa-circle-o"></i> อนุมัติแล้วรอจัดส่ง</Link></li> 
                    <li><Link to="/app/pickup-send"><i className="fa fa-circle-o"></i> รายการส่งสินค้า</Link></li>

                  </ul>
                </li>  
                : null
              }



              {
              auth.M2 === 'Y' ?
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-briefcase"></i>
                  <span>โรงงาน</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li className="text-center text-white">- รายการเบิกจากสาขา -</li>
                  <li><Link to="/app/sumpickup"><i className="fa fa-circle-o"></i> รายการเบิกสินค้าจากสาขา</Link></li> 
                  <li><Link to="/app/sumproduct"><i className="fa fa-circle-o"></i> รายการวัตถุดิบที่เบิก</Link></li>

                  <li className="text-center text-white">- จัดซื้อวัตถุดิบ -</li>
                  <li><Link to="/app/po"><i className="fa fa-circle-o"></i> ใบสั่งซื้อ</Link></li> 

                  <li className="text-center text-white">- วัตถุดิบ -</li>
                  <li><Link to="/app/product"><i className="fa fa-circle-o"></i> รายการวัตถุดิบ</Link></li> 
                  <li><Link to="/app/product_set"><i className="fa fa-circle-o"></i> ตั้งค่าสินค้า</Link></li> 
                  <li><Link to="/app/product_min"><i className="fa fa-circle-o"></i> วัตถุดิบใกล้หมด</Link></li> 


                  <li className="text-center text-white">- คลังวัตถุดิบ -</li>
                  <li><Link to="/app/recive"><i className="fa fa-circle-o"></i> รับเข้า</Link></li> 
                  <li><Link to="/app/out"><i className="fa fa-circle-o"></i> จ่ายออก</Link></li> 

                  {
                    item.adj ?
                    <li><Link to="/app/adjust"><i className="fa fa-circle-o"></i> ปรับสต็อค</Link></li>
                    : null
                  }
                  


                  <li className="text-center text-white">- โอนสินค้าให้สาขา -</li>
                  <li><Link to="/app/tranfer"><i className="fa fa-circle-o"></i> โอนสินค้า</Link></li> 
                  <li><Link to="/app/tranfer_rep"><i className="fa fa-circle-o"></i> รายงานการโอนสินค้า</Link></li> 
                  <li><Link to="/app/tranfer_product"><i className="fa fa-circle-o"></i> สรุปการโอนสินค้า</Link></li>
                  <li><Link to="/app/tranfer_bproduct"><i className="fa fa-circle-o"></i> สรุปการใช้วัตถุดิบ</Link></li>
                </ul>
              </li>  
              : null
              }



              {
                auth.M3 === 'Y' ?
                <li className="treeview">
                  <a href="#">
                    <i className="fa fa-cog"></i>
                    <span>ตั้งค่าระบบ</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><Link to="/app/user"><i className="fa fa-circle-o"></i> ข้อมูลผู้ใช้งาน</Link></li>
                    <li><Link to="/app/autonumber"><i className="fa fa-circle-o"></i> เลขเอกสารอัตโนมัติ</Link></li>                 
                                      
                    <li><Link to="/app/supplier"><i className="fa fa-circle-o"></i> ข้อมูลผู้ขาย / เจ้าหนี้</Link></li>
                  </ul>
                </li>              
                : null  
              } 



			      </ul>
				
			</section>
		</aside>  	
	    )		
	}

}

export default Sidebar